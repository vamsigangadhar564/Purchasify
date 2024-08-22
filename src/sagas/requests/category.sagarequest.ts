import axios from 'axios';

export const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

interface RequestPayload {
    payload?: {
        categoryType?: string;
    };
}

export function requestGetAllCategories(requestObj?: RequestPayload) {
    const url = 'https://fakestoreapi.com/products/categories';
    const request = {
        headers: {
            ...headers,
        },
    };
    return axios.get(url, request)
        .then((response: any) => response.data)
        .catch((error: any) => {
            console.error('Error fetching categories:', error);
            throw error;
        });
}

export function requestGetCategory(requestObj?: RequestPayload) {
    const { categoryType } = requestObj?.payload || {};
    const url = `https://fakestoreapi.com/products/category/${categoryType}`;
    const request = {
        headers: {
            ...headers,
        },
    };
    return axios.get(url, request)
        .then((response: any) => response.data)
        .catch((error: any) => {
            console.error(`Error fetching category ${categoryType}:`, error);
            throw error;
        });
}
