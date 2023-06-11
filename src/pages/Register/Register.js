import { Form, Input, Spin, Button } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import '../Login/login.css';
import { register } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';
import { openNotification } from '../../utils/Notifications';

const Register = () => {
  const auth = useSelector((state) => state.authReducer.isAuthentication);
  const loading = useSelector((state) => state.authReducer.authLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  useEffect(() => {
    if (auth === true) {
      navigate('/');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    const data = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    };
    dispatch(register(data)).then((res) => {
      openNotification(
        'Registraion Successful. Please check your email for login credentials'
      );
      form.resetFields();
      navigate('/login');
    });
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
          <h1>Registration Form</h1>
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
              label='First Name'
              name='firstName'
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Last Name'
              name='lastName'
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>

          <p>
            Have an account? <Link to='/login'>Login</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
