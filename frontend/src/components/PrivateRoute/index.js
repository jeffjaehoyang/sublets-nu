import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { showModal } from '../../actions/modal';

const PrivateRoute = ({ loading, isAuthenticated, showModal, path, component }) => {
  useEffect(() => {
    if (!isAuthenticated && !loading)
      showModal(
        {
          open: true
        },
        'login'
      );
  }, [isAuthenticated, loading]);

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
