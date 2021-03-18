import styled from 'styled-components';
import tw from 'twin.macro';

export const HousingListCardContainer = styled.div`
  ${tw`flex flex-col sm:w-full md:w-7/12 md:mr-5`};
  @media only screen and (min-width: 600px) {
    height: 80vh;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      /* WebKit */
      width: 0;
      height: 0;
    }
  }
  overflow: auto;
`;
