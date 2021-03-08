import React, { useState } from 'react';
import * as Styled from './styles';
import { showModal } from '../../../actions/modal';
import { connect } from 'react-redux';
import Dropdown from '../../Dropdown';
import { Fragment } from 'react';

const mainNavItems = [
  {
    title: 'About',
    slug: '/about'
  },
  {
    title: 'Login',
    slug: '/signin'
  }
];

const MainNav = ({ isAuthenticated, user, showModal, logout }) => {
  const [open, setOpen] = useState(false);
  const openLoginModal = () => {
    showModal(
      {
        open: true
      },
      'login'
    );
  };

  const authenticatedUser = (index) => {
    return (
      <Fragment key={index}>
        <Styled.UploadBtn to={'/housing/upload'}>Upload</Styled.UploadBtn>
        <Dropdown user={user} />
      </Fragment>
    );
  };

  const guestUser = (item, index) => {
    return (
      <Styled.MainNavItemLogin key={`guest-nav-item-${index}`} onClick={openLoginModal}>
        {item.title}
      </Styled.MainNavItemLogin>
    );
  };

  return (
    <>
      <Styled.MainNav open={open}>
        {mainNavItems.map((item, index) =>
          item.title === 'Login' ? (
            isAuthenticated ? (
              authenticatedUser(index)
            ) : (
              guestUser(item, index)
            )
          ) : (
            <Styled.MainNavItem to={item.slug} activeClassName="active" key={index}>
              {item.title}
            </Styled.MainNavItem>
          )
        )}
      </Styled.MainNav>
      <Styled.ToogleMainNav open={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </Styled.ToogleMainNav>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  }
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
