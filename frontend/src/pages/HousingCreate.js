import React, { useState } from 'react';
import { createHousing } from '../api';
import renderStep from '../components/Forms/HousingCreateForm';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import HousingCreateContainer from '../components/Container/HousingCreateContainer';
import { Redirect } from 'react-router-dom';
import { LoaderWrapper } from '../components/HousingDetailContent/styles';
import Loader from 'react-loader-spinner';
import { fetchHousingListAction } from '../actions/housing';
import store from '../context/store';

const HousingCreateForm = () => {
  const [step, setStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [createdHousing, setCreatedHousing] = useState(null);
  const [fireRedirect, setFireRedirect] = useState(false);

  const formData = {
    title: '',
    city: 'Evanston',
    street_address: '',
    street_address_is_open: false,
    is_negotiable: true,
    zipcode: '60201',
    price: '',
    rent_start_date: '',
    rent_end_date: '',
    room_type: '',
    roommates: '',
    bathrooms: '',
    description: '',
    images: [],
    amenities: []
  };
  const handlePrev = () => {
    if (step === 1) return;
    setStep(step - 1);
  };
  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <>
      {!isUploading && (
        <Formik
          initialValues={formData}
          validationSchema={Yup.object({
            title: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
            city: Yup.string().required('Required'),
            street_address: Yup.string().required('Required'),
            zipcode: Yup.number().required('Required'),
            price: Yup.number().required('Required'),
            rent_start_date: Yup.date().required('Required'),
            rent_end_date: Yup.date().required('Required'),
            room_type: Yup.string().required('Required'),
            roommates: Yup.number().required('Required'),
            bathrooms: Yup.number().required('Required'),
            description: Yup.string().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            try {
              setIsUploading(true);
              values.rent_start_date = values.rent_start_date.format('YYYY-MM-DD');
              values.rent_end_date = values.rent_end_date.format('YYYY-MM-DD');
              createHousing(values).then((housing) => {
                setCreatedHousing(housing);
                setFireRedirect(true);
                store.dispatch(fetchHousingListAction());
              });
            } catch (e) {
              console.log(e);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="flex flex-col sm:w-3/5 sm:mx-auto">
              {renderStep(step, values, errors, touched, setFieldValue, setStep)}
              {step === 0 ? (
                <button
                  className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-purple-900 uppercase transition bg-transparent border-2 border-purple-900 rounded-full ripple hover:bg-purple-50 focus:outline-none sm:w-1/4 mx-auto"
                  onClick={handleNext}
                >
                  Start →
                </button>
              ) : step < 6 ? (
                <div className="flex flex-row justify-between">
                  <button
                    className={`inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-purple-900 uppercase transition bg-transparent border-2 border-purple-900 rounded-full ripple hover:bg-purple-50 focus:outline-none mt-6 ${
                      step === 1 ? 'invisible' : ''
                    }`}
                    type="button"
                    onClick={handlePrev}
                  >
                    Previous
                  </button>
                  <button
                    className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-purple-900 uppercase transition bg-transparent border-2 border-purple-900 rounded-full ripple hover:bg-purple-50 focus:outline-none mt-6"
                    type="button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              ) : (
                <button
                  className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-purple-900 uppercase transition bg-transparent border-2 border-purple-900 rounded-full ripple hover:bg-purple-50 focus:outline-none mt-6"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </Form>
          )}
        </Formik>
      )}
      {isUploading && (
        <LoaderWrapper>
          <Loader type="Oval" color="#4d1d95" height={50} width={50} timeout={3000} />
        </LoaderWrapper>
      )}
      {fireRedirect && createdHousing && <Redirect to={`/housing/${createdHousing.id}`} />}
    </>
  );
};

const HousingCreate = (props) => {
  return (
    <HousingCreateContainer>
      <HousingCreateForm />
    </HousingCreateContainer>
  );
};

export default HousingCreate;
