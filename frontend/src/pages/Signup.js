import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    const [details, setdetails] = useState({ name: "", email: "", password: "", address: "" })
    const handleReset = (e) =>{
        setdetails({...details, name: "", email:"", password:"",address:""})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: details.name, email: details.email, password: details.password, location: details.address })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid details of user");
        }
        else{ handleReset();alert('Account has been created.\nPlease login to your account');}
    }
    const onChange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className="mb-3">
                        <label htmlFor="uname" className="form-label">Name:</label>
                        <input type="text" autoComplete='username'  className="form-control" id="uname" name='name' value={details.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" autoComplete='on' className="form-control" id="exampleInputEmail1" name="email" value={details.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" autoComplete='current-password' className="form-control" id="exampleInputPassword1" name="password" value={details.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="addr" className="form-label">Address:</label>
                        <input type="text" className="form-control" id="addr" name='address' value={details.address} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary me-3">Submit</button>
                    <button type="reset" className='btn btn-danger me-3'>Reset</button>
                </form>
                <hr />
                <Link className='btn btn-info' to='/login'>Login </Link>
            </div>
        </>
    )
}

export default Signup