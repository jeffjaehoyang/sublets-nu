import styled from 'styled-components';
import tw from 'twin.macro';

export const Marker = styled.div`
  ${(props) =>
    props.hovered
      ? tw`flex justify-center items-center bg-gray-800 border border-gray-300 text-white rounded-3xl px-2 shadow-md`
      : tw`flex justify-center items-center bg-green-50 border border-gray-300 text-gray-900 rounded-3xl px-2 shadow-md`};
  width: min-content;
  height: 30px;
`;
