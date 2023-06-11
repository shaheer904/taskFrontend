import { Form, Input, Spin, Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './login.css';
import { login } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';

const Login = () => {
  const auth = useSelector((state) => state.authReducer.isAuthentication);
  const loading = useSelector((state) => state.authReducer.authLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth === true) {
      navigate('/');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    const data = { email: values.email, password: values.password };
    dispatch(login(data));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const authError = useSelector((state) => state.authReducer.error);

  return (
    <div>
      {loading ? (
        <div className='spinContainer'>
          <Spin />
        </div>
      ) : (
        <div className='formContainer'>
          <h1>Login Form</h1>
          <p className='errorMessage'>{authError}</p>

          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>

          <p>
            Create Account? <Link to='/register'>Register</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
