import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  fab,
  faLinkedin,
  faFacebookSquare,
  faGoogle,
  faRedditSquare,
  faTwitterSquare,
  faGithubAlt
} from '@fortawesome/free-brands-svg-icons';
import {
  faBadgeCheck,
  faCheck,
  faBedAlt,
  faBath,
  faHandshake,
  faWifi,
  faTv,
  faParkingCircle,
  faAirConditioner,
  faWasher,
  faDryer,
  faMicrowave,
  faCoffee,
  faOven,
  faFireplace,
  faRefrigerator,
  faArrowSquareLeft,
  faArrowSquareRight,
  faHeart,
  faLongArrowRight,
  faBookmark
} from '@fortawesome/pro-light-svg-icons';
import {
  faWalking,
  faCalendar,
  faChevronSquareLeft,
  faChevronSquareRight,
  faDollarSign,
  faExpandWide,
  faTag,
  faSearch,
  faPlus,
  faArrowDown
} from '@fortawesome/pro-regular-svg-icons';
import {
  faHeart as faSolidHeart,
  faMinusCircle,
  faBookmark as faSolidBookmark
} from '@fortawesome/pro-solid-svg-icons';
import {
  faMapMarkedAlt,
  faAngleRight,
  faUserCircle,
  faCheckCircle,
  faHandsHelping,
  faCloudUploadAlt,
  faQuoteLeft,
  faQuoteRight,
  faEdit,
  faExclamationCircle,
  faUserFriends,
  faCalendarCheck
} from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* add any additional icon to the library */
library.add(
  // fab icons
  fab,
  faLinkedin,
  faGithubAlt,
  faFacebookSquare,
  faGoogle,
  faRedditSquare,
  faTwitterSquare,
  // pro-light icons
  faBadgeCheck,
  faCheck,
  faBedAlt,
  faBath,
  faHandshake,
  faWifi,
  faTv,
  faParkingCircle,
  faAirConditioner,
  faWasher,
  faDryer,
  faMicrowave,
  faCoffee,
  faOven,
  faFireplace,
  faRefrigerator,
  faArrowSquareLeft,
  faArrowSquareRight,
  faSolidHeart,
  faLongArrowRight,
  faBookmark,
  // pro-solid icons
  faHeart,
  faMinusCircle,
  faSolidBookmark,
  // pro-regular icons
  faWalking,
  faCalendar,
  faChevronSquareRight,
  faChevronSquareLeft,
  faDollarSign,
  faExpandWide,
  faTag,
  faSearch,
  faPlus,
  faArrowDown,
  // pro-duotone icons
  faMapMarkedAlt,
  faAngleRight,
  faUserCircle,
  faCheckCircle,
  faHandsHelping,
  faCloudUploadAlt,
  faQuoteLeft,
  faQuoteRight,
  faEdit,
  faExclamationCircle,
  faUserFriends,
  faCalendarCheck
);

const Icon = ({ ...props }) => <FontAwesomeIcon {...props} />;

export default Icon;
