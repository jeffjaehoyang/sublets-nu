import React from 'react';
import * as Styled from './styles';
import Icon from '../../icons';
import ImageGallery from 'react-image-gallery';
import GoogleMapsContainer from '../Container/GoogleMapsContainer';
import GoogleMapReact from 'google-map-react';
import { createMapOptions, GOOGLE_MAPS_API_KEY } from '../../constants';
import PointMarker from '../PointMarker';
import { formatDate } from '../../utils';

const HousingDetailContent = ({ housing }) => {
  const images_list = housing.images.map((image) => {
    return {
      original: image.img,
      thumbnail: image.img,
      originalClass: 'sliderimg'
    };
  });
  const images = images_list;

  return (
    <Styled.HousingDetail>
      <ImageGallery
        items={images}
        showPlayButton={false}
        renderLeftNav={(onClick, disabled) => {
          return (
            <button className="image-gallery-custom-left-nav focus:outline-none" disabled={disabled} onClick={onClick}>
              <Icon icon={['fal', 'arrow-square-left']} style={{ width: '40px', height: '40px', color: 'white' }} />
            </button>
          );
        }}
        renderRightNav={(onClick, disabled) => {
          return (
            <button className="image-gallery-custom-right-nav focus:outline-none" disabled={disabled} onClick={onClick}>
              <Icon icon={['fal', 'arrow-square-right']} style={{ width: '40px', height: '40px', color: 'white' }} />
            </button>
          );
        }}
        renderFullscreenButton={(onClick, isFullscreen) => {
          return (
            <button className={`image-gallery-fullscreen-button${isFullscreen ? ' active' : ''}`} onClick={onClick}>
              <Icon icon={['far', 'expand-wide']} style={{ width: '40px', height: '40px', color: 'white' }} />
            </button>
          );
        }}
      />
      <Styled.Wrapper>
        <Styled.RowWrap>
          <Styled.HousingInfoWrapper>
            <Styled.CampusArea>
              {housing.campus_area}, {housing.city}
            </Styled.CampusArea>
            <Styled.Title>{housing.title}</Styled.Title>
            <Styled.Address>
              <Icon icon={['fad', 'map-marked-alt']} style={{ marginRight: '5px' }} />
              {housing.street_address_is_open
                ? housing.street_address
                : 'The exact location of this listing will be provided upon your personal request'}
            </Styled.Address>
            <Styled.DateInfoWrapper>
              <Icon icon={['fad', 'calendar-check']} style={{ marginRight: '8px' }} />
              <Styled.Date>{`${formatDate(housing.rent_start_date)} - ${formatDate(
                housing.rent_end_date
              )}`}</Styled.Date>
            </Styled.DateInfoWrapper>
            <Styled.RoomInfoWrapper>
              <Styled.RoomType>
                <Icon icon={['fal', 'bed-alt']} style={{ marginRight: '5px' }} />
                {housing.room_type}
              </Styled.RoomType>
              <Styled.RoomType>
                <Icon icon={['fal', 'bath']} style={{ marginRight: '5px' }} />
                {housing.bathrooms} Bath
              </Styled.RoomType>
              <Styled.Price>
                <Icon icon={['far', 'dollar-sign']} style={{ marginRight: '5px' }} />
                {housing.price} / month
              </Styled.Price>
              <Styled.Roommates>
                <Icon icon={['fad', 'user-friends']} style={{ marginRight: '5px' }} />
                {housing.roommates === 0
                  ? 'No roommates'
                  : housing.roommates === 1
                  ? '1 roommate'
                  : `${housing.roommates} roommates`}
              </Styled.Roommates>
            </Styled.RoomInfoWrapper>
          </Styled.HousingInfoWrapper>
          <Styled.RightWrapper>
            <Styled.DistanceInfoWrapper>
              <Styled.Distances>
                <Icon icon={['far', 'walking']} style={{ marginRight: '8px' }} />
                Tech • {housing.duration_tech}{' '}
              </Styled.Distances>
              <Styled.Distances>
                <Icon icon={['far', 'walking']} style={{ marginRight: '8px' }} />
                Norris • {housing.duration_norris}{' '}
              </Styled.Distances>
              <Styled.Distances>
                <Icon icon={['far', 'walking']} style={{ marginRight: '8px' }} />
                Kresge • {housing.duration_kresge}{' '}
              </Styled.Distances>
              <Styled.Distances>
                <Icon icon={['far', 'walking']} style={{ marginRight: '8px' }} />
                Target • {housing.duration_target}{' '}
              </Styled.Distances>
            </Styled.DistanceInfoWrapper>
            <Styled.ProfileInfoWrapper>
              <Styled.UserName>
                <Styled.UserImg src={housing.uploader.picture} />
                {housing.uploader.first_name + ' ' + housing.uploader.last_name}
              </Styled.UserName>
              <Styled.UserVerified>
                <Icon icon={['fad', 'check-circle']} style={{ color: 'green', marginRight: '5px' }} />
                Verified Northwestern
              </Styled.UserVerified>
              <Styled.UserNegotiate>
                <Icon icon={['fad', 'hands-helping']} style={{ marginRight: '5px' }} />
                {housing.is_negotiable ? 'Open to negotiate' : 'Unwilling to negotiate'}
              </Styled.UserNegotiate>
            </Styled.ProfileInfoWrapper>
          </Styled.RightWrapper>
        </Styled.RowWrap>
        <div className="flex sm:flex-row flex-col sm:mt-8 mb-8 sm:mb-20">
          <div className="mt-4 flex-1 order-last sm:order-first">
            <div className="font-bold">Amenities</div>
            <div className="grid grid-cols-2 w-full sm:w-2/3">
              {housing.amenities.map((amenity) => {
                const icon_class = amenity.icon_class.split(' ')[0];
                const icon_name = amenity.icon_class.split(' ')[1].slice(3);
                return (
                  <div className="flex flex-row items-center mt-6" key={amenity.id}>
                    <Icon
                      icon={[icon_class, icon_name]}
                      style={{ height: '30px', width: '30px', marginRight: '15px' }}
                    />
                    {amenity.name}
                  </div>
                );
              })}
            </div>
          </div>
          <Styled.Description>
            <Icon icon={['fad', 'quote-left']} style={{ height: '30px', width: '30px', marginRight: '10px' }} />
            {housing.description}
          </Styled.Description>
        </div>
        <GoogleMapsContainer height="50vh" alwaysDisplay={true}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
              region: 'US'
            }}
            defaultCenter={{ lat: parseFloat(housing.latitude), lng: parseFloat(housing.longitude) }}
            defaultZoom={16}
            options={createMapOptions}
          >
            <PointMarker
              key={housing.id}
              lat={parseFloat(housing.latitude)}
              lng={parseFloat(housing.longitude)}
              housing={housing}
              text={housing.price}
              tooltip={housing.title}
              renderHomeMarker={true}
            />
          </GoogleMapReact>
        </GoogleMapsContainer>
      </Styled.Wrapper>
    </Styled.HousingDetail>
  );
};

export default HousingDetailContent;
