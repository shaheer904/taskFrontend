import React, { useEffect, useState } from 'react';
import { RequestHeaders, patch, post } from '../../utils/RestService';
import { Input, Form, Button, Spin } from 'antd';
import {
  openErrorNotification,
  openNotification,
} from '../../utils/Notifications';

const CategoryForm = ({ edit, selectedCategory, setShowModal, getData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [edit, selectedCategory, form]);

  const onSubmit = (data) => {
    setLoading(true);
    post('/categories', data, RequestHeaders())
      .then((res) => {
        openNotification('Category added successfully');
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

    patch(`/categories/${selectedCategory._id}`, data, RequestHeaders())
      .then((res) => {
        openNotification('Category updated successfully');
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
      title: values.title,
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
            title: edit ? selectedCategory.title : '',
          }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout='horizontal'
        >
          <Form.Item name='title' label='Category Title'>
            <Input />
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

export default CategoryForm;
