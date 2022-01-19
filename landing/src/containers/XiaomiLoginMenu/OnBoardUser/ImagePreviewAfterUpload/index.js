import React from "react";
import PropTypes from "prop-types";
import PreviewWarpper from "../ImagePreview/style";

export const ImagePreviewAfterUpload = ({ dataUri, isFullscreen }) => {
  let classNameFullscreen = isFullscreen ? "demo-image-preview-fullscreen" : "";

  return (
    <PreviewWarpper>
      <div className={"demo-image-preview " + classNameFullscreen}>
        <img src={dataUri} />
      </div>
    </PreviewWarpper>
  );
};

ImagePreviewAfterUpload.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool,
};

export default ImagePreviewAfterUpload;
