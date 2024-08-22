import { call, put } from "redux-saga/effects";
import {
    setLoader,
    errorAlert,
    setAllCategories,
    setAllProducts,
    setProductDetails,
} from "../../reducers";
import {
    requestGetAllCategories,
    requestGetAllProducts,
    requestGetCategory,
    requestGetProduct,
} from "../index";
import { ProductDetails } from "../../reducers/productSlice";




export function* handleGetAllProducts(requestObj: any) {
    try {
        yield put(setLoader(true));
        const response: ProductDetails[] = yield call(requestGetAllProducts, requestObj);
        yield put(setAllProducts(response));
    } catch (error) {
        yield put(errorAlert({ msg: "Failed to fetch all products" }));
    } finally {
        yield put(setLoader(false));
    }
}

// Define the handleGetProduct saga
export function* handleGetProduct(requestObj: any) {
    try {
        yield put(setLoader(true));
        const response: ProductDetails = yield call(requestGetProduct, requestObj);
        yield put(setProductDetails(response));
    } catch (error) {
        yield put(errorAlert({ msg: "Failed to fetch product details" }));
    } finally {
        yield put(setLoader(false));
    }
}
