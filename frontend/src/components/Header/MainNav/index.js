import React, { useState } from 'react';
import * as Styled from './styles';
import { showModal } from '../../../actions/modal';
import { connect } from 'react-redux';
import Dropdown from '../../Dropdown';
import { Fragment } from 'react';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import { logout } from '../../../actions/auth';

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

const mobileNavItems = [
  { title: 'My Listings', slug: '/my_listings' },
  { title: 'Saved', slug: '/saved' },
  { title: 'Logout' }
];

const MainNav = ({ isAuthenticated, user, showModal, logout }) => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useDeviceDetect();

  const openLoginModal = () => {
    setOpen(false);
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
        <Styled.UploadBtn to={'/housing/upload'} onClick={() => setOpen(false)}>
          Upload
        </Styled.UploadBtn>
        {!isMobile ? <Dropdown user={user} /> : null}
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
            <Styled.MainNavItem to={item.slug} activeClassName="active" key={index} onClick={() => setOpen(false)}>
              {item.title}
            </Styled.MainNavItem>
          )
        )}
        {isMobile &&
          isAuthenticated &&
          mobileNavItems.map((item, index) => {
            return item.title === 'Logout' ? (
              <Styled.Logout
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
              >
                {item.title}
              </Styled.Logout>
            ) : (
              <Styled.MainNavItem to={item.slug} activeClassName="active" key={index} onClick={() => setOpen(false)}>
                {item.title}
              </Styled.MainNavItem>
            );
          })}
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
  },
  logout: () => {
    dispatch(logout());
  }
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
