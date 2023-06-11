import { notification } from 'antd';

export const openNotification = (text) => {
  notification.open({
    message: text,
  });
};

export const openErrorNotification = (text) => {
  notification.error({
    message: text,
  });
};
