import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSavedHousingAction, unsaveHousingAction } from '../actions/housing';
import Container from '../components/Container';
import FullHeightContainer from '../components/Container/FullHeightContainer';
import HousingListCardContainer from '../components/Container/HousingListCardContainer';
import HousingCard from '../components/HousingCard';
import listing_not_found_img from '../images/listing_not_found.svg';

const Saved = ({ savedHousingList, fetchSaved, removeSaved }) => {
  useEffect(() => {
    fetchSaved();
  }, []);

  const EmptyPage = () => {
    return (
      <FullHeightContainer>
        <img src={listing_not_found_img} alt="not found" />
        <p className="text-2xl font-bold mt-6">You have no saved listings yet!</p>
      </FullHeightContainer>
    );
  };

  return (
    <Container>
      {savedHousingList.length ? (
        <HousingListCardContainer>
          <div className="flex flex-col">
            <div className="text-xl font-bold mb-6">Saved Listings</div>
            {savedHousingList.map((housing) => {
              return <HousingCard key={housing.id} housing={housing} />;
            })}
          </div>
        </HousingListCardContainer>
      ) : (
        <EmptyPage />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  savedHousingList: state.housing.savedHousingList
});

const mapDispatchToProps = (dispatch) => ({
  removeSaved: (data) => {
    dispatch(unsaveHousingAction(data));
  },
  fetchSaved: () => {
    dispatch(fetchSavedHousingAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
