import { call, put } from "redux-saga/effects";
import {
    setLoader,
    errorAlert,
    setAllCategories,
    setAllProducts,
} from "../../reducers";
import {
    requestGetAllCategories,
    requestGetCategory,
} from "../index";
import { ProductDetails } from "../../reducers/productSlice";




// Define the handleGetAllcategories saga
export function* handleGetAllcategories(requestObj: any) {
    try {
        yield put(setLoader(true));
        const response: string[] = yield call(requestGetAllCategories, requestObj);
        yield put(setAllCategories(response));
    } catch (error) {
        yield put(errorAlert({
            msg: "Failed to fetch all category products"
        }))
        console.log(error);
    } finally {
        yield put(setLoader(false));
    }

}

// Define the handleGetCategory saga
export function* handleGetCategory(requestObj: any) {
    try {
        yield put(setLoader(true));
        const response: ProductDetails[] = yield call(requestGetCategory, requestObj);
        yield put(setAllProducts(response));
    } catch (error) {
        yield put(errorAlert({
            msg: "Failed to fetch category products"
        }))
        console.log(error);
    } finally {
        yield put(setLoader(false));
    }
}
