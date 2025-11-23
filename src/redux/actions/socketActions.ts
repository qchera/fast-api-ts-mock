import {createAction} from "@reduxjs/toolkit";

const connectSocket = createAction('socket/connect');
const disconnectSocket = createAction('socket/disconnect');

export { connectSocket, disconnectSocket };