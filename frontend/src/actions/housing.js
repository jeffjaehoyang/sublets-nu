import {
  fetchFilteredHousingList,
  fetchHousingList,
  addSaved,
  removeSaved,
  fetchCurrentUser,
  fetchMyHousingListings
} from '../api';
import {
  FETCH_HOUSING_LIST,
  FETCH_MY_HOUSING_LISTINGS,
  FETCH_SAVED_HOUSING,
  FILTER_HOUSING_LIST,
  SAVE_HOUSING,
  SET_FILTERS,
  UNSAVE_HOUSING
} from './types';

export const fetchHousingListAction = () => async (dispatch) => {
  const housingList = await fetchHousingList();
  dispatch({
    type: FETCH_HOUSING_LIST,
    payload: housingList
  });
};

export const fetchMyHousingListingsAction = () => async (dispatch) => {
  const myHousingListings = await fetchMyHousingListings();
  dispatch({
    type: FETCH_MY_HOUSING_LISTINGS,
    payload: myHousingListings
  });
};

export const filterHousingListAction = (formData) => async (dispatch) => {
  const filteredHousingList = await fetchFilteredHousingList(formData);
  dispatch({
    type: FILTER_HOUSING_LIST,
    payload: filteredHousingList
  });
};

export const setFilters = (data) => async (dispatch) => {
  dispatch({
    type: SET_FILTERS,
    payload: data
  });
};

export const fetchSavedHousingAction = () => async (dispatch) => {
  let savedHousingList = [];
  try {
    const currentUser = await fetchCurrentUser();
    savedHousingList = currentUser?.saved;
  } catch (e) {
  } finally {
    dispatch({
      type: FETCH_SAVED_HOUSING,
      payload: savedHousingList
    });
  }
};

export const saveHousingAction = (data) => async (dispatch) => {
  const savedHousingList = await addSaved(data);
  dispatch({
    type: SAVE_HOUSING,
    payload: savedHousingList
  });
};

export const unsaveHousingAction = (data) => async (dispatch) => {
  const savedHousingList = await removeSaved(data);
  dispatch({
    type: UNSAVE_HOUSING,
    payload: savedHousingList
  });
};
