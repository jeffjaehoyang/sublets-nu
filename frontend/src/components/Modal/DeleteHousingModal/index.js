import React from 'react';
import { connect } from 'react-redux';
import { fetchMyHousingListingsAction } from '../../../actions/housing';
import { hideModal } from '../../../actions/modal';
import { deleteHousing } from '../../../api';
import store from '../../../context/store';
import * as Styled from './styles';

const DeleteHousingModal = ({ housing_id, hideModal }) => {
  const handleDelete = () => {
    try {
      deleteHousing(housing_id).then(() => {
        console.log('deleted housing');
        store.dispatch(fetchMyHousingListingsAction());
      });
    } catch (e) {
      console.log(e);
    } finally {
      console.log('finally hiding modal');
      hideModal();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-64 space-y-8">
      <p className="text-xl font-bold">Delete the listing?</p>
      <span className="text-sm pb-2 border-b text-gray-400">You will not be able to recover it</span>
      <Styled.DeleteBtn onClick={handleDelete}>Delete</Styled.DeleteBtn>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModal())
});

export default connect(null, mapDispatchToProps)(DeleteHousingModal);
