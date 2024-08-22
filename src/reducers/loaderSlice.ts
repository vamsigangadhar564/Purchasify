import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the loader state
interface LoaderState {
    loaderStatus: boolean;
    loaderCount: number;
}

// Define the initial state with type
const initialState: LoaderState = {
    loaderStatus: false,
    loaderCount: 0,
};

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setLoader(state, action: PayloadAction<boolean>) {
            return { ...state, loaderStatus: action.payload ? true : state.loaderCount > 1 ? true : false, loaderCount: action.payload ? state.loaderCount + 1 : state.loaderCount - 1 }
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
