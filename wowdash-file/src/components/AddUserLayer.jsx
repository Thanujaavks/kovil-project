import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../hook/axiosInstance'; // Assuming axiosInstance is set up to make requests

const AddUserLayer = () => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNo: '',
    });

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form data change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit form to add customer
    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post('/customers/addCustomer', formData)
            .then((response) => {
                console.log('Customer added successfully:', response.data);
                navigate('/users-list'); // Redirect to users list after success
            })
            .catch((error) => {
                console.error('Error adding customer:', error);
            });
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-body p-24">
                <div className="d-flex align-items-center justify-content-end gap-3 mb-3 mr-10 px-5">
                    <Link
                        to="/users-list"
                        className="btn btn-primary text-md btn-sm px-20 py-12 radius-8 d-flex align-items-center gap-2"
                    >
                        Back
                    </Link>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                        <div className="card border">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="name"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Full Name <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter Full Name"
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="email"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Email <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control radius-8"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label
                                            htmlFor="number"
                                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                                        >
                                            Phone No
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control radius-8"
                                            id="number"
                                            name="contactNo"
                                            value={formData.contactNo}
                                            onChange={handleInputChange}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <button
                                            type="button"
                                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserLayer;
