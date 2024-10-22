import React from "react";
import { Col, Form, Input, Row, TimePicker } from 'antd'
import Layout from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from '../redux/alertSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';

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
            <Form layout="vertical">
                <h2 className="card-title mt-3">Personal Information</h2>
                <Row gutter={20}>
                    <Col span={8} lg={8}>
                        <Form.Item label='First Name' name='firstname' rules={[{ required: true }]}>
                            <Input placeholder='First Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8} lg={8}>
                        <Form.Item label='Last Name' name='lastname' rules={[{ required: true }]}>
                            <Input placeholder='Last Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8} lg={8}>
                        <Form.Item label='Phone Number' name='phonenumber' rules={[{ required: true }]}>
                            <Input placeholder='Phone Number' />
                        </Form.Item>
                    </Col>
                    <Col span={8} lg={8}>
                        <Form.Item label='Address' name='address' rules={[{ required: true }]}>
                            <Input placeholder='Address' />
                        </Form.Item>
                    </Col>

                </Row>
                <hr />
                <h2 className="card-title mt-3">Professional Information</h2>
                <Row gutter={20}>
                    <Col span={8} lg={8}>
                        <Form.Item label='Specilization' name='specilization' rules={[{ required: true }]}>
                            <Input placeholder='Specilization' />
                        </Form.Item>
                    </Col>
                    <Col span={8} lg={8}>
                        <Form.Item label='Experience' name='experience' rules={[{ required: true }]}>
                            <Input placeholder='Experience' type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8} lg={8}>
                        <Form.Item label='Availability' name='availabilitys' rules={[{ required: true }]}>
                            <TimePicker.RangePicker />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end">
                    <Button className='primary-button' htmlType='submit'>
                        SUBMIT
                    </Button>
                </div>
            </Form>
        </Layout >
    )
}

export default ApplyDoctor;