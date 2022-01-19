import Button from "common/components/Button";
import Input from "common/components/Input";
import React, { useEffect, useState } from "react";

import RubyCardPhysical from "public/images/login_list/physical.png";
import RubyCardImage from "public/images/login_list/ruby_front.png";
import RubyCardVirtual from "public/images/login_list/virtual.png";
import { callApi } from "common/utils/loginMiddleware";
import { closeModal, openModal } from "@redq/reuse-modal";
import { ModalSection } from "../../pages/login/login.style";
import { useNotification } from "common/hooks/useNotification";

const UpgradeCard = ({
  phone,
  payment_amount,
  payment_amount_virtual,
  user_address,
  card_available,
  type,
  paymentType,
  address_type,
  accessToken,
}) => {
  const activationFee = payment_amount;
  const activationFeeVirtual = payment_amount_virtual;
  const payment_type = paymentType;
  const source = type;
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [discountAmt, setDiscountAmt] = useState(null);
  const [couponDisabled, setCouponDisabled] = useState(false);
  const [cardTypeChoiceDisplay, setCardTypeChoiceDisplay] = useState(true);
  const [cardType, setCardType] = useState("");
  const [recievedCoupon, setRecievedCoupon] = useState({});
  const [recievedCouponVirtual, setRecievedCouponVirtual] = useState({});
  const [allDone, setAllDone] = useState(false);
  const notify = useNotification();
  const [newAddressLocality, setNewAddressLocality] = useState(
    user_address.extra_details.locality
      ? user_address.extra_details.locality
      : ""
  );
  const [newAddressAddressType, setNewAddressAddressType] = useState(
    user_address.address_type ? user_address.address_type : "Home with family"
  );
  const [newAddressBuilding, setNewAddressBuilding] = useState(
    user_address.building ? user_address.building : ""
  );
  const [newAddressCity, setNewAddressCity] = useState(
    user_address.city ? user_address.city : ""
  );
  const [newAddressState, setNewAddressState] = useState(
    user_address.extra_details.state ? user_address.extra_details.state : ""
  );
  const [newAddressPincode, setNewAddressPincode] = useState(
    user_address.extra_details.pincode ? user_address.extra_details.pincode : ""
  );
  const [valueOnTabClose, setValueOnTabClose] = useState("");

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
            setLoading(false);
            clearCashFreeRelatedLocalStorage();
            closeModal();
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

  const open = async (url) => {
    window.open(url, "_blank", "");
  };

  const handleCashFreePayment = async (response) => {
    await clearCashFreeRelatedLocalStorage();
    let paymentLink = response.payment_request[0].payment_link;
    asyncLocalStorage.setItem("cashFreePaymentStarted", "yes").then(() => {
      open(paymentLink);
    });
    window.addEventListener("storage", () =>
      setValueOnTabClose(localStorage.getItem("cashFreeTabClosed"))
    );
    handleModal();
  };

  const handlePayment = async () => {
    setLoading(true);
    setValueOnTabClose("");
    try {
      let amount = 0;
      if (cardType == "physical")
        amount = Math.max(parseInt(activationFee - discountAmt), 0);
      else amount = Math.max(parseInt(activationFeeVirtual - discountAmt), 0);

      let payment_requests = [];
      payment_requests.push({
        amount: amount,
        coupon_code: coupon,
        type: "fees",
        value: "alt_upgrade_fees",
        extra_details: {
          card_upgrade_choice: cardType,
        },
      });
      let response = await callApi(
        "/create_payment_requests",
        "POST",
        {
          payment_requests,
        },
        phone,
        accessToken
      );
      setLoading(false);
      if (
        response.result === "success" &&
        response.payment_request[0].payment_request_amount == 0 &&
        response.payment_request[0].payment_request_status === "Paid"
      ) {
        setLoading(true);
        notify({ message: "Your Transaction was successful", type: "success" });
        setAllDone(true);
        setLoading(false);
      } else if (response.result === "success") {
        const payment_gateway_name =
          response.payment_request[0].payment_gateway_name;
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
      setLoading(false);
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
          setLoading(false);
          clearCashFreeRelatedLocalStorage();
          closeModal();
        } else {
          notify({
            message: `Your transaction ${
              status === "PENDING" ? " is" : " was " + status
            }. ${referenceId ? `Transaction ID: ${referenceId}` : ``}`,
            type: "success",
          });
          setLoading(false);
          clearCashFreeRelatedLocalStorage();
          closeModal();
          setAllDone(true);
        }
      }
      callThis();
    }
  }, [valueOnTabClose]);

  const getCoupons = () => {
    callApi(
      "/get_user_coupons",
      "GET",
      {
        payment_request_amount: activationFee,
        payment_type: payment_type,
      },
      phone,
      accessToken
    ).then((response) => {
      let coupon_code = "";
      let discount_amount = "";
      if (response && response.data && response.data.coupons[0]) {
        coupon_code = response.data.coupons[0].coupon_code;
        discount_amount = response.data.coupons[0].discount_amount;
      }
      setRecievedCoupon({
        coupon: coupon_code,
        discount_amount: discount_amount,
      });
    });
  };

  const getCouponsVirtual = () => {
    callApi(
      "/get_user_coupons",
      "GET",
      {
        payment_request_amount: activationFeeVirtual,
        payment_type: payment_type,
      },
      phone,
      accessToken
    ).then((response) => {
      let coupon_code = "";
      let discount_amount = "";
      if (response && response.data && response.data.coupons[0]) {
        coupon_code = response.data.coupons[0].coupon_code;
        discount_amount = response.data.coupons[0].discount_amount;
      }
      setRecievedCouponVirtual({
        coupon: coupon_code,
        discount_amount: discount_amount,
      });
    });
  };

  const getCouponDiscount = (event) => {
    event.preventDefault();
    setLoading(true);
    callApi(
      "/get_coupon_discount_amount",
      "GET",
      {
        coupon_code: coupon,
        payment_request_type: payment_type,
        payment_request_amount: parseInt(
          cardType == "physical" ? activationFee : activationFeeVirtual
        ),
      },
      phone,
      accessToken
    )
      .then((response) => {
        setLoading(false);
        if (response.result === "error") {
          notify({ message: response.message, type: "error" });
          setCoupon(null);
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
    clearCashFreeRelatedLocalStorage();
    if (user_address) {
      setNewAddressLocality(user_address.locality);
      setNewAddressAddressType(user_address.address_type);
      setNewAddressBuilding(user_address.building);
      setNewAddressCity(user_address.city);
      setNewAddressState(user_address.state);
      setNewAddressPincode(user_address.pincode);
    }
    // getCoupons()
    // getCouponsVirtual()
  }, []);

  const handleRZPay = async (response) => {
    const payment_gateway_options = JSON.parse(
      response.payment_request[0].payment_gateway_options
    );
    const payment_request_id = response.payment_request[0].payment_request_id;
    if (payment_gateway_options.amount == 0) {
      setLoading(true);
      notify({ message: "Your Transaction was successful", type: "success" });
      setLoading(false);
      return;
    }
    const options = {
      key: payment_gateway_options.key,
      amount: payment_gateway_options.amount,
      currency: payment_gateway_options.currency,
      name: payment_gateway_options.name,
      image: payment_gateway_options.image,
      order_id: payment_gateway_options.order_id,
      handler: async function (response) {
        setLoading(true);
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
            setLoading(false);
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
  };

  let updateAddress = async () => {
    let response = await callApi(
      "/add_update_address",
      "POST",
      {
        locality: newAddressLocality,
        address_type: newAddressAddressType,
        building: newAddressBuilding,
        city: newAddressCity,
        state: newAddressState,
        pincode: newAddressPincode,
        source: source,
        type: "add",
      },
      phone,
      accessToken
    );

    if (response.result === "error") {
      notify({ message: response.message, type: "error" });
    } else if (response.result === "success") {
      notify({ message: "Address Updated Successfully", type: "success" });
      handlePayment();
    }
  };

  const setCardTypeChoice = (type) => {
    setCardType(type);
    setCardTypeChoiceDisplay(false);
  };

  const displayUpgradeCardDescription = () => {
    return (
      <div className="row">
        <div className={"col100"}>
          <div
            className={"pcardWrapper"}
            style={{ margin: "1rem auto", width: "70%", height: "200px" }}
          >
            <img
              src={RubyCardImage}
              height="200px"
              width="100%"
              alt="Ruby Card"
            />
          </div>
          <h6 className="text-center">
            {type == "alt_upgrade"
              ? "Congratulations! You are eligible for Ruby card limit upgrade."
              : "Congratulations! You are eligible for Ruby card upgrade."}{" "}
            <br />
            <br />
            Ruby card is our latest product which is fully controllable from our
            RedCarpet App only. You can track all the transactions, make
            payments and do reloads all from one place.
            {type == "alt_upgrade"
              ? ""
              : " Ruby card can now be used as an ATM card. You can withdraw cash from any ATM."}
          </h6>
          <br />
          <h6 className="text-center" style={{ color: "red" }}>
            {type == "alt_upgrade"
              ? "*Please Note: The card limit upgrade changes will be reflected on your RedCarpet App within 8 hours."
              : "*Please Note: Due to high demand for upgrade, your request will be processed in estimated 1-2 months."}
          </h6>
        </div>
      </div>
    );
  };

  const displayCardTypeChoice = () => {
    if (type == "alt_upgrade") {
      return (
        <div className="row">
          <div className={"col100"} style={{ padding: "16px 0" }}>
            <h4>Your RedCarpet Ruby card limit can be upgraded.</h4>
          </div>
          <div className={"col60 small_col100"} style={{ padding: "20px 0" }}>
            <br />
            <h6 style={{ textAlign: "justify" }}>
              Congratulations! You are eligible for a limit upgrade on your
              RedCarpet Ruby card. Your card limit can be increased by upto Rs.
              10,000/-. So, what are you waiting for? The whole world is just a
              click away! Get Shopping!
            </h6>
            <h5
              style={{
                textAlign: "justify",
                color: "red",
                paddingTop: "15px",
                fontSize: "12px",
              }}
            >
              *Note: After upgrade, you will be charged a small fee on every
              reload.
            </h5>
            <h6
              style={{
                textAlign: "justify",
                color: "red",
                paddingTop: "15px",
                fontSize: "12px",
              }}
            >
              *Virtual Card can be upgraded to a Physical Card whenever you
              want!
            </h6>
            <br />
            <Button
              onClick={(event) => setCardTypeChoice("virtual")}
              title="Upgrade Your Card limit now!"
              className="btn-full"
            >
              {/* <FormattedMessage
                id="payment.selectVirtual"
                defaultMessage="Upgrade Your Card limit now!"
              /> */}
            </Button>
          </div>
          <div className={"col40 small_col100"} style={{ margin: "60px 0" }}>
            <img
              src={RubyCardVirtual}
              height="200px"
              width="100%"
              alt="Ruby Card"
            />
          </div>
        </div>
      );
    } else {
      if (cardTypeChoiceDisplay && card_available.length > 1) {
        return (
          <div className="row">
            <div className={"col100"}>
              <h2>Choose your Card</h2>
            </div>
            <div className={"col100"} style={{ padding: "16px 0" }}>
              <h6>
                RedCarpet Ruby Card has 2 flavours, Virtual and Physical. <br />
                Select your new card you want to upgrade into.
              </h6>
            </div>
            <div className={"col60 small_col100"} style={{ padding: "20px 0" }}>
              <h3 style={{ textAlign: "left" }}>Physical Ruby Card</h3>
              <br />
              <h6 style={{ textAlign: "justify" }}>
                You will be receive a physical card at the address provided
                which you can use for offline transactions (at the malls and
                shops), online transaction (on Amazon, Flipkart, Swiggy,
                Grofers, etc.) and also withdraw cash from the ATM anywhere in
                India. Now you have cash at hand whenever you want!
              </h6>
              <br />
              <Button
                onClick={(event) => setCardTypeChoice("physical")}
                className="btn-full"
                title="Get Physical Ruby Card"
              >
                {/* <FormattedMessage
                  id="payment.selectPhysical"
                  defaultMessage="Get Physical Ruby Card"
                /> */}
              </Button>
            </div>
            <div className={"col40 small_col100"} style={{ margin: "50px 0" }}>
              <img
                src={RubyCardPhysical}
                height="200px"
                width="100%"
                alt="Ruby Card"
              />
            </div>
            <div className={"col60 small_col100"} style={{ padding: "20px 0" }}>
              <h3 style={{ textAlign: "left" }}>Virtual Ruby Card</h3>
              <br />
              <h6 style={{ textAlign: "justify" }}>
                You will get a Virtual Card which you can see on your RedCarpet
                App. You can use this card for any online transaction (on
                Amazon, Flipkart, Swiggy, Grofers, etc.) or transfer money in
                online wallets (like Mobikwik). The whole world is just a click
                away! Get Shopping!
              </h6>
              <h6
                style={{
                  textAlign: "justify",
                  color: "red",
                  paddingTop: "15px",
                  fontSize: "12px",
                }}
              >
                *Virtual Card can be upgraded to a Physical Card whenever you
                want!
              </h6>
              <br />
              <Button
                onClick={(event) => setCardTypeChoice("virtual")}
                title="Get Virtual Ruby Card"
                className="btn-full"
              >
                {/* <FormattedMessage
                  id="payment.selectVirtual"
                  defaultMessage="Get Virtual Ruby Card"
                /> */}
              </Button>
            </div>
            <div className={"col40 small_col100"} style={{ margin: "60px 0" }}>
              <img
                src={RubyCardVirtual}
                height="200px"
                width="100%"
                alt="Ruby Card"
              />
            </div>
          </div>
        );
      } else if (cardTypeChoiceDisplay && card_available[0] == "virtual") {
        return (
          <div className="row">
            <div className={"col100"}>
              <h2>Choose your Card</h2>
            </div>
            <div className={"col100"} style={{ padding: "16px 0" }}>
              <h6>
                Your RedCarpet Ruby Card can be upgraded to {card_available[0]}{" "}
                Card.
              </h6>
            </div>
            <div className={"col60 small_col100"} style={{ padding: "20px 0" }}>
              <h3 style={{ textAlign: "left" }}>Virtual Ruby Card</h3>
              <br />
              <h6 style={{ textAlign: "justify" }}>
                You will get a Virtual Card which you can see on your RedCarpet
                App. You can use this card for any online transaction (on
                Amazon, Flipkart, Swiggy, Grofers, etc.) or transfer money in
                online wallets (like Mobikwik). The whole world is just a click
                away! Get Shopping!
              </h6>
              <h6
                style={{
                  textAlign: "justify",
                  color: "red",
                  paddingTop: "15px",
                  fontSize: "12px",
                }}
              >
                *Virtual Card can be upgraded to a Physical Card whenever you
                want!
              </h6>
              <br />
              <Button
                onClick={(event) => setCardTypeChoice("virtual")}
                title="Get Virtual Ruby Card"
                className="btn-full"
              >
                {/* <FormattedMessage
                  id="payment.selectVirtual"
                  defaultMessage="Get Virtual Ruby Card"
                /> */}
              </Button>
            </div>
            <div className={"col40 small_col100"} style={{ margin: "60px 0" }}>
              <img
                src={RubyCardVirtual}
                height="200px"
                width="100%"
                alt="Ruby Card"
              />
            </div>
          </div>
        );
      } else if (cardTypeChoiceDisplay && card_available[0] == "physical") {
        return (
          <div className="row">
            <div className={"col100"}>
              <h2>Choose your Card</h2>
            </div>
            <div className={"col100"} style={{ padding: "16px 0" }}>
              <h6>
                Your RedCarpet Ruby Card can be upgraded to {card_available[0]}{" "}
                Card.
              </h6>
            </div>
            <div className={"col60 small_col100"} style={{ padding: "20px 0" }}>
              <h3 style={{ textAlign: "left" }}>Physical Ruby Card</h3>
              <br />
              <h6 style={{ textAlign: "justify" }}>
                You will be receive a physical card at the address provided
                which you can use for offline transactions (at the malls and
                shops), online transaction (on Amazon, Flipkart, Swiggy,
                Grofers, etc.) and also withdraw cash from the ATM anywhere in
                India. Now you have cash at hand whenever you want!
              </h6>
              <br />
              <Button
                onClick={(event) => setCardTypeChoice("physical")}
                title="Get Physical Ruby Card"
                className="btn-full"
              >
                {/* <FormattedMessage
                  id="payment.selectPhysical"
                  defaultMessage="Get Physical Ruby Card"
                /> */}
              </Button>
            </div>
            <div className={"col40 small_col100"} style={{ margin: "50px 0" }}>
              <img
                src={RubyCardPhysical}
                height="200px"
                width="100%"
                alt="Ruby Card"
              />
            </div>
          </div>
        );
      }
    }
  };

  const displayCardUpgradeForm = () => {
    if (!cardTypeChoiceDisplay)
      return (
        <div className="row">
          <div className={"col100"}>
            {type != "alt_upgrade" ? (
              <h5 style={{ textTransform: "capitalize" }}>
                Upgrade To {cardType} Ruby Card
                <br />{" "}
              </h5>
            ) : (
              ""
            )}

            <h6 className="text-center">
              {cardType == "physical"
                ? "To get the latest Physical Ruby Card, fill out the below form with your latest address. Your new Ruby Card will be delivered to this address."
                : type == "alt_upgrade"
                ? "Please click below Button to pay the upgrade fee and increase your limit."
                : "You selected Virtual Ruby Card. Please click below Button to pay the upgrade fee and the card will be yours."}
            </h6>
            <br />
            {cardType == "physical" ? (
              <div className={"col100"}>
                <div
                  className="section-dialog"
                  style={{ background: "#fafbfb" }}
                >
                  <div>
                    <div className="form input-line">
                      <div className="form-group">
                        <input
                          name="locality"
                          placeholder="Locality"
                          className="form-control"
                          value={newAddressLocality}
                          onChange={(e) =>
                            setNewAddressLocality(e.target.value)
                          }
                          type="text"
                        />
                      </div>
                      <div className="form-group">
                        <select
                          name="address_type"
                          placeholder="Address Type"
                          value={newAddressAddressType}
                          onChange={(e) =>
                            setNewAddressAddressType(e.target.value)
                          }
                          className="form-control"
                        >
                          <option value="Home with family">
                            Home with family
                          </option>
                          <option value="Rented with family">
                            Rented with family
                          </option>
                          <option value="Rented with friends">
                            Rented with friends
                          </option>
                          <option value="Hostel/PG">Hostel/PG</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          name="building"
                          placeholder="Building"
                          className="form-control"
                          value={newAddressBuilding}
                          onChange={(e) =>
                            setNewAddressBuilding(e.target.value)
                          }
                          type="text"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="city"
                          placeholder="City"
                          className="form-control"
                          value={newAddressCity}
                          onChange={(e) => setNewAddressCity(e.target.value)}
                          type="text"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="state"
                          placeholder="State"
                          className="form-control"
                          value={newAddressState}
                          onChange={(e) => setNewAddressState(e.target.value)}
                          type="text"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="pincode"
                          placeholder="Pincode"
                          className="form-control"
                          value={newAddressPincode}
                          onChange={(e) => setNewAddressPincode(e.target.value)}
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={"col100"} style={{ paddingBottom: 0 }}>
            {/* <div className={"pcardWrapper"}>
                        {
                            recievedCoupon.coupon ? 
                                <div>
                                    <h6 style={{ color: '#3cd458', paddingTop: '0.5em' }}>
                                        Use Coupon Code :<br />
                                        <h5 style={{ color: 'red', cursor: 'pointer' }}
                                            onClick={() => setCoupon(recievedCoupon.coupon)}>{recievedCoupon.coupon}
                                        </h5>
                                    </h6>
                                    <h6 style={{ color: '#3cd458', paddingBottom: '0.5rem' }}>
                                        Pay : <s>₹{activationFee}</s>&nbsp; ₹{activationFee - recievedCoupon.discount_amount} Only/-
                                    </h6>
                                </div>
                            : ''
                        }
                        </div> */}
          </div>
          <div className={"col100"} style={{ paddingBottom: "2em" }}>
            {loading ? (
              <div className="text-center">
                <div className="loader"></div>
              </div>
            ) : couponDisabled ? (
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
              <div className="col100">
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
                      style={{ width: "70%" }}
                      value={coupon}
                    />
                    &nbsp;&nbsp;
                    <Button
                      onClick={(event) => getCouponDiscount(event)}
                      title="Apply Coupon"
                      style={{ width: "30%", borderRadius: "5px" }}
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

          {cardType == "physical" ? (
            <div className={"col100"} style={{ marginBottom: "1.5rem" }}>
              <Button
                onClick={(e) => updateAddress()}
                className="btn-full"
                title={
                  couponDisabled
                    ? "Update Address and Pay Card Delivery Fee : ₹" +
                      (activationFee - discountAmt) +
                      "/- Coupon : " +
                      coupon +
                      " Applied"
                    : // <FormattedMessage
                      //   id="payment.feepay"
                      //   defaultMessage={
                      //     "Update Address and Pay Card Delivery Fee : ₹" +
                      //     (activationFee - discountAmt) +
                      //     "/- Coupon : " +
                      //     coupon +
                      //     " Applied"
                      //   }
                      // />
                      "Update Address and Pay Card Delivery Fee : ₹" +
                      activationFee +
                      "/-"
                  // <FormattedMessage
                  //   id="payment.feepayCoupon"
                  //   defaultMessage={
                  //     "Update Address and Pay Card Delivery Fee : ₹" +
                  //     activationFee +
                  //     "/-"
                  //   }
                  // />
                }
              ></Button>
              <br />
            </div>
          ) : (
            <div className={"col100"} style={{ marginBottom: "1.5rem" }}>
              <Button
                onClick={(e) => handlePayment()}
                className="btn-full"
                title={
                  couponDisabled
                    ? "Pay Card Upgrade Fee : ₹" +
                      (activationFeeVirtual - discountAmt) +
                      "/- Coupon : " +
                      coupon +
                      " Applied"
                    : // <FormattedMessage
                      //   id="payment.feepay"
                      //   defaultMessage={
                      //     "Pay Card Upgrade Fee : ₹" +
                      //     (activationFeeVirtual - discountAmt) +
                      //     "/- Coupon : " +
                      //     coupon +
                      //     " Applied"
                      //   }
                      // />
                      "Pay Card Upgrade Fee : ₹" + activationFeeVirtual + "/-"
                  // <FormattedMessage
                  //   id="payment.feepayCoupon"
                  //   defaultMessage={
                  //     "Pay Card Upgrade Fee : ₹" + activationFeeVirtual + "/-"
                  //   }
                  // />
                }
              ></Button>
              <br />
            </div>
          )}
        </div>
      );
  };

  const displayAllDone = () => {
    return (
      <div className="row">
        <div className={"col100"}>
          <h6 className="text-center">
            {type == "alt_upgrade" ? (
              <>
                <p>
                  Congratulations! You have successfully upgraded your card
                  limit! This is the maximum amount that you can spend with your
                  Ruby Card. To get the load, <b>please follow the steps</b>:-
                </p>
                <ul style={{ textAlign: "left" }}>
                  <li>1. Login on the Redcarpetup App.</li>
                  <li>2. Click on Reload Card.</li>
                  <li>
                    3. Set up auto-pay if you wish to avoid late fee charges and
                    want a discount on your reload fee. Skip this screen if you
                    don’t wish to get the discount.
                  </li>
                  <li>
                    4. If you wish to proceed with autopay, provide Bank details
                    on which you wish to set up the automatic payment and then
                    you will be redirected to Bank account verification screen
                    where you will be required to complete a Rs 1.00 payment
                    authorization to confirm your registration.
                  </li>
                  <li>
                    5. The maximum amount which we are authorized to get from
                    your bank account is 5000 only.
                  </li>
                  <li>
                    6. Select the reload amount you want to add to the card.
                  </li>
                  <li>7. Pay the discounted reload fee.</li>
                  <li>
                    8. Refresh the screen and check your Ruby card balance.
                    Reload amount will start reflecting in your ruby card.
                  </li>
                </ul>
              </>
            ) : (
              "All Done! Your application is under process."
            )}
          </h6>
        </div>
      </div>
    );
  };

  const displayUpgradeForm = () => {
    return (
      <div className="row">
        {displayUpgradeCardDescription()}
        <hr style={{ border: "1px solid black", width: "100%" }} />
        {displayCardTypeChoice()}
        {displayCardUpgradeForm()}
      </div>
    );
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
              <h5>
                {type == "alt_upgrade"
                  ? "Upgrade Your RUBY Card limit"
                  : "Upgrade ZETA Card to RUBY Card"}
              </h5>
            </div>
          </div>
        </div>
        <div
          className={"cardBody"}
          style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
        >
          {allDone ? (
            <div>{displayAllDone()}</div>
          ) : (
            <div>{displayUpgradeForm()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpgradeCard;
