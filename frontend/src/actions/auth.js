import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from './types';
import { fetchCurrentUser, convertToken } from '../api';
import LocalStorageService from '../api/localStorage';
const localStorageService = LocalStorageService.getService();

const CLIENT_ID = 'vkaDLFaudlU1to9va0rpGV0FyExfayAWZPRDEE6P';
const CLIENT_SECRET =
  'YsLfk02LFufW1mJyDvQZFySzRdDGkww34mucBYayQi7Yzixnq5jZGqwfsLopsVC5R5S13gmGqKWn38pTDR7s0soAEqN7KMicg0VJpiRM3Gn9EjXpPbEcarpDe6zfDbm9';

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
        console.log('check auth with access token failed.');
        dispatch({
          type: LOGIN_FAIL
        });
      });
  }
};

export const googleLogin = (data) => async (dispatch) => {
  console.log('login data', data);
  try {
    const config = {
      token: data.accessToken,
      backend: 'google-oauth2',
      grant_type: 'convert_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    };
    const convertTokenResponse = await convertToken(config);
    console.log('convert token response', convertTokenResponse);
    localStorageService.setToken(convertTokenResponse);
    const userInfo = await fetchCurrentUser();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: convertTokenResponse?.access_token,
      user: userInfo
    });
    console.log('google login success!');
  } catch (e) {
    localStorageService.clearToken();
    console.log(e);
  }
};

export const facebookLogin = (data) => async (dispatch) => {
  console.log('login data', data);
  try {
    const config = {
      token: data.accessToken,
      backend: 'facebook',
      grant_type: 'convert_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    };
    const convertTokenResponse = await convertToken(config);
    console.log('convert token response', convertTokenResponse);
    localStorageService.setToken(convertTokenResponse);
    const userInfo = await fetchCurrentUser();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: convertTokenResponse?.access_token,
      user: userInfo
    });
    console.log('facebook login success!');
  } catch (e) {
    localStorageService.clearToken();
    console.log(e);
  }
};

export const logout = () => (dispatch) => {
  localStorageService.clearToken();
  dispatch({ type: LOGOUT });
  console.log('logout success!');
};
