import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axiosClient from '../axios-client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useStateContext } from '../context/ContextProvider';
const schema = yup.object({
    name: yup.string().required("Your full Name is required"),
    email: yup.string().email().required("Your Email is required"),
});
  
const UserEditForm = () => {
    const navigate = useNavigate();
    const {setNotification} = useStateContext();
    const {id} = useParams();
    const [_errors, _setErrors] = useState(null)
    const { register, handleSubmit,setValue, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
        
    });
    const onSubmit = (data) => {
        data.id = id;
        console.log(data)
        axiosClient.post('/user/update',data)
        .then(()=>{
            setNotification("User Updated Successfully!!");
           navigate('/users');
        })
        .catch(error=> {
            if(error.response && error.response.status === 422){
               _setErrors(error.response.data.errors)
               console.log(error.response.data.errors)
            }
            console.log(_errors);
        })

    }
    const getUser = () => {
         axiosClient.get('/user/edit/'+id)
        .then(({data})=> {
            const response = data.data;
            setValue('name', response.user_name, { shouldValidate: true })
            setValue('email', response.user_email, { shouldValidate: true })
            
        })
    }
    useEffect(() => {
    
        setTimeout(()=>{
            _setErrors(null);
           },5000);
        return () => {
            getUser()
        }
        
       
         // eslint-disable-next-line
    }, [])
  return (
    <>
        <div className="pagetitle">
                <h1>User Create</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to="/users">Users</Link></li>
                        <li className="breadcrumb-item active">User Edit</li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-8 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-uppercase">User Edit</h5>
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
                                    <input type="text" {...register("name")} className="form-control" id="userName" />
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
                            <div className='offset-3'>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
    </>
  )
}

export default UserEditForm