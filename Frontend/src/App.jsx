import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Error  from './pages/Error'
import Logout from './pages/Logout'
import Footer from './components/Footer'
export default function App() {
  return (
    <div >
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route
        path='/' 
        element={<Home/>}/>
        <Route
        path='/about' 
        element={<About/>}/>
        <Route
        path='/contact' 
        element={<Contact/>}/>
        <Route
        path='/login' 
        element={<Login/>}/>
        <Route
        path='/signup' 
        element={<Signup/>}/>
         <Route
        path='/logout' 
        element={<Logout/>}/>
        <Route
        path='*'
        element={<Error/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}
