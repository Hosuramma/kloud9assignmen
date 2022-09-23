import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import ProductList from './components/productList';
import EditProduct from './components/editProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact  element={<ProductList/>}/>
          <Route path='/prduct/:productId' exact  element={<EditProduct/>}/>
          <Route>404 Not Found</Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
