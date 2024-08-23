import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for user details
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

interface userId {
    id: number;
}

// Define the type for the slice state
interface LoginState {
    userDetails: UserDetails | {};
    isLoginSuccess: boolean;
    auth: boolean;
}

// Define the initial state with type
const initialState: LoginState = {
    userDetails: {},
    isLoginSuccess: false,
    auth: false
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        userLogin() {
            // Logic for user login
        },
        setLoginStatus(state, action: PayloadAction<boolean>) {
            return {
                ...state,
                isLoginSuccess: action.payload,
            };
        },
        getUserDetails(state, action: PayloadAction<userId>) {
            // Logic for getting user details
        },
        setUserDetails(state, action: PayloadAction<UserDetails>) {
            return {
                ...state,
                userDetails: action.payload,
            };
        },
        registerUser() {
            // Logic for user registration
        },
        setAuth(state, action: PayloadAction<boolean>) {
            return {
                ...state,
                auth: action.payload,
            };
        }
    }
});

// Action creators are generated for each case reducer function
export const { userLogin, setUserDetails, registerUser, getUserDetails, setLoginStatus, setAuth } = loginSlice.actions;

export default loginSlice.reducer;
