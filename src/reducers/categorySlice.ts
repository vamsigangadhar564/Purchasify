import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetails } from "./productSlice";


// Define the type for the state
interface CategoryState {
    categories: string[];
}

// Define the initial state with type
const initialState: CategoryState = {
    categories: [],
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        getAllCategories() {
            // Logic for getting all categories
        },
        setAllCategories(state, action: PayloadAction<string[]>) {
            return {
                ...state,
                categories: action.payload
            };
        },
        getCategory(state, action: PayloadAction<any>) {
            // Logic for getting a single category
        }
    },
});

// Action creators are generated for each case reducer function
export const { getAllCategories, setAllCategories, getCategory } = categorySlice.actions;

export default categorySlice.reducer;
