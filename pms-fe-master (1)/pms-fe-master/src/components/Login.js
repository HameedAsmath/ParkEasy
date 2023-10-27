import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom"
import axios from "axios"
import toast  from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const onFinish = async(values) => {
    try {
      const res = await axios.post("https://pms-be.vercel.app/login",values)
      if(res.status===200){
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedin", true);
        localStorage.setItem("isLocalAdmin", res?.data?.user?.isAdmin);
        if(res?.data?.user?.isAdmin){
         navigate("/admin-home",{replace: true}) 
        }
        if(!res?.data?.user?.isAdmin){
          navigate("/home",{replace: true})
        }
       navigate(0)
       toast.success("LoggedIn success")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
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
      <Typography.Title className="text-center">Login</Typography.Title>
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
          Log in
        </Button>
        Or <Link to = "/register">register now!</Link>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;
