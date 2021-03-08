import React from 'react';
import { Field, ErrorMessage } from 'formik';

const StepThree = () => {
  return (
    <>
      <div className="sm:mx-auto font-bold text-lg sm:text-xl mb-6">
        Please provide the start and end dates of your listing
      </div>
      <label htmlFor="rent_start_date">Rent Start Date</label>
      <Field
        className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
        name="rent_start_date"
        type="date"
      />
      <ErrorMessage className="text-red-500 text-xs" component="div" name="rent_start_date" />

      <label className="mt-3" htmlFor="rent_end_date">
        Rent End Date
      </label>
      <Field
        className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
        name="rent_end_date"
        type="date"
      />
      <ErrorMessage className="text-red-500 text-xs" component="div" name="rent_end_date" />
    </>
  );
};

export default StepThree;
