import React from "react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { setProducts } from '../redux/actions/productActions';
import axios from 'axios';
import ProductComponent from './productComponent';

const ProductList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        const response = await axios.get('https://fakestoreapi.com/products')
            .catch((error) => {
                console.log(error);
            });
        dispatch(setProducts(response.data));
    }
    return (
        <div className="ui grid container">
            <ProductComponent />
        </div>
    );
}

export default ProductList;