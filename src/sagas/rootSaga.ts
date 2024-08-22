import { takeEvery } from "redux-saga/effects";
/* handlers */
import {
    handleUserLogin,
    handleGetUserDetails,
    handleGetAllProducts,
    handleGetAllcategories,
    handleGetCategory,
    handleGetProduct,
    handleAddToCart,
    handleRemoveToCart,
} from "./index";
/* actions */
import {
    addToCart,
    getAllCategories,
    getAllProducts,
    getCategory,
    getProduct,
    getUserDetails,
    removeFromCart,
    userLogin,
} from "../reducers";

export function* watcherSaga() {
    yield takeEvery(userLogin.type, handleUserLogin);
    yield takeEvery(getUserDetails.type, handleGetUserDetails);
    yield takeEvery(getAllProducts.type, handleGetAllProducts);
    yield takeEvery(getAllCategories.type, handleGetAllcategories);
    yield takeEvery(getCategory.type, handleGetCategory);
    yield takeEvery(getProduct.type, handleGetProduct);
    yield takeEvery(addToCart.type, handleAddToCart);
    yield takeEvery(removeFromCart.type, handleRemoveToCart);
}
