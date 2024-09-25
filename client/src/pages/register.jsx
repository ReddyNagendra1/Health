import React from "react";
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom"

function Register() {
    return (
        <div className="authentication">
            <div className="authentication-form card p-2">
                <h1 className="card-title">Register</h1>
                <Form layout="vertical">
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="ConfirmPassword" />
                    </Form.Item>

                    <Button className="primary-button my-2">Register</Button>

                    <Link to="/login" className="anchor">Click Here to login</Link>
                </Form>
            </div>
        </div>
    )
}

export default Register