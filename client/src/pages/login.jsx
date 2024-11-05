import React from "react";
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
import { hideLoading, showLoading } from "../redux/alertSlice";
import api from "../config/api";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await api.post('/api/user/login', values);
            dispatch(hideLoading());
            if (res.data.success) {
                localStorage.setItem('token', res.data.data);  // Store token directly since backend sends token as data
                message.success('Login successful');
                navigate('/');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error('Login error:', error);
            message.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="authentication">
            <div className="authentication-form card p-2">
                <h1 className="card-title">Login</h1>
                <Form layout="vertical" onFinish={onFinishHandler}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" type="email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <Button
                        className="primary-button my-2 w-100"
                        type="primary"
                        htmlType="submit"
                    >
                        Login
                    </Button>

                    <Link to="/register" className="anchor">
                        Click Here to Register
                    </Link>
                </Form>
            </div>
        </div>
    );
};

export default Login;



// import toast from 'react-hot-toast';
// import { showLoading, hideLoading } from "../redux/alertSlice";