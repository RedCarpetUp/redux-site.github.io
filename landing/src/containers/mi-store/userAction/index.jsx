import React, { Fragment } from "react";
import WaitListWrapper from "../WaitingScreen/styles";
import Waiting from "public/images/mi-store/waiting.jpg";
import Button from "../../../common/components/Button";
import { Modal, openModal, closeModal } from "@redq/reuse-modal";
import "@redq/reuse-modal/lib/index.css";
import PopUpModal from "../deviceInfoForm/style";

const UserAction = ({ getUserStatus, resetUser }) => {
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
  return (
    <Fragment>
      <WaitListWrapper>
        <div className="row-left">
          <div className="col30">
            <hr className="line" />
          </div>
          <div className="col70">Awaiting Confirmation</div>
        </div>
        <img
          src={Waiting}
          width="60%"
          alt="waiting logo"
          className="waiting-img"
        />
        <p
          style={{
            marginTop: 0,
            textAlign: "center",
            color: "grey",
            fontWeight: "600",
            padding: "10px",
          }}
        >
          Waiting for user to confirm the details.
        </p>
        <br />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            title="Refresh Status"
            className="btn"
            onClick={() => getUserStatus()}
          />
          <Button
            className="btn-light"
            title="Reject Customer"
            onClick={() => {
              modalToggle();
            }}
          />
        </div>
        <br />
      </WaitListWrapper>
      <Modal />
    </Fragment>
  );
};

export default UserAction;
