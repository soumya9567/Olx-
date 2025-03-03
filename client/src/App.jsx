import React, { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp.jsx'
import SignIn from './pages/SignIn/SignIn.jsx'
import Home from './pages/Home/Home.jsx'
import ProductListingForm from './pages/ProductLIstForm/ProductListForm.jsx'
import PostProduct from './pages/ProductDetails/ProductDetails.jsx'
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx'

function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };
  return (
  <BrowserRouter>
  <Routes>
    <Route  path='/signup' element={<SignUp />}></Route>
    <Route  path='/' element={<SignIn />}></Route>
    <Route path="/home" element={<Home products={products} />} />
      <Route path="/productpost" element={<ProductListingForm onAddProduct={handleAddProduct} />} />
      <Route path="/productdetails/:id" element={<ProductDetails />} />





  </Routes>
  
  </BrowserRouter>
  )
}

export default App
