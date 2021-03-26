import styled from 'styled-components';
import tw from 'twin.macro';

export const FullHeightContainer = styled.div`
  ${tw`flex flex-col justify-center items-center mx-auto max-w-screen-xl w-full p-5`};
  min-height: calc(100vh - 275px);
`;
