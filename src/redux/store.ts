import {configureStore, createSelector} from "@reduxjs/toolkit";
import errorReducer from "./slices/errorSlice";
import userReducer from "./slices/userSlice";
import successReducer from "./slices/successMsgSlice.ts";
import {SocketMiddleware} from "./middleware/socketMiddleware.ts";

const store = configureStore({
    reducer: {
      error: errorReducer,
      success: successReducer,
      user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(SocketMiddleware),
    devTools: {
        shouldHotReload: false,
    }
});

type RootState = ReturnType<typeof store.getState>;
export default store;

export const selectUserData = (state: RootState) => state.user?.userData ?? null
export const selectId = (state: RootState) => state.user.userData?.id ?? null
export const selectUsername = (state: RootState) => state.user.userData?.username ?? null
export const selectEmail = (state: RootState) => state.user.userData?.email ?? null
export const selectFullName = (state: RootState) => state.user.userData?.fullName
export const selectPurchases = (state: RootState) => state.user.userData?.purchases ?? []
export const selectSales = (state: RootState) => state.user.userData?.sales ?? []
export const selectAllShipments = createSelector(
    [selectPurchases, selectSales],
    (purchases, sales) => {
        return [...purchases, ...sales];
    }
);
export const selectErrorMsg = (state: RootState) => state.error.errorData?.message
export const selectErrorCode = (state: RootState) => state.error.errorData?.code
export const selectErrorMeta = (state: RootState) => state.error.errorData?.meta
export const selectSuccessMsg = (state: RootState) => state.success.successMessage