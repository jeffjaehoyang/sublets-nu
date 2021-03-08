import {
  FETCH_HOUSING_LIST,
  FETCH_MY_HOUSING_LISTINGS,
  FETCH_SAVED_HOUSING,
  FILTER_HOUSING_LIST,
  SAVE_HOUSING,
  SET_FILTERS,
  UNSAVE_HOUSING
} from '../actions/types';

const initialState = {
  housingList: [],
  myHousingListings: [],
  savedHousingList: [],
  activeFilters: {},
  loading: true
};

const housingReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_HOUSING_LIST:
      return {
        ...state,
        housingList: payload,
        loading: false
      };
    case FETCH_MY_HOUSING_LISTINGS:
      return {
        ...state,
        myHousingListings: payload,
        loading: false
      };
    case FILTER_HOUSING_LIST:
      return {
        ...state,
        housingList: payload,
        loading: false
      };
    case FETCH_SAVED_HOUSING:
      return {
        ...state,
        savedHousingList: payload,
        loading: false
      };
    case SAVE_HOUSING:
      return {
        ...state,
        savedHousingList: payload
      };
    case UNSAVE_HOUSING:
      return {
        ...state,
        savedHousingList: payload
      };
    case SET_FILTERS:
      return {
        ...state,
        activeFilters: payload
      };
    default:
      return state;
  }
};

export default housingReducer;
