import React, { useEffect, useState } from 'react'

function Orders() {
  const [orders,setOrders] = useState([]);
  const getOrders = async()=>{
    const uemail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/get_orders",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email: uemail})
    });
    const res = await response.json();
    if(res.success){
      setOrders(res.orders);
    }
    else{
      console.log("cant get users orders");
    }
  }
  useEffect(()=>{
    getOrders();
  },[]);
  return (
    <>
      <h3 className='mx-3 mt-3'>Your previos orders: </h3>
      <hr/>
      <div className='container mx-auto mt-4'>
      <table className='table table-hover'>
        <thead className=' text-success fs-4'>
          <tr>
            <th>#</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order,i)=>{
            return (
              <>
            <tr key={i}>
              <td>{i+1}</td>
              <td>{order.order_date}</td>
            </tr>
            <tr>
              <td colSpan={2}>
              <details>
                <summary>show order details ...</summary>
                <p>
                {order.order_data.map((subo,i)=>{return(
                    <div key={i}>
                      <strong>{subo.name}|</strong> &nbsp;&nbsp;&nbsp;Quantity = {subo.quantity}, Size = {subo.size}
                      <br/>
                    </div>
                  )})}
                </p>
              </details>
            </td>
            </tr>
            </>
            );
          })}
        </tbody>
        </table>
      </div>
    </>
  )
}

export default Orders