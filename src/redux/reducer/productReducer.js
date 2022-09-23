import { ActionTypes } from "../constants/action-tpes";

const initialState = {
    products: [],
}
export const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, payload };
        default:
            return state;
    }
} 

export const selectedProductReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SELECTED_PRODUCTS:
            return { ...state, product:payload };
        default:
            return state;
    }
}

export const deleteProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.DELETE_PRODUCTS:
            return { ...state.products.filter((prod) => prod.id !== payload.id) };
        default:
            return state;
    }
} 

export const editProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.DELETE_PRODUCTS:
            return { ...state, payload};
        default:
            return state;
    }
}
