import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSavedHousingAction, unsaveHousingAction } from '../actions/housing';
import Container from '../components/Container';
import HousingListCardContainer from '../components/Container/HousingListCardContainer';
import HousingCard from '../components/HousingCard';

const Saved = ({ savedHousingList, fetchSaved, removeSaved }) => {
  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <Container>
      <HousingListCardContainer>
        <div className="flex flex-col">
          <div className="text-xl font-bold mb-6">Saved Listings</div>
          {savedHousingList
            ? savedHousingList.map((housing) => {
                return <HousingCard key={housing.id} housing={housing} />;
              })
            : null}
        </div>
      </HousingListCardContainer>
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
