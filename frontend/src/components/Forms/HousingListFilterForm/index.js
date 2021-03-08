import React, { useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as Styled from './styles';
import { connect } from 'react-redux';
import { filterHousingListAction, setFilters } from '../../../actions/housing';
import { Formik, Form, Field } from 'formik';
import Icon from '../../../icons';
import { campusAreaOption, roomTypeOption } from '../../../constants';
import { showModal } from '../../../actions/modal';
const animatedComponents = makeAnimated();

const HousingListFilter = ({ housingList, filterHousingList, showModal, setFilters, activeFilters }) => {
  const campusAreaSelectRef = useRef(null);
  const roomTypeSelectRef = useRef(null);
  const formData = {
    campus_area: activeFilters.campus_area || '',
    room_type: activeFilters.room_type || '',
    rent_start_date: activeFilters.rent_start_date || '',
    rent_end_date: activeFilters.rent_end_date || ''
  };

  const openFilterForm = () => {
    showModal({ open: true }, 'filter');
  };

  return (
    <Styled.Wrapper>
      <Formik
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          try {
            filterHousingList(values);
          } catch (e) {
            console.log(e);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="flex flex-row w-full mx-auto items-center">
            <div className="flex flex-col flex-1 flex">
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
                value={roomTypeOption.filter((option) => option.label === activeFilters.room_type)}
                className="flex-1 mr-3"
                placeholder="Room Type"
                ref={roomTypeSelectRef}
              />
            </div>
            <div className="flex flex-col flex-1 hidden sm:flex">
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
                value={campusAreaOption.filter((option) => option.label === activeFilters.campus_area)}
                className="flex-1 mr-3"
                placeholder="Campus Area"
                ref={campusAreaSelectRef}
              />
            </div>
            <div className="flex flex-col flex-1 hidden sm:flex">
              <div className="uppercase text-gray-400 text-xs">Date</div>
              <div className="flex flex-row items-center">
                <Field
                  className="focus:outline-none border rounded-md py-2 px-2 mr-3"
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
                <Icon icon={['fal', 'long-arrow-right']} className="mr-3" />
                <Field
                  className="focus:outline-none border rounded-md py-2 px-2 mr-3"
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
            <button
              className="bg-purple-900 text-white uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-3 self-end"
              type="submit"
            >
              <Icon icon={['far', 'search']} style={{ width: '25.5px', height: '25.5px' }} />
            </button>
            <button
              className="hidden sm:inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-purple-900 uppercase transition bg-transparent border-2 border-purple-900 rounded-full ripple hover:bg-purple-50 focus:outline-none self-end mr-3"
              type="button"
              onClick={() => {
                values = {
                  campus_area: '',
                  room_type: '',
                  rent_start_date: '',
                  rent_end_date: ''
                }; // set values back to initial state
                filterHousingList(values);
                campusAreaSelectRef.current.select.clearValue();
                roomTypeSelectRef.current.select.clearValue();
                setFieldValue('rent_start_date', '');
                setFieldValue('rent_end_date', '');
                setFilters(values);
              }}
            >
              Clear All
            </button>
            <button
              className="hidden sm:inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-purple-900 uppercase transition bg-transparent border-2 border-purple-900 rounded-full ripple hover:bg-purple-50 focus:outline-none self-end"
              type="button"
              onClick={openFilterForm}
            >
              More Filters
            </button>
            <button
              className="inline-block sm:hidden px-6 py-2 text-xs font-medium leading-6 text-center text-purple-900 uppercase transition bg-transparent border-2 border-purple-900 rounded-full ripple hover:bg-purple-50 focus:outline-none self-end"
              type="button"
              onClick={openFilterForm}
            >
              More
            </button>
          </Form>
        )}
      </Formik>
    </Styled.Wrapper>
  );
};

const mapStateToProps = (state) => ({
  housingList: state.housing.housingList,
  activeFilters: state.housing.activeFilters
});

const mapDispatchToProps = (dispatch) => ({
  filterHousingList: (formData) => {
    dispatch(filterHousingListAction(formData));
  },
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  },
  setFilters: (data) => {
    dispatch(setFilters(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HousingListFilter);
