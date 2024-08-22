import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for product details
export interface ProductDetails {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

// Define the type for the state
interface ProductState {
    products: ProductDetails[]; // Array of products
    productDetails: ProductDetails | {}; // Product details or an empty object
}

// Define the initial state with type
const initialState: ProductState = {
    products: [],
    productDetails: {},
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getAllProducts() {
            // Logic for getting all products
        },
        setAllProducts(state, action: PayloadAction<ProductDetails[]>) {
            return {
                ...state,
                products: action.payload
            };
        },
        getProduct(state, action: PayloadAction<any>) {
            // Logic for getting a single product
        },
        setProductDetails(state, action: PayloadAction<ProductDetails>) {
            return {
                ...state,
                productDetails: action.payload
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { getAllProducts, getProduct, setAllProducts, setProductDetails } = productSlice.actions;

export default productSlice.reducer;
