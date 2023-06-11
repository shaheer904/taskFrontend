import { Outlet, Navigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  // let auth = {'token':true}
  const auth = useSelector((state) => state.authReducer.isAuthentication);

  return auth ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoutes;
