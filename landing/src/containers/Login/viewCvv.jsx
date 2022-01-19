import Button from "common/components/Button";
import Input from "common/components/Input";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const ViewCvv = (props) => {
  const { cards, phone, accessToken, cardName } = props;
  const [isOtpSent, setisOtpSent] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [otp, setOtp] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [kit_no, setKit_no] = useState(null);
  const [exp, setExp] = useState(null);
  const notify = useNotification();

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

    try {
      let response = await callApi(
        "/send_user_otp",
        "POST",
        { source_type: "get_card_cvv" },
        phone,
        accessToken
      );
      if (response.result === "success") {
        notify({ message: response.message, type: "success" });
        setisOtpSent(true);
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
      setisOtpSent(false);
    }
  };
  const getCardData = async () => {
    if (cardName && cardName == "rebel") {
      try {
        let response = await callApi(
          "/get_user_card_details",
          "GET",
          {},
          phone,
          accessToken
        );
        if (
          response.result === "success" &&
          response.cards.find((o) => o.card_display_name === "Rebel Card")
        ) {
          let obj = response.cards.find(
            (o) => o.card_display_name === "Rebel Card"
          );
          if (obj.card_status != "LOCKED") {
            cards.forEach((e) => {
              if (
                (e.card_name === "ruby" && e.card_status === "ACTIVE") ||
                (e.card_display_name === "Rebel Card" &&
                  obj.card_status === "ACTIVE")
              ) {
                setExp(e.expiry_date);
                setKit_no(e.kit_no);
                getData();
              }
            });
          }
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    } else if (cardName && cardName == "gimbooks") {
      try {
        let response = await callApi(
          "/get_user_card_details",
          "GET",
          {},
          phone,
          accessToken
        );
        if (
          response.result === "success" &&
          response.cards.find(
            (o) => o.card_display_name === "Redcarpet Gimbooks Card"
          )
        ) {
          let obj = response.cards.find(
            (o) => o.card_display_name === "Redcarpet Gimbooks Card"
          );
          if (obj.card_status != "LOCKED") {
            cards.forEach((e) => {
              if (
                (e.card_name === "redcarpet_gimbooks" &&
                  e.card_status === "ACTIVE") ||
                (e.card_display_name === "Redcarpet Gimbooks Card" &&
                  obj.card_status === "ACTIVE")
              ) {
                setExp(e.expiry_date);
                setKit_no(e.kit_no);
                getData();
              }
            });
          }
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    } else if (cardName && cardName == "ruby") {
      try {
        let response = await callApi(
          "/get_user_card_details",
          "GET",
          {},
          phone,
          accessToken
        );
        if (
          response.result === "success" &&
          response.cards.find((o) => o.card_display_name === "Ruby Card")
        ) {
          let obj = response.cards.find(
            (o) => o.card_display_name === "Ruby Card"
          );
          if (obj.card_status != "LOCKED") {
            cards.forEach((e) => {
              if (
                e.card_display_name === "Ruby Card" &&
                obj.card_status === "ACTIVE"
              ) {
                setExp(e.expiry_date);
                setKit_no(e.kit_no);
                getData();
              }
            });
          }
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    } else if (cardName && cardName == "reset") {
      try {
        let response = await callApi(
          "/get_user_card_details",
          "GET",
          {},
          phone,
          accessToken
        );
        if (
          response.result === "success" &&
          response.cards.find((o) => o.card_display_name === "Reset Card")
        ) {
          let obj = response.cards.find(
            (o) => o.card_display_name === "Reset Card"
          );
          if (obj.card_status != "LOCKED") {
            cards.forEach((e) => {
              if (
                e.card_display_name === "Reset Card" &&
                obj.card_status === "ACTIVE"
              ) {
                setExp(e.expiry_date);
                setKit_no(e.kit_no);
                getData();
              }
            });
          }
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    } else {
      getData();
      cards.forEach((e) => {
        if (e.card_name === "ruby" && e.card_status === "ACTIVE") {
          setExp(e.expiry_date);
          setKit_no(e.kit_no);
        }
      });
    }
  };

  useEffect(() => {
    getCardData();
  }, []);

  const resendOtp = async (event) => {
    try {
      let response = await callApi(
        "/send_user_otp",
        "POST",
        { source_type: "get_card_cvv" },
        phone,
        accessToken
      );
      if (response.result === "success") {
        notify({ message: response.message, type: "success" });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };
  const handleExpiry = (expiry) => {
    if (expiry.length > 2) {
      let one = expiry.substring(0, 2);
      let two = expiry.substring(2, 4);
      return two + one;
    }
    return expiry;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await callApi(
        "/get_card_cvv",
        "POST",
        {
          dob: dob,
          expiry_date: handleExpiry(exp),
          kit_no: kit_no,
          otp: otp,
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        setCvv(response.cvv);
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
          <div>
            <p>
              Your CVV Is <h4>{cvv}</h4>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCvv;
