import styled from 'styled-components';
import tw from 'twin.macro';

export const GoogleMapsContainer = styled.div`
  ${tw`sticky hidden sm:flex flex-1 rounded-md border overflow-hidden`};
  top: 174px;
  height: ${(props) => props.height || '80vh'};
  display: ${(props) => (props.alwaysDisplay ? 'flex' : 'none')};
`;
