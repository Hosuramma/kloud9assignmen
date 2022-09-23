import { ActionTypes } from '../constants/action-tpes';

export const setProducts = (products) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products
    }
}

export const selectedProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCTS,
        payload: product
    }
}

export const editProduct = (product) => {
    return {
        type: ActionTypes.EDIT_PRODUCTS,
        payload: product
    }
}

export const deleteProduct = (product) => {
    console.log('hello');
    return {
        type: ActionTypes.DELETE_PRODUCTS,
        payload: product
    }
}