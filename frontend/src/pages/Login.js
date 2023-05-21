import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [details, setdetails] = useState({ email: "", password: ""})
    const handleReset = (e) =>{
    setdetails({...details, name: "", email:"", password:"",address:""})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: details.email, password: details.password})
        });
        const res = await response.json();
        console.log(res);
        
        if (!res.success) {
            alert("Enter valid details of your account");
        }
        else{
            localStorage.setItem("userEmail",details.email);
            localStorage.setItem("authToken",res.authToken);
            navigate("/")
        }
    }
    const onChange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }
  return (
    <>
            <div className='container'>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" autoComplete='on' className="form-control" id="exampleInputEmail1" name="email" value={details.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" autoComplete='current-password' className="form-control" id="exampleInputPassword1" name="password" value={details.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary me-3">Submit</button>
                    <button type="reset" className='btn btn-danger me-3'>Reset</button>
                </form>
                <hr />
                <Link className='btn btn-info' to='/signup'>Create account</Link>
            </div>
        </>
  )
}

export default Login