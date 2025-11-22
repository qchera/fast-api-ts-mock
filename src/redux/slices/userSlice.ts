import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ShipmentArrVal, User} from "../../types";

interface UserState {
    userData: User | null;
}

const initialState: UserState = {
    userData: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<User>) {
            state.userData = action.payload;
        },
        addPurchase(state, action: PayloadAction<ShipmentArrVal>) {
            if (state.userData) {
                if (!state.userData.purchases) {
                    state.userData.purchases = []
                }
                state.userData.purchases.push(action.payload)
            }
        },
        addSale(state, action: PayloadAction<ShipmentArrVal>) {
            if (state.userData) {
                if (!state.userData.sales) {
                    state.userData.sales = [];
                }
                state.userData.sales.push(action.payload);
            }
        },
        clearUserData(state) {
            state.userData = null;
        }
    }
})

export const { setUserData, addPurchase, addSale, clearUserData } = userSlice.actions;

export default userSlice.reducer;
