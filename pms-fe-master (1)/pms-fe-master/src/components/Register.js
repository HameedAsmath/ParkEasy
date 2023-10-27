import React from 'react'
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';
import toast from "react-hot-toast"

const Register = () => {
  const navigate = useNavigate()
    const onFinish = async(values) => {
        const res = await axios.post("/register",values)
        if(res.status===201){
          navigate("/login",{replace: true})
          toast.success("User Registered Successfully")
        }
      };
  return (
    <div className="form-container">
    <Form
    name="normal_login"
    className="login-form"
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
  >
    <Typography.Title className="text-center">Register</Typography.Title>
    <Form.Item
      name="firstname"
      rules={[
        {
          required: true,
          message: 'Please input your Firstname!',
        },
      ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Firstname" />
    </Form.Item>
    <Form.Item
      name="lastname"
      rules={[
        {
          required: true,
          message: 'Please input your Lastname!',
        },
      ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Lastname" />
    </Form.Item>
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your Email!',
        },
      ]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },
        {
          min: 6,
          message: 'Password must be atleast 6 characters',
        },
      ]}
    >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
      />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Register
      </Button>
      Or <Link to = "/login">login</Link>
    </Form.Item>
  </Form>
  </div>
  )
}

export default Register