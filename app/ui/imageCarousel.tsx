'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const ImageCarousel = ({
  images,
  className,
}: {
  images: Array<string>;
  className: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className={className}>
      <div className="relative flex justify-center overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          width={1040}
          height={1560}
          alt={`Slide ${currentImageIndex}`}
          className="w-full rounded-md object-contain"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAFElEQVR42mP8uLrtPwMewDgUFAAATUoSzSn9j6YAAAAASUVORK5CYII="
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
