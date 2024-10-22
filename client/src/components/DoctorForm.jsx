import React from "react";
import { Button, Col, Form, Row, TimePicker, Input } from "antd";
import moment from "moment";

function DoctorForm({ onFinish, initivalValues }) {


    return (
        <Form layout="vertical"
            onFinish={onFinish}
            initialValues={{
                ...initivalValues,
                ...(initivalValues && {
                    Availability: [
                        moment(initivalValues?.Availability[0], "HH:mm"),
                        moment(initivalValues?.Availability[1], "HH:mm"),
                    ],
                }),
            }}>
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
                    <Form.Item label='Availability' name='availability' rules={[{ required: true }]}>
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
    )
}

export default DoctorForm;