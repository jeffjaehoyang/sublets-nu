import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { showModal } from '../../actions/modal';
import HousingList from '../../pages/HousingList';

const PrivateRoute = ({ loading, isAuthenticated, showModal, path, component }) => {
  console.log('private route : ', isAuthenticated, loading);
  useEffect(() => {
    if (!isAuthenticated && !loading)
      showModal(
        {
          open: true
        },
        'login'
      );
  }, [isAuthenticated]);

  return isAuthenticated ? <Route path={path} component={component} /> : null;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

const mapDispatchToProps = (dispatch) => ({
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
