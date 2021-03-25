import { SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const initialState = {
  token: localStorage.getItem('access_token'),
  isAuthenticated: false,
  user: null,
  refusedLogin: false,
  loading: true
};

const authReducer = (state = initialState, action) => {
  const { type, payload, user } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: user,
        isAuthenticated: true,
        refusedLogin: false,
        loading: false,
        token: payload.access_token
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    case SIGNUP_FAIL:
      return state;
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        refusedLogin: false,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
