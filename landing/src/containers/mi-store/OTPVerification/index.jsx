import React, { useState, Fragment } from "react";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Input from "common/components/Input";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";
import OTPVerificationWrapper from "./style";
import { Modal, openModal, closeModal } from "@redq/reuse-modal";
import "@redq/reuse-modal/lib/index.css";
import PopUpModal from "../deviceInfoForm/style";

const OTPVerification = ({ phone, accessToken, getUserStatus, resetUser }) => {
  const [otp, setOTP] = useState("");
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

  const submitOTP = async () => {
    if (!otp) {
      notify({ message: "Please enter the OTP", type: "error" });
      return;
    }
    try {
      let response = await callApi(
        "/merchant_verify_otp",
        "POST",
        { otp: parseInt(otp) },
        phone,
        accessToken
      );
      if (response.result === "success") {
        notify({
          message: "OTP verified successfully",
          type: "success",
        });
        getUserStatus();
      } else {
        notify({
          message: "Invalid OTP",
          type: "error",
        });
      }
    } catch (error) {
      notify({
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <OTPVerificationWrapper>
        <Heading content="OTP Verification" />
        <Text content="OTP" />
        <Input
          inputType="number"
          value={otp}
          min="1"
          onChange={(e) => {
            setOTP(e);
          }}
          aria-label="OTP"
        />
        <Text
          className="info"
          content="Enter the OTP visible on the customer screen."
        />
        <br />
        <Button title="Submit" onClick={submitOTP} />
        <br />
        <Button
          title="Reject Customer"
          className="btn-light"
          onClick={() => {
            modalToggle();
          }}
        />
      </OTPVerificationWrapper>
      <Modal />
    </>
  );
};

export default OTPVerification;
