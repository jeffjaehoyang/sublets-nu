import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMyHousingListingsAction } from '../actions/housing';
import Container from '../components/Container';
import HousingListCardContainer from '../components/Container/HousingListCardContainer';
import HousingCard from '../components/HousingCard';

const MyListings = ({ myHousingListings, fetchMyHousingListings }) => {
  useEffect(() => {
    fetchMyHousingListings();
  }, []);

  return (
    <Container>
      <HousingListCardContainer>
        <div className="flex flex-col">
          <div className="text-xl font-bold mb-6">My Listings</div>
          {myHousingListings
            ? myHousingListings.map((housing) => {
                return <HousingCard key={housing.id} housing={housing} isMyListing={true} />;
              })
            : null}
        </div>
      </HousingListCardContainer>
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
