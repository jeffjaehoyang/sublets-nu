import React from 'react';
import * as Styled from './styles';

const GoogleMapsContainer = ({ height, alwaysDisplay, noFlex, children }) => (
  <Styled.GoogleMapsContainer height={height} alwaysDisplay={alwaysDisplay} noFlex={noFlex}>
    {children}
  </Styled.GoogleMapsContainer>
);

export default GoogleMapsContainer;
