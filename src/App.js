import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login/Login';
import Cars from './pages/Cars/Cars';
import Category from './pages/Category/Category';
import Register from './pages/Register/Register';
import PrivateRoute from './utils/PrivateRoute/PrivateRoute';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const loading = useSelector((state) => state.authReducer.authLoading);

  return (
    <div>
      {loading ? (
        <div className='spinContainer'>
          <Spin />{' '}
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path='/' element={<Cars />} />
              <Route path='/category' element={<Category />} />
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
