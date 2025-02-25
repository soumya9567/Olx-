import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp.jsx'
import SignIn from './pages/SignIn/SignIn.jsx'
import Home from './pages/Home/Home.jsx'

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route  path='/signup' element={<SignUp />}></Route>
    <Route  path='/' element={<SignIn />}></Route>
    <Route  path='/home' element={<Home />}></Route>



  </Routes>
  
  </BrowserRouter>
  )
}

export default App
