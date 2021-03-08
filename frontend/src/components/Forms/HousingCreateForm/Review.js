import React from 'react';
import styled from 'styled-components';
import Icon from '../../../icons';
import {
  stepToFieldMap,
  fieldToLabelMap,
  amenitiesMap,
  thumbsContainer,
  thumb,
  thumbInner,
  img
} from '../../../constants';
import { ErrorMessage } from 'formik';
import { Fragment } from 'react';

const FormPartContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #cacbcd;
  border-radius: 4px;
  position: relative;
`;

const FormStepContainer = styled.div`
  font-weight: bold;
`;

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  margin-top: 5px;
`;

const EditButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Review = ({ values, setStep, errors }) => {
  const handleClick = (step) => {
    setStep(step);
  };
  const thumbs = values.images?.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.preview} />
      </div>
    </div>
  ));
  return (
    <>
      <div className="sm:mx-auto font-bold text-lg sm:text-xl mb-6">Is the Following Information Correct?</div>
      {Object.entries(stepToFieldMap).map(([step, fields]) => {
        return (
          <FormPartContainer key={step}>
            <FormStepContainer>{`Step ${step}`}</FormStepContainer>
            <FormFieldContainer>
              {fields.map((field) => {
                switch (field) {
                  case 'street_address_is_open':
                    return (
                      <Fragment key={field}>
                        <FormField>
                          <p>
                            You <strong>{values[field] ? 'agreed' : 'disagreed'}</strong> to disclose street address to
                            public
                          </p>
                        </FormField>
                      </Fragment>
                    );
                  case 'is_negotiable':
                    return (
                      <FormField key={field}>
                        <p>
                          You are <strong>{values[field] ? 'open' : 'not open'}</strong> to negotiation
                        </p>
                      </FormField>
                    );
                  case 'images':
                    return (
                      <Fragment key={field}>
                        <aside style={thumbsContainer}>{thumbs}</aside>
                        <ErrorMessage className="text-red-500 text-xs" component="div" name={field} />
                      </Fragment>
                    );
                  case 'amenities':
                    return (
                      <FormField key={field}>
                        {fieldToLabelMap[field]}:&nbsp;
                        {values[field].map((pk, idx) => {
                          return `${amenitiesMap[pk]}${idx < values[field].length - 1 ? ', ' : ''}`;
                        })}
                      </FormField>
                    );
                  default:
                    return (
                      <Fragment key={field}>
                        <FormField>{`${fieldToLabelMap[field]}: ${values[field]}`}</FormField>
                        <ErrorMessage className="text-red-500 text-xs" component="div" name={field} />
                      </Fragment>
                    );
                }
              })}
            </FormFieldContainer>
            <EditButton onClick={() => handleClick(parseInt(step))}>
              <Icon icon={['fad', 'edit']} style={{ height: '25px', width: '25px' }} />
            </EditButton>
          </FormPartContainer>
        );
      })}
    </>
  );
};

export default Review;
