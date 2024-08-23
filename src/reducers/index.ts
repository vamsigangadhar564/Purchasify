import loaderReducer, { setLoader } from "./loaderSlice";
import loginReducer, { userLogin, setUserDetails, registerUser, setLoginStatus, getUserDetails, setAuth } from "./loginSlice";
import alertReducer, { successAlert, errorAlert, closeAlert } from "./alertSlice";
import categoryReducer, { getAllCategories, setAllCategories, getCategory } from "./categorySlice";
import productReducer, { getAllProducts, getProduct, setAllProducts, setProductDetails } from "./productSlice";
import cartReducer, { addToCart, setProductsToCart, removeFromCart, clearCart } from "./cartSlice";

export {
    loaderReducer,
    loginReducer,
    alertReducer,
    categoryReducer,
    productReducer,
    cartReducer,
    setLoader,
    userLogin,
    setUserDetails,
    registerUser,
    setLoginStatus,
    getUserDetails,
    successAlert,
    errorAlert,
    closeAlert,
    getAllCategories,
    setAllCategories,
    getCategory,
    getAllProducts,
    getProduct,
    setAllProducts,
    setProductDetails,
    addToCart,
    setProductsToCart,
    removeFromCart,
    clearCart,
    setAuth
};
