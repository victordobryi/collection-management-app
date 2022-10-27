import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface ILazyLoad {
  image: string;
  className: string;
  onClick?: () => void;
}

const LazyLoadImg = ({ image, className, onClick }: ILazyLoad) => {
  return (
    <LazyLoadImage
      key={image}
      src={
        image ||
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'
      }
      alt={image}
      placeholderSrc={image}
      effect="blur"
      className={className}
      onClick={onClick}
    />
  );
};

export default LazyLoadImg;
