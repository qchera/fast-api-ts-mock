import {configureStore} from "@reduxjs/toolkit";
import errorReducer from "./slices/errorSlice";
import userReducer from "./slices/userSlice";
import {SocketMiddleware} from "./middleware/socketMiddleware.ts";

const store = configureStore({
    reducer: {
      error: errorReducer,
      user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(SocketMiddleware),
    devTools: {
        shouldHotReload: false,
    }
});

export default store;