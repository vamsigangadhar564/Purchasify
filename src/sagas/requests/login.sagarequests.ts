import axios from 'axios';

export const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

interface LoginRequestPayload {
    payload: {
        username: string;
        password: string;
    };
}

interface UserDetailsRequestPayload {
    payload: {
        id: number;
    };
}

export function requestUserLogin(requestObj: LoginRequestPayload) {
    const data = requestObj?.payload;
    const url = 'https://fakestoreapi.com/auth/login';
    const request = {
        headers: {
            ...headers,
        },
    };
    return axios.post(url, data, request)
        .then(response => response.data)
        .catch(error => {
            console.error('Error logging in:', error);
            throw error;
        });
}

export function requestUserDetails(requestObj: UserDetailsRequestPayload) {
    const { id } = requestObj?.payload;
    const url = `https://fakestoreapi.com/users/${id}`;
    const request = {
        headers: {
            ...headers,
        },
    };
    return axios.get(url, request)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error fetching user details for ID ${id}:`, error);
            throw error;
        });
}
