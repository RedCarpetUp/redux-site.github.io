import React, { useState, Fragment, useEffect } from "react";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { chevronDown } from "react-icons-kit/feather/chevronDown";

import { lock } from "react-icons-kit/feather/lock";
import { checkCircle } from "react-icons-kit/feather/checkCircle";
import Icon from "react-icons-kit";
import Button from "common/components/Button";
import moment from "moment";
import { callApi } from "common/utils/loginMiddleware";
import AnchorLink from "react-anchor-link-smooth-scroll";
import ReactDOM from "react-dom";
import useAnalytics from "../../common/hooks/useAnalytics";
import { analyticsData } from "../../common/data/analytics";
import { closeModal, openModal } from "@redq/reuse-modal";
import { ModalSection } from "../../pages/login/login.style";
import { useNotification } from "common/hooks/useNotification";

const RenderEmiDetail = ({
  emi,
  loanId,
  userProductId,
  phone,
  accessToken,
  togglePayment,
  emiStatus,
  emiPay,
  emiId,
}) => {
  const [viewEmiDetail, setViewEmiDetail] = useState(false);
  const [ico, setIco] = useState(chevronRight);
  const [buttonState, setButtonState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [difference, setDifference] = useState("");
  const [valueOnTabClose, setValueOnTabClose] = useState("");
  const notify = useNotification();

  const ModalContent = (props) => (
    <ModalSection>
      <center style={{ padding: "0px 10px 0px 10px" }}>
        <div style={{ marginTop: "10px", fontSize: "20px", color: "#dd285d" }}>
          <h1>
            <b>Waiting for Your Transaction.</b>
          </h1>
        </div>
        <p
          style={{
            marginTop: "10px",
            marginBottom: "15px",
          }}
        >
          Please complete your payment in the other tab.
        </p>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            color: "#dd285d",
          }}
        >
          <div className="loader"></div>
        </div>
        <Button
          title="CLOSE"
          className="paybtn"
          id="closeThis"
          onClick={() => {
            closeModal();
            togglePayment();
            setLoading(false);
            clearCashFreeRelatedLocalStorage();
          }}
        ></Button>
      </center>
    </ModalSection>
  );
  const handleModal = () => {
    openModal({
      config: {
        disableDragging: true,
        default: {
          width: "75%",
          height: "65%",
          x: 0,
          y: 0,
        },
      },
      component: ModalContent,
      closeOnClickOutside: false,
    });
  };

  const asyncLocalStorage = {
    setItem: async function (key, value) {
      await null;
      return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
      await null;
      return localStorage.getItem(key);
    },
    clear: async function () {
      await null;
      return localStorage.clear();
    },
    removeItem: async function (key) {
      await null;
      return localStorage.removeItem(key);
    },
  };

  const clearCashFreeRelatedLocalStorage = async () => {
    Object.entries(localStorage)
      .map((x) => x[0])
      .filter((x) => x.substring(0, 8) == "cashFree")
      .forEach((x) => localStorage.removeItem(x));
  };

  useEffect(() => {
    var status = localStorage.getItem("cashFreePaymentStatus");
    if (
      valueOnTabClose &&
      valueOnTabClose != "" &&
      valueOnTabClose == "yes" &&
      status !== null
    ) {
      function callThis() {
        window.removeEventListener("storage", () =>
          setValueOnTabClose(localStorage.getItem("cashFreeTabClosed"))
        );
        var referenceId = localStorage.getItem("cashFreePaymentReferenceId");
        if (status !== "SUCCESS" && status !== "PENDING") {
          notify({
            message: `Your transaction ${status}. ${
              referenceId ? `Transaction ID: ${referenceId}` : ``
            }`,
            type: "error",
          });
          closeModal();
          togglePayment();
          setLoading(false);
          clearCashFreeRelatedLocalStorage();
        } else {
          notify({
            message: `Your transaction ${
              status === "PENDING" ? " is" : " was " + status
            }. ${referenceId ? `Transaction ID: ${referenceId}` : ``}`,
            type: "success",
          });
          notify({
            message:
              "Please Wait, Your transaction Details are getting updated",
            type: "success",
          });

          setLoading(true);
          clearCashFreeRelatedLocalStorage();
          closeModal();
          const timer = setTimeout(() => {
            notify({
              message:
                "Please refresh this page and re-login to see updated limit",
              type: "success",
            });
            togglePayment();
            setLoading(false);
          }, 15000);

          return () => clearTimeout(timer);
        }
      }
      callThis();
    }
  }, [valueOnTabClose]);

  const open = async (url) => {
    window.open(url, "_blank", "");
  };

  const handleCashFreePayment = async (response) => {
    await clearCashFreeRelatedLocalStorage();
    let paymentLink = response.payment_request.payment_link;
    asyncLocalStorage.setItem("cashFreePaymentStarted", "yes").then(() => {
      open(paymentLink);
    });
    window.addEventListener("storage", () =>
      setValueOnTabClose(localStorage.getItem("cashFreeTabClosed"))
    );
    handleModal();
  };

  const handleRZPay = async (response) => {
    const payment_gateway_options = JSON.parse(
      response.payment_request.payment_gateway_options
    );
    const payment_request_id = response.payment_request_id;
    const options = {
      key: payment_gateway_options.api_key,
      amount: payment_gateway_options.amount,
      currency: payment_gateway_options.currency,
      name: payment_gateway_options.name,
      image: payment_gateway_options.image,
      order_id: payment_gateway_options.order_id,
      handler: async function (response) {
        try {
          setLoading(true);
          let analyticData = {
            Event: analyticsData.VISITED_SCREEN,
            "Screen Name": analyticsData.PAYMENT_SCREEN,
          };
          useAnalytics(analyticData);
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
            setLoading(false);
          } else {
            notify({
              message: `Your transaction ${
                response2.status === "processing"
                  ? " is"
                  : " was " + response2.status
              }. Transaction ID: ${response2.transaction_id}`,
              type: "success",
            });
            notify({
              message:
                "Please Wait, Your transaction Details are getting updated",
              type: "success",
            });

            setLoading(true);
            setTimeout(() => {
              notify({
                message:
                  "Please refresh this page and re-login to see updated limit",
                type: "success",
              });
              togglePayment();
              setLoading(false);
            }, 15000);
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
    setLoading(false);
  };

  const showEmiDetails = () => {
    if (viewEmiDetail) {
      setViewEmiDetail(false);
      setIco(chevronRight);
    } else {
      setViewEmiDetail(true);
      setIco(chevronDown);
    }
  };
  useEffect(() => {
    clearCashFreeRelatedLocalStorage();
    var a = moment(emi.due_date);
    var b = moment(new Date());
    setDifference(a.diff(b, "days"));
    if (emi.payment_status == "Paid" && a.diff(b, "days") <= 30) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
    let analyticData = {
      Event: analyticsData.VISITED_SCREEN,
      "Screen Name": analyticsData.LOAN_DETAIL_SCREEN,
    };
    useAnalytics(analyticData);
  }, []);

  const handlePayment = async (emi) => {
    setValueOnTabClose("");
    let analyticData = {
      Button_Pressed: analyticsData.MAKE_PAYMENT_BUTTON,
      Card_Name: "Reset",
      Event: analyticsData.BUTTON_PRESSED,
      Screen: analyticsData.RESET_ACTIVE_SCREEN,
    };
    useAnalytics(analyticData);
    let payment_data = {
      type: "loan_id",
      amount: Number(emi.total_due_amount),
      value: loanId.toString(),
      extra_details: {
        user_product_id: userProductId,
      },
    };
    try {
      setLoading(true);
      let response = await callApi(
        "/reset_create_payment_request",
        "POST",
        {
          payment_data,
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        const payment_gateway_name =
          response.payment_request.payment_gateway_name;
        if (payment_gateway_name === "Razorpay") {
          handleRZPay(response);
        } else if (payment_gateway_name === "Cashfree") {
          handleCashFreePayment(response);
        } else {
          const error = new Error("Payment Gateway Unavailable");
          throw error;
        }
      } else {
        setLoading(false);
        notify({ message: "Something went wrong", type: "error" });
      }
    } catch (error) {
      setLoading(false);
      notify({ message: error.message, type: "error" });
    }
  };

  return (
    <Fragment id="pay">
      {loading ? (
        <div className="text-center" style={{ width: "100%" }}>
          <div className="loader"></div>
        </div>
      ) : emiStatus != "COMPLETED" ? (
        <div className={emi.payment_status == "Paid" ? "card-green" : "card"}>
          <div
            className="row-emi"
            style={{ cursor: "pointer" }}
            onClick={() => showEmiDetails()}
          >
            <div className="col50-left">
              <p>
                Emi #{emi.emi_number}{" "}
                {emi.payment_status == "Paid" ? (
                  <Icon icon={checkCircle} style={{ color: "#33FF00" }} />
                ) : emiPay[emiId] ? (
                  ""
                ) : (
                  <Icon icon={lock} />
                )}
              </p>
              <h5>Due on: {moment(emi.due_date).format("Do MMM, YYYY")}</h5>
            </div>
            <div className="col50-right">
              <Icon icon={ico} />
            </div>
          </div>
          {viewEmiDetail ? (
            <Fragment>
              <p>Principal : ₹{emi.due_amount}</p>
              <p>Interest : ₹{emi.interest}</p>
              <p>Total Due Amount : ₹{emi.total_due_amount}</p>
              <p>Total Limit Unlocked after payment : ₹{emi.limit_unlocked}</p>
              <Button
                title={
                  emi.payment_status == "Paid" ? (
                    "PAID"
                  ) : emiPay[emiId] ? (
                    "PAY"
                  ) : (
                    <Icon icon={lock} size={20} />
                  )
                }
                className={
                  emi.payment_status == "UnPaid" && !emiPay[emiId]
                    ? "btn-disabled"
                    : "btn"
                }
                disabled={
                  emi.payment_status == "Paid"
                    ? true
                    : emiPay[emiId]
                    ? false
                    : true
                }
                onClick={() => handlePayment(emi)}
              />
            </Fragment>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className={"card-green"}>
          <div
            className="row-emi"
            style={{ cursor: "pointer" }}
            onClick={() => showEmiDetails()}
          >
            <div className="col50-left">
              <p>
                Emi #{emi.emi_number}{" "}
                <Icon icon={checkCircle} style={{ color: "#33FF00" }} />
              </p>
              <h5>Due on: {moment(emi.due_date).format("Do MMM, YYYY")}</h5>
            </div>
            <div className="col50-right">
              <Icon icon={ico} />
            </div>
          </div>
          {viewEmiDetail ? (
            <Fragment>
              <p>Principal : ₹{emi.due_amount}</p>
              <p>Interest : ₹{emi.interest}</p>
              <p>Total Due Amount : ₹{emi.total_due_amount}</p>
              <p>Total Limit Unlocked after payment : ₹{emi.limit_unlocked}</p>
              <Button
                title="PAID"
                className={"btn"}
                disabled="true"
                onClick={() => handlePayment(emi)}
              />
            </Fragment>
          ) : (
            ""
          )}
        </div>
      )}
    </Fragment>
  );
};

export default RenderEmiDetail;
