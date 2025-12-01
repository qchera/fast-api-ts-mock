import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ErrorData} from "../../types";

interface ErrorState {
    errorData: ErrorData | null
}

const initialState: ErrorState = {
    errorData: null
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<{message: string, code?: string, meta?: Record<string, any>}>) {
            state.errorData = {
                message: action.payload.message,
                code: action.payload.code ?? null,
                meta: action.payload.meta ?? null,
            }
        },
        clearError(state) {
            state.errorData = null
        }
    }
});

export const {setError, clearError} = errorSlice.actions;

export default errorSlice.reducer;