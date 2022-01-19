import Button from "common/components/Button";
import Input from "common/components/Input";
import React, { useEffect, useState } from "react";

import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const CardLostStatusCard = ({
  phone,
  accessToken,
  toggler,
  UserCardDetailsFunc,
  cardLostFee,
}) => {
  const [showCardStatus, setShowCardStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [funnel, setFunnel] = useState("");
  const [newAddress, setNewAddress] = useState({});
  const [userAddressess, setUserAddressess] = useState([]);
  const [addAddress, setAddAddress] = useState(false);
  const [isAddressPresent, setIsAddressPresent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const notify = useNotification();
  const [entryErr, setEntryErr] = useState(false);

  const [newLocality, setNewLocality] = useState("");
  const [newAddressType, setNewAddressType] = useState("Home with family");
  const [newBuilding, setNewBuilding] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [states, setStates] = useState([]);

  const [coupon, setCoupon] = useState(null);
  const [discountAmt, setDiscountAmt] = useState(null);
  const [couponDisabled, setCouponDisabled] = useState(false);
  const [recievedCoupon, setRecievedCoupon] = useState({});
  //const [allDone, setAllDone] = useState(false);

  const getCoupons = async () => {
    try {
      let response = await callApi(
        "/get_user_coupons",
        "GET",
        {
          payment_request_amount: cardLostFee || 1000,
          payment_type: "card_lost_fees",
        },
        phone,
        accessToken
      );
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
      if (coupon_code != "") {
        notify({
          message:
            "Offer of the day! Use coupon code " +
            coupon_code +
            " .Get discount of ₹" +
            discount_amount,
          type: "success",
        });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  const getCouponDiscount = (event) => {
    event.preventDefault();
    setLoader(true);
    callApi(
      "/get_coupon_discount_amount",
      "GET",
      {
        coupon_code: coupon,
        payment_request_type: "card_lost_fees",
        payment_request_amount: parseInt(cardLostFee),
      },
      phone,
      accessToken
    )
      .then((response) => {
        setLoader(false);
        if (response.result === "error") {
          notify({ message: response.message, type: "error" });
        } else if (response.result === "success") {
          setCouponDisabled(true);
          setDiscountAmt(response.discount_amount);
          notify({ message: "Coupon Applied Successfully!", type: "success" });
        }
      })
      .catch((error) => {
        setLoader(false);
        notify({ message: error.message, type: "error" });
      });
  };

  useEffect(() => {
    getCoupons();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setLoader(true);
        let response = await callApi(
          "/get_user_card_status",
          "GET",
          {},
          phone,
          accessToken
        );
        setLoader(false);
        setRefreshMsg(false);
        if (response.result === "success") {
          setMessage(response.message);
          setFunnel(response.funnel);
          setShowCardStatus(true);
        } else {
          setShowCardStatus(false);
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }

      try {
        setLoader(true);
        let response = await callApi(
          "/get_user_addresses",
          "GET",
          {},
          phone,
          accessToken
        );
        setLoader(false);
        if (response.result === "success") {
          let newRespObj = {};
          if (response.address.length > 0) {
            response.address.forEach((e) => {
              if (
                e.extra_details.hasOwnProperty("dispatch_lost") &&
                e.extra_details.dispatch_lost === true
              ) {
                Object.assign(newRespObj, {
                  id: e.id,
                  locality: e.locality,
                  address_type: e.address_type,
                  building: e.building,
                  city: e.city,
                  state: e.state,
                  pincode: e.pincode,
                  current_address: e.current_address,
                  extra_details: e.extra_details,
                });
              }
            });
            if (
              showNewAddress ||
              (Object.keys(newRespObj).length === 0 &&
                newRespObj.constructor === Object)
            ) {
              Object.assign(newRespObj, {
                id: response.address[0].id,
                locality: response.address[0].locality,
                address_type: response.address[0].address_type,
                building: response.address[0].building,
                city: response.address[0].city,
                state: response.address[0].state,
                pincode: response.address[0].pincode,
                current_address: response.address[0].current_address,
                extra_details: response.address[0].extra_details,
              });
            }
          }
          setNewAddress(newRespObj);
          setUserAddressess(response.address);
          setShowNewAddress(false);
        } else {
          setShowNewAddress(false);
          setUserAddressess([]);
        }
      } catch (error) {
        setShowNewAddress(false);
        notify({ message: error.message, type: "error" });
      }
    }
    getData();
    const getStates = async () => {
      try {
        let response = await callApi(
          "/get_all_states",
          "GET",
          {},
          phone,
          accessToken
        );
        if (response.result === "success") {
          setStates(response.state_data);
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    };
    getStates();
  }, [refreshMsg, toggler]);

  const handleRZPay = async () => {
    try {
      setBtnLoader(true);
      let response = await callApi(
        "/create_payment_requests_without_collection_app",
        "POST",
        {
          amount: Math.max(parseInt(cardLostFee - discountAmt), 0),
          payment_mode: "Online",
          payment_request_type: "card_lost_fees",
          coupon_code: coupon,
        },
        phone,
        accessToken
      );
      if (
        response.result === "success" &&
        response.payment_request[0].payment_request_amount == 0 &&
        response.payment_request[0].payment_request_status === "Paid"
      ) {
        setLoader(true);
        notify({ message: "Your Transaction was successful", type: "success" });
        setTimeout(() => {
          setLoader(false);
          setRefreshMsg(!refreshMsg);
        }, 25000);
      } else if (response.result === "success") {
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
                setLoader(true);
                notify({
                  message: `Your transaction ${
                    response2.status === "processing"
                      ? " is"
                      : " was " + response2.status
                  }. Transaction ID: ${response2.transaction_id}`,
                  type: "success",
                });
                setTimeout(() => {
                  setLoader(false);
                  setRefreshMsg(!refreshMsg);
                }, 25000);
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
      setBtnLoader(false);
    } catch (error) {
      setBtnLoader(false);
      notify({ message: error.message, type: "error" });
    }
  };

  const handleAddAddress = async () => {
    if (
      newLocality === "" ||
      newBuilding === "" ||
      newCity === "" ||
      newState === "" ||
      newPincode === ""
    ) {
      setEntryErr(true);
    } else {
      setEntryErr(false);
      setBtnLoader(true);
      try {
        let response = await callApi(
          "/add_update_address",
          "POST",
          {
            type: "add",
            source: "card_lost",
            locality: newLocality,
            address_type: newAddressType,
            building: newBuilding,
            city: newCity,
            state: newState,
            pincode: newPincode,
          },
          phone,
          accessToken
        );
        setBtnLoader(false);
        if (response.result === "success") {
          setAddAddress(false);
          setRefreshMsg(!refreshMsg);
          setShowNewAddress(true);
          notify({
            message:
              "Address Added Successfully. Please Select It From Dropdown",
            type: "success",
          });
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        setBtnLoader(false);
        notify({ message: error.message, type: "error" });
      }
    }
  };

  const handleConfirmAddress = async () => {
    if (
      newAddress.extra_details.hasOwnProperty("dispatch_lost") &&
      newAddress.extra_details.dispatch_lost === true
    ) {
      setIsAddressPresent(true);
      notify({
        message:
          "Delivery Address Confirmed Successfully. Please proceed to pay card fees",
        type: "success",
      });
    } else {
      try {
        setBtnLoader(true);
        let response = await callApi(
          "/add_update_address",
          "POST",
          {
            type: "card_lost_dispatch_update",
            address_id: newAddress.id,
          },
          phone,
          accessToken
        );
        setBtnLoader(false);
        if (response.result === "success") {
          setIsAddressPresent(true);
          notify({
            message:
              "Delivery Address Confirmed Successfully. Please proceed to pay card fees",
            type: "success",
          });
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        setBtnLoader(false);
        notify({ message: error.message, type: "error" });
      }
    }
  };

  const renderAddressCard = () => {
    return (
      <div className={"pcardWrapper"} style={{ width: "100%" }}>
        <div className={"card"}>
          <div className={"cardHeader"}>
            <div className="row">
              <div className={"col50 smartCardHeader"}>
                <h5>Select Delivery Address</h5>
              </div>
            </div>
          </div>
          <div
            className={"cardBody"}
            style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
          >
            <>
              {!addAddress ? (
                <>
                  <div className="form-group">
                    <select
                      name="address"
                      placeholder="Address"
                      value={JSON.stringify(newAddress)}
                      onChange={(e) =>
                        setNewAddress(JSON.parse(e.target.value))
                      }
                      className="form-control-select"
                    >
                      {userAddressess.map((obj) => {
                        return (
                          <option
                            value={JSON.stringify({
                              id: obj.id,
                              locality: obj.locality,
                              address_type: obj.address_type,
                              building: obj.building,
                              city: obj.city,
                              state: obj.state,
                              pincode: obj.pincode,
                              current_address: obj.current_address,
                              extra_details: obj.extra_details,
                            })}
                          >
                            {obj.current_address}, {obj.city}, {obj.state} (
                            {obj.pincode})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <span
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => {
                      setNewLocality("");
                      setNewBuilding("");
                      setNewCity("");
                      setNewState("");
                      setNewPincode("");
                      setEntryErr(false);
                      setAddAddress(true);
                    }}
                  >
                    + Add New Address
                  </span>
                  <br />
                </>
              ) : (
                <>
                  <div className="form input-line">
                    <div className="form-group">
                      <Input
                        name="building"
                        placeholder="Building"
                        className="form-control"
                        value={newBuilding}
                        onChange={(e) => setNewBuilding(e)}
                        type="text"
                      />
                      <div className="form-group">
                        <select
                          name="address_type"
                          placeholder="Address Type"
                          value={newAddressType}
                          onChange={(e) => setNewAddressType(e.target.value)}
                          className="form-control-select"
                          style={{ marginTop: "1rem" }}
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
                      <Input
                        name="locality"
                        placeholder="Locality"
                        className="form-control"
                        value={newLocality}
                        onChange={(e) => setNewLocality(e)}
                        type="text"
                      />
                      <Input
                        name="city"
                        placeholder="City"
                        className="form-control"
                        value={newCity}
                        onChange={(e) => setNewCity(e)}
                        type="text"
                        style={{ marginTop: "0.5rem" }}
                      />
                      <div className="form-group">
                        <select
                          name="state"
                          placeholder="State"
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          className="form-control-select"
                          style={{ marginTop: "1rem" }}
                        >
                          <option value="" selected disabled hidden>
                            Select State
                          </option>
                          {states.map((item, key) => {
                            return (
                              <option value={item.name} id={key}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <Input
                        name="pincode"
                        placeholder="Pincode"
                        className="form-control"
                        value={newPincode}
                        onChange={(e) => setNewPincode(e)}
                        type="number"
                        style={{ marginTop: "0.5rem" }}
                      />
                    </div>
                  </div>

                  <>
                    {btnLoader ? (
                      <Button
                        isLoading="true"
                        style={{ marginTop: "0.5rem" }}
                      ></Button>
                    ) : (
                      <Button
                        onClick={(event) => handleAddAddress()}
                        title="Add Address"
                        style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                        className="btn"
                      ></Button>
                    )}
                  </>
                  {entryErr ? (
                    <>
                      <br />
                      <span style={{ color: "red" }}>
                        All Fields Are Mandatory
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                  <br />
                  <span
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => setAddAddress(false)}
                  >
                    BACK
                  </span>
                  <br />
                </>
              )}
            </>
            <span style={{ fontWeight: "bold", color: "black" }}>
              Entered Address:
            </span>
            <br />
            <span style={{ color: "grey" }}>
              {newAddress.building ? `${newAddress.building}, ` : ""}{" "}
              {newAddress.locality ? `${newAddress.locality}, ` : ""}{" "}
              {newAddress.city ? `${newAddress.city}, ` : ""}
              {newAddress.state ? `${newAddress.state} ` : ""}{" "}
              {newAddress.pincode ? `(${newAddress.pincode})` : ""}
            </span>
            <br />
            <>
              {btnLoader ? (
                <Button
                  isLoading="true"
                  style={{ marginTop: "0.5rem" }}
                  className="btn-full"
                ></Button>
              ) : (
                <Button
                  onClick={(event) => handleConfirmAddress()}
                  title="Confirm Delivery Address"
                  style={{ marginTop: "0.5rem" }}
                  className="btn-full"
                ></Button>
              )}
            </>
          </div>
        </div>
      </div>
    );
  };

  const displayCardStatus = () => {
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
                <h5>Card Status</h5>
              </div>
              <div className={"col50 smartCardHeader"}>
                <Button
                  onClick={(event) => {
                    UserCardDetailsFunc();
                    setRefreshMsg(true);
                  }}
                  title="Refresh"
                  style={{ marginLeft: "50%", width: "50%" }}
                  className="btn"
                ></Button>
              </div>
            </div>
          </div>
          <div
            className={"cardBody"}
            style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
          >
            <>
              {loader ? (
                <div
                  className="text-center"
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                >
                  <div className="loader"></div>
                </div>
              ) : (
                <div
                  style={{
                    paddingBottom: "0.5rem",
                    paddingTop: "0.5rem",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  {message}
                  <>
                    {!btnLoader ? (
                      <>
                        {funnel === "card_lost_fees" ? (
                          <>
                            {!isAddressPresent ? (
                              renderAddressCard()
                            ) : (
                              <div className="row">
                                <div
                                  className={"col100"}
                                  style={{ paddingBottom: 0 }}
                                >
                                  <div className={"pcardWrapper"}>
                                    {recievedCoupon.coupon ? (
                                      <div>
                                        <h6
                                          style={{
                                            color: "#3cd458",
                                            paddingTop: "0.5em",
                                          }}
                                        >
                                          Use Coupon Code :<br />
                                          <h5
                                            style={{
                                              color: "red",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              setCoupon(recievedCoupon.coupon)
                                            }
                                          >
                                            {recievedCoupon.coupon}
                                          </h5>
                                        </h6>
                                        <h6
                                          style={{
                                            color: "#3cd458",
                                            paddingBottom: "0.5rem",
                                          }}
                                        >
                                          Pay : <s>₹{cardLostFee}</s>&nbsp; ₹
                                          {cardLostFee -
                                            recievedCoupon.discount_amount}{" "}
                                          Only/-
                                        </h6>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div
                                  className={"col100"}
                                  style={{ paddingBottom: "2em" }}
                                >
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
                                      {loader ? (
                                        <div className="text-center">
                                          <div className="loader"></div>
                                        </div>
                                      ) : (
                                        <span className={"inputPayCombo"}>
                                          <Input
                                            className="payinput"
                                            placeholder="Have a coupon ?"
                                            onChange={(event) =>
                                              setCoupon(event.toUpperCase())
                                            }
                                            value={coupon}
                                          />
                                          &nbsp;&nbsp;
                                          <Button
                                            className="paybtn"
                                            onClick={(event) =>
                                              getCouponDiscount(event)
                                            }
                                            title="Apply Coupon"
                                          ></Button>
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div
                                  className={"col100"}
                                  style={{ marginBottom: "1.5rem" }}
                                >
                                  <Button
                                    onClick={(event) => handleRZPay()}
                                    title={
                                      couponDisabled
                                        ? "Pay Card Lost Fee : ₹" +
                                          (cardLostFee - discountAmt) +
                                          "/- Coupon : " +
                                          coupon +
                                          " Applied"
                                        : "Pay Card Lost Fee : ₹" +
                                          cardLostFee +
                                          "/-"
                                    }
                                    style={{ marginTop: "0.5rem" }}
                                    className="btn-full"
                                  ></Button>
                                </div>
                              </div>
                            )}
                            <div className={"card"}>
                              <div
                                className={"cardBody"}
                                style={{
                                  paddingBottom: "0.5rem",
                                  paddingTop: "0.5rem",
                                  color: "green",
                                }}
                              >
                                <b>
                                  <span style={{ textDecoration: "underline" }}>
                                    IMPORTANT:
                                  </span>
                                </b>
                                <br />
                                <b>
                                  1. After Successful Transaction It Takes
                                  Around 30 Seconds To Reflect The Changes.
                                  Please Use Refresh Button To Refresh The
                                  Screen
                                </b>
                                <br />
                                <b>
                                  2. In Case Of Any Discrepancies Please Contact
                                  Customer Care.
                                </b>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <Button
                        isLoading="true"
                        style={{ marginTop: "0.5rem" }}
                        className="btn-full"
                        onClick={(event) => handleRZPay()}
                      >
                        {/* <div className="text-center">
                          <div className="loader"></div>
                        </div> */}
                      </Button>
                    )}
                  </>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    );
  };

  return <div>{showCardStatus ? <div>{displayCardStatus()}</div> : ""}</div>;
};

export default CardLostStatusCard;
