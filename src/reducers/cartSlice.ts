import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDetails } from './productSlice'; // Adjust the import path as necessary

interface CartItem extends ProductDetails {
    count: number
}

// Define the type for the cart state
interface CartState {
    cartItems: CartItem[];
    totalItems: number;
}

// Define the initial state with type
const initialState: CartState = {
    cartItems: [],
    totalItems: 0,
};

export const cartSlice = createSlice({
    name: "cart", // Changed to "cart" to match the slice name
    initialState,
    reducers: {
        addToCart(state: any, action: PayloadAction<any>) {
            // Logic for adding to cart
        },
        removeFromCart(state: any, action: PayloadAction<any>) {
            // Logic for removing from cart
        },
        setProductsToCart(state, action: PayloadAction<{ cartItems: CartItem[]; totalItems: number }>) {
            return {
                ...state,
                cartItems: action.payload?.cartItems,
                totalItems: action.payload?.totalItems
            };
        },
        clearCart(state) {
            return {
                ...state,
                cartItems: [],
                totalItems: 0
            };
        },
    }
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, setProductsToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
