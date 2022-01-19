import React, { useEffect, useState } from "react";
import Text from "common/components/Text";
import Input from "common/components/Input";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";
import OnBoardWrapper from "../style";
import { Icon } from "react-icons-kit";
import { camera } from "react-icons-kit/entypo/camera";
import axios from "axios";
import DocUploadWrapper from "./style";

const DocumentUpload = ({
  phone,
  accessToken,
  getUserStatus,
  userProductId,
}) => {
  const [blankCheque, setBlankCheque] = useState("");
  const [blankInvoice, setBlankInvoice] = useState("");
  const [shopImage, setShopImage] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState(false);
  const [shopImageStatus, setShopImageStatus] = useState(false);
  const [chequeStatus, setChequeStatus] = useState(false);
  const notify = useNotification();
  useEffect(() => {
    getUploadedDocs();
  }, []);
  useEffect(() => {
    findDocs();
  }, [uploadedDocs]);
  const getUploadedDocs = async () => {
    try {
      let res = await callApi(
        "/get_user_documents",
        "GET",
        {
          user_product_id: userProductId,
        },
        phone,
        accessToken
      );
      setUploadedDocs(res.documents);
      // findDocs();
    } catch (e) {
      notify({
        message: e.message,
        type: "error",
      });
      console.error(e);
    }
  };
  const findDocs = () => {
    uploadedDocs.map((val, id) => {
      if (val.document_type === "Blank Invoice") {
        setInvoiceStatus(val.user_document_verification_status !== "REJECTED");
      } else if (val.document_type === "Shop Image") {
        setShopImageStatus(
          val.user_document_verification_status !== "REJECTED"
        );
      } else if (val.document_type === "Blank Cheque") {
        setChequeStatus(val.user_document_verification_status !== "REJECTED");
      }
    });
  };
  const uploadInvoice = () => {
    if (!blankInvoice) {
      notify({
        message: "Blank Invoice need's to be uploaded",
        type: "error",
      });
    } else {
      uploadDocuments("Blank Invoice", blankInvoice);
      setBlankInvoice("");
    }
  };
  const uploadImage = () => {
    if (!shopImage) {
      notify({
        message: "Shop image need's to be uploaded",
        type: "error",
      });
    } else {
      uploadDocuments("Shop Image", shopImage);
      setShopImage("");
    }
  };
  const uploadCheque = () => {
    if (!blankCheque) {
      notify({
        message: "Blank cheque need's to be uploaded",
        type: "error",
      });
    } else {
      uploadDocuments("Blank Cheque", blankCheque);
      setBlankCheque("");
    }
  };
  const uploadDocuments = async (doc, selectedFile) => {
    try {
      setIsLoading(true);
      let response1 = await callApi(
        "/photoupload",
        "GET",
        {},
        phone,
        accessToken
      );
      const image_url = response1.image_url;
      const url = response1.post_params.action;
      const fields = response1.post_params.fields;
      let fd = new FormData();
      for (const field of fields) {
        fd.append(field.name, field.value);
      }
      fd.append("file", selectedFile);
      let response2 = await axios.post(url, fd);
      if (image_url && (response2.status == 204 || response2.status == 200)) {
        try {
          let response3 = await callApi(
            "set_user_profile_ids_redcarpet_xiaomi_merchant",
            "POST",
            {
              type: doc,
              deviceId: "",
              imeiNo: "",
              confirm_upload: false,
              url: image_url,
            },
            phone,
            accessToken
          );
          if (response3.result === "success") {
            notify({
              message: "Document Uploaded Successfully",
              type: "success",
            });
            getUploadedDocs();
          } else if (response3.result === "error") {
            notify({
              message: "Please upload a valid document",
              type: "error",
            });
          }
        } catch (error) {
          console.error(error);
          notify({
            message: error.message,
            type: "error",
          });
        }
      } else {
        notify({
          message: "Some Error Occurred, try again later.",
          type: "error",
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notify({ message: error.message, type: "error" });
    }
  };
  const moveUser = async () => {
    try {
      let response3 = await callApi(
        "/set_user_profile_ids_redcarpet_xiaomi_merchant",
        "POST",
        {
          confirm_upload: true,
        },
        phone,
        accessToken
      );
      if (response3.result == "error") {
        notify({
          message: "Please upload all documents",
          type: "error",
        });
      } else {
        if (response3.message === "verifying your docs, please wait a moment") {
          notify({ message: response3.message, type: "error" });
        } else if (response3.message === "Doc Upload Failed") {
          notify({
            message: "Please re-upload rejected docs",
            type: "error",
          });
        } else if (response3.message === "All docs uploaded successfully!!") {
          getUserStatus();
          notify({
            message: response3.message,
            type: "success",
          });
        } else {
          let arrOfMessage = response3.message.split(":");
          notify({
            message: `${arrOfMessage[1]} needs to be uploaded.`,
            type: "error",
          });
        }
      }
    } catch (e) {
      notify({
        message: e.message,
        type: "error",
      });
      console.error(e);
    }
  };
  return (
    <OnBoardWrapper>
      <DocUploadWrapper>
        <div className="row">
          {isLoading ? (
            <div className="loader">
              <div class="lds-dual-ring"></div>
            </div>
          ) : (
            <div style={{ backgroundColor: "white" }} className={"col60"}>
              <div
                className="section-dialog"
                style={{
                  background: "#fafbfb",
                  margin: "10px",
                  marginBottom: "0px",
                }}
              >
                <div style={{ backgroundColor: "white" }}>
                  <div className="row-left">
                    <div className="col30">
                      <hr className="line" />
                    </div>
                    <div className="col70">
                      <h1>Document Upload</h1>
                    </div>
                  </div>
                  <input
                    style={{ marginTop: "30px" }}
                    onChange={(event) => {
                      setBlankInvoice(event.target.files[0]);
                    }}
                    type="file"
                    id="blankInvoice"
                    accept="image/*"
                  />
                  <label className="upload" htmlFor="blankInvoice">
                    <div className="upload-btn">
                      <Icon className="upload-icon" icon={camera} size={18} />
                      <Text
                        className="file"
                        content="Invoice image for address verification"
                      />
                    </div>
                    <Text
                      className="file-name"
                      content={
                        blankInvoice
                          ? blankInvoice.name
                          : invoiceStatus
                          ? "This file has been uploaded"
                          : "No file chosen"
                      }
                    />
                  </label>
                  <Button
                    id="Blank Invoice"
                    style={{ width: "40%" }}
                    title={invoiceStatus ? "Uploaded" : "Upload"}
                    onClick={uploadInvoice}
                    className={invoiceStatus ? "btn-full-disabled" : "btn-full"}
                  />
                  <div>
                    <input
                      style={{ marginTop: "30px" }}
                      onChange={(event) => {
                        setBlankCheque(event.target.files[0]);
                      }}
                      type="file"
                      id="blankCheque"
                      accept=".pdf,image/*"
                    />
                    <label className="upload" htmlFor="blankCheque">
                      <div className="upload-btn">
                        <Icon className="upload-icon" icon={camera} size={18} />
                        <Text className="file" content="Blank Cheque" />
                      </div>
                      <Text
                        className="file-name"
                        content={
                          blankCheque
                            ? blankCheque.name
                            : chequeStatus
                            ? "This file has been uploaded"
                            : "No file chosen"
                        }
                      />
                    </label>
                  </div>
                  <Button
                    style={{ width: "40%" }}
                    title={chequeStatus ? "Uploaded" : "Upload"}
                    onClick={uploadCheque}
                    className={chequeStatus ? "btn-full-disabled" : "btn-full"}
                  />
                  <div>
                    <input
                      style={{ marginTop: "30px" }}
                      onChange={(event) => {
                        setShopImage(event.target.files[0]);
                      }}
                      type="file"
                      id="shopImage"
                      accept="image/*"
                    />
                    <label className="upload" htmlFor="shopImage">
                      <div className="upload-btn">
                        <Icon className="upload-icon" icon={camera} size={18} />
                        <Text className="file" content="Store Image" />
                      </div>
                      <Text
                        className="file-name"
                        content={
                          shopImage
                            ? shopImage.name
                            : shopImageStatus
                            ? "This file has been uploaded"
                            : "No file chosen"
                        }
                      />
                    </label>
                  </div>
                  <Button
                    style={{ width: "40%" }}
                    title={shopImageStatus ? "Uploaded" : "Upload"}
                    onClick={uploadImage}
                    className={
                      shopImageStatus ? "btn-full-disabled" : "btn-full"
                    }
                  />
                </div>
              </div>
              <Button
                title="Continue"
                onClick={moveUser}
                className="btn-full"
              />
            </div>
          )}
        </div>
      </DocUploadWrapper>
    </OnBoardWrapper>
  );
};

export default DocumentUpload;
