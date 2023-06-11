import { RequestHeaders, get, post } from '../../utils/RestService';
import { AUTH_ERROR, CURRENT_USER, LOGIN } from '../types';

//current User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await get('/auth/users/current-user', RequestHeaders());
    dispatch({ type: CURRENT_USER, payload: res.result });
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR });
  }
};

//login User
export const login = (data) => async (dispatch) => {
  try {
    const res = await post('/auth/users/login', data, RequestHeaders());
    dispatch({ type: LOGIN, payload: res });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR, payload: err.message });
  }
};

//Resgiter User
export const register = (data) => async (dispatch) => {
  try {
    const res = await post('/auth/users/signup', data, RequestHeaders());
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR, payload: err.message });
  }
};
