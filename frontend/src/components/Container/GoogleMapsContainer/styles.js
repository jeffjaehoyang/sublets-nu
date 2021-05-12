import styled from 'styled-components';
import tw from 'twin.macro';

export const GoogleMapsContainer = styled.div`
  ${tw`sticky hidden sm:flex rounded-md border overflow-hidden`};
  top: 174px;
  flex: ${(props) => (props.noFlex ? 'None' : '1 1 0%')};
  height: ${(props) => props.height || '80vh'};
  display: ${(props) => (props.alwaysDisplay ? 'flex' : 'none')};
`;
