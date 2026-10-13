import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<Home />} />

              {/* Products Catalog Page */}
              <Route path="/products" element={<Products />} />

              {/* Product Details Page with Route Parameter (:id) */}
              <Route path="/products/:id" element={<ProductDetails />} />

              {/* Shopping Cart Page demonstrating Global State */}
              <Route path="/cart" element={<CartPage />} />

              {/* 404 Not Found Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
