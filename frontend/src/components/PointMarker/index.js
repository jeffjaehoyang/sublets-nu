import React from 'react';
import Icon from '../../icons';
import * as Styled from './styles';
import { useHistory } from 'react-router-dom';

const PointMarker = ({ housing, text, tooltip, renderHomeMarker, hoveredHousing }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/housing/${housing.id}`);
  };

  return renderHomeMarker ? (
    <img src="/images/home_marker.png" alt="home marker" style={{ width: '80px', height: '80px' }} />
  ) : (
    <Styled.Marker onClick={handleClick} hovered={housing.id === hoveredHousing}>
      <strong title={tooltip}>${text}</strong>
      <Icon icon={['far', 'tag']} style={{ marginLeft: '3px' }} />
    </Styled.Marker>
  );
};

export default PointMarker;
