import styled from 'styled-components';
import tw from 'twin.macro';
import { Link } from 'react-router-dom';

export const HousingCard = styled.div`
  ${tw`mb-5 p-4 bg-gray-50 rounded-lg text-gray-900 border-2 border-gray-50 hover:border-gray-300 w-full`};
`;

export const Wrapper = styled.div`
  ${tw`md:flex relative`}
`;

export const HousingImage = styled.div`
  ${tw`md:flex-shrink-0`}
  img {
    ${tw`rounded-md w-full object-cover md:w-48`};
    height: 150px;
    object-fit: cover;
  }
  @media only screen and (max-width: 600px) {
    img {
      height: 170px;
      width: 100%;
    }
  }
`;

export const HousingInfo = styled.div`
  ${tw`relative flex flex-col md:ml-4`}
  width: 100%;
`;

export const Title = styled(Link)`
  ${tw`mt-2 sm:mt-0 font-bold text-lg mb-2`}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
`;

export const Price = styled.div`
  ${tw`flex justify-center items-center font-medium sm:text-sm py-1 px-4 rounded-full text-green-700 bg-green-100 border mb-2 border-green-500`}
  width: fit-content;
`;

export const Date = styled.div`
  ${tw`mb-2`}
`;

export const RoomType = styled.div`
  ${tw`flex justify-center items-center font-medium sm:text-sm py-1 px-4 rounded-full text-pink-700 bg-pink-100 border border-pink-300`}
  width: fit-content;
`;

export const ProfileImg = styled.img`
  ${tw`rounded-full ml-0 sm:ml-8 mt-3 sm:mt-0`}
  position: absolute;
  top: 0px;
  right: 0px;
  width: 30px;
  height: 30px;
`;

export const SaveBtn = styled.button`
  ${tw`flex justify-center items-center rounded-full ml-0 sm:ml-8 sm:mt-0 focus:outline-none`}
  background-color: rgba(253, 236, 234, 0.7);
  width: 35px;
  height: 35px;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10;
`;

export const ExploreBtn = styled(Link)`
  ${tw`flex justify-center items-center uppercase font-medium sm:text-sm py-1 px-4 text-indigo-600 bg-indigo-100 border rounded-md border-indigo-500`}
  width: fit-content;
`;

export const EditBtn = styled(Link)`
  ${tw`flex justify-center items-center uppercase font-medium sm:text-sm py-1 px-4 text-indigo-600 bg-indigo-100 border rounded-md border-indigo-500`}
  width: fit-content;
`;

export const DeleteBtn = styled.button`
  ${tw`flex justify-center items-center rounded-full ml-0 sm:ml-8 sm:mt-0 focus:outline-none`}
  background-color: rgba(253, 236, 234, 0.7);
  width: 35px;
  height: 35px;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10;
`;
