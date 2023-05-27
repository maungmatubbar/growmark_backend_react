
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
const Login = () => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);
    const {setUser,setToken} = useStateContext();
    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post('/login',credentials)
        .then(({data})=>{
            const user = {
                user_name: data.data.user_name,
                user_email: data.data.user_email
            }
            setToken(data.data.token);
            setUser(user);

        })
        .catch(error=>{
            if(error.code === 'ERR_NETWORK'){
                console.log("Network Problem")
                return false
            }
            const response = error.response.data.errors;
            if(response && error.response.status === 422){
                setErrors(response)
                setTimeout(()=>{
                    setErrors(null)
                },5000);
            }
            if(error.response.data.status === false){
                setMessage(error.response.data.message);
                setTimeout(()=>{
                    setMessage(null)
                },5000);
               
            }
        });
    }
  return (
    <>
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                                <a href="index.html" className="logo d-flex align-items-center w-auto">
                                <img src="assets/img/logo.png" alt="" />
                                <span className="d-none d-lg-block">NiceAdmin</span>
                                </a>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                        {errors && 
                                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                {Object.keys(errors).map(key=>(
                                                    <p key={key}>{errors[key][0]}</p>
                                                ))}
                                            </div>
                                        }
                                        {message && 
                                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                <p>{message}</p>
                                            </div>
                                        }
                                    </div>
                                    <form onSubmit={onSubmit} className="row g-3 needs-validation" noValidate>
                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" onChange={onChange} name="email" className="form-control" id="email" />
                                            <div className="invalid-feedback">Please enter your username.</div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="yourPassword" className="form-label">Password</label>
                                            <input type="password" onChange={onChange} name="password" className="form-control" id="yourPassword" />
                                            <div className="invalid-feedback">Please enter your password!</div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100" type="submit">Login</button>
                                        </div>
                                        <div className="col-12">
                                            <p className="small mb-0">Don't have account? <Link to="/signup">Create an account</Link></p>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </>
  )
}

export default Login