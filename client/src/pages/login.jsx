import React from "react";
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { showLoading, hideLoading } from "../redux/alertSlice";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('http://localhost:5000/api/user/login', values);
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.token); // Storing token
                navigate('/home'); // Redirecting to home after successful login
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
                <h1 className="card-title">Login</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="Password" type="password" />
                    </Form.Item>

                    <Button className="primary-button my-2 w-100" type="primary" htmlType="submit">
                        Login
                    </Button>

                    <Link to="/register" className="anchor">Click Here to Register</Link>
                </Form>
            </div>
        </div>
    );
}

export default Login;
