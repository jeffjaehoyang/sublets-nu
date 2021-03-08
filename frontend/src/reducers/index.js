import { combineReducers } from 'redux';
import auth from './auth';
import modal from './modal';
import housing from './housing';

export default combineReducers({
  auth,
  modal,
  housing
});
