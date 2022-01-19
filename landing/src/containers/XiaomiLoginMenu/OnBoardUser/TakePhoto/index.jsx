import React, { Fragment, useState } from "react";
import "react-html5-camera-photo/build/css/index.css";
import ImagePreview from "../ImagePreview";
import Button from "common/components/Button";
import TakePhotoWrapper, { PermissionWrapper } from "./style";
import Webcam from "react-webcam";
import { isMobile } from "react-device-detect";

const TakePhoto = ({
  phone,
  accessToken,
  name,
  backend_name,
  closeCamera,
  selectedProduct,
  document_sequence,
  userProductId,
  refresh,
}) => {
  const [dataUri, setDataUri] = useState("");
  const [permissionError, setPermissionError] = useState(false);
  const webcamRef = React.useRef(null);
  const videoConstraints = {
    width: isMobile ? 375 : 640,
    height: isMobile ? 350 : 370,
    facingMode: backend_name == "Selfie" ? "user" : "environment",
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setDataUri(imageSrc);
  }, [webcamRef]);

  function handleCameraError(error) {
    setPermissionError(true);
  }

  const givePermission = async () => {
    var promise = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    if (promise.id) {
      setPermissionError(false);
    }
  };
  const openCamera = () => {
    setDataUri("");
  };

  return (
    <div>
      {dataUri ? (
        <ImagePreview
          dataUri={dataUri}
          openCamera={openCamera}
          phone={phone}
          name={name}
          backend_name={backend_name}
          document_sequence={document_sequence}
          accessToken={accessToken}
          closeCamera={closeCamera}
          selectedProduct={selectedProduct}
          userProductId={userProductId}
          refresh={refresh}
        />
      ) : (
        <Fragment>
          {permissionError ? (
            <PermissionWrapper>
              <Fragment>
                <div className="row">
                  <div className="col90">
                    <h1>
                      You have blocked camera permissions, Please give camera
                      access in order to continue.
                    </h1>
                    <p>
                      Try clicking on the button below, if that dosen't works
                      follow the steps given in the image below.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <img src="/images/login/permission_steps.png" />
                  <Button
                    title="Give Permission"
                    className="btn"
                    onClick={givePermission}
                  />
                </div>
              </Fragment>
            </PermissionWrapper>
          ) : (
            <TakePhotoWrapper>
              <Webcam
                audio={false}
                height={isMobile ? 350 : 370}
                width={isMobile ? 350 : 640}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                mirrored={false}
                onUserMediaError={handleCameraError}
                screenshotQuality="0.92"
                audio={false}
              />
              <Button title="Take Photo" className="btn" onClick={capture} />
            </TakePhotoWrapper>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default TakePhoto;
