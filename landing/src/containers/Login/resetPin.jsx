import Button from "common/components/Button";
//import DatePicker from 'react-date-picker';
import Input from "common/components/Input";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import paymentStyles from "../../../pages/login/login.stytle.js";

import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const ResetPin = (props) => {
  const { cards, phone, accessToken, cardName } = props;
  const [isOtpSent, setisOtpSent] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [pin, setPin] = useState(null);
  const [matchPin, setmatchPin] = useState(null);
  const [otp, setOtp] = useState(null);
  const [kit_no, setKit_no] = useState(null);
  const [exp, setExp] = useState(null);
  const [isCardLocked, setIsCardLocked] = useState(false);
  const notify = useNotification();

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
              }
            });
          } else {
            setIsCardLocked(true);
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
              }
            });
          } else {
            setIsCardLocked(true);
          }
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    } else if (cardName && cardName == "xiaomi") {
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
            (o) => o.card_display_name === "Redcarpet Xiaomi Card"
          )
        ) {
          let obj = response.cards.find(
            (o) => o.card_display_name === "Redcarpet Xiaomi Card"
          );
          if (obj.card_status != "LOCKED") {
            cards.forEach((e) => {
              if (
                (e.card_name === "ruby" && e.card_status === "ACTIVE") ||
                (e.card_display_name === "Redcarpet Xiaomi Card" &&
                  obj.card_status === "ACTIVE")
              ) {
                setExp(e.expiry_date);
                setKit_no(e.kit_no);
              }
            });
          } else {
            setIsCardLocked(true);
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
              }
            });
          } else {
            setIsCardLocked(true);
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
              }
            });
          } else {
            setIsCardLocked(true);
          }
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    } else {
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
        { source_type: "card_cvv" },
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isOtpSent) {
      if (pin !== matchPin) {
        notify({ message: "Pin Does Not Match", type: "error" });
        setisOtpSent(false);
        return;
      }

      if (pin.length > 4) {
        notify({
          message: "Pin Length Cannot Be Greater Than Four",
          type: "error",
        });
        setisOtpSent(false);
        return;
      }

      try {
        let response = await callApi(
          "/send_user_otp",
          "POST",
          { source_type: "card_cvv" },
          phone,
          accessToken
        );
        if (response.result === "success") {
          notify({ message: response.message, type: "success" });
          setisOtpSent(true);
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    } else {
      try {
        let response = await callApi(
          "/set_card_pin",
          "POST",
          {
            pin: pin,
            dob: moment(dob).format("DDMMYYYY"),
            expiry_date: exp,
            otp: otp,
            kit_no: kit_no,
          },
          phone,
          accessToken
        );
        if (response.result === "success") {
          if (response.data.result.status === true) {
            notify({ message: "Pin Changed Successfully", type: "success" });
            setisOtpSent(false);
            props.toggle();
          }
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    }
  };

  return (
    <div className={"smartCardWrapper"}>
      <div className={"col100"}>
        {isCardLocked ? (
          <div>
            <p>
              <h4>Your Card Is Locked.</h4>
              <h4>Please unlock to Reset PIN.</h4>
            </p>
          </div>
        ) : !isOtpSent ? (
          <div>
            <h4 className="text-center">Card Details</h4>
            <div className="section-dialog" style={{ background: "#fafbfb" }}>
              <div>
                <form className="form input-line" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <Input
                      name="card_pin"
                      placeholder="Enter New Card Pin"
                      className="form-control"
                      onChange={(e) => setPin(e)}
                      type="text"
                      pattern="^[0-9]*$"
                      maxLength="4"
                      minLength="4"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      name="match_card_pin"
                      placeholder="Re-Enter New Card Pin"
                      className="form-control"
                      onChange={(e) => setmatchPin(e)}
                      type="text"
                      pattern="^[0-9]*$"
                      maxLength="4"
                      minLength="4"
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group" style={{ textAlign: "left" }}>
                    <span
                      style={{
                        marginRight: "20px",
                        marginLeft: "20px",
                        fontWeight: "400",
                      }}
                    >
                      D.O.B:
                    </span>
                    <DatePicker
                      className="form-group"
                      selected={dob}
                      onChange={(date) => setDob(date)}
                      dateFormat="dd-MM-yyyy"
                      showYearDropdown
                      dateFormatCalendar="MMMM"
                      yearDropdownItemNumber={50}
                      scrollableYearDropdown={true}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <Button
                      title="Submit"
                      className="btn"
                      type="submit"
                    ></Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ResetPin;
