import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import CarForm from './CarForm';
import { RequestHeaders, del, get } from '../../utils/RestService';
import {
  openErrorNotification,
  openNotification,
} from '../../utils/Notifications';
const Cars = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
    color: '',
    make: '',
    model: '',
    category: '',
  });
  const [edit, setEdit] = useState(false);

  //Delete Car
  const deleteCar = (id) => {
    del(`/cars/${id}`, RequestHeaders())
      .then((res) => {
        openNotification('Car deleted successfully');
        getData();
      })
      .catch((err) => {
        console.log(err);
        openErrorNotification(err);
      });
  };
  //columns for table
  const columns = [
    { title: 'Make', key: 'make', render: (_, data) => <p>{data?.make}</p> },
    {
      title: 'Model',
      key: 'model',
      render: (_, data) => <p>{data?.model}</p>,
    },
    {
      title: 'color',
      key: 'color',
      render: (_, data) => <p>{data?.color}</p>,
    },
    {
      title: 'Category',
      key: 'category',
      render: (_, data) => <p>{data?.category?.title}</p>,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, data) => (
        <div className='actionContainer'>
          <Button
            type='primary'
            onClick={() => {
              setSelectedCar(data);
              setEdit(true);
              setShowModal(true);
            }}
          >
            Edit
          </Button>

          <Button
            type='default'
            onClick={() => {
              deleteCar(data._id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  //get cars list
  const getData = () => {
    get('/cars', RequestHeaders()).then((res) => {
      setData(res.result);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  const closeModal = () => {
    setShowModal(false);
    setSelectedCar({ color: '', make: '', model: '', category: '' });
  };

  return (
    <div>
      <div className='con1'>
        <div>
          <h2>Cars</h2>
        </div>
        <div>
          <Button
            type='primary'
            onClick={() => {
              setShowModal(true);
              setEdit(false);
            }}
          >
            Add Car
          </Button>
        </div>
      </div>
      <div>
        <Modal
          open={showModal}
          footer={null}
          onCancel={closeModal}
          title={edit ? 'Edit Car' : 'Add Car'}
        >
          <CarForm
            setShowModal={setShowModal}
            edit={edit}
            selectedCar={selectedCar}
            getData={getData}
          />
        </Modal>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Cars;
