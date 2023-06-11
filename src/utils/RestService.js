import axios from 'axios';

let BASE_URL = process.env.REACT_APP_DEVELOPMENT_API_URL;

export const RequestHeaders = () => {
  let token = localStorage.getItem('token');
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return header;
};

const token = localStorage.getItem('token');

function handleError(error, reject) {
  let err = '';

  if (error && error.response && error.response.data)
    err = error.response.data.msg || error.response.data;
  else err = 'please check internet connection';

  err = err || 'please try again later';

  reject(err);
}

const get = (url, options = {}, auth) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(`${BASE_URL}${url}`, options)
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error) => {
        handleError(error, reject);
      });
  });
};

const post = (url, payload, options = {}) => {
  return new Promise(async (resolve, reject) => {
    // console.log(payload, options);

    axios
      .post(`${BASE_URL}${url}`, payload, options)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        handleError(error, reject);
      });
  });
};

const patch = (url, payload, options = {}) => {
  return new Promise(async (resolve, reject) => {
    axios
      .patch(`${BASE_URL}${url}`, payload, options)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        handleError(error, reject);
      });
  });
};

const put = (url, payload, options = {}) => {
  return new Promise(async (resolve, reject) => {
    // console.log(payload, options);

    axios
      .put(`${BASE_URL}${url}`, payload, options)
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error) => {
        handleError(error, reject);
      });
  });
};

const del = (url, options = {}, auth) => {
  return new Promise(async (resolve, reject) => {
    axios
      .delete(`${BASE_URL}${url}`, options)
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error) => {
        handleError(error, reject);
      });
  });
};

const deleteService = (url, payload) => {
  var config = {
    method: 'delete',
    url: `${BASE_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  };

  return new Promise(async (resolve, reject) => {
    axios(config)
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject();
        }
      })
      .catch((error) => {
        handleError(error, reject);
      });
  });
};

export { get, post, put, patch, deleteService, del };
