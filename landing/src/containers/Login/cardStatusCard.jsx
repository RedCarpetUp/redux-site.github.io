import Button from "common/components/Button";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const CardStatusCard = ({ task_id, phone, accessToken }) => {
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showQuesScreen, setShowQuesScreen] = useState(false);
  const [show_cdc_fail_msg, setShow_cdc_fail_msg] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [cardNumber, setCardNumber] = useState(new Date());
  const [terms, setTerms] = useState([]);
  const notify = useNotification();

  useEffect(async () => {
    try {
      let response = await callApi(
        "/get_terms_and_conditions",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result === "success") {
        setTerms(response.data);
      } else {
        notify({ message: "Something Went Wrong", type: "error" });
        setTerms([]);
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
      setTerms([]);
    }
  }, []);

  const handleSubmission = async (event) => {
    event.preventDefault();
    if (!showQuesScreen) {
      if (cardNumber.length === 16) {
        setShowQuesScreen(true);
      } else {
        notify({ message: "Card Number Length Should Be 16", type: "error" });
      }
    } else {
      setLoading(true);
      let current_disposition_code = "Failed";

      if (event.currentTarget[1].checked && event.currentTarget[2].checked) {
        current_disposition_code = "Completed";
      }

      try {
        let response = await callApi(
          "/create_activity_for_app",
          "POST",
          {
            activity_info: { status: "active" },
            comments: "Ruby Card Activated using app",
            current_disposition_code,
            task_id,
            user_card_number: cardNumber,
            user_dob: moment(dob).format("DD-MM-YYYY"),
          },
          phone,
          accessToken
        );
        setLoading(false);
        if (response.result === "success") {
          notify({ message: "Successfully Submitted", type: "success" });
          setIsCompleted(true);
          if (current_disposition_code === "Failed") {
            setShow_cdc_fail_msg(true);
          }
        } else {
          notify({
            message: response.message || "Something Went Wrong",
            type: "error",
          });
          setShowQuesScreen(false);
        }
      } catch (error) {
        setLoading(false);
        notify({ message: error.message, type: "error" });
      }
    }
  };

  return (
    <div className={"pcardWrapper"}>
      {!isCompleted ? (
        <div className={"card"}>
          <div className={"cardHeader"}>
            <h4 style={{ marginBottom: 0 }}>Activate Your Card</h4>
          </div>
          <div className={"cardBody"}>
            {!showQuesScreen ? (
              <form onSubmit={(event) => handleSubmission(event)}>
                <h6>
                  Card Number <span className="text-danger">*</span>
                </h6>
                <span
                  style={{ display: "flex", background: "rgb(246, 246, 246)" }}
                >
                  <input
                    type="number"
                    className="form-control"
                    pattern="^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$"
                    placeholder="Enter Your 16 Digit Card Number"
                    onChange={(event) => setCardNumber(event.target.value)}
                    required
                  />
                </span>
                <br />
                <h6>
                  DOB <span className="text-danger">*</span>
                </h6>
                <span style={{ display: "block" }}>
                  <input
                    className="form-control"
                    type="date"
                    name="dob"
                    onChange={(event) => setDob(event.target.value)}
                    required
                  />
                </span>
                <br />
                <Button style={{ fontWeight: 200 }} title="Continue"></Button>
              </form>
            ) : (
              <form onSubmit={(event) => handleSubmission(event)}>
                <h5>
                  Your RedCarpet Card is about to be activated.Please answer the
                  question below and accept the terms and conditions to enable
                  us to activate the card.
                </h5>
                <br />
                <h7>
                  Q. Apart from the fees you paid through the app, have you paid
                  anyone money or has someone asked you to pay money to them for
                  processing your application?
                </h7>
                <span style={{ display: "block" }}>
                  <span>
                    <input type="radio" name="ques1" value="Yes" required /> Yes
                  </span>
                  <span style={{ marginLeft: "20px" }}>
                    <input type="radio" name="ques1" value="No" required /> No
                  </span>
                </span>
                <br />
                <div className={"card"} style={{ backgroundColor: "#d9d9d9" }}>
                  <div className={"cardBody"}>
                    <h3>Terms and Conditions</h3>
                    <br />
                    <ol>
                      {terms.map((elem, index) => (
                        <li
                          key={index}
                          style={{
                            textAlign: "left",
                            marginBottom: "10px",
                            fontWeight: "400",
                          }}
                        >
                          {index + 1}. {elem}
                        </li>
                      ))}
                    </ol>
                    <br />
                    <input
                      type="checkbox"
                      name="terms"
                      value="terms"
                      required
                    />{" "}
                    <h5 style={{ display: "inline" }}>
                      I accept the terms and conditions.
                    </h5>
                    <br />
                  </div>
                </div>
                <br />
                {loading ? (
                  <div className="btn btn-primary block text-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    style={{ fontWeight: 200 }}
                    title="Submit"
                  ></Button>
                )}
              </form>
            )}
          </div>
        </div>
      ) : show_cdc_fail_msg ? (
        <div className={"card"}>
          <div className={"cardBody"}>
            <h4>
              Your Card Is Not Activated Please Contact Customer Care For
              Further Assistance.
            </h4>
          </div>
        </div>
      ) : (
        <div className={"card"}>
          <div className={"cardBody"}>
            <h4>Your Card Is Successfully Activated.</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardStatusCard;
