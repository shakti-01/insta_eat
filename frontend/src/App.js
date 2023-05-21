import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import { CartProvider } from './components/ContextReducer';
import Orders from './pages/Orders';


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/orders" element={<Orders/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
