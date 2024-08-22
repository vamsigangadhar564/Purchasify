import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the alert state
interface AlertState {
    open: boolean;
    title: string;
    msg: string;
    severity: "success" | "error" | "";
}

// Define the type for the payload in alert actions
interface AlertPayload {
    msg?: string;
    title?: string;
}

// Define the initial state with type
const initialState: AlertState = {
    open: false,
    title: "",
    msg: "",
    severity: ""
};

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        successAlert(state, action: PayloadAction<AlertPayload>) {
            return {
                ...state,
                title: "Success",
                ...action.payload,
                open: true,
                severity: "success"
            };
        },
        errorAlert(state, action: PayloadAction<AlertPayload>) {
            return {
                ...state,
                title: "Error",
                ...action.payload,
                open: true,
                severity: "error"
            };
        },
        closeAlert(state) {
            return { ...state, open: false };
        }
    }
});

// Action creators are generated for each case reducer function
export const { successAlert, errorAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
