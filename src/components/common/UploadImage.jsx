import camera from "assets/images/camera.png";
import LazyLoadImage from "components/common/LazyLoadImage";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
const EnumGeometry = {
  rect: "rounded-0",
  radius: "rounded",
  circle: "rounded-circle",
};
function UploadImage({
  image,
  callback,
  geometry = "circle",
  size = { width: 150, height: 150 },
  classImage = "",
}) {
  const [file, setFile] = useState();
  useEffect(() => {
    setFile(image);
  }, [image]);

  function handleChange(e) {
    const url = URL.createObjectURL(e.target.files[0]);
    setFile(url);
    callback(url);
  }

  return (
    <>
      {file ? (
        <div>
          <LazyLoadImage
            src={file}
            alt="avatar"
            {...size}
            className={`${EnumGeometry[geometry]} p-2 shadow-sm ${classImage}`}
          />
        </div>
      ) : (
        <label
          htmlFor="uploadImage"
          className={`${EnumGeometry[geometry]} shadow-sm d-flex justify-content-center align-items-center text-center ${classImage}`}
          style={{
            ...size,
            cursor: "pointer",
            background: "#e1e1e1",
            border: "8px solid #ecebe8",
          }}
        >
          <div>
            <img
              src={camera}
              alt="camera"
              width={30}
              height="auto"
              className="opacity-50"
            />
            <div>
              <small className="text-black-50 opacity-75">Upload photo</small>
              <input
                id="uploadImage"
                type="file"
                onChange={handleChange}
                hidden
              />
            </div>
          </div>
        </label>
      )}
    </>
  );
}
UploadImage.propTypes = {
  src: PropTypes.string,
  callback: PropTypes.func,
};
export default UploadImage;
