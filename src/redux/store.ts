import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from '../sagas'; // Your saga import
import { alertReducer, cartReducer, categoryReducer, loaderReducer, loginReducer, productReducer } from '../reducers';

// Function to create the root reducer
function createReducer() {
    return combineReducers({
        loaderReducer,
        loginReducer,
        alertReducer,
        categoryReducer,
        productReducer,
        cartReducer,
    });
}

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

// Function to configure the store
function getStore() {
    const store = configureStore({
        reducer: createReducer(),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(middleware),
    });
    return store;
}

// Export the store instance
export const store = getStore();

// Run the watcher saga
sagaMiddleware.run(watcherSaga);

// Define the type for the RootState (now inferred from the store)
export type RootState = ReturnType<typeof store.getState>;