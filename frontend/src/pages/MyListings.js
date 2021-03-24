import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyHousingListingsAction } from '../actions/housing';
import Container from '../components/Container';
import FullHeightContainer from '../components/Container/FullHeightContainer';
import HousingListCardContainer from '../components/Container/HousingListCardContainer';
import HousingCard from '../components/HousingCard';
import listing_not_found_img from '../images/listing_not_found.svg';

const MyListings = ({ myHousingListings, fetchMyHousingListings }) => {
  useEffect(() => {
    fetchMyHousingListings();
  }, []);

  const EmptyPage = () => {
    return (
      <FullHeightContainer>
        <img src={listing_not_found_img} alt="not found" />
        <p className="text-2xl font-bold mt-6">You have no listings yet!</p>
      </FullHeightContainer>
    );
  };

  return (
    <Container>
      {myHousingListings.length ? (
        <HousingListCardContainer>
          <div className="flex flex-col">
            <div className="text-xl font-bold mb-6">My Listings</div>
            {myHousingListings.map((housing) => {
              return <HousingCard key={housing.id} housing={housing} isMyListing={true} />;
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
  myHousingListings: state.housing.myHousingListings
});

const mapDispatchToProps = (dispatch) => ({
  fetchMyHousingListings: () => {
    dispatch(fetchMyHousingListingsAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListings);
