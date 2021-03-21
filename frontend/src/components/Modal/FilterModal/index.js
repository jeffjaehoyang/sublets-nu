import React from 'react';
import * as Styled from './styles';
import Icon from '../../../icons';
import { connect } from 'react-redux';
import { hideModal } from '../../../actions/modal';
import { filterHousingListAction, setFilters } from '../../../actions/housing';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { campusAreaOption, roomTypeOption } from '../../../constants';
const animatedComponents = makeAnimated();

const FilterModal = ({ activeFilters, setFilters, hideModal, filterHousingList }) => {
  const formData = {
    campus_area: activeFilters.campus_area || '',
    room_type: activeFilters.room_type || '',
    rent_start_date: activeFilters.rent_start_date || '',
    rent_end_date: activeFilters.rent_end_date || '',
    bathrooms: activeFilters.bathrooms || '',
    roommates: activeFilters.roommates || '',
    max_price: activeFilters.max_price || 10000
  };

  const formatDollar = (value) => '$ ' + value;

  return (
    <Styled.Wrapper>
      <div className="text-center text-sm text-gray-900 uppercase">More Filters</div>
      <Formik
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          try {
            filterHousingList(values);
          } catch (e) {
            console.log(e);
          } finally {
            setSubmitting(false);
            hideModal();
          }
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="flex flex-col w-full sm:w-96 mx-auto items-center">
            {/* <div className="flex flex-col w-full mt-3 flex sm:hidden">
              <div className="uppercase text-gray-400 text-xs">Room Type</div>
              <Select
                name="room_type"
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={roomTypeOption}
                onChange={(option) => {
                  if (option) {
                    setFieldValue('room_type', option.value);
                    setFilters({
                      ...values,
                      room_type: option.value
                    });
                  }
                }}
                className="flex-1"
                placeholder="Room Type"
              />
            </div> */}

            <div className="flex flex-col w-full mt-3 flex sm:hidden">
              <div className="uppercase text-gray-400 text-xs">Campus Area</div>
              <Select
                name="campus_area"
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={campusAreaOption}
                onChange={(option) => {
                  if (option) {
                    setFieldValue('campus_area', option.value);
                    setFilters({
                      ...values,
                      campus_area: option.value
                    });
                  }
                }}
                className="flex-1"
                placeholder="Campus Area"
              />
            </div>

            <div className="flex flex-col w-full flex sm:hidden mt-3">
              <div className="uppercase text-gray-400 text-xs">Date</div>
              <div className="flex flex-col items-center">
                <Field
                  className="focus:outline-none border rounded-md py-2 px-1 w-full"
                  name="rent_start_date"
                  type="date"
                  onChange={(event) => {
                    setFieldValue('rent_start_date', event.target.value);
                    setFilters({
                      ...values,
                      rent_start_date: event.target.value
                    });
                  }}
                />
                <Icon icon={['far', 'arrow-down']} className="mt-1 mb-1" />
                <Field
                  className="focus:outline-none border rounded-md py-2 px-1 w-full"
                  name="rent_end_date"
                  type="date"
                  onChange={(event) => {
                    setFieldValue('rent_end_date', event.target.value);
                    setFilters({
                      ...values,
                      rent_end_date: event.target.value
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col w-full mt-3">
              <div className="uppercase text-gray-400 text-xs">Bathrooms</div>
              <Field
                className="focus:outline-none border rounded-md py-2 px-3"
                name="bathrooms"
                type="number"
                onChange={(event) => {
                  setFieldValue('bathrooms', parseInt(event.target.value));
                  setFilters({
                    ...values,
                    bathrooms: parseInt(event.target.value)
                  });
                }}
                placeholder="Number of Bathrooms"
              />
            </div>
            <div className="flex flex-col w-full mt-3">
              <div className="uppercase text-gray-400 text-xs">Roommates</div>
              <Field
                className="focus:outline-none border rounded-md py-2 px-3"
                name="roommates"
                type="number"
                onChange={(event) => {
                  setFieldValue('roommates', parseInt(event.target.value));
                  setFilters({
                    ...values,
                    roommates: parseInt(event.target.value)
                  });
                }}
                placeholder="Number of Roommates"
              />
            </div>
            <div className="flex flex-col w-full mt-3">
              <div className="uppercase text-gray-400 text-xs">Max Price</div>
              <Slider
                min={0}
                max={10000}
                tooltip={false}
                value={values.max_price}
                format={formatDollar}
                onChange={(val) => {
                  setFieldValue('max_price', val);
                  setFilters({
                    ...activeFilters,
                    max_price: val
                  });
                }}
                name="max_price"
              />
              <div className="mx-auto flex justify-center items-center text-xl text-gray-700 p-2">
                $ {values.max_price}
              </div>
            </div>
            <button
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-purple-900 uppercase transition bg-transparent border-2 border-purple-900 rounded-full ripple hover:bg-purple-50 focus:outline-none mt-6 w-full"
              type="submit"
            >
              Apply
            </button>
          </Form>
        )}
      </Formik>
    </Styled.Wrapper>
  );
};

const mapStateToProps = (state) => ({
  activeFilters: state.housing.activeFilters
});

const mapDispatchToProps = (dispatch) => ({
  filterHousingList: (formData) => {
    dispatch(filterHousingListAction(formData));
  },
  setFilters: (data) => {
    dispatch(setFilters(data));
  },
  hideModal: () => dispatch(hideModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
