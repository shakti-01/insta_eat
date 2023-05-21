import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FoodCard from '../components/FoodCard'

function Home() {
  const [query, setQuery] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const changeQuerry = (e)=>{
      setQuery(e.target.value)
  }

  const loadData = async () => {
    const response = await fetch('http://localhost:5000/api/food_items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const res=await response.json();
    //console.log(res);
    setFoodItem(res.food_items);
    setFoodCat(res.food_category);
  }
  useEffect(() => {
    loadData();
  }, [])
  return (
    <div>
      <div><Navbar /></div>
      
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://source.unsplash.com/random/900x200/?burger" className="d-block w-100" alt="..." style={{filter:"brightness(25%)"}}/>
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/900x200/?curry" className="d-block w-100" alt="..." style={{filter:"brightness(25%)"}} />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/900x200/?pizza" className="d-block w-100" alt="..." style={{filter:"brightness(25%)"}}/>
                </div>
                <div className='carousel-caption' style={{ zIndex: "10" }}>
                <div className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" value={query} onChange={changeQuerry}/>
                    {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
      </div>

      <div className='container-md'>
        {
          (foodCat !== [])? foodCat.map((data)=>{
            return( <div key={data._id}>
            <div className="fs-3 mt-3">{data.CategoryName}</div>
            <hr/>
            <div className='row mb-3'>
              {(foodItem !== [])? foodItem.filter((item)=> item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(query.toLowerCase()) ).map(
                (catItem)=>{ return (
                  <div key={catItem._id} className='col-sm-6 col-md-4 col-lg-3'>
                    <FoodCard item={catItem} options={catItem.options[0]} />
                  </div>
                )}
                ):<div>No items present in this category</div>}
              </div>
            </div>)
          }):<div>No food category in database</div>
        }
        
        
      </div>
      <div><Footer /></div>
    </div>
  )
}

export default Home