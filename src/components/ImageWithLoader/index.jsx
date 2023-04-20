import { useState } from "react";
import { Bars } from "react-loader-spinner";
import cn from "classnames";

import "./styles.css";

const ImageWithLoader = ({ src, alt, className, onClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageErr, setIsImageErr] = useState(false);
  const onError = () => {
    setIsImageErr(true);
    setIsImageLoaded(false);
  };

  return (
    <div className={cn("cnImageWithLoaderRoot", className)}>
      {!isImageLoaded && (
        <div className="cnImageWithLoaderWrapper">
          {" "}
          {isImageErr ? (
            "err"
          ) : (
            <Bars color="#5F9EA0" width={15} height={15} />
          )}{" "}
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onClick={onClick}
        className={cn(
          "cnImageWithLoaderImg",
          isImageLoaded && "cnImageWithLoaderImgLoaded"
        )}
        onLoad={() => setIsImageLoaded(true)}
        onError={onError}
      />
    </div>
  );
};
export default ImageWithLoader;
