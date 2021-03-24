import styled from 'styled-components';
import tw from 'twin.macro';

export const FullHeightContainer = styled.div`
  ${tw`flex flex-col justify-center items-center w-full`};
  min-height: calc(100vh - 275px);
`;
