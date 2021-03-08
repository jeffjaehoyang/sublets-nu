import React from 'react';
import { Field, ErrorMessage } from 'formik';
import AddressAutocomplete from '../../AddressAutocomplete';

const StepTwo = ({ setFieldValue }) => {
  return (
    <>
      <div className="sm:mx-auto font-bold text-lg sm:text-xl mb-6">
        Please provide the address details of your listing
      </div>
      <AddressAutocomplete setFieldValue={setFieldValue} />
      <label className="mt-3" htmlFor="street_address">
        Street Address
      </label>
      <Field
        className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
        name="street_address"
        placeholder="633 Clark St"
        type="text"
      />
      <ErrorMessage className="text-red-500 text-xs" component="div" name="street_address" />

      <label className="mt-3" htmlFor="city">
        City
      </label>
      <Field className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest" name="city" type="text" />
      <ErrorMessage className="text-red-500 text-xs" component="div" name="city" />

      <label className="mt-3" htmlFor="zipcode">
        Zipcode
      </label>
      <Field className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest" name="zipcode" type="text" />
      <ErrorMessage className="text-red-500 text-xs" component="div" name="zipcode" />

      <div className="mt-3 flex flex-row items-center">
        <Field className="mr-3 h-5 w-5 text-purple-600" name="street_address_is_open" type="checkbox" />
        <label htmlFor="street_address_is_open">I agree to make the street address above publically available</label>
      </div>

      <ErrorMessage className="text-red-500 text-xs" component="div" name="street_address_is_open" />
    </>
  );
};

export default StepTwo;
