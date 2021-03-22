import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types';
import { fetchCurrentUser, convertToken } from '../api';
import { CLIENT_ID, CLIENT_SECRET } from '../constants';
import LocalStorageService from '../api/localStorage';
const localStorageService = LocalStorageService.getService();

export const checkAuthentication = () => async (dispatch) => {
  const access_token = localStorageService.getAccessToken();
  if (access_token) {
    fetchCurrentUser()
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: access_token,
          user: res
        });
      })
      .catch(async (e) => {
        dispatch({
          type: LOGIN_FAIL
        });
      });
  }
};

export const googleLogin = (data) => async (dispatch) => {
  try {
    const config = {
      token: data.accessToken,
      backend: 'google-oauth2',
      grant_type: 'convert_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    };
    const convertTokenResponse = await convertToken(config);
    localStorageService.setToken(convertTokenResponse);
    const userInfo = await fetchCurrentUser();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: convertTokenResponse?.access_token,
      user: userInfo
    });
  } catch (e) {
    localStorageService.clearToken();
    console.log(e);
  }
};

export const facebookLogin = (data) => async (dispatch) => {
  try {
    const config = {
      token: data.accessToken,
      backend: 'facebook',
      grant_type: 'convert_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    };
    const convertTokenResponse = await convertToken(config);
    localStorageService.setToken(convertTokenResponse);
    const userInfo = await fetchCurrentUser();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: convertTokenResponse?.access_token,
      user: userInfo
    });
  } catch (e) {
    localStorageService.clearToken();
    console.log(e);
  }
};

export const logout = () => (dispatch) => {
  localStorageService.clearToken();
  dispatch({ type: LOGOUT });
};
