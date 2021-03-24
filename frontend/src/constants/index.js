import styled from 'styled-components';

export const GA_TRACKING_ID = 'UA-170622682-2';

export const CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID;
export const CLIENT_SECRET = process.env.REACT_APP_OAUTH_CLIENT_SECRET;
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const AWS_API_ENDPOINT = process.env.REACT_APP_AWS_API_ENDPOINT;

export const BLUR_SIZE = '50x50';
export const THUMBNAIL_SIZE = '400x400';
export const MIDDLE_DEFINITION_SIZE = '1000x1000';
export const HIGH_DEFINITION_SIZE = '2000x2000';

export const stepToFieldMap = {
  1: ['title'],
  2: ['street_address', 'city', 'zipcode', 'street_address_is_open'],
  3: ['rent_start_date', 'rent_end_date'],
  4: ['price', 'room_type', 'roommates', 'bathrooms', 'description', 'amenities', 'is_negotiable'],
  5: ['images']
};

export const fieldToLabelMap = {
  title: 'Title',
  street_address: 'Street Address',
  city: 'City',
  zipcode: 'Zipcode',
  street_address_is_open: 'Disclose street address to public',
  rent_start_date: 'Rent Start Date',
  rent_end_date: 'Rent End Date',
  price: 'Price',
  is_negotiable: 'Open to negotiation',
  room_type: 'Room Type',
  roommates: 'Number of Roommates',
  bathrooms: 'Number of bathrooms',
  description: 'Description',
  amenities: 'Amenities',
  images: 'Images'
};
export const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

export const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
  position: 'relative'
};

export const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

export const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
  objectFit: 'cover'
};

export const DropzoneContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 4px;
  border-color: lavender;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const amenitiesMap = {
  1: 'Wifi',
  2: 'TV',
  3: 'Parking',
  4: 'Air Conditioning',
  5: 'Washer',
  6: 'Dryer',
  7: 'Microwave',
  8: 'Coffee Machine',
  9: 'Oven',
  10: 'Heater',
  11: 'Refrigerator'
};

export const campusAreaOption = [
  { value: '', label: 'All' },
  { value: 'North Campus', label: 'North Campus' },
  { value: 'Mid Campus', label: 'Mid Campus' },
  { value: 'South Campus', label: 'South Campus' }
];

export const roomTypeOption = [
  { value: '', label: 'All' },
  { value: 'Studio', label: 'Studio' },
  { value: '1 Bedroom', label: '1 Bedroom' },
  { value: '2 Bedroom', label: '2 Bedroom' },
  { value: '3 Bedroom', label: '3 Bedroom' },
  { value: '4 Bedroom', label: '4 Bedroom' },
  { value: '5 Bedroom', label: '5 Bedroom' }
];

export const roomTypeMapping = {
  Studio: 'Studio',
  '1 Bedroom': '1 BR',
  '2 Bedroom': '2 BR',
  '3 Bedroom': '3 BR',
  '4 Bedroom': '4 BR',
  '5 Bedroom': '5 BR'
};

export const googleMapStyle = [
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        hue: '#6600ff'
      },
      {
        saturation: -11
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        saturation: -50
      },
      {
        hue: '#6600ff'
      },
      {
        lightness: 0
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        hue: '#5e00ff'
      },
      {
        saturation: -79
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'all',
    stylers: [
      {
        lightness: 30
      },
      {
        weight: 1.3
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        hue: '#5e00ff'
      },
      {
        saturation: -16
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'all',
    stylers: [
      {
        saturation: -72
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        saturation: -65
      },
      {
        hue: '#1900ff'
      },
      {
        lightness: 8
      }
    ]
  }
];

export const createMapOptions = (maps) => {
  return {
    zoomControl: true,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: googleMapStyle
  };
};

export const warningRed = '#DB4437';
