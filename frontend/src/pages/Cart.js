import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const navigate = useNavigate();
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleOrder = async (e) => {
    let userEmail = localStorage.getItem("userEmail");
    
    let response = await fetch("http://localhost:5000/api/place_order", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email: userEmail, order_data: data, order_date: new Date().toLocaleString()})
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" })
      navigate("/");
    }
    else{
      alert('Unable to place order');
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, i) => (
              <tr key={i}>
                <th scope='row' >{i + 1}</th>
                <td >{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: i }) }} ><i className='far fa-times-circle'></i></button> </td></tr>
            ))}
          </tbody>
        </table>
        <h2>Total Price: {totalPrice}/-</h2>
        <button className='btn bg-success mt-5 ' onClick={handleOrder} > Place order </button>
      </div>
    </div>
  )
}