import Button from "common/components/Button";
import moment from "moment";
import React, { useState } from "react";

import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const TenureLoan = ({ tenure, phone, accessToken }) => {
  const [loading, setLoading] = useState(false);
  const [payAmount, setPayAmount] = useState(tenure[0].min_amount_for_drawdown);
  const minPayAmount = tenure[0].min_amount_for_drawdown;
  const maxPayAmount = tenure[0].closing_amount_for_drawdown;
  const payLoanID = tenure[0].loan_id;
  const notify = useNotification();

  const colorCode = (s) => {
    let arr = s.split(" ");
    let day;
    if (arr[2] === "days") {
      day = Number(arr[1]);
    } else if (arr[2] === "hours") {
      day = 0;
    } else if (arr[2] === "ago") {
      day = 0;
    } else {
      day = 11;
    }
    if (day <= 5) {
      return [
        "payment.warningMsgPayNow",
        "fa fa-exclamation-triangle",
        "#ff0000",
        "Pay now to avoid increase in late fees",
      ]; //red
    } else if (day > 5 && day <= 10) {
      return [
        "payment.warningMsgPayNow",
        "fa fa-exclamation-circle",
        "#ff9900",
        "Pay now to avoid increase in late fees",
      ]; //orange
    } else if (day > 10) {
      return [
        "payment.warningMsgPayEarly",
        "fa fa-exclamation-circle",
        "#00cc00",
        "Pay early to avoid increase in late fees",
      ]; //green
    }
  };

  const handleSetPayAmount = (event) => {
    const value = event.target.value;
    if (value < minPayAmount) {
      notify({
        message: `Amount should be greater than ₹${minPayAmount}`,
        type: "error",
      });
      setPayAmount(value);
    }
    if (value > maxPayAmount) {
      notify({
        message: `Amount should be lesser than ₹${maxPayAmount}`,
        type: "error",
      });
      setPayAmount(value);
    } else {
      setPayAmount(value);
    }
  };

  const handleRZPay = async () => {
    setLoading(true);
    if (payAmount >= minPayAmount && payAmount <= maxPayAmount) {
      let collections = {};
      let payments = [];
      collections[payLoanID] = Number(payAmount);
      payments.push({
        payment_mode: "Online",
        payment_amount: Number(payAmount),
      });
      try {
        let response = await callApi(
          "/automate_payment_request",
          "POST",
          {
            collections,
            payments,
          },
          phone,
          accessToken
        );
        setLoading(false);
        if (response.result === "success") {
          const payment_gateway_options = JSON.parse(
            response.payment_request[0].payment_gateway_options
          );
          const payment_request_id =
            response.payment_request[0].payment_request_id;
          const options = {
            key: payment_gateway_options.api_key,
            amount: payment_gateway_options.amount,
            currency: payment_gateway_options.currency,
            name: payment_gateway_options.name,
            image: payment_gateway_options.image,
            order_id: payment_gateway_options.order_id,
            handler: async function (response) {
              try {
                let response2 = await callApi(
                  "/capture_razorpay_payment",
                  "POST",
                  {
                    payment_request_id: payment_request_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    razorpay_order_id: response.razorpay_order_id,
                  },
                  phone,
                  accessToken
                );
                if (response2.status === "failed") {
                  notify({
                    message: `Your transaction ${
                      response2.status === "processing"
                        ? " is"
                        : " was " + response2.status
                    }. Transaction ID: ${response2.transaction_id}`,
                    type: "error",
                  });
                } else {
                  notify({
                    message: `Your transaction ${
                      response2.status === "processing"
                        ? " is"
                        : " was " + response2.status
                    }. Transaction ID: ${response2.transaction_id}`,
                    type: "success",
                  });
                }
              } catch (error) {
                notify({ message: error.message, type: "error" });
              }
            },
            prefill: {
              name: payment_gateway_options.prefill.name,
              email: payment_gateway_options.prefill.email,
              contact: payment_gateway_options.prefill.contact,
            },
            theme: {
              color: payment_gateway_options.theme.color,
            },
          };
          let rz = new window.Razorpay(options);
          rz.open();
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        setLoading(false);
        notify({ message: error.message, type: "error" });
      }
    } else {
      setLoading(false);
      notify({
        message: `Amount should be greater than ₹${minPayAmount} and lesser than ₹${maxPayAmount}`,
        type: "error",
      });
    }
  };

  return tenure.map((loan, index) => {
    const [formattedID, icon, bgcolor, warningMsg] = colorCode(
      moment(loan.next_payment_date).fromNow()
    );
    return (
      <div key={index} className={"pcardWrapper"}>
        <div className={"card"}>
          <div
            className={"warningStrip"}
            style={{ color: "#fff", background: bgcolor }}
          >
            <p style={{ marginBottom: 0, fontSize: "1rem", fontWeight: 400 }}>
              <i
                style={{
                  fontSize: "24px",
                  color: "#fff",
                  padding: "0 0.5rem",
                  fontFamily: "FontAwesome",
                }}
                className={"icon"}
              ></i>
              {/* <FormattedMessage
                id={formattedID}
                defaultMessage={warningMsg}
              /> */}
              {warningMsg}
            </p>
          </div>
          <div className={"cardHeader"}>
            <div className="row">
              <div className={"col80"}>
                <h5>
                  {loan.product_name}
                  <small> ({"#" + loan.loan_id})</small>
                </h5>
                <small>
                  From -{" "}
                  <b>
                    {moment(loan.agreement_date).format("MMM Do YYYY")}
                    &nbsp;&nbsp;
                  </b>
                </small>
                <small>
                  To - <b>{moment(loan.last_emi_date).format("MMM Do YYYY")}</b>
                </small>
              </div>
              <div className={"col20 tar"}>
                <h6 className={"loanType"}>{loan.base_loan_type}</h6>
                <small>{loan.emi_plan}</small>
              </div>
            </div>
          </div>
          <div className={"cardBody"}>
            <div className="">
              <div className={"row payInfo"}>
                <div className={"dueDate"}>
                  <h6>
                    Due Date
                    {/* <FormattedMessage
                      id="payment.dueDate"
                      defaultMessage="Due Date"
                    /> */}
                  </h6>
                  <p>{moment(loan.next_payment_date).format("MMM Do YYYY")}</p>
                </div>
                <div className={"dueDays"}>
                  <h6>
                    Due Days
                    {/* <FormattedMessage
                      id="payment.dueDays"
                      defaultMessage="Due Days"
                    /> */}
                  </h6>
                  <p>{moment(loan.next_payment_date).fromNow()}</p>
                </div>
                <div className={"minAmt"}>
                  <h6>
                    Minimum Amount
                    {/* <FormattedMessage
                      id="payment.minimumAmount"
                      defaultMessage="Minimum Amount"
                    /> */}
                  </h6>
                  <p>₹{loan.min_amount_for_drawdown}</p>
                </div>
                <div className={"maxAmt"}>
                  <h6>
                    Maximum Amount
                    {/* <FormattedMessage
                      id="payment.maximumAmount"
                      defaultMessage="Maximum Amount"
                    /> */}
                  </h6>
                  <p>₹{loan.closing_amount_for_drawdown}</p>
                </div>
              </div>
            </div>
            <div>
              {index === 0 ? (
                <span className={"inputPayCombo"}>
                  <input
                    className="form-control"
                    placeholder="Pay Amount"
                    onChange={(event) => handleSetPayAmount(event)}
                    value={payAmount}
                    disabled={loading ? true : false}
                    required
                  />
                  {loading ? (
                    <div className="btn btn-primary block text-center">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <Button
                      onClick={(event) => handleRZPay(event)}
                      title="PAY DUES"
                    >
                      {/* <FormattedMessage
                        id="payment.payBtn"
                        defaultMessage="PAY DUES"
                      /> */}
                    </Button>
                  )}
                </span>
              ) : (
                <span className={"inputPayCombo"}>
                  <input
                    disabled
                    className="form-control"
                    placeholder="Pay Amount"
                    onChange={(event) => setPayAmount(event.target.value)}
                    value={loan.min_amount_for_drawdown}
                    required
                  />
                  <Button
                    className="btn btn-primary disabled block"
                    title="PAY DUES"
                  >
                    {/* <FormattedMessage
                      id="payment.payBtn"
                      defaultMessage="PAY DUES"
                    /> */}
                  </Button>
                  <span
                    style={{ fontWeight: "100", color: "red", float: "left" }}
                  >
                    *Enter Amount To Be Paid Against Tenure Loan
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default TenureLoan;
