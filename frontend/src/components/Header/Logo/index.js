import React from 'react';
import * as Styled from './styles';
import favicon_img from '../../../images/favicon.png';

const Logo = () => {
  return (
    <Styled.Logo to="/">
      <Styled.Image>
        <img src={favicon_img} alt="logo" />
      </Styled.Image>
      <Styled.Text>Sublets.nu</Styled.Text>
    </Styled.Logo>
  );
};

export default Logo;
