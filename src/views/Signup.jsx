import React, { useRef } from 'react'
import {Link} from 'react-router-dom'
const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value, 
            password_confirm: passwordConfirmationRef.current.valu
        }
        console.log(payload)
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
                                                <h5 className="card-title text-center pb-0 fs-4">Register to Your Account</h5>
                                            </div>
                                            <form onSubmit={()=>onSubmit} className="row g-3 needs-validation" noValidate>
                                                <div className="col-12">
                                                    <label htmlFor="name" className="form-label">User Name</label>
                                                    <input type="name" ref={nameRef} name="userName" className="form-control" id="name" />
                                                    <div className="invalid-feedback">Please enter your username.</div>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="email" ref={emailRef} name="email" className="form-control" id="email" />
                                                    <div className="invalid-feedback">Please enter your username.</div>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Password</label>
                                                    <input type="password" ref={passwordRef} name="password" className="form-control" id="yourPassword" />
                                                    <div className="invalid-feedback">Please enter your password!</div>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="confirmation_password" className="form-label">Confirm Password</label>
                                                    <input type="confirmation_password" ref={passwordConfirmationRef} name="confirmation_password" className="form-control" id="confirmation_password" />
                                                    <div className="invalid-feedback">Please enter your password!</div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Signup</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Already have account? <Link to="/login">Login</Link></p>
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

export default Signup