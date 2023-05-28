import React from 'react'
import { Link } from 'react-router-dom'
const ServiceCreateForm = () => {
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
                        <form>
                            <div className="row mb-3">
                                <label htmlFor="userName" className="col-sm-3 col-form-label">Title</label>
                                <div className="col-sm-9">
                                    <input type="text" className='form-control' />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail" className="col-sm-3 col-form-label">Description</label>
                                <div className="col-sm-9">
                                    <textarea name="description" id="" cols="30" rows="5" className='form-control'></textarea>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Image</label>
                                <div className="col-sm-9">
                                    <input type="file" className='form-control' />
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