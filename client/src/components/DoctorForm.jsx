import React from "react";
import { Button, Col, Form, Row, TimePicker, Input } from "antd";
import moment from "moment";

function DoctorForm({ onFinish, initialValues }) {
    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                ...initialValues,
                ...(initialValues && {
                    Availability: [
                        moment(initialValues?.Availability[0], "HH:mm"),
                        moment(initialValues?.Availability[1], "HH:mm"),
                    ],
                }),
            }}
        >
            <h2 className="card-title mt-3">Personal Information</h2>
            <Row gutter={20}>
                <Col span={8} lg={8}>
                    <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                        <Input placeholder="First Name" />
                    </Form.Item>
                </Col>
                <Col span={8} lg={8}>
                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                        <Input placeholder="Last Name" />
                    </Form.Item>
                </Col>
                <Col span={8} lg={8}>
                    <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
                        <Input placeholder="Phone Number" />
                    </Form.Item>
                </Col>
                <Col span={8} lg={8}>
                    <Form.Item label="Address" name="Address" rules={[{ required: true }]}>
                        <Input placeholder="Address" />
                    </Form.Item>
                </Col>
            </Row>
            <hr />
            <h2 className="card-title mt-3">Professional Information</h2>
            <Row gutter={20}>
                <Col span={8} lg={8}>
                    <Form.Item label="Specialization" name="Specialization" rules={[{ required: true }]}>
                        <Input placeholder="Specialization" />
                    </Form.Item>
                </Col>
                <Col span={8} lg={8}>
                    <Form.Item label="Experience" name="Experience" rules={[{ required: true }]}>
                        <Input placeholder="Experience" type="number" />
                    </Form.Item>
                </Col>
                <Col span={8} lg={8}>
                    <Form.Item label="Availability" name="Availability" rules={[{ required: true }]}>
                        <TimePicker.RangePicker format="HH:mm" use12Hours={false} />
                    </Form.Item>
                </Col>
            </Row>

            <div className="d-flex justify-content-end">
                <Button className="primary-button" htmlType="submit">
                    SUBMIT
                </Button>
            </div>
        </Form>
    );
}

export default DoctorForm;
