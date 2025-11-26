import {connectSocket, disconnectSocket} from "../actions/socketActions.ts";
import {addPurchase, updateSale} from "../slices/userSlice.ts";
import type {Middleware} from "@reduxjs/toolkit";
const socketUrl: string = import.meta.env.VITE_WS_URL;

export const SocketMiddleware: Middleware = (store) => {
    let socket: WebSocket | null = null;
    let pingInterval: number | undefined;
    let reconnectTimeout: number | undefined;

    return (next) => (action) => {
        if (connectSocket.match(action)) {
            const userId = store.getState().user.userData?.id;
            const token = localStorage.getItem('token')

            clearTimeout(reconnectTimeout)

            if (userId && token && !socket) {
                socket = new WebSocket(`${socketUrl}?token=${token}`);

                socket.onopen = () => {
                    console.log('WebSocket connection established');

                    pingInterval = setInterval(() => {
                        if (socket?.readyState == WebSocket.OPEN) {
                            socket.send("PING")
                        }
                    }, 30000)
                };

                socket.onmessage = (event) => {
                    try {
                        const message = JSON.parse(event.data);
                        if (message.type == 'SALE_UPDATE') {
                            store.dispatch(updateSale(message.payload));
                        }
                        else if (message.type == 'PURCHASE_ADD') {
                            store.dispatch(addPurchase(message.payload))
                        }
                        else if (message.type == 'PONG') {
                            console.log('PONG')
                        }
                    } catch (e) {
                        console.error("WS parsing error", e)
                    }
                };

                socket.onclose = (event) => {
                    console.log('WebSocket connection closed', event.code);
                    socket = null;
                    clearInterval(pingInterval)

                    if (event.code !== 1000) {
                        console.log('Reconnecting in 3s...');
                        reconnectTimeout = setTimeout(() => {
                            store.dispatch(connectSocket())
                            }, 3000)
                    }
                }

                socket.onerror = (error) => {
                    console.error("WS error occurred", error);
                    socket?.close();
                }
            }
        }

        if (disconnectSocket.match(action)) {
            if (socket) {
                socket.close(1000);
                socket = null;
            }
            clearInterval(pingInterval)
            clearTimeout(reconnectTimeout)
        }

        return next(action)
    }
}