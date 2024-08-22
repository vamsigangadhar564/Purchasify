import { watcherSaga } from "./rootSaga";

import {
    handleUserLogin,
    handleGetUserDetails
} from "./handlers/login.sagahandler";

import { requestUserLogin, requestUserDetails } from "./requests/login.sagarequests";

import { requestGetCategory, requestGetAllCategories } from "./requests/category.sagarequest";

import { requestGetAllProducts, requestGetProduct } from "./requests/product.sagarequest";

import { handleGetAllcategories, handleGetCategory } from "./handlers/category.sagahandler";
import { handleGetAllProducts, handleGetProduct } from "./handlers/product.sagahandler";
import { handleAddToCart, handleRemoveToCart } from "./handlers/cart.sagahandler";

// Export all the imported modules and functions
export {
    watcherSaga,
    handleUserLogin,
    requestUserLogin,
    requestUserDetails,
    handleGetUserDetails,
    requestGetCategory,
    requestGetAllCategories,
    requestGetAllProducts,
    requestGetProduct,
    handleGetAllcategories,
    handleGetCategory,
    handleGetAllProducts,
    handleGetProduct,
    handleAddToCart,
    handleRemoveToCart
};
