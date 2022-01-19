import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";

import axios from "axios";
import UploadDocuments from "../UploadDocuments";
import { useNotification } from "common/hooks/useNotification";

import PreviewWarpper from "./style.js";

export const ImagePreview = ({
  dataUri,
  isFullscreen,
  openCamera,
  closeCamera,
  phone,
  accessToken,
  name,
  backend_name,
  selectedProduct,
  document_sequence,
  userProductId,
  refresh,
}) => {
  let classNameFullscreen = isFullscreen ? "demo-image-preview-fullscreen" : "";
  const [uploadUrl, setUploadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotification();

  const updateAndCloseCamera = (documentStatus, dataUri) => {
    closeCamera(documentStatus, dataUri);
  };

  function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(",")[1]);
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: "image/png" });
    return blob;
  }

  const uploadPhoto = async () => {
    try {
      setIsLoading(true);
      let response1 = await callApi(
        "/photoupload",
        "GET",
        {},
        phone,
        accessToken
      );
      setUploadUrl(response1.image_url);
      const image_url = response1.image_url;
      const url = response1.post_params.action;
      const fields = response1.post_params.fields;
      let fd = new FormData();
      var blob = dataURItoBlob(dataUri);
      var img = new File([blob], name + ".png", { type: "image/png" });
      for (const field of fields) {
        fd.append(field.name, field.value);
      }
      fd.append("file", img);
      let response2 = await axios.post(url, fd);
      if (image_url && (response2.status == 204 || response2.status == 200)) {
        let product;
        if (selectedProduct == "term_loan_reset") product = "reset";
        else if (selectedProduct == "rebel") product = "rebel";
        else if (selectedProduct == "redcarpet_gimbooks")
          product = "redcarpet_gimbooks";
        try {
          if (
            selectedProduct == "term_loan_reset" ||
            selectedProduct == "rebel" ||
            selectedProduct == "redcarpet_gimbooks"
          ) {
            let response3 = await callApi(
              `/set_user_profile_ids_${product}`,
              "POST",

              {
                type: backend_name,
                deviceId: "",
                imeiNo: "",
                document_sequence: document_sequence,
                product_type: selectedProduct,
                confirm_upload: false,
                url: image_url,
                user_product_id: userProductId,
              },
              phone,
              accessToken
            );
          } else {
            let response3 = await callApi(
              "/set_user_profile_ids",
              "POST",
              [
                {
                  type: backend_name,
                  deviceId: "",
                  imeiNo: "",
                  document_sequence: document_sequence,
                  product_type: selectedProduct,
                  confirm_upload: false,
                  url: image_url,
                },
              ],
              phone,
              accessToken
            );
          }

          let response4 = await callApi(
            "/get_user_documents",
            "GET",
            {
              user_product_id: userProductId,
            },
            phone,
            accessToken
          );
          if (response4.result == "success") {
            response4.documents.map((document) => {
              if (
                document.document_type == backend_name &&
                document.sequence === document_sequence
              ) {
                updateAndCloseCamera(document.verification_status, dataUri);
                refresh(backend_name);
              }
            });
          }
        } catch (error) {
          notify({
            message: "Some Error Occurred, try again later.",
            type: "error",
          });
          console.log(error);
        }
      } else {
        console.log(response4);
        notify({
          message: "Some Error Occurred, try again later.",
          type: "error",
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      notify({ message: error.message, type: "error" });
    }
  };

  return (
    <PreviewWarpper>
      {isLoading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <Fragment>
          <div className={"demo-image-preview " + classNameFullscreen}>
            <img src={dataUri} />
          </div>
          <div className="row-below">
            <div className="col50-below">
              <Button
                className="btn-take"
                onClick={openCamera}
                title="Take Again"
              />
            </div>
            <div className="col50-below">
              <Button
                className="btn-below"
                onClick={uploadPhoto}
                title="Confirm"
              />
            </div>
          </div>
        </Fragment>
      )}
    </PreviewWarpper>
  );
};

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool,
};

export default ImagePreview;
