import axios from 'axios';
import { LOGIN_FAIL } from '../actions/types';
import LocalStorageService from '../api/localStorage';
import { CLIENT_ID, CLIENT_SECRET } from '../constants';
import store from '../context/store';
const localStorageService = LocalStorageService.getService();

axios.interceptors.request.use((config) => {
  if (config.url.includes('/api/auth/convert-token')) {
    console.log('convert-token request intercepted');
    return config;
  }
  if (config.data && config.data.grant_type && config.data.grant_type === 'refresh_token') {
    console.log('refresh token intercepted');
    return config;
  }
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log('RESPONSE ERROR: ', error.response?.status);
    console.log('ORIGINAL REQUEST: ', originalRequest);
    // console.log(error);
    if ([400, 401].includes(error.response?.status) && originalRequest.url.includes(`/api/auth/token`)) {
      console.log('login again please.');
      console.log('dispatching login fail');
      store.dispatch({
        type: LOGIN_FAIL
      });
      return Promise.reject(error);
    }
    if ([401, 403].includes(error.response?.status) && !originalRequest._retry) {
      console.log('retrying with refresh token');
      console.log(localStorageService.getRefreshToken());
      originalRequest._retry = true;
      const newToken = await fetchAuthToken({
        refresh_token: localStorageService.getRefreshToken(),
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      });
      if (newToken.status === 200) {
        // refresh token request was successful
        // 1) put token to LocalStorage
        localStorageService.setToken(newToken.data);
        // 2) Change Authorization header
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
        return axios(originalRequest);
      }
    }
    // return Error object with Promise
    return Promise.reject(error);
  }
);

export const fetchHousingList = async () => {
  // NO AUTH NEEDED
  try {
    const response = await axios.get('/api/housing/list/');
    return response?.data;
    // return response?.data?.results;
  } catch (e) {
    console.log(e);
  }
};

export const fetchFilteredHousingList = async (data) => {
  // NO AUTH NEEDED
  if (!data) return;
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }
  try {
    const response = await axios.post('/api/housing/filter/', formData);
    return response?.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchMyHousingListings = async () => {
  try {
    const response = await axios.get(`/api/housing/my_list/`);
    return response?.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchHousingDetail = async (housingId) => {
  // NO AUTH NEEDED
  const response = await axios.get(`/api/housing/detail/${housingId}`);
  return response.data;
};

export const createHousing = async (data) => {
  // AUTH REQUIRED
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (key === 'images') {
      for (let i = 0; i < value.length; i++) {
        formData.append(`images_${i + 1}`, value[i]);
      }
    } else {
      formData.append(key, value);
    }
  }
  const response = await axios.post(`/api/housing/create/`, formData, {
    headers: { 'content-type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateHousing = async (data, id) => {
  // AUTH REQUIRED
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (key === 'images') {
      for (let i = 0; i < value.length; i++) {
        formData.append(`images_${i + 1}`, value[i]);
      }
    } else {
      formData.append(key, value);
    }
  }
  const response = await axios.patch(`/api/housing/update/${id}`, formData, {
    headers: { 'content-type': 'multipart/form-data' }
  });
  return response.data;
};

export const addSaved = async (data) => {
  // AUTH REQUIRED
  try {
    await axios.post(`/api/housing/saved/`, data);
    const currentUser = await fetchCurrentUser();
    return currentUser?.saved; // return updated list
  } catch (e) {
    console.log(e);
  }
};

export const removeSaved = async (data) => {
  // AUTH REQUIRED
  try {
    await axios.delete(`/api/housing/saved/`, data);
    const currentUser = await fetchCurrentUser();
    return currentUser?.saved;
  } catch (e) {
    console.log(e);
  }
};

export const fetchAmenitiesList = async () => {
  // NO AUTH NEEDED
  const response = await axios.get(`/api/housing/amenities/`);
  return response?.data?.results;
};

// auth api
export const fetchCurrentUser = async () => {
  // AUTH REQUIRED
  const response = await axios.get(`/api/accounts/current_user`);
  return response?.data;
};

export const fetchAuthToken = async (config) => {
  // AUTH REQUIRED
  const response = await axios.post(`/api/auth/token`, config);
  console.log('fetched auth token', response);
  return response;
};

export const convertToken = async (config) => {
  // AUTH REQUIRED
  const response = await axios.post(`/api/auth/convert-token`, config);
  return response?.data;
};
