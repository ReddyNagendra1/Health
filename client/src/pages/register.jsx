import React from "react";
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import axios from 'axios';
import toast from 'react-hot-toast';
import { showLoading, hideLoading } from "../redux/alertSlice";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('http://localhost:5000/api/user/register', values);
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                toast('Redirecting to login page');
                navigate('/login'); // Redirecting to login
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="authentication">
            <div className="authentication-form card p-2">
                <h1 className="card-title">Register</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="Password" type="password" />
                    </Form.Item>

                    <Button className="primary-button my-2 w-100" type="primary" htmlType="submit">
                        Register
                    </Button>

                    <Link to="/login" className="anchor">Click Here to login</Link>
                </Form>
            </div>
        </div>
    );
}

export default Register;
