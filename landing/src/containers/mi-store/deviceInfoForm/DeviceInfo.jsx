import React, { Fragment, useState } from "react";
import Icon from "react-icons-kit";
import PopUpModal from "./style";
import PhoneNumberWrapper from "../PhoneForm/style";
import Input from "common/components/Input";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { ic_error } from "react-icons-kit/md/ic_error";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";
import { Modal, openModal, closeModal } from "@redq/reuse-modal";
import "@redq/reuse-modal/lib/index.css";

const DeviceInfo = ({ phone, accessToken, getUserStatus, resetUser }) => {
  const [isloading, setIsLoading] = useState(false);
  const [imei, setImei] = useState("");
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

  const sendPersonalData = async (e) => {
    if (imei.length !== 15) {
      notify({
        message: "IMEI Number should be 15 digits.",
        type: "error",
      });
      return;
    }
    try {
      let res = await callApi(
        "verify_imei_number",
        "POST",
        { imei_number: imei },
        phone,
        accessToken
      );
      if (res.result === "success") {
        getUserStatus();
      } else {
        notify({
          message: "Some Error Occurred, try again later.",
          type: "error",
        });
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
    <Fragment>
      {isloading ? (
        <div className="loader">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <PhoneNumberWrapper>
          <div className="col60">
            <div className="section-dialog" style={{ width: "90%" }}>
              <div>
                <div className="row-left">
                  <div className="col30">
                    <hr className="line" />
                  </div>
                  <div className="col70">
                    <h1>Device Information</h1>
                  </div>
                </div>
                <form
                  className="form-control"
                  onSubmit={(e) => sendPersonalData(e)}
                >
                  <Input
                    type="number"
                    label="IMEI Number"
                    placeholder="IMEI Number"
                    maxLength="15"
                    minLength="15"
                    icon={
                      imei.length === 15 ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : imei.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    pattern="[a-zA-Z0-9-]+"
                    iconPosition="right"
                    onChange={(event) => setImei(event)}
                    value={imei}
                    required
                    className={
                      imei.length === 15
                        ? "green-border"
                        : imei.length > 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <div style={{ width: "100%" }} className="button-containers">
                    <AnchorLink href="#scroll-up">
                      <Button
                        type="submit"
                        onClick={() => sendPersonalData()}
                        title="Submit"
                        isMaterial="true"
                        className="btn-full"
                      ></Button>
                    </AnchorLink>
                    <AnchorLink href="#scroll-up">
                      <Button
                        type="submit"
                        onClick={() => modalToggle()}
                        title="Reject Customer"
                        isMaterial="true"
                        className="btn-light"
                      ></Button>
                    </AnchorLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <br />
          <Modal />
        </PhoneNumberWrapper>
      )}
    </Fragment>
  );
};

export default DeviceInfo;
