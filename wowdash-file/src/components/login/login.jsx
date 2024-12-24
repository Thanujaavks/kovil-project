import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className='body'>
            <div className="login-container d-flex justify-content-center align-items-center">
                <div className="login-card shadow-lg p-5">
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="username">
                                <i className="bi bi-person-fill"></i> Username / Email
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Enter your username or email"
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password">
                                <i className="bi bi-lock-fill"></i> Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3 mt-3" onClick={() => navigate('/dashboard')}>
                            LOG IN NOW
                        </button>
                    </form>
                    {/* <div className="social-login d-flex justify-content-around mt-3">
                        <span>log in via</span>
                        <a href="#!" className="text-secondary">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="#!" className="text-secondary">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#!" className="text-secondary">
                            <i className="bi bi-twitter"></i>
                        </a>
                    </div> */}
                </div>
            </div>
        </div>

    );
};

export default Login;