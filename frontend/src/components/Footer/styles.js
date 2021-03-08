import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export const Footer = styled.footer`
  ${tw`border-t border-gray-200 py-4`};
  background-color: #1d212c;
`;

export const Links = styled.div`
  ${tw`flex items-center justify-center w-full`};

  a {
    ${tw`text-white hover:text-white mx-2`};
  }
`;

export const FooterLink = styled(Link)`
  ${tw`text-white hover:text-white mx-2`};
`;

export const ExternalLink = styled.a`
  ${tw`text-white hover:text-white mx-2`};
`;

export const Copyright = styled.div`
  ${tw`text-white flex justify-center w-full py-4`}
`;
