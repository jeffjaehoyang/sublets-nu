import React from 'react';
import { Field, ErrorMessage } from 'formik';

const StepOne = () => {
  return (
    <>
      <label htmlFor="title" className="sm:mx-auto font-bold text-lg sm:text-xl mb-6">
        What would you like the title of your listing to be?
      </label>
      <Field
        className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
        name="title"
        placeholder="Cozy Room in Downtown Evanston"
        type="text"
      />
      <ErrorMessage className="text-red-500 text-xs" component="div" name="title" />
    </>
  );
};

export default StepOne;
