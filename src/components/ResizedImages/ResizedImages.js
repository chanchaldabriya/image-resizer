import React from "react";
import "./ResizedImages.css";
import { useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import { RESIZE_DIMENSIONS } from "../../util/Constants";

/* importing CLOUD CONFIG */
import cloud from "../../config/cloud";
const { cloud_name } = cloud;

const ResizedImages = () => {
  let { image } = useParams();
  return (
    <div className="ResizedImages">
      {RESIZE_DIMENSIONS.map(({ WIDTH, HEIGHT, NAME }) => (
        <div className="ResizedImages-image" key={NAME}>
          <h2 className="ResizedImages-title">{NAME}</h2>
          <Image
            cloudName={cloud_name}
            publicId={image}
            width={WIDTH}
            height={HEIGHT}
            crop="fill"
          />
        </div>
      ))}
    </div>
  );
};

export default ResizedImages;
