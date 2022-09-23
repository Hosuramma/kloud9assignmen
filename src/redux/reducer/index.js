import { combineReducers } from 'redux';
import { productReducer, selectedProductReducer, deleteProductReducer } from './productReducer';  

const reducers = combineReducers({
     allProducts : productReducer, 
     product : selectedProductReducer,
     deletProduct: deleteProductReducer,
    })

    export default  reducers;