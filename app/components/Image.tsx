import React from "react";
import type { FitEnum } from "sharp";

export interface ImageProps {
  src: string; // a path within the assets/images directory, can be a nested path
  width?: number; // either width or height is required
  height?: number;
  fit?: keyof FitEnum; // contain is default
  alt?: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, width, height, fit, ...other }) => {
  const query = new URLSearchParams();
  width && query.set("w", width.toString());
  height && query.set("h", height.toString());
  fit && query.set("fit", fit);
  return (
    <img
      src={`/assets/resize/${src}?${query.toString()}`}
      {...{ width, height, ...other }}
    />
  );
}

export default Image;
