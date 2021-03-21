import React from 'react';
import { connect } from 'react-redux';
import { fetchHousingListAction, fetchMyHousingListingsAction } from '../../../actions/housing';
import { hideModal } from '../../../actions/modal';
import { deleteHousing } from '../../../api';
import store from '../../../context/store';
import * as Styled from './styles';

const DeleteHousingModal = ({ housing_id, hideModal }) => {
  const handleDelete = () => {
    try {
      deleteHousing(housing_id).then(() => {
        store.dispatch(fetchMyHousingListingsAction());
        store.dispatch(fetchHousingListAction());
      });
    } catch (e) {
      console.log(e);
    } finally {
      hideModal();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-64 space-y-8">
      <p className="text-xl font-bold">Delete listing?</p>
      <span className="text-sm pb-2 border-b text-gray-400">You will not be able to recover it</span>
      <Styled.DeleteBtn onClick={handleDelete}>Delete</Styled.DeleteBtn>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal())
});

export default connect(null, mapDispatchToProps)(DeleteHousingModal);
