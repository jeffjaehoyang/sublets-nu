import styled from 'styled-components';
import tw from 'twin.macro';

export const HousingDetail = styled.div`
  ${tw`min-h-screen w-full`};
`;

export const Wrapper = styled.div`
  ${tw`flex flex-col w-full justify-between pb-20`}
`;

export const RowWrap = styled.div`
  ${tw`flex flex-col sm:flex-row w-full justify-between`}
`;

export const RightWrapper = styled.div`
  ${tw`flex flex-col sm:flex-row`}
`;

export const HousingInfoWrapper = styled.div`
  ${tw`flex flex-col sm:mr-4`}
`;

export const ProfileInfoWrapper = styled.div`
  ${tw`flex flex-col px-4 py-4 bg-gray-50 rounded-md text-gray-900 sm:mt-8 mt-4 w-full sm:w-max self-end order-first sm:order-2`}
`;

export const RoomInfoWrapper = styled.div`
  ${tw`mt-4 flex flex-col sm:flex-row justify-between sm:items-center px-4 py-4 bg-gray-50 rounded-md text-gray-900 w-full`}
`;

export const DateInfoWrapper = styled.div`
  ${tw`mt-4 flex flex-row items-center px-4 py-4 bg-gray-50 rounded-md text-gray-900 w-full`}
`;

export const DistanceInfoWrapper = styled.div`
  ${tw`flex flex-col px-4 py-4 bg-gray-50 rounded-md text-gray-900 mt-4 w-full sm:w-max self-end sm:mr-4`}
`;

export const LoaderWrapper = styled.div`
  ${tw`flex flex-col max-w-screen-xl w-full mx-auto p-5 justify-center items-center`}
  height: calc(100vh - 82px);
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

export const Distances = styled.div`
  ${tw`font-normal text-base`}
`;

export const CampusArea = styled.div`
  ${tw`mt-4 sm:mt-8 font-normal text-lg`}
`;

export const UserName = styled.div`
  ${tw`flex items-center font-bold text-base`}
`;

export const UserVerified = styled.div`
  ${tw`font-normal text-base mt-4`}
`;

export const UserNegotiate = styled.div`
  ${tw`font-normal text-base`}
`;

export const UserImg = styled.img`
  ${tw`rounded-full ml-0 sm:mt-0 mr-2`}
  width: 25px;
  height: 25px;
`;

export const Description = styled.div`
  ${tw`mt-4 flex-1 order-first sm:order-last bg-gray-50 rounded-md p-5`}
  height: max-content;
`;
