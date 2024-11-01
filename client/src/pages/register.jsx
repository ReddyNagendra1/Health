import React from "react";
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
// import toast from 'react-hot-toast';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/user/register', values)
            dispatch(hideLoading());
            if (res.data.success) {
                message.success('Register Successfully');
                navigate('/login')
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error('Something went wrong')
        }
    }
    return (
        <div className="authentication">
            <div className="authentication-form card p-2">
                <h1 className="card-title">Register</h1>
                <Form layout="vertical" onFinish={onFinishHandler}>
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
    )
}

export default Register;