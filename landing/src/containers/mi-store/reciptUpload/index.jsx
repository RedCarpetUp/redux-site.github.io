import React, { Fragment, useState } from "react";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";
import axios from "axios";
import PopUpModal from "../deviceInfoForm/style";
import { Modal, openModal, closeModal } from "@redq/reuse-modal";
import "@redq/reuse-modal/lib/index.css";
import ReciptUploadWrapper from "./style";

const PaymentConfirm = ({
  phone,
  accessToken,
  getUserStatus,
  resetUser,
  userData,
}) => {
  const [upload, setUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [doc, setDoc] = useState("");
  const notify = useNotification();

  const BigModalComponent = () => (
    <Fragment>
      <PopUpModal>
        <div className="parent">
          <div className="child">
            <div className="masterPiece">
              <h3 style={{ margin: "15px", textAlign: "center" }}>
                Are you sure you want to continue? This will reject the present
                customer and start a new process.
              </h3>

              <div style={{ width: "100%" }}>
                <div className="btn-container">
                  <Button
                    className="btn"
                    title="Continue"
                    onClick={resetUser}
                  />
                  <Button
                    className="btn-light"
                    title="Cancel"
                    onClick={closeModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopUpModal>
    </Fragment>
  );
  const modalToggle = () => {
    openModal({
      config: {
        className: "customModal",
        disableDragging: false,
        enableResizing: {
          bottom: true,
          bottomLeft: true,
          bottomRight: true,
          left: true,
          right: true,
          top: true,
          topLeft: true,
          topRight: true,
        },
        width: 480,
        height: 390,
        animationFrom: { transform: "scale(0.3)" }, // react-spring <Spring from={}> props value
        animationTo: { transform: "scale(1)" }, //  react-spring <Spring to={}> props value
        transition: {
          mass: 1,
          tension: 130,
          friction: 26,
        }, // react-spring config props
      },
      withRnd: false,
      overlayClassName: "customeOverlayClass",
      closeOnClickOutside: false,
      component: BigModalComponent,
      componentProps: { customData: "your custom props" },
    });
  };

  const UploadRecipt = async () => {
    if (!doc) {
      notify({
        message: "Payment receipt needs to be uploaded",
        type: "error",
      });
      return;
    } else {
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
        fd.append("file", doc);
        let response2 = await axios.post(url, fd);
        if (image_url && (response2.status == 204 || response2.status == 200)) {
          try {
            let response3 = await callApi(
              "set_user_profile_ids_redcarpet_xiaomi_merchant",
              "POST",
              {
                type: "Downpayment Receipt",
                confirm_upload: false,
                url: image_url,
              },
              phone,
              accessToken
            );
            notify({
              message: "Document Uploaded Successfully",
              type: "success",
            });
            setDoc("");
            moveUser();
          } catch (error) {
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
      } catch (e) {
        setIsLoading(false);
        console.error(e);
        notify({
          message: e.message,
          type: "error",
        });
      }
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
          message: "Something went wrong please try again later",
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
    <div>
      <ReciptUploadWrapper>
        {isLoading ? (
          <div className="loader">
            <div class="lds-dual-ring"></div>
          </div>
        ) : (
          <Fragment>
            <div className="row-left">
              <div className="col30">
                <hr className="line" />
              </div>
              <div className="col70">Receipt Upload</div>
            </div>
            <div className="card">
              <div className="details">
                <b>Interest Rate: </b>
                <span>{userData.interest_rate}%</span>
              </div>
              <div className="details">
                <b>Downpayment: </b>
                <span>₹{userData.down_payment}</span>
              </div>
              <div className="details">
                <b>Tenure: </b>
                <span>{userData.tenure_in_months} Months</span>
              </div>
              <div className="details">
                <b>Product Name: </b>
                <span>{userData.product_name}</span>
              </div>
              <div className="details">
                <b>Total Amount With Interest: </b>
                <span>₹{userData.total_amount_with_interest}</span>
              </div>
              <div className="details">
                <b>Principal Amount: </b>
                <span>₹{userData.principal_amount}</span>
              </div>
            </div>
            <br />
            <p
              style={{
                padding: "10px",
                textAlign: "center",
                color: "grey",
                fontWeight: "bold",
              }}
            >
              Please confirm the payment's details with the user like tenure
              period, interest rate,downpayment, principal amount,total amount
              to be paid and other device related details.
            </p>
            <br />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                className={upload ? "btn-disable" : "btn"}
                onClick={() => {
                  if (!upload) {
                    setUpload(!upload);
                  }
                }}
                title="I Confirm"
              />
              <Button
                className="btn-light"
                onClick={() => modalToggle()}
                title="Reject Customer"
              />
            </div>
            {upload && (
              <div>
                <h1 style={{ textAlign: "center" }}>Upload Payment Receipt</h1>
                <div style={{ width: "100%" }}>
                  <input
                    onChange={(event) => {
                      setDoc(event.target.files[0]);
                    }}
                    className="file-upload"
                    type="file"
                    accept="image/*,.pdf"
                  />
                </div>
                <br />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={UploadRecipt}
                    className="btn"
                    title="Upload"
                  />
                </div>
              </div>
            )}
            <br />
          </Fragment>
        )}
      </ReciptUploadWrapper>
      <Modal />
    </div>
  );
};

export default PaymentConfirm;
