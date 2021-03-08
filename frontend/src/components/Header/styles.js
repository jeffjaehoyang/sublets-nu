import styled from 'styled-components';
import tw from 'twin.macro';
import { Container } from '../Container/styles';

export const Header = styled.header`
  ${tw`fixed flex w-full top-0 bg-white -mb-px`};
  z-index: 1000;
`;

export const Wrapper = styled(Container)`
  ${tw`items-center`};
`;
