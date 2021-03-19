import React, { useState, useEffect } from 'react';
import { createHousing, fetchHousingDetail, fetchHousingList, updateHousing } from '../api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Dropzone from 'react-dropzone';
import Select from 'react-select';
import * as Yup from 'yup';
import HousingCreateContainer from '../components/Container/HousingCreateContainer';
import { Redirect } from 'react-router-dom';
import { LoaderWrapper } from '../components/HousingDetailContent/styles';
import Loader from 'react-loader-spinner';
import { fetchHousingListAction } from '../actions/housing';
import makeAnimated from 'react-select/animated';
import { fetchAmenitiesList } from '../api';
import { DropzoneContainer, thumb, thumbsContainer, thumbInner, img } from '../constants';
import store from '../context/store';
import Icon from '../icons';
import { useLocation } from 'react-router-dom';
import AddressAutocomplete from '../components/AddressAutocomplete';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

const animatedComponents = makeAnimated();

const HousingCreateForm = () => {
  // const [imageMain, setImageMain] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [createdHousing, setCreatedHousing] = useState(null);
  const [fireRedirect, setFireRedirect] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedImages, setSelectedImages] = useState(null);
  const [toDelete, setToDelete] = useState([]);
  const [housing, setHousing] = useState(null);
  const [formData, setFormData] = useState({
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
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const pathname = useLocation();

  useEffect(() => {
    const pathnameArray = pathname.pathname.split('/');
    const housingId = pathnameArray[pathnameArray.length - 1];
    fetchHousingDetail(housingId).then((res) => {
      setHousing(res);
    });
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

  useEffect(() => {
    setSelectedImages(housing?.images);
    setSelectedAmenities(
      housing?.amenities.map((amenity) => {
        return {
          value: amenity.id,
          label: amenity.name
        };
      })
    );
    setFormData({
      title: housing?.title,
      city: housing?.city,
      street_address: housing?.street_address,
      street_address_is_open: housing?.street_address_is_open,
      is_negotiable: housing?.is_negotiable,
      zipcode: housing?.zipcode,
      price: housing?.price,
      rent_start_date: housing?.rent_start_date,
      rent_end_date: housing?.rent_end_date,
      room_type: housing?.room_type,
      roommates: housing?.roommates,
      bathrooms: housing?.bathrooms,
      description: housing?.description,
      images: housing?.images,
      deleteFromOriginal: [],
      amenities: housing?.amenities.map((amenity) => amenity.id)
    });
    setStart(moment(housing?.rent_start_date, 'YYYY-MM-DD'));
    setEnd(moment(housing?.rent_end_date, 'YYYY-MM-DD'));
  }, [housing]);
  const orientation = window.matchMedia('(max-width: 700px)').matches ? 'vertical' : 'horizontal';

  const handleDelete = (values, file) => {
    values.images = values.images.filter((item) => item !== file);
    setSelectedImages(values.images);
    if (file.img && file.id) {
      // HousingImage already exists
      setToDelete([...toDelete, file.id]);
    }
  };

  return (
    <>
      {!isUploading && housing && (
        <Formik
          initialValues={formData}
          enableReinitialize={true}
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
              values.deleteFromOriginal = toDelete;
              if (typeof values.rent_start_date !== 'string') {
                values.rent_start_date = values.rent_start_date.format('YYYY-MM-DD');
              }
              if (typeof values.rent_end_date !== 'string') {
                values.rent_end_date = values.rent_end_date.format('YYYY-MM-DD');
              }
              updateHousing(values, housing.id).then((updatedHousing) => {
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
              <div className="sm:mx-auto font-bold text-lg sm:text-xl mb-6">Edit Your Listing</div>
              <>
                <label className="mt-3" htmlFor="title">
                  Title
                </label>
                <Field
                  className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
                  name="title"
                  placeholder="Cozy Room in Downtown Evanston"
                  type="text"
                />
                <ErrorMessage className="text-red-500 text-xs" component="div" name="title" />
              </>
              <>
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
                <Field
                  className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
                  name="city"
                  type="text"
                />
                <ErrorMessage className="text-red-500 text-xs" component="div" name="city" />
                <label className="mt-3" htmlFor="zipcode">
                  Zipcode
                </label>
                <Field
                  className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
                  name="zipcode"
                  type="text"
                />
                <ErrorMessage className="text-red-500 text-xs" component="div" name="zipcode" />
                <div className="mt-3 flex flex-row items-center">
                  <Field className="mr-3 h-5 w-5 text-purple-600" name="street_address_is_open" type="checkbox" />
                  <label htmlFor="street_address_is_open">
                    I agree to make the street address above publically available
                  </label>
                </div>
                <ErrorMessage className="text-red-500 text-xs" component="div" name="street_address_is_open" />
              </>
              <>
                <label className="mt-3" htmlFor="rent_start_date">
                  Dates
                </label>
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
                {/* <label className="mt-3" htmlFor="rent_start_date">
                  Rent Start Date
                </label>
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
                <ErrorMessage className="text-red-500 text-xs" component="div" name="rent_end_date" /> */}
              </>
              <>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col mr-4 mt-3">
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
                <Field
                  className="focus:outline-none border rounded-md py-2 px-3 text-grey-darkest"
                  name="room_type"
                  as="select"
                >
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
                    setSelectedAmenities(
                      option.map((amenity) => {
                        return {
                          value: amenity.value,
                          label: amenity.label
                        };
                      })
                    );
                  }}
                  value={selectedAmenities}
                  isMulti
                />
              </>
              <>
                <label className="mt-3" htmlFor="images">
                  Images
                </label>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    if (acceptedFiles.length === 0) {
                      return;
                    }
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file)
                      })
                    );
                    for (const f of acceptedFiles) {
                      values.images.push(f);
                    }
                    setFieldValue('images', values.images);
                  }}
                  accept="image/jpeg, image/png"
                  minSize={0}
                  multiple
                >
                  {({ getRootProps, getInputProps, isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                    const thumbs = selectedImages?.map((file) => {
                      return (
                        <div style={thumb} key={file.id || file.name}>
                          <div style={thumbInner}>
                            <img src={file.img || file.preview} style={img} alt={file.img || file.preview} />
                          </div>
                          <Icon
                            icon={['fas', 'minus-circle']}
                            style={{
                              position: 'absolute',
                              top: '-5px',
                              right: '-5px',
                              color: '#ea4235',
                              width: '20px',
                              height: '20px'
                            }}
                            onClick={() => handleDelete(values, file)}
                          />
                        </div>
                      );
                    });
                    return (
                      <>
                        <DropzoneContainer {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Icon icon={['fad', 'cloud-upload-alt']} style={{ height: '50px', width: '50px' }} />
                          {!isDragActive && 'Click here or drop a file to upload!'}
                          {isDragActive && !isDragReject && "Drop it like it's hot!"}
                          {isDragReject && 'File type not accepted, sorry!'}
                        </DropzoneContainer>
                        <aside style={thumbsContainer}>{thumbs}</aside>
                      </>
                    );
                  }}
                </Dropzone>
                <ErrorMessage className="text-red-500 text-xs" component="div" name="images" />
              </>
              <button
                className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-purple-900 uppercase transition bg-transparent border-2 border-purple-900 rounded-full ripple hover:bg-purple-50 focus:outline-none mt-6 mb-20"
                type="submit"
              >
                UPDATE
              </button>
            </Form>
          )}
        </Formik>
      )}
      {(isUploading || !housing) && (
        <LoaderWrapper>
          <Loader type="Oval" color="#4d1d95" height={50} width={50} timeout={3000} />
        </LoaderWrapper>
      )}
      {fireRedirect && <Redirect to={`/housing/${housing.id}`} />}
    </>
  );
};

const HousingEdit = (props) => {
  return (
    <HousingCreateContainer>
      <HousingCreateForm />
    </HousingCreateContainer>
  );
};

export default HousingEdit;
