import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

export const HousingDetail = styled.div`
  ${tw`min-h-screen w-full`};
`;

export const Wrapper = styled.div`
  ${tw`flex flex-col w-full justify-between pb-20`}
`;

export const RowWrap = styled.div`
  ${tw`flex flex-col sm:flex-row w-full justify-between border-b mb-8 pb-8`}
`;

export const RightWrapper = styled.div`
  ${tw`flex flex-col sm:flex-row`}
`;

export const HousingInfoWrapper = styled.div`
  ${tw`flex flex-col sm:mr-4 w-full`}
`;

export const ProfileInfoWrapper = styled.div`
  ${tw`flex flex-col sm:flex-row sm:items-center text-gray-900 border-b mb-8 pb-8 w-full`}
`;

export const RoomInfoWrapper = styled.div`
  ${tw`mt-4 flex flex-col sm:flex-row justify-between sm:items-center px-4 py-4 bg-purple-50 rounded-md text-gray-900 w-full`}
`;

export const DateInfoWrapper = styled.div`
  ${tw`mt-4 flex flex-row items-center px-4 py-4 bg-purple-50 rounded-md text-gray-900`}
  width: max-content;
`;

export const DistanceInfoWrapper = styled.div`
  ${tw`flex flex-col px-4 py-4 bg-gray-50 rounded-md text-gray-900 mt-4 w-full sm:w-max self-end sm:mr-4`}
`;

export const LoaderWrapper = styled.div`
  ${tw`flex flex-col max-w-screen-xl w-full mx-auto p-5 justify-center items-center`}
  height: calc(100vh - 82px);
`;

export const BodyWrapper = styled.div`
  ${tw`flex sm:flex-row flex-col mb-8 pb-8 border-b`}
`;

export const DistanceWrapper = styled.div`
  ${tw`flex flex-col mb-8 pb-8 border-b`}
`;

export const GoogleMapsWrapper = styled.div`
  ${tw`flex flex-col`}
`;

export const HousingImage = styled.div`
  ${tw`md:flex-shrink-0`}
  img {
    ${tw`rounded-md w-full object-cover md:w-48`};
    height: 150px;
    object-fit: cover;
  }
`;

export const HousingInfo = styled.div`
  ${tw`flex flex-col md:ml-4`}
`;

export const Title = styled.div`
  ${tw`mt-1 font-bold text-2xl sm:text-3xl`}
`;

export const Address = styled.div`
  ${tw`mt-1 font-light text-xl`}
`;

export const Price = styled.div`
  ${tw`font-bold text-xl sm:mr-16`}
`;

export const Roommates = styled.div`
  ${tw`font-bold text-xl`}
`;

export const Date = styled.div`
  ${tw`font-bold text-xl sm:mr-16`}
`;

export const RoomType = styled.div`
  ${tw`font-bold text-xl sm:mr-16`}
`;

export const DistanceItem = styled.div`
  ${tw`font-normal text-xl mt-4`}
`;

export const CampusArea = styled.div`
  ${tw`mt-4 sm:mt-8 font-normal text-lg`}
`;

export const UserName = styled.div`
  ${tw`flex items-center font-bold text-xl mb-8 sm:mb-0 sm:mr-10`}
`;

export const UserVerified = styled.div`
  ${tw`font-normal text-base mt-4`}
`;

export const UserNegotiate = styled.div`
  ${tw`font-normal text-base`}
`;

export const UserImg = styled.img`
  ${tw`rounded-full border-2 border-gray-200 ml-0 sm:mt-0 mr-2`}
  width: 80px;
  height: 80px;
`;

export const Description = styled.div`
  ${tw`flex-1 order-first sm:order-last bg-gray-50 rounded-md p-5 mb-4 sm:mb-0`}
  height: max-content;
`;

export const ContactBtn = styled.button`
  ${tw`flex justify-center items-center uppercase font-medium sm:text-sm h-12 px-4 text-purple-800 border-2 rounded-md border-purple-800 mx-auto sm:mx-0 sm:mr-4 hover:bg-purple-50 focus:outline-none`}
  width: fit-content;
`;

export const SaveBtn = styled.button`
  ${tw`flex justify-center items-center font-normal text-sm px-2 py-1 rounded-md text-gray-700 bg-pink-100 focus:outline-none mt-4 sm:mt-8 font-bold ml-2`}
  width: fit-content;
  height: fit-content;
`;
