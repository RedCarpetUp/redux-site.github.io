import Button from "common/components/Button";
import Input from "common/components/Input";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const ViewBlockUnblockCard = (props) => {
  const { card, phone, accessToken, refresh, toggle, isOtpSent, setisOtpSent } = props;
  const [dob, setDob] = useState(new Date());
  const [otp, setOtp] = useState(null);
  const [cvv, setCvv] = useState(null);
  const notify = useNotification();

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await callApi(
          "/get_new_user_profile",
          "GET",
          {},
          phone,
          accessToken
        );
        if (response.result === "success") {
          setDob(
            moment(response.user.user_data.date_of_birth).format("DDMMYYYY")
          );
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    };
    getData();
  }, []);
  const resendOtp = async (event) => {
    try {
      let response = await callApi(
        "/send_user_otp",
        "POST",
        { source_type: "lk_ul_card" },
        phone,
        accessToken
      );
      if (response.result === "success") {
        notify({ type: "success", message: response.message });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let kit_no = "";
    if (card.card_name === "ruby") {
      kit_no = card.kit_no;
    }
    if (card.card_display_name == "Rebel Card") {
      kit_no = card.kit_no;
    }
    try {
      let response = await callApi(
        "/card_operations_app",
        "POST",
        {
          operation: card.card_status == "ACTIVE" ? "L" : "UL",
          card_kit_number: kit_no,
          otp: otp,
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        notify({
          message:
            card.card_status == "ACTIVE"
              ? "Your Card is Locked successfully"
              : "Your Card is Unlocked successfully",
          type: "success",
        });
        refresh();
        setisOtpSent(false);
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  return (
    <div className={"smartCardWrapper"}>
      <div className={"col100"}>
        {isOtpSent ? (
          <div>
            <h4 className="text-center">
              Your Verification Code Sent Successfully
            </h4>
            <div className="section-dialog" style={{ background: "#fafbfb" }}>
              <div>
                <form className="form input-line" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <Input
                      name="otp"
                      placeholder="Enter Your OTP"
                      className="form-control"
                      onChange={(e) => setOtp(e)}
                      type="text"
                      pattern="^[0-9]*$"
                      maxLength="6"
                      minLength="6"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Button
                      title="Submit OTP"
                      type="submit"
                      className="btn"
                    ></Button>
                    <center>
                      <h4>
                        <span
                          className="btn_text"
                          onClick={(e) => {
                            resendOtp(e);
                          }}
                        >
                          Didn't recieved the OTP? Try Again
                        </span>
                      </h4>
                    </center>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ViewBlockUnblockCard;
