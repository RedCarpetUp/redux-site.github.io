import React, { Fragment } from "react";
import WaitListWrapper from "../WaitingScreen/styles";
import Celebrate from "public/images/mi-store/celebrate.svg";
import Button from "../../../common/components/Button";

const PaymentConfirmation = ({ getUserStatus, resetUser }) => {
  return (
    <Fragment>
      <WaitListWrapper>
        <div className="row-left">
          <div className="col30">
            <hr className="line" />
          </div>
          <div className="col70">Payment Confirmed</div>
        </div>
        <br />
        <br />
        <img
          src={Celebrate}
          width="40%"
          alt="waiting logo"
          className="waiting-img"
        />
        <br />
        <p
          style={{
            marginTop: 0,
            textAlign: "center",
            color: "grey",
            fontWeight: "600",
            padding: "10px",
          }}
        >
          Congratulations! Payment has been processed. We've made a sale!
          Celebrate it with your customer!
        </p>
        <br />
        <Button
          style={{ display: "block", margin: "0 auto" }}
          className="btn-light"
          title="Create Another Request"
          onClick={resetUser}
        />
        <br />
      </WaitListWrapper>
    </Fragment>
  );
};

export default PaymentConfirmation;
