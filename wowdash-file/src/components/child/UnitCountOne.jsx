import React, { useEffect, useState } from 'react'
import axiosInstance from '../../hook/axiosInstance';
import { Icon } from '@iconify/react';
const UnitCountOne = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [balance, setBalance] = useState(null);  // State to hold balance data


    useEffect(() => {
        axiosInstance.get(`/customers/getCount`)
            .then((res) => {
                console.log(res.data);
                setTotalUsers(res.data.customerCount);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // Call the backend API that fetches Twilio balance
        axiosInstance.get(`/sms/getAccountBalance`)  // Make sure this route is defined on your backend
            .then((res) => {
                console.log(res.data);  // Debug: Check the response
                // Assuming the API response is { balance, currency }
                setBalance({
                    amount: res.data.balance,
                    currency: res.data.currency
                });  // Store balance and currency in state
            })
            .catch((err) => {
                console.log(err);  // Log any errors that occur
            });
    }, []);  // Empty dependency array to run only once on mount
    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-1 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1 fs-4">Total Users</p>
                                <h6 className="mb-0 fs-3">{totalUsers.toLocaleString()}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="gridicons:multiple-users"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        {/* <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> +5000
                            </span>
                            Last 30 days users
                        </p> */}
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-2 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1 fs-4">
                                    Twilio Balance
                                </p>
                                <h6 className="mb-0 fs-3">
                                    {balance !== null ? `${balance.amount.toLocaleString()} ${balance.currency}` : 'Loading...'}
                                </h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fa-solid:award"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        {/* <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                                <Icon icon="bxs:down-arrow" className="text-xs" /> -800
                            </span>
                            Last 30 days subscription
                        </p> */}
                    </div>
                </div>
                {/* card end */}
            </div>
            {/* <div className="col">
                <div className="card shadow-none border bg-gradient-start-3 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Total Free Users
                                </p>
                                <h6 className="mb-0">5,000</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fluent:people-20-filled"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> +200
                            </span>
                            Last 30 days users
                        </p>
                    </div>
                </div>
            </div> */}
            {/* <div className="col">
                <div className="card shadow-none border bg-gradient-start-4 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Total Income</p>
                                <h6 className="mb-0">$42,000</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="solar:wallet-bold"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> +$20,000
                            </span>
                            Last 30 days income
                        </p>
                    </div>
                </div>
                
            </div> */}
            {/* <div className="col">
                <div className="card shadow-none border bg-gradient-start-5 h-100">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Total Expense</p>
                                <h6 className="mb-0">$30,000</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fa6-solid:file-invoice-dollar"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> +$5,000
                            </span>
                            Last 30 days expense
                        </p>
                    </div>
                </div>
               
            </div> */}
        </div>

    )
}

export default UnitCountOne