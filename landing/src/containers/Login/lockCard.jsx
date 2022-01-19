import Button from "common/components/Button";
import Input from "common/components/Input";
import React, { useState } from "react";

import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const LockCard = (props) => {
  const { phone, accessToken, card, toggleLockUnlock, handleOTP } = props;
  const [otp, setOtp] = useState("");
  const [entryErr, setEntryErr] = useState(false);
  const notify = useNotification();

  const handleSubmit = async () => {
    if (otp === "") {
      setEntryErr(true);
    } else {
      setEntryErr(false);
      const operation = card.card_status === "LOCKED" ? "UL" : "L";
      const card_kit_number = card.kit_no;
      const dataObj = {
        card_kit_number,
        otp,
        operation,
      };
      try {
        let response = await callApi(
          "/card_operations_app",
          "POST",
          dataObj,
          phone,
          accessToken
        );
        if (response.result === "success") {
          toggleLockUnlock();
          let message =
            card.card_status === "LOCKED"
              ? "Your card has been unlocked successfully"
              : "Your card has been locked successfully";
          notify({ message, type: "success" });
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    }
  };

  const displayLockCardForm = () => {
    return (
      <div className="form input-line">
        <div className="form-group">
          <Input
            name="otp"
            placeholder="OTP"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e)}
            inputType="number"
            min="0"
          />
        </div>

        <center>
          <h4>
            <span
              className="btn_text"
              onClick={() => {
                setOtp("");
                handleOTP();
              }}
            >
              Didn't receive the OTP? Try Again
            </span>
          </h4>
        </center>
        <br />

        <Button
          onClick={() => handleSubmit()}
          title="Submit"
          style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          className="btn"
        ></Button>

        {entryErr ? (
          <>
            <br />
            <span style={{ color: "red" }}>All Fields Are Mandatory</span>
          </>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div className={"smartCardWrapper"}>
      <div className={"card"}>
        <div
          className={"cardBody"}
          style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
        >
          <div>{displayLockCardForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default LockCard;
