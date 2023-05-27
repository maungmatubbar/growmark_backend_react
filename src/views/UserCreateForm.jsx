import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axiosClient from '../axios-client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const schema = yup.object({
    name: yup.string().required("Your full Name is required"),
    email: yup.string().email().required("Your Email is required"),
    password: yup.string().min(8).required("Your Password is required"),
    password_confirmation: yup.string().oneOf([yup.ref('password'),'Confirm password is not same password']).required("Your Confirm is required")
  })
  
const UserCreateForm = () => {
    const [message, setMessage] = useState(null);
    const [_errors, _setErrors] = useState({});
    const { register, 
        handleSubmit,
        reset,
        formState: { errors } } = useForm({
            resolver: yupResolver(schema)
        });
    const onSubmit = (data) => {
        axiosClient.post('/user/create',data).then(({data})=>{
            if(data.status === true){
                setMessage(data.message);
                reset()
            }
            
        }).catch(error=>{
            if(error.response.status === 422){
                console.log(error.response.data.errors)
                _setErrors(error.response.data.errors)
            }
        })
    }
    useEffect(()=>{
       setTimeout(()=>{
        setMessage(null);
       },5000);
       setTimeout(()=>{
        _setErrors(null);
       },5000);
       
    },[message,_errors])
    return (
        <>
            <div className="pagetitle">
                <h1>User Create</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to="/users">Users</Link></li>
                        <li className="breadcrumb-item active">User Create</li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-8 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-uppercase">User Create</h5>
                        {message && <div className='alert alert-success'>
                                <p>{message}</p>
                            </div>
                            }
                        {_errors && 
                                <span>
                                    {Object.keys(_errors).map(key=>(
                                        <div key={key} className="alert alert-danger alert-dismissible fade show" role="alert">
                                            <p >{_errors[key][0]}</p>
                                        </div>
                                    ))}
                                </span>
                            }
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row mb-3">
                                <label htmlFor="userName" className="col-sm-3 col-form-label">Your Name</label>
                                <div className="col-sm-9">
                                    <input type="text" {...register("name")}  className="form-control" id="userName" />
                                    <small className="text-danger">
                                        {errors?.name && errors.name.message}
                                    </small>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail"  className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                    <input type="email" {...register("email")} className="form-control" id="inputEmail" />
                                    <small className="text-danger">
                                        {errors?.email && errors.email.message}
                                    </small>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                    <input type="password" {...register("password")}  className="form-control" id="inputPassword" />
                                    <small className="text-danger">
                                        {errors?.password && errors.password.message}
                                    </small>
                                </div>
                                
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputConfirmPassword" className="col-sm-3 col-form-label">Confirm Password</label>
                                <div className="col-sm-9">
                                    <input type="password" {...register("password_confirmation")} className="form-control" id="inputConfirmPassword" />
                                    <small className="text-danger">
                                        {errors?.password_confirmation && errors.password_confirmation.message}
                                    </small>
                                </div>
                            </div>

                            <div className='offset-3'>
                                <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </>
    )
}

export default UserCreateForm