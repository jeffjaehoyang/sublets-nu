import React, { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { fetchAmenitiesList } from '../../../api';

const animatedComponents = makeAnimated();

const StepFour = ({ setFieldValue, values }) => {
  const [amenities, setAmenities] = useState([]);
  useEffect(() => {
    fetchAmenitiesList().then((res) => {
      const amenitiesOptions = res.map((obj) => {
        return {
          value: obj.id,
          label: obj.name
        };
      });
      setAmenities(amenitiesOptions);
    });
  }, []);

  return (
    <>
      <div className="sm:mx-auto font-bold text-lg sm:text-xl mb-6">Please provide further details of your listing</div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col mr-4">
          <label htmlFor="price">Price</label>
          <Field
            className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
            name="price"
            placeholder="1000"
            type="number"
          />
          <ErrorMessage className="text-red-500 text-xs" component="div" name="price" />
        </div>

        <div className="mt-3 flex flex-row items-center">
          <Field className="mr-3 h-5 w-5 text-purple-600" name="is_negotiable" type="checkbox" />
          <label htmlFor="is_negotiable">I am open to negotiation</label>
        </div>
      </div>

      <label className="mt-3" htmlFor="room_type">
        Room Type
      </label>
      <Field className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest" name="room_type" as="select">
        <option value="">Select a room type</option>
        <option value="Studio">Studio</option>
        <option value="1 Bedroom">1 Bedroom</option>
        <option value="2 Bedroom">2 Bedroom</option>
        <option value="3 Bedroom">3 Bedroom</option>
        <option value="4 Bedroom">4 Bedroom</option>
        <option value="5 Bedroom">5 Bedroom</option>
      </Field>
      <ErrorMessage className="text-red-500 text-xs" component="div" name="room_type" />

      <label className="mt-3" htmlFor="roommates">
        How many roommates?
      </label>
      <Field
        className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
        name="roommates"
        placeholder="Number of roommates"
        type="number"
      />
      <ErrorMessage className="text-red-500 text-xs" component="div" name="roommates" />

      <label className="mt-3" htmlFor="bathrooms">
        How many bathrooms?
      </label>
      <Field
        className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
        name="bathrooms"
        placeholder="Number of bathrooms"
        type="number"
      />
      <ErrorMessage className="text-red-500 text-xs" component="div" name="bathrooms" />

      <label className="mt-3" htmlFor="description">
        Description
      </label>
      <Field
        className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
        name="description"
        placeholder="Please provide a detailed description of your place in general, including additional charges, rules, etc. The more details the better!"
        type="text"
        as="textarea"
        rows="5"
      />
      <ErrorMessage className="text-red-500 text-xs" component="div" name="description" />

      <label className="mt-3" htmlFor="amenities">
        Amenities
      </label>
      <Select
        name="amenities"
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={amenities}
        onChange={(option) => {
          setFieldValue(
            'amenities',
            option.map((amenity) => amenity.value)
          );
        }}
        isMulti
      />
    </>
  );
};

export default StepFour;
