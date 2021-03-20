import React from 'react';
import useProgressiveImg from '../../hooks/useProgressiveImg';

const ProgressiveImg = ({ smallSrc, largeSrc, alt }) => {
  const [src, { blur }] = useProgressiveImg(smallSrc, largeSrc);

  return (
    <img
      src={src}
      style={{
        filter: blur ? 'blur(20px)' : 'none',
        transition: blur ? 'none' : 'filter 0.3s ease-out'
      }}
      alt={alt}
    />
  );
};

export default ProgressiveImg;
