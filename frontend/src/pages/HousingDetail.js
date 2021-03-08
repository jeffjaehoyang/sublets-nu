import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { fetchHousingDetail } from '../api';
import HousingDetailContent from '../components/HousingDetailContent';
import Loader from 'react-loader-spinner';
import { LoaderWrapper } from '../components/HousingDetailContent/styles';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const HousingDetail = (props) => {
  const [housing, setHousing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlArray = props.location.pathname.split('/');
    const housingId = parseInt(urlArray[urlArray.length - 1]);
    fetchHousingDetail(housingId)
      .then((data) => {
        setHousing(data);
      })
      .then(() => setIsLoading(false));
  }, [props.location.pathname]);

  return isLoading ? (
    <LoaderWrapper>
      <Loader type="Oval" color="#4d1d95" height={50} width={50} timeout={3000} />
    </LoaderWrapper>
  ) : (
    <Container>
      <HousingDetailContent housing={housing} />
    </Container>
  );
};

export default HousingDetail;
