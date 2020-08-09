import React, { useState, useEffect } from "react";
import "./ImageUploader.css";
import { getFileDimensions, uploadImageToCloud } from "../../util/Util";
import { VALID_DIMENSIONS } from "../../util/Constants";

const ImageUploader = ({history}) => {
  const [imgFile, setImgFile] = useState(null);
  const [isUploaded, setUploaded] = useState(false);
  const [fileDetails, setFileDetails] = useState({
    width: 0,
    height: 0,
    isComputed: false,
  });

  const onFileChange = (event) => {
    // Update the imgFile state
    setImgFile(event.target.files[0]);
  };

  useEffect(() => {
    // update dimensions of file
    imgFile &&
      getFileDimensions(imgFile, ({ width, height }) =>
        setFileDetails({
          width,
          height,
          isComputed: true,
        })
      );
  }, [imgFile]);

  const uploadFile = () => {
    uploadImageToCloud(imgFile).then((resp) => {
      setUploaded(true);
    });
  };

  const isValidImage =
    fileDetails.width === VALID_DIMENSIONS.WIDTH &&
    fileDetails.height === VALID_DIMENSIONS.HEIGHT;

  return (
    <div className="ImageUploader">
      <h2>Upload image</h2>
      <h4>
        Upload image of size{" "}
        {`(${VALID_DIMENSIONS.WIDTH} X ${VALID_DIMENSIONS.HEIGHT})`} to
        resize...
      </h4>

      <div>
        <input
          type="file"
          className="ImageUploader-file"
          onChange={onFileChange}
          accept="image/*"
        />
        {fileDetails.isComputed && !isValidImage && (
          <p>Please upload a valid image</p>
        )}
      </div>

      <div>
        {fileDetails.isComputed && (
          <button
            className="ImageUploader-upload"
            onClick={uploadFile}
            disabled={!isValidImage}
          >
            Upload
          </button>
        )}
      </div>

      <p>or drop image here...</p>

      <div>{isUploaded && <button onClick={() => {
        debugger;
        history.push(`/resize/${imgFile.name}`);
      }}>Resize Image</button>}</div>
    </div>
  );
};

export default ImageUploader;
