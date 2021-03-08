import React from 'react';
import MainNav from './MainNav';
import Logo from './Logo';
import * as Styled from './styles';
import HousingListFilter from '../Forms/HousingListFilterForm';
import { useLocation } from 'react-router-dom';

const Header = ({ siteTitle }) => {
  const location = useLocation();
  return (
    <Styled.Header>
      <Styled.Wrapper>
        <Logo />
        <MainNav />
        {location.pathname === '/' ? <HousingListFilter /> : null}
      </Styled.Wrapper>
    </Styled.Header>
  );
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
