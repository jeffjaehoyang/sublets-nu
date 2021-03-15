import React, { useState, useEffect, useRef } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../constants';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

const AddressAutocomplete = ({ setFieldValue }) => {
  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
      types: ['geocode'],
      componentRestrictions: { country: 'us' }
    });
    autoComplete.setFields(['address_components', 'formatted_address']);
    autoComplete.addListener('place_changed', () => {
      handlePlaceSelect(updateQuery);
      fillInAddress();
    });
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
  }

  const fillInAddress = () => {
    // Get the place details from the autocomplete object.
    const place = autoComplete.getPlace();
    const addressArray = place.formatted_address.split(',');
    const [streetAddress, cityName, state, country] = addressArray;
    setFieldValue('street_address', streetAddress);
    setFieldValue('city', cityName.trim());
    const [stateAbbr, zipcode] = state.trim().split(' ');
    setFieldValue('zipcode', zipcode.trim());
  };

  useEffect(() => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`, () =>
      handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <input
        className="focus:outline-none border-2 border-gray-800 mt-3 py-2 px-3 text-grey-darkest w-full"
        name="street_address"
        placeholder="Search Your Street Address"
        type="text"
        ref={autoCompleteRef}
        onChange={handleChange}
        value={query}
      />
    </>
  );
};

export default AddressAutocomplete;
