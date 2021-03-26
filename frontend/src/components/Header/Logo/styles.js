import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export const Logo = styled(Link)`
  ${tw`flex items-center mr-auto text-purple-900 hover:text-purple-900`};
  text-decoration: none;
`;

export const Text = styled.div`
  ${tw`text-xl font-bold`};
`;

export const Image = styled.figure`
  ${tw`w-11 h-11 mr-3 border border-purple-700 rounded-full`};

  img {
    ${tw`border border-white rounded-full`};
  }
`;
