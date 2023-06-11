import React, { useEffect, useState } from 'react';
import { RequestHeaders, get, patch, post } from '../../utils/RestService';
import { Select, Input, Form, Button, Spin } from 'antd';
import {
  openErrorNotification,
  openNotification,
} from '../../utils/Notifications';

const CarForm = ({ edit, selectedCar, setShowModal, getData }) => {
  const [cateories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    get('/categories', RequestHeaders())
      .then((res) => {
        setCategories(res.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [edit, selectedCar, form]);

  const onSubmit = (data) => {
    setLoading(true);
    post('/cars', data, RequestHeaders())
      .then((res) => {
        openNotification('Car added successfully');
        getData();
        setShowModal(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        openErrorNotification(err.message);
      });
  };

  const onEdit = (data) => {
    setLoading(true);

    patch(`/cars/${selectedCar._id}`, data, RequestHeaders())
      .then((res) => {
        openNotification('Car updated successfully');
        getData();
        setShowModal(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        openErrorNotification(err.message);
      });
  };
  const onFinish = (values) => {
    const data = {
      color: values.color,
      category: values.category,
      make: values.make,
      model: values.model,
    };
    if (edit === true) {
      onEdit(data);
    } else {
      onSubmit(data);
    }
  };

  return (
    <div>
      {loading ? (
        <div className='spinContainer'>
          <Spin />
        </div>
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            color: edit ? selectedCar.color : '',
            category: edit ? selectedCar.category._id : '',
            make: edit ? selectedCar.make : '',
            model: edit ? selectedCar.model : '',
          }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout='horizontal'
        >
          <Form.Item name='color' label='Car Color'>
            <Input />
          </Form.Item>
          <Form.Item name='model' label='Car Model'>
            <Input />
          </Form.Item>
          <Form.Item name='make' label='Car Model'>
            <Input />
          </Form.Item>
          <Form.Item name='category' label='Car Category'>
            <Select placeholder='Select Category'>
              {cateories?.map?.((el, ind) => {
                return (
                  <Select.Option value={el._id} key={ind}>
                    {el.title}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button htmlType='submit' type='primary'>
              {edit ? 'Update' : 'Save'}{' '}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default CarForm;
