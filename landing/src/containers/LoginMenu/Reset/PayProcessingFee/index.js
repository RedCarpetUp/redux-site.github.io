import React, { useState, useEffect, Fragment } from "react";
import LoginMenu from "../../index";
import Button from "common/components/Button";
import Input from "common/components/Input";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import PayProcessingFeeWrapper from "./style";
import { callApi } from "common/utils/loginMiddleware";

import AnchorLink from "react-anchor-link-smooth-scroll";
import useAnalytics from "../../../../common/hooks/useAnalytics";
import { analyticsData } from "../../../../common/data/analytics";
import { closeModal, openModal } from "@redq/reuse-modal";
import { ModalSection } from "./style";
import Icon from "react-icons-kit";
import { ic_error } from "react-icons-kit/md/ic_error";
import { useNotification } from "common/hooks/useNotification";

const PayProcessingFee = (props) => {
  const { dataBranch, userProfile } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [userProductId, setUserProductId] = useState("");
  const { phone, accessToken, goBack } = props;
  const [allDone, setAllDone] = useState(false);
  const [processingFee, setProcessingFee] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [discountAmt, setDiscountAmt] = useState(null);
  const [couponDisabled, setCouponDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [valueOnTabClose, setValueOnTabClose] = useState("");
  const [GST, setGST] = useState(null);
  const [couponError, setCouponError] = useState("");
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
  };

  const clearCashFreeRelatedLocalStorage = async () => {
    Object.entries(localStorage)
      .map((x) => x[0])
      .filter((x) => x.substring(0, 8) == "cashFree")
      .forEach((x) => localStorage.removeItem(x));
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

  const handlePayment = async () => {
    if (isChecked == false) {
      notify({ message: "Please Accept the Declaration", type: "error" });
      return;
    }
    let analyticData = {
      Event: analyticsData.BUTTON_PRESSED,
      Card_Name: "Reset",
      Button_Pressed: analyticsData.MAKE_PAYMENT_BUTTON,
      Screen: analyticsData.RESET_ONBOARDING_SCREEN,
    };
    useAnalytics(analyticData);
    setValueOnTabClose("");
    try {
      setIsLoading(true);
      let payment_data = {
        type: "fees",
        amount: Number(processingFee || props.processingFee || 500),
        extra_details: {
          user_product_id: userProductId,
        },
        value: "reset_joining_fees",
        coupon_code: coupon,
      };
      let response = await callApi(
        "/reset_create_payment_request",
        "POST",
        {
          payment_data,
        },
        phone,
        accessToken
      );
      setIsLoading(false);
      if (
        response.result === "success" &&
        response.payment_request.payment_request_amount == 0 &&
        response.payment_request.payment_request_status === "Paid"
      ) {
        notify({ type: "success", message: "Your Transaction was successful" });
        setIsLoading(true);
        setTimeout(() => {
          getUserProductId();
          setIsLoading(false);
          if (props.redirectUser) {
            props.redirectUser();
          } else {
            setAllDone(true);
          }
        }, 20000);
      } else if (response.result === "success") {
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
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      setIsLoading(false);
      notify({ message: error.message, type: "error" });
    }
  };

  useEffect(() => {
    var status = localStorage.getItem("cashFreePaymentStatus");
    if (
      valueOnTabClose &&
      valueOnTabClose != "" &&
      valueOnTabClose == "yes" &&
      status !== null
    ) {
      async function callThis() {
        window.removeEventListener("storage", () =>
          setValueOnTabClose(localStorage.getItem("cashFreeTabClosed"))
        );
        var referenceId = localStorage.getItem("cashFreePaymentReferenceId");
        if (status !== "SUCCESS" && status !== "PENDING") {
          notify({
            message:
              `Your transaction ${status}. ${referenceId ? `Transaction ID: ${referenceId}` : ``
              }`, type: "error"
          });
          clearCashFreeRelatedLocalStorage();
          closeModal();
        } else {
          notify({
            message:
              `Your transaction ${status === "PENDING" ? " is" : " was " + status
              }. ${referenceId ? `Transaction ID: ${referenceId}` : ``}`, type: "success"
          });
          try {
            if (dataBranch && dataBranch["~id"]) {
              let response = await callApi(
                "/get_events_branch",
                "GET",
                {},
                phone,
                accessToken
              );
              if (response.result == "success") {
                if (response.data) {
                  response.data.map(async (d) => {
                    if (!d.hit_status) {
                      let custom_data = {
                        event: d.event,
                        userName: userProfile.user_data.first_name,
                        userId: userProfile.user_data.user_id,
                        userPhone: userProfile.user_data.phone_number,
                        platform: "website",
                      };
                      branch.logEvent(d.event, custom_data, function (err) {
                        console.log(err);
                      });
                      let response1 = await callApi(
                        "/event_hit_success",
                        "POST",
                        {
                          product_type: d.product_type,
                          type: d.tag,
                        },
                        phone,
                        accessToken
                      );
                    }
                  });
                }
              }
            }
          } catch (err) { }
          setIsLoading(true);
          clearCashFreeRelatedLocalStorage();
          closeModal();
          const timer = setTimeout(() => {
            getUserProductId();
            setIsLoading(false);
            if (props.redirectUser) {
              props.redirectUser();
            } else {
              setAllDone(true);
            }
          }, 20000);
          return () => clearTimeout(timer);
        }
      }
      callThis();
    }
  }, [valueOnTabClose]);

  useEffect(() => {
    clearCashFreeRelatedLocalStorage();
    if (props.userProductId) {
      setUserProductId(props.userProductId);
      getTnc(props.userProductId);
    } else {
      getUserProductId();
    }
  }, []);
  if (allDone) {
    return (
      <LoginMenu
        phone={phone}
        accessToken={accessToken}
        isNewUser={false}
        redirectedUser={true}
      />
    );
  }

  const getCouponDiscount = (event) => {
    event.preventDefault();
    setIsLoading(true);
    let analyticData = {
      Event: analyticsData.BUTTON_PRESSED,
      Card_Name: "Reset",
      Button_Pressed: analyticsData.APPLY_COUPON_BUTTON,
      Screen: analyticsData.RESET_ONBOARDING_SCREEN,
    };
    useAnalytics(analyticData);
    callApi(
      "/get_coupon_discount_amount",
      "GET",
      {
        coupon_code: coupon,
        payment_request_type: "reset_joining_fees",
        payment_request_amount: parseInt(
          processingFee || props.processingFee || 500
        ),
      },
      phone,
      accessToken
    )
      .then((response) => {
        setIsLoading(false);
        if (response.result === "error") {
          setCouponError(response.message);
          setCoupon(null);
        } else if (response.result === "success") {
          setCouponDisabled(true);
          setCouponError("");
          setDiscountAmt(response.discount_amount);
          notify({ type: "success", message: "Coupon Applied Successfully!" });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        notify({ message: error.message, type: "error" });
      });
  };

  const getTnc = async (productId) => {
    try {
      let response = await callApi(
        "/get_review_t_and_c",
        "GET",
        {
          user_product_id: userProductId ? userProductId : productId,
        },
        phone,
        accessToken
      );

      if (response.result == "success") {
        response.agreement.fields.map((field) => {
          if (field.type == "Processing Fees") {
            setProcessingFee(field.value);
          }
        });
        if (response.showGst) setGST(response.rateGst);
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  const handleRZPay = async (response) => {
    const payment_gateway_options = JSON.parse(
      response.payment_request.payment_gateway_options
    );
    const payment_request_id = response.payment_request.payment_request_id;
    const options = {
      key: payment_gateway_options.key,
      amount: payment_gateway_options.amount,
      currency: payment_gateway_options.currency,
      name: payment_gateway_options.name,
      image: payment_gateway_options.image,
      order_id: payment_gateway_options.order_id,
      handler: async function (response) {
        try {
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
              message:
                `Your transaction ${response2.status === "processing"
                  ? " is"
                  : " was " + response2.status
                }. Transaction ID: ${response2.transaction_id}`, type: "error"
            });
          } else {
            notify({
              message:
                `Your transaction ${response2.status === "processing"
                  ? " is"
                  : " was " + response2.status
                }. Transaction ID: ${response2.transaction_id}`, type: "success"
            }
            );

            try {
              if (dataBranch && dataBranch["~id"]) {
                let response = await callApi(
                  "/get_events_branch",
                  "GET",
                  {},
                  phone,
                  accessToken
                );
                if (response.result == "success") {
                  if (response.data) {
                    response.data.map(async (d) => {
                      if (!d.hit_status) {
                        let custom_data = {
                          event: d.event,
                          userName: userProfile.user_data.first_name,
                          userId: userProfile.user_data.user_id,
                          userPhone: userProfile.user_data.phone_number,
                          platform: "website",
                        };
                        branch.logEvent(d.event, custom_data, function (err) {
                          console.log(err);
                        });
                        let response1 = await callApi(
                          "/event_hit_success",
                          "POST",
                          {
                            product_type: d.product_type,
                            type: d.tag,
                          },
                          phone,
                          accessToken
                        );
                      }
                    });
                  }
                }
              }
            } catch (err) { }
            setIsLoading(true);
            setTimeout(() => {
              getUserProductId();
              setIsLoading(false);
              if (props.redirectUser) {
                props.redirectUser();
              } else {
                setAllDone(true);
              }
            }, 20000);
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
      method: payment_gateway_options.method,
    };
    let rz = new window.Razorpay(options);
    rz.open();
  };

  const getUserProductId = async () => {
    try {
      setIsLoading(true);
      let response = await callApi(
        "/user_products_and_states/term_loan_reset",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        setUserProductId(response.data[0].user_product_id);
      } else {
        notify({ message: response.message, type: "error" });
      }
      setIsLoading(false);
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        <div className="loader">
          <div className="lds-dual-ring"></div>
          <center>
            <p>Hold Back and Relax we are processing your request...</p>
          </center>
        </div>
      ) : (
        <PayProcessingFeeWrapper>
          <div className="row">
            <div className={"col60"}>
              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">
                  <h1>Pay Program Fees</h1>
                </div>
              </div>
              <Text content="Your Card will be locked initially, pay your monthly due to unlock your card limit." />
              <div className={"col80"}>
                <span className={"inputPayCombo"}>
                  <div className="payinput">
                    <Heading content="Program Fees (non-refundable)" />
                  </div>
                  <div className="payinput-right">
                    ₹{" "}
                    {processingFee
                      ? processingFee - discountAmt
                      : props.processingFee
                        ? props.processingFee
                        : "500"}
                    {GST && GST > 0 ? ` + ${GST}% GST.` : ""}
                  </div>
                </span>
              </div>
              {couponDisabled ? (
                <a href="#">
                  <h6
                    className={"remove"}
                    onClick={() => {
                      setCouponDisabled(false);
                      setDiscountAmt(null);
                      setCoupon(null);
                    }}
                  >
                    Remove Coupon
                  </h6>
                </a>
              ) : (
                <span className={"inputPayCombo-coupon"}>
                  <Input
                    className="payinput-coupon"
                    placeholder="Have a coupon ?"
                    onChange={(event) => setCoupon(event.toUpperCase())}
                    style={{ width: "100%" }}
                    value={coupon}
                  />
                  &nbsp;&nbsp;
                  <Button
                    onClick={(event) => getCouponDiscount(event)}
                    title="Apply"
                    className="paybtn-coupon"
                  >
                    {/* <FormattedMessage
                        id="payment.enterCouponButton"
                        defaultMessage="Apply Coupon"
                      /> */}
                  </Button>
                </span>
              )}
              {couponError && (
                <label className="couponError">
                  <Icon
                    icon={ic_error}
                    style={{
                      marginRight: "5px",
                    }}
                  />
                  {couponError}
                </label>
              )}
              <br />
              <label for="tnc" className="tnc">
                <input
                  type="checkbox"
                  id="tnc"
                  name="tnc"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  style={{ marginRight: 10 }}
                />
                I understand that it is a Reset Card to build/increase my credit
                score and I have to pay my monthly due in order to unlock my
                credit limit.
              </label>
              <AnchorLink href="#scroll-up">
                <Button
                  title="Pay Now"
                  className="btn"
                  onClick={handlePayment}
                />
              </AnchorLink>
            </div>
          </div>
        </PayProcessingFeeWrapper>
      )}
    </Fragment>
  );
};

export default PayProcessingFee;
