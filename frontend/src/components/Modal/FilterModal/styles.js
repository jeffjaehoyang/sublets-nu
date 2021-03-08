import tw, { styled } from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`flex flex-col w-full`}
  max-height: calc(100vh - 100px);
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`;
