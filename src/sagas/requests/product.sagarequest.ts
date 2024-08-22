import axios from 'axios';

export const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

interface GetAllProductsRequestPayload {
    payload?: any;  // If there's no specific payload structure, you can use `any`. Otherwise, define a more specific type.
}

interface GetProductRequestPayload {
    payload: {
        productId: number;
    };
}

export function requestGetAllProducts(requestObj?: GetAllProductsRequestPayload) {
    const url = 'https://fakestoreapi.com/products';
    const request = {
        headers: {
            ...headers,
        },
    };
    return axios.get(url, request)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching products:', error);
            throw error;
        });
}

export function requestGetProduct(requestObj: GetProductRequestPayload) {
    const { productId } = requestObj?.payload;
    const url = `https://fakestoreapi.com/products/${productId}`;
    const request = {
        headers: {
            ...headers,
        },
    };
    return axios.get(url, request)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error fetching product with ID ${productId}:`, error);
            throw error;
        });
}
