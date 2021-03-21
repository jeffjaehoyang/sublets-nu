import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const StepThree = ({ setFieldValue, values }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [start, setStart] = useState(values.rent_start_date || null);
  const [end, setEnd] = useState(values.rent_end_date || null);
  const orientation = window.matchMedia('(max-width: 700px)').matches ? 'vertical' : 'horizontal';
  return (
    <>
      <div className="sm:mx-auto text-center font-bold text-lg sm:text-xl mb-6">
        Please provide the start and end dates of your listing
      </div>
      <div className="mx-auto">
        <DateRangePicker
          startDate={start}
          startDateId="startDate"
          endDate={end}
          endDateId="endDate"
          onDatesChange={({ startDate, endDate }) => {
            setStart(startDate);
            setEnd(endDate);
            setFieldValue('rent_start_date', startDate);
            setFieldValue('rent_end_date', endDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          orientation={orientation}
          withPortal={orientation === 'vertical'}
        />
      </div>
      <ErrorMessage className="text-red-500 text-xs" component="div" name="rent_end_date" />
    </>
  );
};

export default StepThree;
