import styled from 'styled-components';
import tw from 'twin.macro';

export const Button = styled.button`
  ${tw`border bg-purple-900 max-h-8 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-purple-700 focus:outline-none`};
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
