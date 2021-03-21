import styled from 'styled-components';
import tw from 'twin.macro';

export const DeleteBtn = styled.button`
  ${tw`flex justify-center items-center uppercase font-medium sm:text-sm py-1 px-4 text-red-600 bg-red-100 border rounded-md border-red-500 focus:outline-none`}
  width: fit-content;
`;
