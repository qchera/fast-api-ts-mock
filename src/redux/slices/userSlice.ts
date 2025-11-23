import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ShipmentSummary, User} from "../../types";

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
        addPurchase(state, action: PayloadAction<ShipmentSummary>) {
            if (state.userData) {
                if (!state.userData.purchases) {
                    state.userData.purchases = []
                }
                state.userData.purchases.push(action.payload)
            }
        },
        updatePurchase(state, action: PayloadAction<ShipmentSummary>) {
            if (state.userData && state.userData.purchases) {
                const index = state.userData.purchases.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.userData.purchases[index] = action.payload;
                }
            }
        },
        addSale(state, action: PayloadAction<ShipmentSummary>) {
            if (state.userData) {
                if (!state.userData.sales) {
                    state.userData.sales = [];
                }
                state.userData.sales.push(action.payload);
            }
        },
        updateSale(state, action: PayloadAction<ShipmentSummary>) {
            if (state.userData && state.userData.sales) {
                const index = state.userData.sales.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.userData.sales[index] = action.payload;
                }
            }
        },
        clearUserData(state) {
            state.userData = null;
        }
    }
})

export const { setUserData, addPurchase, updatePurchase, addSale, updateSale, clearUserData } = userSlice.actions;

export default userSlice.reducer;
