import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
