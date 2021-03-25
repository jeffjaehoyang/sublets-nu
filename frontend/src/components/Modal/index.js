import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import modalTypes from './types';
import { hideModal } from '../../actions/modal';
import { useHistory } from 'react-router-dom';

ReactModal.setAppElement('#root');

const MODAL_TYPES = {
  login: modalTypes.LoginModal,
  filter: modalTypes.FilterModal,
  delete_housing: modalTypes.DeleteHousingModal
};

const ModalWrapper = ({ hideModal, modalProps, modalType }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(modalProps.open);
  const closeModal = () => {
    if (modalType === 'login') {
      history.push('/');
    }
    hideModal();
  };

  useEffect(() => {
    setIsOpen(modalProps.open);
  }, [modalProps]);

  if (!modalType) {
    return null;
  }
  const SpecifiedModal = MODAL_TYPES[modalType];

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="My dialog"
      className="mymodal"
      overlayClassName="myoverlay"
      closeTimeoutMS={500}
    >
      <SpecifiedModal housing_id={modalProps.housing_id} />
    </ReactModal>
  );
};

const mapStateToProps = (state) => ({
  ...state.modal
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: (redirect) => dispatch(hideModal(redirect))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);
