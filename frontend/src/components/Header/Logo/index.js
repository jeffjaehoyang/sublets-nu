import React from 'react';

import * as Styled from './styles';

const Logo = () => {
  return (
    <Styled.Logo to="/">
      <Styled.Image>
        <img src="/images/favicon.png" alt="logo" />
      </Styled.Image>
      <Styled.Text>Sublets.nu</Styled.Text>
    </Styled.Logo>
  );
};

export default Logo;
