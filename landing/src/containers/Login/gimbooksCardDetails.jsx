import React, { useState, useEffect } from "react";

import { callApi } from "common/utils/loginMiddleware";
import Button from "common/components/Button";
import Input from "common/components/Input";
import RebelCardWrapper from "public/styles/rebel.style";
import Logo from "public/images/rebel/Rebel_card_2.svg";
import styled, { keyframes } from "styled-components";
import GimbooksBilledStatements from "./gimbooksBilledStatements";
import ViewCvv from "./viewCvv";
import ResetPin from "./resetPin";
import GimbooksUnbilledStatements from "./gimbooksUnbilledStatements";
import ViewBlockUnblockCard from "./viewBlockUnblockCard";
import CardSettings from "./cardSettings";
import GimbooksEmiConversion from "./gimbooksTxnToEmi";
import SmoothScrolling from "../../common/hooks/smoothScrolling";
import BilledStatement from "./billedStatment";
import Icon from "react-icons-kit";
import { reload } from "react-icons-kit/iconic/reload";
import GimbooksPhysicalCard from "./gimbooksPhysicalContainer";
import { useNotification } from "common/hooks/useNotification";
import { closeModal, openModal } from "@redq/reuse-modal";
import { ModalSection } from "../../pages/login/login.style";

const GimbooksCardDetails = ({ cards, phone, accessToken, handleOTP }) => {
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loanId, setLoanId] = useState();
  const [kitNumber, setKitNumber] = useState();
  const [statements, setStatements] = useState();
  const [unbilledStatements, setUnbilledStatements] = useState();
  const [minMaxValue, setMinMaxValue] = useState({});
  const [isStatements, setIsStatements] = useState(false);
  const [isResetPinOpen, setIsResetPinOpen] = useState(false);
  const [isCardBlockUnblockOpen, setIsCardBlockUnblockOpen] = useState(false);
  const [isRenderCvvOpen, setIsRenderCvvOpen] = useState(false);
  const [isUnbilledStatements, setIsUnbilledStatements] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [isCardLimit, setIsCardLimit] = useState(false);
  const [isEmiConversion, setIsEmiConversion] = useState(false);
  const [userProductId, setUserProductId] = useState();
  const [isOtpSent, setisOtpSent] = useState(false);
  const [prePayDuesButton, setPrePayDuesButton] = useState(true);
  const [precardPayAmount, setPreCardPayAmount] = useState();
  const [prePayLoading, setPrePayLoading] = useState(false);
  const [preDueLoading, setDuePayLoading] = useState(false);
  //phsyical card
  const notify = useNotification();
  const [payDuesButton, setPayDuesButton] = useState(true);
  const [cardPayAmount, setCardPayAmount] = useState();
  const [minCardPayAmount, setMinCardPayAmount] = useState();
  const [maxCardPayAmount, setMaxCardPayAmount] = useState();
  const [lenderDetail, setLenderDetail] = useState();
  const [cardSetting, setCardSetting] = useState();
  const [payment, setPayment] = useState(false);
  const [loanIdSave, setLoanIdSave] = useState();
  const [isMobile, setIsMobile] = useState(false);
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
            closeModal();
            setLoading(false);
            setPayment(toggle(payment));
          }}
        ></Button>
      </center>
    </ModalSection>
  );

  const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }`;

  useEffect(() => {
    if (window.outerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);

  const DrawerBody = styled.div`
    animation: 0.35s ${fadeIn} ease-in;
  `;
  const activateCard = async () => {
    try {
      let response = await callApi(
        "create_activity_for_redcarpet_gimbooks",
        "POST",
        {
          product_id: userProductId,
          cvv: "",
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        refresh();
      } else {
        notify({
          message: "Unable to Activate Card.Please Try Again Later",
          type: "error",
        });
      }
    } catch (error) {
      notify({
        message: "Unable to Activate Card.Please Try Again Later",
        type: "error",
      });
    }
  };
  const getData = async () => {
    try {
      setLoading(true);
      let response = await callApi(
        "/user_products_and_states/redcarpet_gimbooks",
        "GET",
        {},
        phone,
        accessToken
      );
      setLoading(false);
      if (response.result === "success") {
        if (response.data.length > 0) {
          let loan_id = response.data[0]["loan_id"];
          setLoanIdSave(loan_id);
          setUserProductId(response.data[0]["user_product_id"]);
          setLoanId(loan_id);
          let response2 = await callApi(
            "/get_statement/" + loan_id,
            "GET",
            {
              source: "ledger",
              product_type: "redcarpet_gimbooks",
            },
            phone,
            accessToken
          );
          setLoading(false);
          if (response2.result === "success") {
            setStatements(response2.statement);
            setUnbilledStatements(
              response2.unbilled_card_txns_data.unbilled_card_txns
            );
            setMinMaxValue(response2.min_max_values);
            setCardPayAmount(response2.min_max_values.max_amount_to_pay);
            setMinCardPayAmount(response2.min_max_values.min_amount_to_pay);
            setMaxCardPayAmount(response2.min_max_values.max_amount_to_pay);
          }
        }
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  const getUserData = async () => {
    try {
      let response = await callApi(
        "/get_user_card_details",
        "GET",
        {},
        phone,
        accessToken
      );
      let response1 = await callApi(
        "/get_new_user_profile",
        "GET",
        {},
        phone,
        accessToken
      );
      //setLoading(false);
      if (
        response.result === "success" &&
        response1.result === "success" &&
        response.cards.find(
          (o) => o.card_display_name === "Redcarpet Gimbooks Card"
        )
      ) {
        let obj = response.cards.find(
          (o) => o.card_display_name === "Redcarpet Gimbooks Card"
        );
        setCard(obj);
        setLenderDetail(obj.lender_details.name);
        setKitNumber(obj.kit_no);
        setName(response1.user.user_data.first_name);
      } else {
        setCard("");
      }
    } catch (error) {
      notify({
        message: "Some Error Occurred, try again later1.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    getUserData();
    getData();
  }, []);

  useEffect(() => {
    getUserData();
    getData();
  }, [refreshData]);

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
        if (status !== "PAID" && status !== "PENDING") {
          notify({
            message: `Your transaction ${status}. ${
              referenceId ? `Transaction ID: ${referenceId}` : ``
            }`,
            type: "error",
          });
          setLoading(false);
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
        }
      }
      callThis();
      const timer = setTimeout(() => {
        setLoading(false);
        closeModal();
        setPayment(toggle(payment));
        setRefreshData(!refreshData);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [valueOnTabClose]);

  const handleRZPay = async (cardPayAmount) => {
    setLoading(true);
    if (cardPayAmount == 0) {
      notify({ message: `Amount should be greater than 0`, type: "error" });
      setLoading(false);
    } else if (
      cardPayAmount >= minCardPayAmount &&
      cardPayAmount <= maxCardPayAmount
    ) {
      let payment_data = {
        amount: Number(cardPayAmount),
        value: parseInt(loanId).toString(),
        type: "loan_id",
        extra_details: {
          user_product_id: userProductId,
        },
      };
      try {
        let response = await callApi(
          "/ledger_create_payment_request",
          "POST",
          {
            payment_data,
          },
          phone,
          accessToken
        );

        if (response.result === "success") {
          if (response.payment_request.payment_gateway_name === "Cashfree") {
            handleCashFreePayment(response);
          } else {
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
                      mmessage:
                        "Please Wait, Your transaction Details are getting updated",
                      type: "success",
                    });
                    setTimeout(() => {
                      if (payment) {
                        setPayment(false);
                      } else {
                        setPayment(true);
                      }
                      getData();
                      setLoading(false);
                    }, 10000);
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
          }
        } else {
          setLoading(false);
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        setLoading(false);
        notify({ message: error.message, type: "error" });
      }
    } else {
      setLoading(false);
      notify({
        mmessage: `Amount should be greater than ₹${minCardPayAmount} and lesser than ₹${maxCardPayAmount}`,
        type: "error",
      });
    }
  };

  const handleCardPayAmount = (event) => {
    const amount = event;
    if (
      typeof amount == "string" &&
      amount != "" &&
      !isNaN(amount) &&
      Number(amount) >= minCardPayAmount &&
      Number(amount) <= maxCardPayAmount &&
      Number(amount) > 0
    ) {
      setPayDuesButton(true);
      setCardPayAmount(amount);
    } else {
      setPayDuesButton(false);
    }
  };

  const toggle = (req) => {
    return req === true ? false : true;
  };

  const handlePreCardPayAmount = (event) => {
    const amount = event;
    if (
      typeof amount == "string" &&
      amount != "" &&
      !isNaN(amount) &&
      Number(amount) >= minCardPayAmount &&
      Number(amount) <= maxCardPayAmount &&
      Number(amount) > 0
    ) {
      setPrePayDuesButton(true);
      setPreCardPayAmount(amount);
    } else {
      setPrePayDuesButton(false);
    }
  };

  const refresh = () => {
    if (refreshData) {
      setRefreshData(false);
    } else {
      setRefreshData(true);
    }
    setIsCardBlockUnblockOpen(false);
  };

  const handleStatements = () => {
    if (!isMobile) {
      if (!isStatements) {
        SmoothScrolling.scrollTo("newBegin");
      }
    }
    setIsCardBlockUnblockOpen(false);
    setIsStatements(toggle(isStatements));
    setIsUnbilledStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    setIsCardLimit(false);
    setIsEmiConversion(false);
  };

  const handleBlockUnblockCard = () => {
    if (!isMobile) {
      if (!isCardBlockUnblockOpen) {
        SmoothScrolling.scrollTo("newBegin");
      }
    }
    handleOTP(setisOtpSent);
    setIsCardBlockUnblockOpen(toggle(isCardBlockUnblockOpen));
    setIsUnbilledStatements(false);
    setIsStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    setIsCardLimit(false);
    setIsEmiConversion(false);
  };

  const handleResetPin = () => {
    if (!isMobile) {
      if (!isResetPinOpen) {
        SmoothScrolling.scrollTo("newBegin");
      }
    }
    setIsCardBlockUnblockOpen(false);
    setIsResetPinOpen(toggle(isResetPinOpen));
    setIsUnbilledStatements(false);
    setIsStatements(false);
    setIsRenderCvvOpen(false);
    setIsCardLimit(false);
    setIsEmiConversion(false);
  };

  const handleUnbilledStatements = () => {
    if (!isMobile) {
      if (!isUnbilledStatements) {
        SmoothScrolling.scrollTo("newBegin");
      }
    }
    setIsCardBlockUnblockOpen(false);
    setIsUnbilledStatements(toggle(isUnbilledStatements));
    setIsStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    setIsCardLimit(false);
    setIsEmiConversion(false);
  };

  const handleCardLimit = () => {
    if (!isMobile) {
      if (!isCardLimit) {
        SmoothScrolling.scrollTo("newBegin");
      }
    }
    setIsCardBlockUnblockOpen(false);
    setIsUnbilledStatements(false);
    setIsStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    setIsCardLimit(toggle(isCardLimit));
    setIsEmiConversion(false);
  };

  const handleEmiConversion = () => {
    if (!isMobile) {
      if (!isEmiConversion) {
        SmoothScrolling.scrollTo("newBegin");
      }
    }
    setIsCardBlockUnblockOpen(false);
    setIsUnbilledStatements(false);
    setIsStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    setIsCardLimit(false);
    setIsEmiConversion(toggle(isEmiConversion));
  };

  const renderUnbilledStatements = () => {
    if (isUnbilledStatements) {
      return (
        <DrawerBody>
          <GimbooksUnbilledStatements
            phone={phone}
            accessToken={accessToken}
            loanId={loanId}
          />
        </DrawerBody>
      );
    }
  };

  const renderStatements = () => {
    if (isStatements) {
      return (
        <div className="emi-reset-details">
          {statements && statements.length > 0 ? (
            statements.map((statement, id) => (
              <BilledStatement
                statement={statement}
                phone={phone}
                accessToken={accessToken}
                id={id}
              />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No Billed Transactions.</p>
          )}
        </div>
      );
    }
  };

  const renderResetPin = () => {
    if (isResetPinOpen) {
      return (
        <DrawerBody>
          <ResetPin
            cards={cards}
            phone={phone}
            accessToken={accessToken}
            toggle={handleResetPin}
            cardName="gimbooks"
          />
        </DrawerBody>
      );
    }
  };

  const renderCvv = () => {
    if (isRenderCvvOpen) {
      return (
        <DrawerBody>
          <ViewCvv
            cards={cards}
            phone={phone}
            accessToken={accessToken}
            cardName="gimbooks"
          />
        </DrawerBody>
      );
    }
  };
  const renderBlockUnblockCard = () => {
    if (isCardBlockUnblockOpen) {
      return (
        <DrawerBody>
          <ViewBlockUnblockCard
            card={card}
            phone={phone}
            accessToken={accessToken}
            toggle={toggle}
            refresh={refresh}
            isOtpSent={isOtpSent}
            setisOtpSent={setisOtpSent}
          />
        </DrawerBody>
      );
    }
  };

  const renderCardSetting = () => {
    if (isCardLimit) {
      return (
        <DrawerBody>
          <CardSettings
            kitNumber={kitNumber}
            phone={phone}
            accessToken={accessToken}
            card={card}
            toggle={handleCardLimit}
          />
        </DrawerBody>
      );
    }
  };

  const renderEmiConversion = () => {
    if (isEmiConversion) {
      return (
        <DrawerBody>
          <GimbooksEmiConversion
            toggle={handleEmiConversion}
            phone={phone}
            accessToken={accessToken}
            loanId={loanId}
            productId={userProductId}
          />
        </DrawerBody>
      );
    }
  };

  const RefreshAppData = async () => {
    refresh();
  };

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

  const clearCashFreeRelatedLocalStorage = async () => {
    Object.entries(localStorage)
      .map((x) => x[0])
      .filter((x) => x.substring(0, 8) == "cashFree")
      .forEach((x) => localStorage.removeItem(x));
  };

  const open = async (url) => {
    window.open(url, "_blank");
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

  return (
    <div>
      <div className={"pcardWrapper"}>
        <div className={"card"}>
          <RebelCardWrapper>
            <div className="row">
              <div className={"col60"}>
                <div className="row-left">
                  <div className="col30">
                    <hr className="line" />
                  </div>
                  <div className="col50">
                    <h1 styles={{ fontSize: "20px" }}>
                      Redcarpet GimBooks Card
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            {card.card_status != "ACTIVE" && card.card_status != "LOCKED" ? (
              <div
                style={{
                  color: card.card_status == "ISSUED" ? "#333333" : "red",
                  fontSize: "17px",
                  padding: "20px",
                }}
              >
                {card.card_status == "BLOCKED" ? (
                  `Your card is blocked. Contact customer support.`
                ) : card.card_status == "ISSUED" ? (
                  <div>
                    <h3>To Activate Your Card Please Click Here:</h3>
                    <Button
                      style={{ margin: "0 auto", display: "block" }}
                      className="btn"
                      onClick={activateCard}
                      title="Activate"
                    />
                  </div>
                ) : (
                  `Your card is inactive. Please contact customer support.`
                )}
              </div>
            ) : (
              <div>
                {card.url ? (
                  <div className="reset-card-image">
                    <iframe
                      src={card.url}
                      width="260"
                      height="450"
                      frameBorder="0"
                    ></iframe>
                  </div>
                ) : (
                  <div style={{ color: "red", fontSize: "20px" }}>
                    Unable to fetch details at the moment.
                  </div>
                )}
                <center>
                  <p style={{ fontSize: 14 }}>
                    Powered By:
                    <span style={{ color: `#dd285d`, marginLeft: 0 }}>
                      {lenderDetail}
                    </span>
                  </p>
                </center>
                <center>
                  <p style={{ fontSize: 20, marginBottom: 0 }}>
                    Available Limit:{" "}
                    <span style={{ color: `#dd285d`, marginLeft: 0 }}>
                      ₹ {card["card_balance"]}
                    </span>
                  </p>
                </center>
                <div className="reset-button">
                  <Button
                    onClick={RefreshAppData}
                    title="Refresh"
                    isMaterial="true"
                    className="btn"
                  />
                </div>
                <div
                  className="row"
                  style={{ margin: "30px 0 10px 0", padding: "0 20px" }}
                >
                  <div className={"col100"}>
                    <span
                      style={{
                        fontWeight: "100",
                        float: "left",
                        paddingBottom: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      Pre pay any amount you want
                    </span>
                    <span
                      className={"inputPayCombo"}
                      style={{ paddingBottom: "1rem" }}
                    >
                      <Input
                        className="payinput"
                        placeholder="Pre Pay Amount"
                        onChange={(event) => {
                          handlePreCardPayAmount(event);
                        }}
                        value={precardPayAmount}
                        disabled={prePayLoading ? true : false}
                        required
                        type="number"
                      />
                      <Button
                        onClick={() => handleRZPay(precardPayAmount)}
                        isLoading={prePayLoading}
                        title="PAY"
                        style={{
                          height: "42.4px",
                          border: "none",
                          marginTop: "10px",
                        }}
                        // className="paybtn"
                        className={
                          prePayDuesButton && !prePayLoading
                            ? "paybtn"
                            : "paytbtn-disabled"
                        }
                      />
                    </span>
                  </div>
                </div>
                {/* PAY DUES */}
                {cardPayAmount > 0 || maxCardPayAmount > 0 ? (
                  <div
                    className="row"
                    style={{ margin: "30px 0 10px 0", padding: "0 20px" }}
                  >
                    <div className={"col100"}>
                      <span
                        style={{
                          fontWeight: "100",
                          color: "red",
                          float: "left",
                          paddingBottom: "10px",
                        }}
                      >
                        *Enter Amount To Be Paid Against Card Bill
                      </span>
                      <span
                        className={"inputPayCombo"}
                        style={{ paddingBottom: "1rem" }}
                      >
                        <Input
                          className="payinput"
                          placeholder="Pay Amount"
                          onChange={(event) => {
                            handleCardPayAmount(event);
                          }}
                          value={cardPayAmount}
                          disabled={preDueLoading ? true : false}
                          required
                          type="number"
                        />
                        <Button
                          onClick={() => handleRZPay(cardPayAmount)}
                          title="PAY DUES"
                          isLoading={preDueLoading}
                          style={{
                            height: "42.4px",
                            border: "none",
                            marginTop: "10px",
                          }}
                          // className="paybtn"
                          className={
                            payDuesButton && !preDueLoading
                              ? "paybtn"
                              : "paytbtn-disabled"
                          }
                        />
                      </span>
                      <span
                        className={"col100red"}
                        style={{
                          paddingRight: "10px",
                          paddingLeft: "10px",
                        }}
                      >
                        <h5
                          className="text-center"
                          style={{ marginTop: 0 }}
                        >{`Amount must be a number between ${
                          minCardPayAmount < 0 ? 0 : minCardPayAmount
                        } - ${maxCardPayAmount}`}</h5>
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="reset-button">
                  <Button
                    onClick={(e) => handleUnbilledStatements()}
                    title="Unbilled Transactions"
                    isMaterial="true"
                    className="btn"
                  ></Button>
                  {isMobile && (
                    <div style={{ width: "100%" }}>
                      {" "}
                      {renderUnbilledStatements()}{" "}
                    </div>
                  )}
                  <Button
                    onClick={(e) => handleStatements()}
                    title="Billed Transaction"
                    isMaterial="true"
                    className="btn"
                  ></Button>
                  {isMobile && (
                    <div style={{ width: "100%" }}> {renderStatements()} </div>
                  )}
                </div>
                {card.card_status == "ACTIVE" && (
                  <div className="reset-button">
                    <Button
                      onClick={(e) => handleResetPin()}
                      title="Reset Pin"
                      isMaterial="true"
                      className="btn"
                    ></Button>
                    {isMobile && (
                      <div style={{ width: "100%" }}> {renderResetPin()} </div>
                    )}
                    <Button
                      onClick={(e) => handleCardLimit()}
                      title="Card Limit"
                      isMaterial="true"
                      className="btn"
                    ></Button>
                    {isMobile && (
                      <div style={{ width: "100%" }}>
                        {" "}
                        {renderCardSetting()}{" "}
                      </div>
                    )}
                  </div>
                )}
                <div className="reset-button" id="newBegin">
                  <Button
                    onClick={(e) => handleEmiConversion()}
                    title="EMI Conversion"
                    isMaterial="true"
                    className="btn"
                  ></Button>
                  {isMobile && (
                    <div style={{ width: "100%" }}>
                      {" "}
                      {renderEmiConversion()}{" "}
                    </div>
                  )}
                  <Button
                    onClick={(e) => handleBlockUnblockCard()}
                    title={card.card_status == "ACTIVE" ? "Lock" : "Unlock"}
                    isMaterial="true"
                    className="btn"
                  ></Button>
                  {isMobile && (
                    <div style={{ width: "100%" }}>
                      {" "}
                      {renderBlockUnblockCard()}{" "}
                    </div>
                  )}
                </div>
                {!isMobile && (
                  <div style={{ width: "100%" }}>
                    {renderCvv()}
                    {renderResetPin()}
                    {renderStatements()}
                    {renderUnbilledStatements()}
                    {renderBlockUnblockCard()}
                    {renderCardSetting()}
                    {renderEmiConversion()}
                  </div>
                )}
              </div>
            )}
          </RebelCardWrapper>
        </div>
      </div>
      {card.card_status == "ACTIVE" && (
        <GimbooksPhysicalCard
          phone={phone}
          accessToken={accessToken}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default GimbooksCardDetails;
