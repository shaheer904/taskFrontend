import { LOGIN, LOGOUT, CURRENT_USER, AUTH_ERROR } from '../types';

const initialState = {
  user: {},
  isAuthentication: false,
  authLoading: true,
  error: {},
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuthentication: true,
        user: payload,
        authLoading: false,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: {},
        isAuthentication: false,
        authLoading: false,
      };
    case CURRENT_USER:
      return {
        ...state,
        user: payload,
        isAuthentication: true,
        authLoading: false,
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');

      return {
        ...state,
        user: {},
        error: payload,
        isAuthentication: false,
        authLoading: false,
      };
    default:
      return state;
  }
}
