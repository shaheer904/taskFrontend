import React from 'react';
import { Layout, Menu } from 'antd';
import './appLayout.css';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
const { Content, Header, Sider } = Layout;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const user = useSelector((state) => state.authReducer.user);
  console.log(path);
  return (
    <div>
      <Layout>
        <Sider theme={'light'} className='siderContainer'>
          <Menu selectedKeys={[path]}>
            <Menu.Item
              key='cars'
              onClick={() => {
                navigate('/');
              }}
            >
              Cars.com
            </Menu.Item>
            <div className='menu1'>
              <Menu.Item
                key='/'
                className={path === '/' ? 'active' : ''}
                onClick={() => {
                  navigate('/');
                }}
              >
                {' '}
                Cars
              </Menu.Item>
              <Menu.Item
                key='/category'
                className={path === '/category' ? 'active' : ''}
                onClick={() => {
                  navigate('/category');
                }}
              >
                Category
              </Menu.Item>
              <Menu.Item
                key='/login'
                className={path === '/login' ? 'active' : ''}
                onClick={() => {
                  dispatch({ type: 'LOGOUT' });

                  navigate('/login');
                }}
              >
                Logout
              </Menu.Item>
            </div>
          </Menu>
        </Sider>
        <Layout>
          <Header className='header'>
            {`Hello ${user.firstName} ${user.lastName}`}
          </Header>
          <Content className='contentContainer'>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
