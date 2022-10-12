import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Alert } from 'antd';

import api from "../services/api";
import useAuth from "../hooks/useAuth";
import Signin from "./signIn";

const { Option } = Select;

export default function Account() {
    const { signIn, token } = useAuth();
    const [open, setOpen] = useState(false);
    const [companies, setCompanies] = useState<any[]>([]);
    const [formsData, setFormsData] = useState({
        username: '',
        email: "",
        password: "",
        confirmPassword: "",
        company: "",
    });

    useEffect(() => {
        console.log(token);
        const promise = api.getAllCompanies();
        promise.then((response) => {
            setCompanies(response.data);
        });
    }, []);

    async function handleSubmit(event : any) {
        event.preventDefault();

        if(!formsData?.email || !formsData?.password || !formsData?.username || !formsData?.confirmPassword || !formsData?.company) {
            <Alert message="All fields are required" type="error" showIcon />
            return;
        }

        if(formsData?.password !== formsData?.confirmPassword) {
            <Alert message="Passwords do not match" type="error" showIcon />
            return;
        }

        try {
            const { email, password, confirmPassword, username, company } = formsData;
            await api.signUp( email, password, confirmPassword, username, company )
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

    function handleSelectedItem(value: any) {
        setFormsData({ ...formsData, company: value });
    }

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
      };

    return (
        <>  
            {token ? null : <Signin />}
            <div className="signin-button">
                {token ? null : 
                <Button type="primary" style={{marginTop: "200px", width: "900px"}} onClick={showDrawer}>
                    Doesn't have an account? Sign up
                </Button>
                }
                <Drawer
                    title="Create a new account"
                    width={720}
                    onClose={onClose}
                    open={open}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSubmit} type="primary">
                        Submit
                        </Button>
                    </Space>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                        <Form.Item
                            name="username"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter user name' }]}
                            getValueFromEvent={handleInputChange}
                        >
                            <Input placeholder="Please enter user name" />
                        </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item
                            name={['email']} 
                            label="Email"
                            rules={[{ required: true, message: 'Please enter your email' }]}
                            getValueFromEvent={handleInputChange}
                        >
                            <Input placeholder="Please enter email" />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            getValueFromEvent={handleInputChange}
                        >
                            <Input.Password />
                        </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            getValueFromEvent={handleInputChange}
                        >
                            <Input.Password />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                        <Form.Item
                            name="company"
                            label="Company"
                            rules={[{ required: true, message: 'Please choose the approver' }]}
                        >
                            <Select placeholder="Please choose the company" onChange={(value) => handleSelectedItem(value)}>
                                {companies ? companies.map((company) => (
                                    <Option key={company.id} value={company.name}>{company.name}</Option>
                                )) : null}
                            </Select>
                        </Form.Item>
                        </Col>
                    </Row>
                    </Form>
                </Drawer>
            </div>
        </>
    );
}
