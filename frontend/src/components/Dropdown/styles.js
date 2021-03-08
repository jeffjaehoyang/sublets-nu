import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`relative sm:ml-8 text-purple-900 px-2 py-2 ml-0 sm:ml-8 mt-3 sm:mt-0 flex items-center`}
`;

export const ProfileBtn = styled.button`
  ${tw`focus:outline-none border-2 border-gray-200 rounded-full`}
`;

export const ProfileImg = styled.img`
  ${tw`rounded-full ml-0 mt-0`}
  width: 30px;
  height: 30px;
`;

export const NavItem = styled(NavLink)`
  ${tw`relative text-gray-900 rounded-md px-2 py-2 hover:text-gray-900 ml-0 text-sm`};
  width: max-content;
  text-decoration: none;
`;

export const Logout = styled.button`
  ${tw`relative text-gray-900 px-2 py-2 ml-0 focus:outline-none text-sm`};
  width: max-content;
  padding: 10px 30px;
`;
