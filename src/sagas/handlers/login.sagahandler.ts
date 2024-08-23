import { call, put } from "redux-saga/effects";
import {
    setUserDetails,
    setLoader,
    successAlert,
    errorAlert,
    setLoginStatus,
} from "../../reducers";
import { requestUserDetails, requestUserLogin } from "../index";

// Define types for request objects and responses
interface RequestObj {
    username?: string;
    password?: string;
}

interface UserLoginResponse {
    token: string;
}


interface UserDetails {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        };
    };
    phone: string;
}

// Define the handleUserLogin saga
export function* handleUserLogin(requestObj: any) {
    try {
        yield put(setLoader(true));
        const response: UserLoginResponse = yield call(requestUserLogin, requestObj);
        localStorage.setItem("app_token", response.token);
        yield put(successAlert({ msg: "User logged in successfully" }));
        yield put(setLoginStatus(true));
    } catch (error) {
        yield put(errorAlert({ msg: "Failed to login" }));
    } finally {
        yield put(setLoader(false));
    }
}

// Define the handleGetUserDetails saga
export function* handleGetUserDetails(requestObj: any) {
    try {
        yield put(setLoader(true));
        const response: UserDetails = yield call(requestUserDetails, requestObj);
        yield put(setUserDetails(response));
    } catch (error) {
        yield put(errorAlert({ msg: "Failed to fetch user details" }));
    } finally {
        yield put(setLoader(false));
    }
}
