import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './ContextReducer';

function Navbar() {
  let cartdata = useCart();
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate('/');
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
            <Link className="navbar-brand fs-4 fw-bold fst-italic" to="/">InstaEat</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                <Link className="nav-link active fs-5" to="/">Home</Link>
                </li>
                {(localStorage.getItem("authToken"))?
                <>
                <li className="nav-item">
                <Link className="nav-link active fs-5" to="/orders">My orders</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active fs-5" to="/cart">My cart <span className="badge bg-danger">{cartdata.length}</span> </Link>
                </li>
                </>
                :""}
            </ul>
              <div className='me-3'>
                {(!localStorage.getItem("authToken"))?
                <>
                  <Link className="btn bg-dark text-white me-5" to="/login">Login</Link> 
                  <Link className="btn bg-dark text-white" to="/signup">Sign up</Link>
                </>:
                <div className="btn bg-dark text-danger" onClick={logout}>Logout</div>
              }
                
              </div>
            </div>
        </div>
        </nav>
      </div>
  )
}

export default Navbar