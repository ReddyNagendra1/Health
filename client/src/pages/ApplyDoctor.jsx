import React from "react";
import Layout from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from '../redux/alertSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import DoctorForm from "../components/DoctorForm";

function ApplyDoctor() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('http://localhost:5000/api/user/apply-doctor-account', { ...values, userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/home'); // Redirecting to home
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout>
            <h1 className="page-title">Apply Doctor</h1>
            <hr />
            <DoctorForm onFinish={onFinish} />
        </Layout >
    )
}

export default ApplyDoctor;