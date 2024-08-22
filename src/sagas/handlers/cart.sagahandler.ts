import { put } from "redux-saga/effects";
import { setProductsToCart } from "../../reducers";
import { ProductDetails } from "../../reducers/productSlice";



interface CartItem extends ProductDetails {
    count: number;
}

interface RequestPayload {
    cartList: CartItem[];
    product: ProductDetails;
    totalCount: number;
}

interface RequestObj {
    payload: RequestPayload;
}

// Define the handleAddToCart saga
export function* handleAddToCart(requestObj: any) {
    try {
        const { cartList, product, totalCount } = requestObj.payload;

        const id = cartList.findIndex((item: CartItem) => item.id === product.id);
        let updatedItems: CartItem[] = [];

        if (id >= 0) {
            updatedItems = cartList.map((item: CartItem) =>
                item.id === product.id ? { ...product, count: item.count! + 1 } : item
            );
        } else {
            updatedItems = [...cartList, { ...product, count: 1 }];
        }

        yield put(setProductsToCart({ cartItems: updatedItems, totalItems: totalCount + 1 }));
    } catch (error) {
        console.log(error);
    }
}

// Define the handleRemoveToCart saga
export function* handleRemoveToCart(requestObj: any) {
    try {
        const { cartList, product, totalCount } = requestObj.payload;

        const item = cartList.find((item: CartItem) => item.id === product.id);

        let updatedItems: CartItem[] = [];

        if (item?.count && item.count > 1) {
            updatedItems = cartList.map((item: CartItem) =>
                item.id === product.id ? { ...product, count: item.count - 1 } : item
            );
        } else if (item?.count === 1) {
            updatedItems = cartList.filter((item: CartItem) => item.id !== product.id);
        }

        yield put(setProductsToCart({ cartItems: updatedItems, totalItems: totalCount - 1 }));
    } catch (error) {
        console.log(error);
    }
}
