import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    successMessage: null as string | null
}

const successMsgSlice = createSlice({
        name: 'success',
        initialState,
        reducers: {
            setSuccessMsg(state, action) {
                state.successMessage = action.payload
            },
            clearSuccessMsg(state) {
                state.successMessage = null
            }
        }
    }
)

export const { setSuccessMsg, clearSuccessMsg } = successMsgSlice.actions

export default successMsgSlice.reducer