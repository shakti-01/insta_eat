import React, { useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

function FoodCard(props) {
  const [quantity,setQuantity] = useState(1);
  const [size,setSize] = useState(Object.keys(props.options)[0]);
  let dispatch = useDispatchCart();
  let data = useCart();

  //setSize();
  let price = quantity * parseInt(props.options[size]);
  const addToCart = async ()=>{
    
    for(let item of data){
      if(item.id===props.item._id && item.size === size){
        await dispatch({type:'UPDATE', id:item.id , price : price, quantity:quantity});
        return;
      }
    }
    await dispatch({type:"ADD",id:props.item._id,name: props.item.name,price: price,quantity:quantity,size:size});
    console.log(data);
  }
  return (
    <div>
        <div className="card shadow mb-3" style={{maxWidth: "16rem"}}>
          <img style={{aspectRatio:"3/2"}} src={props.item.img} className="card-img-top" alt="food-item"/>
            <div className="card-body">
              <h5 className="card-title">{props.item.name}</h5>
              <p className="card-text">{props.item.desc}</p>
              <div >
                <select className='m-2 bg-success rounded' style={{"minWidth":"3rem"}} onChange={(e)=>setQuantity(e.target.value)}>
                  { Array.from(Array(5),(e,i)=>{ return(
                    <option value={i+1} key={i+1}>{i+1}</option>
                  );})}
                </select>
                <select className='m-2 bg-success rounded' onChange={(e)=>setSize(e.target.value)} id="item-size">
                  {Object.keys(props.options).map((k)=>{
                    return (<option key={k} value={k}>{k}</option>)
                  })}
                </select>
                <hr/>
                <div className='fs-5'>Total price: {price}</div>
                <hr/>
                <button className='btn btn-success' onClick={addToCart}>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default FoodCard