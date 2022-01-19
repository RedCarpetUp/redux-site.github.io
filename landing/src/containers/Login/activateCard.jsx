import Button from "common/components/Button";
import Input from "common/components/Input";
import React, { useEffect, useState } from "react";

import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const ActivateCard = ({ phone, accessToken, activationFee }) => {
  //const activationFee = activationFee;
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [discountAmt, setDiscountAmt] = useState(null);
  const [couponDisabled, setCouponDisabled] = useState(false);
  const [recievedCoupon, setRecievedCoupon] = useState({});
  const [allDone, setAllDone] = useState(false);
  const notify = useNotification();

  const getCoupons = () => {
    try {
      callApi(
        "/get_user_coupons",
        "GET",
        {
          payment_request_amount: activationFee || 1000,
          payment_type: "card_activation_fees",
        },
        phone,
        accessToken
      ).then((response) => {
        let coupon_code = "";
        let discount_amount = "";
        if (response && response.data && response.data.coupons[0]) {
          coupon_code = response.data.coupons[0].coupon_code;
          discount_amount = response.data.coupons[0].max_discount_in_rupees;
        }
        setRecievedCoupon({
          coupon: coupon_code,
          discount_amount: discount_amount,
        });
        if (coupon_code != "")
          notify({
            message:
              "Offer of the day! Use coupon code " +
              coupon_code +
              " .Get discount of ₹" +
              discount_amount,
            type: "success",
          });
      });
    } catch (error) {
      notify({ message: "No coupons found", type: "success" });
    }
  };

  const getCouponDiscount = (event) => {
    event.preventDefault();
    setLoading(true);
    callApi(
      "/get_coupon_discount_amount",
      "GET",
      {
        coupon_code: coupon,
        payment_request_type: "card_activation_fees",
        payment_request_amount: parseInt(activationFee),
      },
      phone,
      accessToken
    )
      .then((response) => {
        setLoading(false);
        if (response.result === "error") {
          notify({ message: response.message, type: "error" });
        } else if (response.result === "success") {
          setCouponDisabled(true);
          setDiscountAmt(response.discount_amount);
          notify({ message: "Coupon Applied Successfully!", type: "success" });
        }
      })
      .catch((error) => {
        setLoading(false);
        notify({ message: error.message, type: "error" });
      });
  };

  useEffect(() => {
    getCoupons();
  }, []);

  const handleRZPay = async () => {
    setLoading(true);

    try {
      let response = await callApi(
        "/create_payment_requests_without_collection_app",
        "POST",
        {
          amount: Math.max(parseInt(activationFee - discountAmt), 0),
          payment_mode: "Online",
          payment_request_type: "card_activation_fees",
          coupon_code: coupon,
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
          key: payment_gateway_options.key,
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
                  }. Transaction ID: ${response2.transaction_id}}`,
                  type: "success",
                });
                setAllDone(true);
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
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      setLoading(false);
      notify({ message: error.message, type: "error" });
    }
  };

  return (
    <div className={"pcardWrapper"}>
      <div className={"card"}>
        <div className={"cardHeader"}>
          <div className="row">
            <div className={"col50 smartCardHeader"}>
              <img
                src="https://lh3.googleusercontent.com/gWybApiUlrw8YVknewflxjzIDEEzZPjzAacb8LsSlSa8d18XTaMFC-5UIK61g8P5stEI=w300-rw"
                height="35px"
                width="35px"
                alt="RC"
              />
              <h5>Activate Smart Card</h5>
            </div>
          </div>
        </div>
        <div
          className={"cardBody"}
          style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
        >
          {allDone ? (
            <div className="row">
              <div className={"col100"}>
                <h6 className="text-center">
                  All Done! Your application is under process.
                </h6>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className={"col100"}>
                <h6 className="text-center">
                  Pay card activation fee and start using your card
                </h6>
              </div>
              <div className={"col100"} style={{ paddingBottom: 0 }}>
                <div className={"pcardWrapper"}>
                  {recievedCoupon.coupon ? (
                    <div>
                      <h6 style={{ color: "#3cd458", paddingTop: "0.5em" }}>
                        Use Coupon Code :<br />
                        <h5
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => setCoupon(recievedCoupon.coupon)}
                        >
                          {recievedCoupon.coupon}
                        </h5>
                      </h6>
                      <h6 style={{ color: "#3cd458", paddingBottom: "0.5rem" }}>
                        Pay : <s>₹{activationFee}</s>&nbsp; ₹
                        {activationFee - recievedCoupon.discount_amount} Only/-
                      </h6>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className={"col100"} style={{ paddingBottom: "2em" }}>
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
                  <div>
                    {loading ? (
                      <div className="text-center">
                        <div className="loader"></div>
                      </div>
                    ) : (
                      <span className={"inputPayCombo"}>
                        <Input
                          className="payinput"
                          placeholder="Have a coupon ?"
                          onChange={(event) => setCoupon(event.toUpperCase())}
                          value={coupon}
                        />
                        &nbsp;&nbsp;
                        <Button
                          className="paybtn"
                          onClick={(event) => getCouponDiscount(event)}
                          title="Apply Coupon"
                        >
                          {/* <FormattedMessage
                                                    id="payment.enterCouponButton"
                                                    defaultMessage="Apply Coupon"
                                                /> */}
                        </Button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className={"col100"} style={{ marginBottom: "1.5rem" }}>
                <Button
                  onClick={handleRZPay}
                  className="btn btn-primary block"
                  title={
                    couponDisabled
                      ? "Pay Activation Fee : ₹" +
                        (activationFee - discountAmt) +
                        "/- Coupon : " +
                        coupon +
                        " Applied"
                      : "Pay Activation Fee : ₹" + activationFee + "/-"
                  }
                >
                  {/* {
                    couponDisabled
                      ? "Pay Activation Fee : ₹" +
                        (activationFee - discountAmt) +
                        "/- Coupon : " +
                        coupon +
                        " Applied"
                      : "Pay Activation Fee : ₹" + activationFee + "/-"
                    // <FormattedMessage id="payment.feepay"
                    //     defaultMessage={'Pay Activation Fee : ₹' + (activationFee - discountAmt) + '/- Coupon : ' + coupon + ' Applied'}
                    // />
                    // :
                    // <FormattedMessage id="payment.feepayCoupon"
                    //     defaultMessage={'Pay Activation Fee : ₹' + activationFee + '/-'}
                    // />
                  } */}
                </Button>
                <br />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivateCard;
