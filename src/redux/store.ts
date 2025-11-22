import {configureStore} from "@reduxjs/toolkit";
import errorReducer from "./slices/errorSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
      error: errorReducer,
      user: userReducer
  }
});

export default store;