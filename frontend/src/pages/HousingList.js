import React, { useEffect, useState } from 'react';
import HousingCard from '../components/HousingCard';
import HousingListContainer from '../components/Container/HousingListContainer';
import HousingListCardContainer from '../components/Container/HousingListCardContainer';
import GoogleMapsContainer from '../components/Container/GoogleMapsContainer';
import { fetchHousingListAction, fetchSavedHousingAction } from '../actions/housing';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import PointMarker from '../components/PointMarker';
import { createMapOptions } from '../constants';
// import InfiniteScroll from 'react-infinite-scroll-component';

const EmptyList = () => {
  return (
    <div className="flex flex-col justify-center items-center font-bold text-lg sm:text-3xl h-full">
      <img src="/images/listing_not_found.svg" alt="not found" />
      <p className="mt-6">Oops! No Rooms were Found!</p>
    </div>
  );
};

const HousingList = ({
  housingList,
  fetchSaved,
  savedHousingList,
  fetchHousingList,
  isAuthenticated,
  loading,
  ...props
}) => {
  // const [map, setMap] = React.useState(null);
  const [hoveredHousing, setHoveredHousing] = useState(null);

  useEffect(() => {
    try {
      fetchSaved();
    } catch (e) {
      console.log(e);
    }
  }, [isAuthenticated]);

  return (
    <>
      <HousingListContainer>
        <HousingListCardContainer>
          {!loading && !housingList?.length ? (
            <EmptyList />
          ) : (
            housingList?.map((housing) => {
              return <HousingCard key={housing.id} housing={housing} setHoveredHousing={setHoveredHousing} />;
            })
          )}
        </HousingListCardContainer>
        {/* <GoogleMapsContainer></GoogleMapsContainer> */}
        <GoogleMapsContainer>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyBri9ifPSIN3pOL6bbtkz9QHeYwrFCkpV0',
              language: 'en',
              region: 'US'
            }}
            defaultCenter={{ lat: 42.0533945, lng: -87.672668 }}
            defaultZoom={15}
            options={createMapOptions}
          >
            {housingList.map((housing) => {
              return (
                <PointMarker
                  key={housing.id}
                  lat={parseFloat(housing.latitude)}
                  lng={parseFloat(housing.longitude)}
                  housing={housing}
                  text={housing.price}
                  tooltip={housing.title}
                  hoveredHousing={hoveredHousing}
                />
              );
            })}
          </GoogleMapReact>
        </GoogleMapsContainer>
      </HousingListContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  housingList: state.housing.housingList,
  savedHousingList: state.housing.savedHousingList,
  loading: state.housing.loading,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  fetchHousingList: () => {
    dispatch(fetchHousingListAction());
  },
  fetchSaved: () => {
    dispatch(fetchSavedHousingAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingList);
