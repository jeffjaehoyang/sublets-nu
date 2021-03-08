import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from '../../icons';
import * as Styled from './styles';
import { saveHousingAction, unsaveHousingAction, fetchSavedHousingAction } from '../../actions/housing';
import { formatDate } from '../../utils';
import { roomTypeMapping } from '../../constants';

const HousingCard = ({ housing, savedHousingList, addSaved, removeSaved, setHoveredHousing, isMyListing }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    if (housing.images.length) setMainImage(housing.images[0].img);
    setIsSaved(savedHousingList?.map((h) => h.id).includes(housing.id));
  }, [savedHousingList, housing.id]);

  const handleSave = () => {
    if (!isSaved) {
      setIsSaved(true);
      addSaved({ housing: housing.id });
    } else {
      setIsSaved(false);
      removeSaved({ data: { housing: housing.id } });
    }
  };

  return (
    <Styled.HousingCard
      onMouseEnter={() => setHoveredHousing && setHoveredHousing(housing.id)}
      onMouseLeave={() => setHoveredHousing && setHoveredHousing(null)}
    >
      <Styled.Wrapper>
        {!isMyListing && (
          <Styled.SaveBtn onClick={handleSave}>
            {isSaved ? (
              <Icon
                icon={['fas', 'heart']}
                style={{ padding: '1px', width: '25px', height: '25px', color: '#f6685e' }}
              />
            ) : (
              <Icon
                icon={['fal', 'heart']}
                style={{ padding: '1px', width: '25px', height: '25px', color: '#f6685e' }}
              />
            )}
          </Styled.SaveBtn>
        )}
        <Styled.HousingImage>
          <img src={mainImage} alt={'housing'} />
        </Styled.HousingImage>
        <Styled.HousingInfo>
          <Styled.Title to={`/housing/${housing.id}`}>{housing.title}</Styled.Title>
          <Styled.Date>
            Available starting <b>{formatDate(housing.rent_start_date)}</b>
          </Styled.Date>
          <Styled.Price>${housing.price}</Styled.Price>
          <div className="last-row flex flex-row justify-between items-center w-full">
            <Styled.RoomType>
              {roomTypeMapping[housing.room_type]} / {housing.bathrooms} BA
            </Styled.RoomType>
            {!isMyListing ? (
              <Styled.ExploreBtn to={`/housing/${housing.id}`}>explore 👉</Styled.ExploreBtn>
            ) : (
              <Styled.EditBtn to={`/housing/edit/${housing.id}`}>
                <Icon icon={['fad', 'edit']} style={{ marginRight: '3px' }} /> edit
              </Styled.EditBtn>
            )}
          </div>
        </Styled.HousingInfo>
      </Styled.Wrapper>
    </Styled.HousingCard>
  );
};

const mapStateToProps = (state) => ({
  savedHousingList: state.housing.savedHousingList
});

const mapDispatchToProps = (dispatch) => ({
  fetchSaved: () => {
    dispatch(fetchSavedHousingAction());
  },
  addSaved: (data) => {
    dispatch(saveHousingAction(data));
  },
  removeSaved: (data) => {
    dispatch(unsaveHousingAction(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingCard);
