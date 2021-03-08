import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import modalTypes from './types';
import { hideModal } from '../../actions/modal';

ReactModal.setAppElement('#root');

const MODAL_TYPES = {
  login: modalTypes.LoginModal,
  filter: modalTypes.FilterModal
};

const ModalWrapper = ({ hideModal, modalProps, modalType }) => {
  const [isOpen, setIsOpen] = useState(modalProps.open);
  const closeModal = () => {
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
      <SpecifiedModal />
    </ReactModal>
  );
};

const mapStateToProps = (state) => ({
  ...state.modal
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);
