import { Link as ReactLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Alert, Form, Button, Input } from 'antd';

import api from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Signin() {
    const { signIn, token } = useAuth();
    const [formsData, setFormsData] = useState({
        email: "",
        password: "",
    });

    async function handleSubmit(event : any) {
        event.preventDefault();

        if(!formsData?.email || !formsData?.password) {
            <Alert message="All fields are required" type="error" showIcon />
            return;
        }

        try {
            const { email, password } = formsData;
            const {data: { token }} = await api.signIn( email, password )
            signIn(token);
        } catch (error: any) {
            if(error.response) {
                <Alert message={error.response.data.message} type="error" showIcon />
                return;
            }
            console.log(error);
            <Alert message="Something went wrong, try again in a few seconds" type="error" showIcon />
        }

    }

    function handleInputChange(event: any) {
        setFormsData({ ...formsData, [event.target.id]: event.target.value });
    }

    return (
        <Form 
            onFinish={handleSubmit}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <Form.Item 
                name={['email']} 
                label="Email" 
                rules={[{ type: 'email', message: 'Please input your email!' }]}
                getValueFromEvent={handleInputChange}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                getValueFromEvent={handleInputChange}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={handleSubmit} size="large"style={{width: "300px"}}>
                Sign In
                </Button>
            </Form.Item>    
        </Form>
    );
}