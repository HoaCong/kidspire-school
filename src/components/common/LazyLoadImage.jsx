/* eslint-disable react-hooks/exhaustive-deps */
import NoImage from "assets/images/No-Image-Placeholder.png";
import React, { useEffect, useState } from "react";

function useLazyLoadImage(src, defaultImage) {
  const [imageSrc, setImageSrc] = useState(defaultImage);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    console.log("useEffect  image:", image);

    image.onload = () => {
      setImageSrc(src);
      setLoaded(true);
    };

    image.onerror = () => {
      setLoaded(true);
      setImageSrc(defaultImage);
    };
  }, []);

  return { imageSrc, isLoaded };
}

function LazyLoadImage({ src, alt, ...restProps }) {
  const { imageSrc } = useLazyLoadImage(src, NoImage);

  return <img src={imageSrc} alt={alt} {...restProps} />;
}

export default LazyLoadImage;
