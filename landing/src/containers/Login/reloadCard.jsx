import Button from "common/components/Button";
import Input from "common/components/Input";
import React, { useEffect, useState } from "react";

import { callApi } from "common/utils/loginMiddleware";
import SmoothScrolling from "../../common/hooks/smoothScrolling";
import Countdown from "./countdown";
import { closeModal, openModal } from "@redq/reuse-modal";
import { ModalSection } from "../../pages/login/login.style";
import { useNotification } from "common/hooks/useNotification";

const ReloadCard = ({
  phone,
  accessToken,
  userProfile,
  togglerFunc,
  toggleLoading,
  card,
}) => {
  const [reloadAmount, setReloadAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reloadStatusData, setReloadStatusData] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [couponInputDisbaled, setCouponInputDisabled] = useState(false);
  const [discountAmt, setDiscountAmt] = useState(0);
  const [message, setMessage] = useState("");
  const [feePer, setFeePer] = useState();
  const [screen, setScreen] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [amountUpdating, setAmountUpdating] = useState(false);
  const [valueOnTabClose, setValueOnTabClose] = useState("");
  const notify = useNotification();
  const [showRefresh, setShowRefresh] = useState(true);

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
            setLoading(false);
            refresh();
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
    setLoading(true);
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
    setMessage("");
    setCouponError("");
    setValueOnTabClose("");

    let payment_requests = [];
    payment_requests.push({
      amount: Number(reloadAmount),
      type: "fees",
      coupon_code: coupon,
      value: "card_reload_fees",
    });
    try {
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
      if (response.result === "success") {
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
        setLoading(false);
        var referenceId = localStorage.getItem("cashFreePaymentReferenceId");
        if (status !== "SUCCESS" && status !== "PENDING") {
          setMessage(
            `Your transaction ${status}. ${
              referenceId ? `Transaction ID: ${referenceId}` : ``
            }`
          );
          closeModal();
        } else {
          setScreen(5);
          setMessage(
            `Your transaction ${
              status === "PENDING" ? " is" : " was " + status
            }. ${referenceId ? `Transaction ID: ${referenceId}` : ``}`
          );
          afterPositivePayment();
          closeModal();
        }
      }
      callThis();
    }
  }, [valueOnTabClose]);

  const getCouponDiscount = (event) => {
    event.preventDefault();
    setLoading(true);
    callApi(
      "/get_coupon_discount_amount",
      "GET",
      {
        coupon_code: coupon,
        payment_request_type: "card_reload_fees",
        payment_request_amount: parseInt(reloadAmount * (feePer / 100)),
      },
      phone,
      accessToken
    )
      .then((response) => {
        setLoading(false);
        if (response.result === "error") {
          setCoupon("");
          setCouponError(response.message);
        } else if (response.result === "success") {
          setCouponInputDisabled(true);
          setDiscountAmt(Number(response.discount_amount));
        }
      })
      .catch((error) => {
        setLoading(false);
        notify({ message: error.message, type: "error" });
      });
  };

  const afterPositivePayment = async () => {
    clearCashFreeRelatedLocalStorage();
    setAmountUpdating(true);
    let customResponse = await cardBalanceUpdateCheck();
    if (customResponse == true) {
      togglerFunc();
      await sleep(1000);
    }
    setShowRefresh(true);
    toggleLoading(false);
    togglerFunc();
  };

  const cardBalanceUpdateCheck = async () => {
    await sleep(7000);
    let reloadStatus = false;
    reloadStatus = await cardBalanceStatus();
    if (!reloadStatus) {
      await sleep(7000);
      reloadStatus = await cardBalanceStatus();
      if (!reloadStatus) {
        await sleep(7000);
        reloadStatus = await cardBalanceStatus();
        if (!reloadStatus) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const cardBalanceStatus = async () => {
    let response = await callApi(
      "/get_user_card_details",
      "GET",
      {},
      phone,
      accessToken
    );
    if (response.result != "success") {
      return false;
    }
    let status = response.cards.filter((st) => {
      return (
        st.card_name == "ruby" &&
        st.card_display_name == "Ruby Card" &&
        st.card_status == "ACTIVE"
      );
    });
    if (
      response.result == "success" &&
      status.length == 1 &&
      status[0].card_balance > card["card_balance"]
    ) {
      return true;
    }
    return false;
  };

  const reloadCardStatus = async () => {
    let response = await callApi(
      "/get_reload_card_status",
      "GET",
      {},
      phone,
      accessToken
    );
    if (response.result != "success") {
      return false;
    }
    let status = response.status.filter((st) => {
      return st.status == "progress";
    });
    if (
      response.result == "success" &&
      userProfile.reload_available == true &&
      status.length == 1 &&
      status[0].type == "re_pay_fee"
    ) {
      return true;
    }
    return false;
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const callReloadCardStatusThrice = async () => {
    await sleep(5000);
    let reloadStatus = false;
    reloadStatus = await reloadCardStatus();
    if (!reloadStatus) {
      await sleep(5000);
      reloadStatus = await reloadCardStatus();
      if (!reloadStatus) {
        await sleep(5000);
        reloadStatus = await reloadCardStatus();
        if (!reloadStatus) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const getReloadStatus = async () => {
    try {
      setLoading(true);
      setMessage("");
      let response = await callApi(
        "/get_reload_card_status",
        "GET",
        {},
        phone,
        accessToken
      );
      let response1 = await callApi(
        "/get_payment_options",
        "GET",
        { type: "card_reload_fees" },
        phone,
        accessToken
      );
      let response2 = await callApi(
        "/get_user_fee",
        "GET",
        {
          type: "reload",
        },
        phone,
        accessToken
      );
      if (
        response.result == "success" &&
        response1.result == "success" &&
        response2.result == "success"
      ) {
        setReloadStatusData(response);

        setMaxAmount(response1.data[0].options[0].amount);
        if (response2.data.reload_info[0].emandate_done == true) {
          setFeePer(response2.data.reload_info[0].price);
        } else {
          setFeePer(response2.data.reload_info[1].price);
        }
        let status = response.status.filter((st) => {
          return st.status == "progress";
        });
        if (userProfile.reload_available == true && status.length == 0) {
          setScreen(1);
          let customResponse = await createReloadRequest(
            response1.data[0].options[0].amount
          );
          if (customResponse == true) {
            getReloadStatus();
            await sleep(2000);
          } else {
            setLoading(false);
          }
        } else if (
          userProfile.reload_available == true &&
          status.length == 1 &&
          status[0].type == "re_pay_fee"
        ) {
          setScreen(2);
          setReloadAmount(response.data.load_approved);
          setLoading(false);
        } else if (
          userProfile.reload_available == true &&
          status.length == 1 &&
          status[0].type != "re_pay_fee"
        ) {
          setLoading(true);
          setScreen(3);
          let customResponse = await callReloadCardStatusThrice();
          if (customResponse == true) {
            getReloadStatus();
            await sleep(2000);
          }
          setLoading(false);
        } else {
          setLoading(false);
          setScreen(4);
          setMessage("Reload not available at the moment. Check back later!");
        }
      } else {
        if (
          response.result == "error" &&
          response.message == "No reload request is processing for this user" &&
          response1.result == "success" &&
          response2.result == "success" &&
          userProfile.reload_available == true
        ) {
          if (response2.data.reload_info[0].emandate_done == true) {
            setFeePer(response2.data.reload_info[0].price);
          } else {
            setFeePer(response2.data.reload_info[1].price);
          }
          setScreen(1);
          let customResponse = await createReloadRequest(
            response1.data[0].options[0].amount
          );
          if (customResponse == true) {
            getReloadStatus();
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
          setScreen(0);
          setMessage("Reload not available at the moment. Check back later!");
        }
      }
    } catch (error) {
      setLoading(false);
      setScreen(0);
      setMessage("Reload encountered an error. Check back later!");
    }
  };

  const setReloadDynamically = (amount) => {
    let min = parseInt(130 / feePer);
    if (parseInt(min * (feePer / 100)) < 1) {
      min += 1;
    }
    if (min >= maxAmount) {
      min = maxAmount;
    }
    if (
      typeof amount == "string" &&
      amount != "" &&
      !isNaN(amount) &&
      Number(amount) >= min &&
      Number(amount) <= maxAmount
    ) {
      setReloadAmount(amount);
      setAmountError("");
    } else {
      setAmountError(
        `Reload Amount must be a number between ${min} & ${maxAmount}`
      );
    }
  };

  useEffect(() => {
    clearCashFreeRelatedLocalStorage();
    getReloadStatus();
    SmoothScrolling.scrollTo("startOfCard");
  }, []);

  const refresh = () => {
    setReloadAmount(0);
    setAmountError("");
    setCouponError("");
    setCouponInputDisabled(false);
    setDiscountAmt(0);
    setCoupon(null);
    getReloadStatus();
  };

  const createReloadRequest = async (amount) => {
    if (amount > 0) {
      let response = await callApi(
        "/create_reload_request",
        "POST",
        {
          load_requested: Number(amount),
        },
        phone,
        accessToken
      );
      if (response.result !== "success") {
        setMessage(response.message);
        return false;
      }
      return true;
    } else {
      return false;
    }
  };

  const renderReload = () => {
    if (screen == 0) {
      return (
        <div
          className={"pcardWrapper"}
          id="startOfCard"
          style={{ minHeight: "200px" }}
        >
          <div className={"card"}>
            <div className={"cardHeader"}>
              <div className="row">
                <div className={"col50 reload-header"}>
                  <img
                    src="https://lh3.googleusercontent.com/gWybApiUlrw8YVknewflxjzIDEEzZPjzAacb8LsSlSa8d18XTaMFC-5UIK61g8P5stEI=w300-rw"
                    height="35px"
                    width="35px"
                    alt="RC"
                  />
                  <h5>Reload Smart Card</h5>
                </div>
                {showRefresh && (
                  <div className={"col50"}>
                    <Button
                      className="btn-refresh"
                      title="Refresh"
                      onClick={() => {
                        refresh();
                      }}
                    ></Button>
                  </div>
                )}
              </div>
            </div>

            <div
              className={"cardBody"}
              style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
            >
              {loading ? (
                <div
                  className="loader-container"
                  style={{
                    marginTop: "30px",
                    height: "auto",
                  }}
                >
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="row">
                  <div className={"col100 margintTopDown"}>
                    <h5 className="text-center">{message}</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (screen == 1) {
      return (
        <div
          className={"pcardWrapper"}
          id="startOfCard"
          style={{ minHeight: "200px" }}
        >
          <div className={"card"}>
            <div className={"cardHeader"}>
              <div className="row">
                <div className={"col50 reload-header"}>
                  <img
                    src="https://lh3.googleusercontent.com/gWybApiUlrw8YVknewflxjzIDEEzZPjzAacb8LsSlSa8d18XTaMFC-5UIK61g8P5stEI=w300-rw"
                    height="35px"
                    width="35px"
                    alt="RC"
                  />
                  <h5>Reload Smart Card</h5>
                </div>
                {showRefresh && (
                  <div className={"col50"}>
                    <Button
                      className="btn-refresh"
                      title="Refresh"
                      onClick={() => {
                        refresh();
                      }}
                    ></Button>
                  </div>
                )}
              </div>
            </div>

            <div
              className={"cardBody"}
              style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
            >
              {loading ? (
                <div
                  className="loader-container"
                  style={{
                    marginTop: "30px",
                    height: "auto",
                  }}
                >
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="row">
                  <div className={"col100 margintTopDown"}>
                    <h5 className="text-center">
                      Your reload request could not be created right now. Please
                      try again after some time.
                    </h5>
                    <h5 className="text-center">{message}</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (screen == 3 || screen == 4) {
      return (
        <div
          className={"pcardWrapper"}
          id="startOfCard"
          style={{ minHeight: "200px" }}
        >
          <div className={"card"}>
            <div className={"cardHeader"}>
              <div className="row">
                <div className={"col50 reload-header"}>
                  <img
                    src="https://lh3.googleusercontent.com/gWybApiUlrw8YVknewflxjzIDEEzZPjzAacb8LsSlSa8d18XTaMFC-5UIK61g8P5stEI=w300-rw"
                    height="35px"
                    width="35px"
                    alt="RC"
                  />
                  <h5>Reload Smart Card</h5>
                </div>
                {showRefresh && (
                  <div className={"col50"}>
                    <Button
                      className="btn-refresh"
                      title="Refresh"
                      onClick={() => {
                        refresh();
                      }}
                    ></Button>
                  </div>
                )}
              </div>
            </div>
            <div
              className={"cardBody"}
              style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
            >
              {loading ? (
                <div
                  className="loader-container"
                  style={{
                    marginTop: "30px",
                    height: "auto",
                  }}
                >
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="row">
                  <div className={"col100 margintTopDown"}>
                    <h5 className="text-center">
                      Your reload request is under process. Please check after
                      some time for updated status.
                    </h5>
                    <h5 className="text-center">{message}</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (screen == 2) {
      return (
        <div
          className={"pcardWrapper"}
          id="startOfCard"
          style={{ minHeight: "200px" }}
        >
          <div className={"card"}>
            <div className={"cardHeader"}>
              <div className="row">
                <div className={"col50 reload-header"}>
                  <img
                    src="https://lh3.googleusercontent.com/gWybApiUlrw8YVknewflxjzIDEEzZPjzAacb8LsSlSa8d18XTaMFC-5UIK61g8P5stEI=w300-rw"
                    height="35px"
                    width="35px"
                    alt="RC"
                  />
                  <h5 style={{ marginLeft: 10 }}>Reload Smart Card</h5>
                </div>

                {showRefresh && (
                  <div className={"col50"}>
                    <Button
                      className="btn-refresh"
                      title="Refresh"
                      onClick={() => {
                        refresh();
                      }}
                    ></Button>
                  </div>
                )}
              </div>
            </div>

            <div
              className={"cardBody"}
              style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
            >
              {loading ? (
                <div
                  className="loader-container"
                  style={{
                    marginTop: "30px",
                    height: "auto",
                  }}
                >
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  <div className="row">
                    {!couponInputDisbaled ? (
                      <>
                        <div className={"col100"}>
                          <div
                            className={"tar dueWarning"}
                            style={{ marginBottom: 10 }}
                          >
                            <span
                              style={{
                                border: `1px solid ${"#05c205"}`,
                                color: "#05c205",
                                background: "#f6ffed",
                              }}
                            >
                              <small>
                                Your Approved Card Limit{" "}
                                {"₹" +
                                  reloadStatusData["data"]["load_approved"]}
                              </small>
                            </span>
                          </div>
                        </div>
                        <div className={"col100"}>
                          <h5 className="text-center">
                            To get reload of ₹{reloadAmount} please pay reload
                            fee ₹{parseInt(reloadAmount * (feePer / 100))}
                          </h5>
                        </div>
                        <span
                          className={"inputReloadCombo"}
                          style={{ marginTop: 10 }}
                        >
                          <div className="textInputReloadCombo marginTopDown">
                            <h5
                              className="text-center bold"
                              style={{ fontWeight: "bold" }}
                            >
                              Enter Reload Amount:{" "}
                            </h5>
                          </div>
                          <Input
                            className="input-comm inputInputReloadCombo"
                            placeholder="Enter Reload Amount"
                            onChange={(event) => setReloadDynamically(event)}
                            value={reloadAmount}
                            inputType="number"
                            step={1}
                          />
                        </span>
                        {amountError !== "" ? (
                          <div className={"col100red"}>
                            <h5 className="text-center">{amountError}</h5>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}

                    <div className={"col100 margintTopDown"}>
                      {couponInputDisbaled ? (
                        <>
                          <div>
                            <div className={"col100"}>
                              <h5 className="text-center">
                                Reload Amount :{" "}
                                <span className={"redText"}>
                                  ₹{reloadAmount}
                                </span>
                              </h5>
                              <h5 className="text-center">
                                Initial Reload Fees :{" "}
                                <span className={"redText"}>
                                  ₹
                                  {parseFloat(
                                    reloadAmount * (feePer / 100)
                                  ).toFixed(2)}
                                </span>
                              </h5>
                              <h5 className="text-center">
                                Coupon Discount Applied :{" "}
                                <span className={"redText"}>
                                  ₹{discountAmt}
                                </span>{" "}
                                ({coupon})
                              </h5>
                            </div>
                          </div>
                          <br />
                          <h6
                            className={"remove"}
                            onClick={() => {
                              setCouponInputDisabled(false);
                              setDiscountAmt(null);
                              setCoupon(null);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            Remove Coupon
                          </h6>
                        </>
                      ) : (
                        <>
                          {parseFloat(reloadAmount * (feePer / 100)).toFixed(
                            2
                          ) > 100 ? (
                            <div>
                              {loading ? (
                                <div className="text-center">
                                  <div className="loader"></div>
                                </div>
                              ) : (
                                <>
                                  <span className={"inputPayCombo"}>
                                    <Input
                                      className="payinput"
                                      placeholder="Have a coupon ?"
                                      onChange={(event) =>
                                        setCoupon(event.toUpperCase())
                                      }
                                      onFocus={() => setCouponError("")}
                                      value={coupon}
                                    />
                                    &nbsp;&nbsp;
                                    <Button
                                      onClick={(event) =>
                                        getCouponDiscount(event)
                                      }
                                      title="Enter Coupon"
                                      className="paybtn"
                                    ></Button>
                                  </span>
                                  {couponError !== "" ? (
                                    <div className={"col100red"}>
                                      <h5 className="text-center">
                                        {couponError}
                                      </h5>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )}
                            </div>
                          ) : (
                            <>
                              {parseInt((101 * 100) / feePer) <=
                              reloadStatusData["data"]["load_approved"] ? (
                                <div className={"col100"}>
                                  <h5 className="text-center">
                                    Coupon is only available when Reload Amount
                                    is greater than ₹
                                    {parseInt((101 * 100) / feePer)}.
                                  </h5>
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>

                    <div
                      className={"col100"}
                      style={{ marginBottom: "1.5rem" }}
                    >
                      <Button
                        onClick={handlePayment}
                        className="btn-comm"
                        title={
                          couponInputDisbaled
                            ? `Pay Fee : ₹${
                                parseFloat(
                                  parseFloat(reloadAmount * (feePer / 100)) -
                                    parseFloat(discountAmt)
                                ).toFixed(2) > 0
                                  ? parseFloat(
                                      parseFloat(
                                        reloadAmount * (feePer / 100)
                                      ) - parseFloat(discountAmt)
                                    ).toFixed(2)
                                  : 0
                              }`
                            : `Pay Fee : ₹${
                                parseFloat(
                                  reloadAmount * (feePer / 100)
                                ).toFixed(2) > 0
                                  ? parseFloat(
                                      reloadAmount * (feePer / 100)
                                    ).toFixed(2)
                                  : 0
                              }`
                        }
                      ></Button>

                      <br />
                    </div>
                  </div>
                  <div className="row">
                    <div className={"col100red margintTopDown"}>
                      <h5 className="text-center">{message}</h5>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );
    } else if (screen == 5) {
      return (
        <div
          className={"pcardWrapper"}
          id="startOfCard"
          style={{ minHeight: "200px" }}
        >
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
                  <h5>Reload Smart Card</h5>
                </div>
              </div>
            </div>
            <div
              className={"cardBody"}
              style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
            >
              <div className="row">
                <div className={"col100 margintTopDown"}>
                  <h5 className="text-center">{message}</h5>
                </div>
                <div className={"col100"}>
                  <h5 className="text-center">
                    Checking the status of your reload ...
                  </h5>
                </div>
                {amountUpdating ? (
                  <span className={"loaderCountdownCombo"}>
                    <div className="loaderCombo">
                      <div className="loader"></div>
                    </div>
                    &nbsp;&nbsp;
                    <div className="countdownCombo">
                      <Countdown time={23} />
                    </div>
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleRZPay = async (response) => {
    const payment_gateway_options = JSON.parse(
      response.payment_request[0].payment_gateway_options
    );
    const payment_request_id = response.payment_request[0].payment_request_id;
    const options = {
      key: payment_gateway_options.key,
      amount: payment_gateway_options.amount,
      currency: payment_gateway_options.currency,
      name: payment_gateway_options.name,
      image: payment_gateway_options.image,
      order_id: payment_gateway_options.order_id,
      handler: async function (response) {
        try {
          setLoading(true);
          setShowRefresh(false);
          toggleLoading(true);
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
          setLoading(false);
          if (response2.status === "failed") {
            setMessage(
              `Your transaction ${
                response2.status === "processing"
                  ? " is"
                  : " was " + response2.status
              }. Transaction ID: ${response2.transaction_id}`
            );
            setShowRefresh(true);
            toggleLoading(false);
          } else {
            setScreen(5);
            setMessage(
              `Your transaction ${
                response2.status === "processing"
                  ? " is"
                  : " was " + response2.status
              }. Transaction ID: ${response2.transaction_id}`
            );
            afterPositivePayment();
          }
        } catch (error) {
          setShowRefresh(true);
          toggleLoading(false);
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
  };

  return <div>{renderReload()} </div>;
};

export default ReloadCard;
