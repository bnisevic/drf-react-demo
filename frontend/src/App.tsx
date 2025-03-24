import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import SelectedProducts from './pages/SelectedProducts'

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App