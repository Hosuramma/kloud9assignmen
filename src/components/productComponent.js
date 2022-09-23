import React from 'react';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Checkbox } from '@material-ui/core';
import { TablePagination } from '@material-ui/core';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Header from './header';

function ProductComponent() {
  // const products = useSelector((state) => state.allProducts.products);
  const [show, setShow] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [isChecked, setChecked] = useState([]);
  const [modalData, setModalData] = useState({});
  const [products, setProducts] = useState([]);
  const [tempId, settempId] = useState([]);
  const [delMulProd, setdelMulProd] = useState([]);
  const [delData, setDelData] = useState(false);
  const [showDeleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products?limit=5')
      .then(res => res.json())
      .then(json => console.log(json))
      .then((response) => {
        setRows(response.data);
        setTotalRows(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchProducts();
  }, []);
  // fetch all Products
  const fetchProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com/products')
      .catch((error) => {
        console.log(error);
      });
    setProducts(response.data);
  }

  // fetch single Product
  const handleClickOpen = async (id) => {
    setShow(true);
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
      .catch((error) => {
        console.log(error);
      });
    setModalData(response.data);
  };
  const handleClose = () => {
    setShow(false);
  };
 // pagination
  const handleChangePage = ((event, newPage) => {
    setPage(newPage);
  });

  const handleChangeRowsPerPage = (
    event
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const handleCheckbox = ((e) => {
    const { value, checked } = e.target;
    //  settempId(value);
    if (checked) {
      setDelData(true);
      setChecked( [...isChecked, value]);
      let arr = [];
		  arr.push(value);
      settempId(arr);
    } else {
      setDelData(false);
      setChecked(isChecked.filter((val) => val !== value));
    }
  });
  const handleDeleteDialog = () => {
    console.log('ischecked', isChecked);
    if(isChecked.length === 0) {
      alert("Please select  products.");
      setDeleteDialog(false);
    } else {
      setDeleteDialog(true);
    }
    }
  
  // delete Products
  const deleteProducts =  (id) => {
    isChecked.map(async(ids) => {
      await axios.delete(`https://fakestoreapi.com/products/${ids}`, {
        method: "DELETE"
      }).then((res) => {
        let delData = res.data;
        let reusl = products.filter((data) => data.id !== delData.id);
        setProducts(reusl);
      })
      .catch((error) => {
        console.log(error);
      });
    });
    setDeleteDialog(false);
    setChecked([]);
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialog(false);
  }
  console.log('delData', delData);
  return (
    <div style={{ paddingTop: '30px' }}>
      <div style={{ marginBottom: '40px' }}>
        <Header />
      </div>
      <div style={{ position: 'absolute', right: '150px', top: '80px' }}>
        <Button variant="contained" onClick={handleDeleteDialog}>Delete</Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: '#f3f3f3' }}>
            <TableCell ><strong>ID</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell ><strong>Title</strong></TableCell>
            <TableCell><strong>Price</strong></TableCell>
            <TableCell><strong>Images</strong></TableCell>
            {/* <TableCell><strong>Description</strong></TableCell> */}
            <TableCell><strong>Rating</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : products)
              .map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell width={20}>
                    <Button onClick={(e) => handleClickOpen(prod.id)}>{prod.id}
                    </Button>
                  </TableCell>
                  <TableCell align="left" component="th" scope="row" width={200}>{prod.category}</TableCell>
                  <TableCell align="left" component="th" scope="row" width={200}>{prod.title}</TableCell>
                  <TableCell align="left" component="th" scope="row" width={200}>{prod.price}</TableCell>
                  <TableCell align="left" component="th" scope="row" width={200}>
                    <Button onClick={(e) => handleClickOpen(prod.id)}>
                      <img src={prod.image} height="100px" />
                    </Button>
                  </TableCell>
                  {/* <TableCell align="left" component="th" scope="row" width={200}>{prod.description}</TableCell> */}
                  <TableCell align="left" component="th" scope="row" width={200}>{prod.rating.rate}</TableCell>
                  <TableCell align="left" component="th" scope="row" width={200}>
                    <Link to={`/prduct/:${prod.id}`}>
                      <EditIcon />
                    </Link>
                    <input
                      style={{ margin: '20px' }}
                      type="checkbox"
                      value={prod.id}
                      onChange={(e) => {
                        handleCheckbox(e)
                        settempId(e.target.value)
                      }}
                      checked={prod.isChecked}
                    />
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <p><b>{modalData.category}</b></p>
          </Modal.Header>
          <Modal.Body>
            <img
              src={modalData.image}
              height="200px"
              width="auto"
              style={{ margin: '0px 10px 20px 150px' }}
            />
            <p><b>{modalData.title}</b></p>
            <p>{modalData.description}</p>
            <p><b>RS. {modalData.price}</b></p>
            {/* <p><b>Ratings: {modalData.rating.rate}</b></p> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal show={showDeleteDialog} onHide={handleCloseDeleteDialog}>
          <Modal.Header closeButton>
            <p><b>Delete Product</b></p>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure to delete products?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteDialog}>
              Close
            </Button>
            <Button variant="secondary" onClick={deleteProducts}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ProductComponent;