import './App.css'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import React, { useState, useEffect } from "react"
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from './Components/NavBar/NavBar'
import Error from './Components/Error/Error'
import Cart from './Components/Cart/Cart'
import { CartProvider } from './context/CartContext'
import Checkout from './Components/Checkout/Checkout'
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from "firebase/firestore"



function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>

          <NavBar />
          <Routes>

            <Route path='/' element={<ItemListContainer />} />
            <Route path='/:categoryId' element={<ItemListContainer />} />
            <Route path='/item/:idProduct' element={<ItemDetailContainer />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Checkout' element={<Checkout />} />
            <Route path='*' element={<Error />} />

          </Routes>

        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App
