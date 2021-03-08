import React, { useRef } from 'react';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import * as Styled from './styles';

const Dropdown = ({ user, logout }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <Styled.Wrapper>
      <Styled.ProfileBtn onClick={onClick}>
        <Styled.ProfileImg key={`user-nav-image-${user?.id}`} src={user?.picture} alt={'user avatar'} />
      </Styled.ProfileBtn>
      <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          <li>
            <Styled.NavItem to="/my_listings">My Listings</Styled.NavItem>
          </li>
          <li>
            <Styled.NavItem to="/saved">Saved</Styled.NavItem>
          </li>
          <li>
            <Styled.Logout onClick={() => logout()}>Logout</Styled.Logout>
          </li>
        </ul>
      </nav>
    </Styled.Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  }
});

export default connect(null, mapDispatchToProps)(Dropdown);
