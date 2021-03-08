import styled from 'styled-components';
import { motion } from 'framer-motion';
import tw from 'twin.macro';
import { NavLink } from 'react-router-dom';

export const MainNav = styled.nav`
  ${tw`sm:flex flex-col sm:justify-center sm:items-center sm:flex-row sm:w-auto w-full order-last sm:order-none my-4 sm:my-0 hidden`};
  ${({ open }) => open && tw`flex`};
`;

export const MainNavItem = motion.custom(styled(NavLink)`
  ${tw`relative text-purple-900 rounded-md px-2 py-2 hover:bg-purple-100 hover:text-purple-900 ml-0 sm:ml-8 mt-3 sm:mt-0`};
  width: max-content;
  text-decoration: none;

  &.active {
    ${tw`bg-purple-100 text-purple-900`};
  }
`);

export const MainNavItemLogin = motion.custom(styled.a`
  ${tw`relative text-purple-900 rounded-md px-2 py-2 hover:bg-purple-100 hover:text-purple-900 ml-0 sm:ml-8 mt-3 sm:mt-0`};
  width: max-content;
  text-decoration: none;
  cursor: pointer;
`);

export const ToogleMainNav = styled.button`
  ${tw`flex flex-col items-end justify-center cursor-pointer w-6 h-5 sm:hidden`};
  outline: none !important;
  border: none !important;
  span {
    ${tw`bg-purple-500 inline-block w-6 h-px`};
    transition: 0.2s;

    &:first-child {
      ${({ open }) => (open ? tw`-mb-px` : tw`mb-1`)};
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'none')};
    }

    &:last-child {
      ${({ open }) => (open ? tw`-mt-px` : tw`mt-1`)};
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'none')};
    }

    &:nth-child(2) {
      ${tw`bg-purple-400 inline-block w-8 h-px`};

      ${({ open }) => (open ? tw`bg-opacity-0` : tw`bg-opacity-100`)};
      transform: ${({ open }) => (open ? 'translate(20px)' : 'none')};
    }
  }
`;

export const Logout = styled.button`
  ${tw`relative text-purple-900 rounded-md px-2 py-2 hover:bg-purple-100 ml-0 sm:ml-8 mt-3 sm:mt-0`};
  width: max-content;
`;

export const ProfileImg = styled.img`
  ${tw`rounded-full ml-0 sm:ml-8 mt-3 sm:mt-0`}
  width: 30px;
  height: 30px;
`;

export const UploadBtn = styled(NavLink)`
  ${tw`relative text-purple-900 rounded-md px-2 py-2 hover:bg-purple-100 hover:text-purple-900 ml-0 sm:ml-8 mt-3 sm:mt-0`}
  &.active {
    ${tw`bg-purple-100 text-purple-900`};
  }
`;
