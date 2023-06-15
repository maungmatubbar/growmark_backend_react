import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { storeService } from '../components/store/serviceSlice';
import { useState } from 'react';

const schema = yup.object({
    title: yup.string().required("The title is required"),
    description: yup.string().required("The description is required"),
    icon: yup.mixed().test('required',"The icon is required",value=>{
        return value && value.length;
    })
  })

const ServiceCreateForm = () => {
    const [imageData, setImageData] = useState("");
    const dispatch = useDispatch();
    const handleChange = (file) => {
        setImageData(file[0]);
    }
    
    const { register,reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        data['icon'] = imageData;
        dispatch(storeService(data))
        reset();
        
    }
    return (
        <>
            <div className="pagetitle">
                <h1>User Create</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to="/services">Services</Link></li>
                        <li className="breadcrumb-item active">Service Create</li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-8 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-uppercase">Service Create</h5>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row mb-3">
                                <label htmlFor="userName" className="col-sm-3 col-form-label">Title</label>
                                <div className="col-sm-9">
                                    <input type="text" {...register('title')} className='form-control' />
                                    <small className="text-danger">
                                        {errors?.title && errors.title.message}
                                    </small>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Description</label>
                                <div className="col-sm-9">
                                    <textarea name="description" id="" {...register('description')} cols="30" rows="5" className='form-control'></textarea>
                                    <small className="text-danger">
                                        {errors?.description && errors.description.message}
                                    </small>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Image</label>
                                <div className="col-sm-9">
                                    <input type="file" {...register('icon')} className='form-control' onChange={(e)=>handleChange(e.target.files)} />
                                    <small className="text-danger">
                                        {errors?.icon && errors.icon.message}
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

export default ServiceCreateForm