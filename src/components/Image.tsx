"use client";

import NextImage, { ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = ImageProps & {
  fallbackSrc?: string;
};

const Image = ({ src, alt, fallbackSrc, ...props }: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <NextImage
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => fallbackSrc && setImgSrc(fallbackSrc)}
      placeholder="blur"
    />
  );
};

export default Image;
