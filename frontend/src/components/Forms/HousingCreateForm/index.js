import StepZero from './StepZero';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import Review from './Review';

const renderStep = (step, values, errors, touched, setFieldValue, setStep) => {
  switch (step) {
    case 0:
      return <StepZero />;
    case 1:
      return <StepOne />;
    case 2:
      return <StepTwo setFieldValue={setFieldValue} />;
    case 3:
      return <StepThree setFieldValue={setFieldValue} values={values} />;
    case 4:
      return <StepFour setFieldValue={setFieldValue} values={values} />;
    case 5:
      return <StepFive setFieldValue={setFieldValue} values={values} />;
    case 6:
      return <Review values={values} setStep={setStep} errors={errors} />;
    default:
      return <StepOne />;
  }
};

export default renderStep;
