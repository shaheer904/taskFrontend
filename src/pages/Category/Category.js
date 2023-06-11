import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import CategoryForm from './CategoryForm';
import { RequestHeaders, del, get } from '../../utils/RestService';
import {
  openErrorNotification,
  openNotification,
} from '../../utils/Notifications';
const Category = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [edit, setEdit] = useState(false);

  //Delete Category
  const deleteCategory = (id) => {
    del(`/categories/${id}`, RequestHeaders())
      .then((res) => {
        openNotification('Category deleted successfully');
        getData();
      })
      .catch((err) => {
        console.log(err);
        openErrorNotification(err);
      });
  };
  //columns for table
  const columns = [
    { title: 'title', key: 'title', render: (_, data) => <p>{data?.title}</p> },

    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, data) => (
        <div className='actionContainer'>
          <Button
            type='primary'
            onClick={() => {
              setSelectedCategory(data);
              setEdit(true);
              setShowModal(true);
            }}
          >
            Edit
          </Button>

          <Button
            type='default'
            onClick={() => {
              deleteCategory(data._id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  //get category list
  const getData = () => {
    get('/categories', RequestHeaders()).then((res) => {
      setData(res.result);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className='con1'>
        <div>
          <h2>Category</h2>
        </div>
        <div>
          <Button
            type='primary'
            onClick={() => {
              setShowModal(true);
              setEdit(false);
            }}
          >
            Add Category
          </Button>
        </div>
      </div>
      <div>
        <Modal
          open={showModal}
          footer={null}
          onCancel={() => {
            setShowModal(false);
            setSelectedCategory();
          }}
          title={edit ? 'Edit Category' : 'Add Category'}
        >
          <CategoryForm
            setShowModal={setShowModal}
            edit={edit}
            selectedCategory={selectedCategory}
            getData={getData}
          />
        </Modal>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Category;
