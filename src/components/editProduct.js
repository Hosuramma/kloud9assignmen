import React, { useEffect } from "react";
import { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { InputLabel } from '@mui/material';


const EditProduct = (props) => {
    const [singleProduct, setProduct] = useState({});
    const params = useParams();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const pId = params.productId.replace(/:/g, '');
        const response = await axios.get(`https://fakestoreapi.com/products/${pId}`)
            .then((res) => {
                let prduct = res.data;
                setProduct({
                    title: prduct.title,
                    price: prduct.price,
                    description: prduct.description,
                    image: prduct.image,
                    category: prduct.category,
                });
            }).catch((error) => {
                console.log(error);
            });
    };
    const history = useNavigate();
    const saveProduct = async () => {
        const pId = params.productId.replace(/:/g, '');
        const response = await axios.put(`https://fakestoreapi.com/products/${pId}`, {
            method: "PUT",
            body: JSON.stringify(
                singleProduct
            )
        })
            .then(res => {
                console.log('res', res);
                history("/");
            }).catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h4 style={{ margin: '50px 0px 0px 100px' }}>
                <strong>Edit Product</strong>
            </h4>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '30px 50px 0px 300px',
                    '& > :not(style)': {
                        m: 1,
                        width: 800,
                        height: 500,
                    },
                }}
            >
                <Paper elevation={4} style={{ padding: '30px' }}>
                    <div style={{ marginLeft: '130px' }}>
                        <InputLabel>Title</InputLabel>
                        <TextField
                            id="title"
                            name="title"
                            onChange={(e) => {
                                let value = e.target.value;
                                setProduct({
                                    // name: value,
                                    title: value,
                                    price: singleProduct.price,
                                    description: singleProduct.description,
                                    image: singleProduct.image,
                                    category: singleProduct.category,
                                })
                            }}
                            style={{ width: '55ch', marginTop: '5px' }}
                            value={singleProduct.title}
                        />
                        <InputLabel style={{ marginTop: '5px' }}>Price</InputLabel>
                        <TextField
                            id="price"
                            name="price"
                            onChange={(e) => {
                                let value = e.target.value;
                                setProduct({
                                    // name: value,
                                    title: singleProduct.title,
                                    price: value,
                                    description: singleProduct.description,
                                    image: singleProduct.image,
                                    category: singleProduct.category,
                                })
                            }}
                            style={{ width: '55ch', marginTop: '5px' }}
                            value={singleProduct.price}
                        />
                        <InputLabel style={{ marginTop: '5px' }}>Description</InputLabel>
                        <TextField
                            id="description"
                            name="description"
                            onChange={(e) => {
                                let value = e.target.value;
                                setProduct({
                                    // name: value,
                                    title: singleProduct.title,
                                    price: singleProduct.price,
                                    description: value,
                                    image: singleProduct.image,
                                    category: singleProduct.category,
                                })
                            }}
                            style={{ width: '55ch', marginTop: '5px' }}
                            value={singleProduct.description}
                        />
                        <br/>
                        {/* <img src={singleProduct.image} height="130px"/> */}
                        <InputLabel style={{ marginTop: '5px' }}>Category</InputLabel>
                        <TextField
                            id="category"
                            name="category"
                            onChange={(e) => {
                                let value = e.target.value;
                                setProduct({
                                    title: singleProduct.title,
                                    price: singleProduct.price,
                                    description: singleProduct.description,
                                    image: singleProduct.image,
                                    category: value,
                                })
                            }}
                            style={{ width: '55ch', marginTop: '5px' }}
                            value={singleProduct.category}
                        />
                        <br />
                        <Button
                            style={{ backgroundColor: '#2A9Df4', margin: '20px' }}
                            onClick={saveProduct}
                        >
                            Save Changes
                        </Button>
                    </div>
                </Paper>
            </Box>
        </div>
    )
}

export default EditProduct;