import {connectSocket, disconnectSocket} from "../actions/socketActions.ts";
import {addPurchase, updateSale} from "../slices/userSlice.ts";

export const SocketMiddleware = (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
        if (connectSocket.match(action)) {
            const userId = store.getState().user.userData?.id;

            if (userId && !socket) {
                socket = new WebSocket(`ws://localhost:8080/ws/${userId}`);

                socket.onopen = () => {
                    console.log('WebSocket connection established');
                };

                socket.onmessage = (event) => {
                    const message = JSON.parse(event.data);
                    if (message.type == 'SALE_UPDATE') {
                        store.dispatch(updateSale(message.payload));
                    }
                    if (message.type == 'PURCHASE_ADD') {
                        store.dispatch(addPurchase(message.payload))
                    }
                };

                socket.onclose = () => {
                    console.log('WebSocket connection closed');
                    socket = null;
                }
            }
        }

        if (disconnectSocket.match(action)) {
            if (socket) {
                socket.close();
                socket = null;
            }
        }

        return next(action)
    }
}