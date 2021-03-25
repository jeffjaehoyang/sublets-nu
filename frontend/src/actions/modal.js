import { Redirect } from 'react-router-dom';
import { SHOW_MODAL, HIDE_MODAL } from './types';

export const showModal = ({ modalProps, modalType }) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    modalProps,
    modalType
  });
};

export const hideModal = () => (dispatch) => {
  dispatch({
    type: HIDE_MODAL
  });
};
