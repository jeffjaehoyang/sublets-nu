import React from 'react';
import * as Styled from './styles';
import page_not_found_error_image from '../../images/404_error.svg';

const NotFound = () => {
  return (
    <Styled.Wrapper>
      <img src={page_not_found_error_image} alt="404 not found" />
    </Styled.Wrapper>
  );
};

export default NotFound;
