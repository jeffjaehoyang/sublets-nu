import React from 'react';
import * as Styled from './styles';

const GoogleMapsContainer = ({ height, alwaysDisplay, children }) => (
  <Styled.GoogleMapsContainer height={height} alwaysDisplay={alwaysDisplay}>
    {children}
  </Styled.GoogleMapsContainer>
);

export default GoogleMapsContainer;
