import React, { useState, useEffect, Fragment } from "react";
import ResetPin from "./resetPin";
import Statements from "./statements";
import LoanSchedule from "./LoanSchedule";
import ViewCvv from "./viewCvv";
import styled, { keyframes } from "styled-components";

import { callApi } from "common/utils/loginMiddleware";
import Input from "common/components/Input";
import Button from "common/components/Button";
import ResetCardWrapper from "public/styles/reset.style";
import Logo from "public/images/reset/Reset_Card.svg";
import RenderEmiDetail from "./renderEmiDetail";
import useAnalytics from "../../common/hooks/useAnalytics";
import { analyticsData } from "../../common/data/analytics";
import moment from "moment";
import LockCard from "./lockCard";
import { closeModal, openModal } from "@redq/reuse-modal";
import { ModalSection } from "../../pages/login/login.style";
// import CardSettings from "./cardSettings";
import { useNotification } from "common/hooks/useNotification";

const ResestCardDetails = ({
  cards,
  phone,
  accessToken,
  getUserCardDetails,
  handleOTP,
}) => {
  const [isStatements, setIsStatements] = useState(false);
  const [isResetPinOpen, setIsResetPinOpen] = useState(false);
  const [isRenderCvvOpen, setIsRenderCvvOpen] = useState(false);
  const [loanId, setUserLoanId] = useState("");
  const [userProductId, setUserProductId] = useState("");
  const [emis, setEmis] = useState([]);
  const [statement, setStatement] = useState({});
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [isLockCard, setIsLockCard] = useState(false);
  const [minMaxValue, setMinMaxValue] = useState({});
  const [cardPayAmount, setCardPayAmount] = useState();
  const [minCardPayAmount, setMinCardPayAmount] = useState();
  const [maxCardPayAmount, setMaxCardPayAmount] = useState();
  const [card, setCard] = useState("");
  const [count, setCount] = useState("");
  const [lenderDetail, setLenderDetail] = useState("");
  const [emiStatus, setEmiStatus] = useState("");
  const [emiToPay, setEmiToPay] = useState([]);
  const [unpaidEmis, setUnpaidEmis] = useState([]);
  const [nextEMI, setNextEMI] = useState([]);
  const [overdueEMI, setOverdueEMI] = useState([]);
  const [payment, setPayment] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notify = useNotification();

  const totalOverDueAmount = () => {
    let total = 0;
    overdueEMI.forEach((item) => {
      total += item.totalDueAmount;
    });
    return total;
  };

  function daysRemaining(nextEMIDate) {
    const currentDate = new Date();
    var eventdate = moment(nextEMIDate);
    var todaysdate = moment();
    if (moment(nextEMIDate).isSame(currentDate, "day")) {
      return "Today";
    } else {
      const res = eventdate.diff(todaysdate, "days") + 1;
      if (res === 1) {
        return `One day Left`;
      } else if (res > 1) {
        return `${res} days Left`;
      }
      return;
    }
  }

  // const [isCardLimit, setIsCardLimit] = useState(false);
  const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
}`;
  const DrawerBody = styled.div`
    animation: 0.35s ${fadeIn} ease-in;
  `;

  const getUserData = async () => {
    try {
      setLoading(true);
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
        response.cards.find((o) => o.card_display_name === "Reset Card")
      ) {
        let obj = response.cards.find(
          (o) => o.card_display_name === "Reset Card"
        );
        let analyticData = {
          Event: analyticsData.VISITED_SCREEN,
          "Screen Name": analyticsData.RESET_ACTIVE_SCREEN,
        };
        useAnalytics(analyticData);
        setCard(obj);
        setLenderDetail(obj.lender_details.name);
        setName(response1.user.user_data.first_name);
      } else {
        setCard("");
      }

      //setLoading(false);
      let response2 = await callApi(
        "/user_products_and_states/term_loan_reset",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response2.result == "success") {
        let statements = {};
        response2.data.map(async (product) => {
          if (
            product.loan_id != null &&
            product.product_type == "term_loan_reset"
          ) {
            setUserLoanId(product.loan_id);
            setUserProductId(product.user_product_id);
            let response3 = await callApi(
              "/reset_card_schedule/" + product.loan_id,
              "GET",
              {},
              phone,
              accessToken
            );
            if (response3.result == "success") {
              const compareDate = (dueDate) => {
                const currentDay = new Date();
                return moment(dueDate).isAfter(currentDay, "day");
              };
              setEmis(response3.message.card_emis);
              const emisUnpaidArr = response3.message.card_emis.filter(
                (item) => item.payment_status === "UnPaid"
              );

              setUnpaidEmis(emisUnpaidArr);
              const emisUnpaid = emisUnpaidArr.map((item) => {
                return {
                  totalDueAmount: item.total_due_amount,
                  emiNumber: item.emi_number,
                  isOverDue: compareDate(new Date(item.due_date)),
                  dueDate: item.due_date,
                };
              });
              const overdueemi = emisUnpaid.filter(
                (item) => item.isOverDue === false
              );
              const nextEmiUnpaid = emisUnpaid.filter(
                (item) => item.isOverDue === true
              );
              setOverdueEMI(overdueemi);
              setNextEMI(nextEmiUnpaid);

              if (response3.message.status == "COMPLETED") {
                setEmiStatus("COMPLETED");
                setCount(0);
              } else {
                setCount(
                  response3.message.card_emis.reduce(function (id, emi) {
                    return id + (emi.payment_status != "Paid");
                  }, 0)
                );
                let v = [];
                let flag = 0;
                response3.message.card_emis.map((emi, index) => {
                  if (emi.payment_status == "UnPaid" && flag == 0) {
                    v.push(true);
                    flag = 1;
                  } else {
                    v.push(false);
                  }
                });
                setEmiToPay(v);
              }

              let response4 = await callApi(
                "/get_reset_statement/" + product.loan_id,
                "GET",
                {},
                phone,
                accessToken
              );
              if (response4.result == "success") {
                statements[product.loan_id] = response4.statement;
                setStatement(statements);
                setMinMaxValue(response4.min_max_values);
                setCardPayAmount(response4.min_max_values.max_amount_to_pay);
                setMinCardPayAmount(response4.min_max_values.min_amount_to_pay);
                setMaxCardPayAmount(response4.min_max_values.max_amount_to_pay);
              } else {
                notify({
                  message: "Some Error Occurred, try again later.",
                  type: "error",
                });
              }
            } else {
              notify({
                message: "Some Error Occurred, try again later.",
                type: "error",
              });
            }
          }
        });
      } else {
        notify({
          message: "Some Error Occurred, try again later.",
          type: "error",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, [payment]);

  const toggle = (req) => {
    return req === true ? false : true;
  };

  const togglePayment = () => {
    if (payment) {
      setPayment(false);
    } else {
      setPayment(true);
    }
  };

  const handleStatements = () => {
    setIsStatements(toggle(isStatements));
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    // setIsCardLimit(false);
  };

  const handleResetPin = () => {
    setIsResetPinOpen(toggle(isResetPinOpen));
    setIsStatements(false);
    setIsRenderCvvOpen(false);
    // setIsCardLimit(false);
  };

  const handleRenderCvv = () => {
    setIsRenderCvvOpen(toggle(isRenderCvvOpen));
    setIsStatements(false);
    setIsResetPinOpen(false);
    // setIsCardLimit(false);
  };

  const toggleLockUnlock = () => {
    getUserCardDetails();
  };

  const toggleOpen = () => {
    setIsLockCard(toggle(true));
    setIsModalOpen(false);
  };

  const handleLockCard = () => {
    setIsStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    {
      isModalOpen
        ? toggleOpen()
        : openModal({
            config: {
              disableDragging: true,
              default: {
                width: "55%",
                height: "40%",
                x: 0,
                y: 0,
              },
            },
            component: ModalForLockCard,
            closeOnClickOutside: false,
          });
    }
  };
  const ModalForLockCard = () => (
    <ModalSection>
      <center style={{ padding: "0px 10px 0px 10px" }}>
        <div style={{ marginTop: "10px", fontSize: "20px", color: "#dd285d" }}>
          <h3>
            <b>
              Are you sure if you want to{" "}
              {card.card_status === "LOCKED" ? "Unlock Card" : "Lock Card"}
            </b>
          </h3>
        </div>

        <Button
          title="Yes"
          style={{ width: "10%", marginRight: "0.5rem" }}
          className="paybtn"
          isMaterial="true"
          id="closeThis"
          onClick={() => {
            closeModal();
            setLoading(false);
            setIsLockCard(toggle(false));
            handleOTP();
            setIsModalOpen(true);
          }}
        ></Button>
        <Button
          title="No"
          style={{ width: "10%" }}
          className="paybtn"
          isMaterial="true"
          id="closeThis"
          onClick={() => {
            closeModal();
            setLoading(false);
            setIsLockCard(toggle(true));
          }}
        ></Button>
      </center>
    </ModalSection>
  );
  // const handleCardLimit = () => {
  //   setIsStatements(false);
  //   setIsResetPinOpen(false);
  //   setIsRenderCvvOpen(false);
  //   setIsCardLimit(toggle(isCardLimit));
  // };

  // const renderCardSetting = () => {
  //   if (isCardLimit) {
  //     return (
  //       <DrawerBody>
  //         <CardSettings
  //           kitNumber={card.kit_no}
  //           phone={phone}
  //           accessToken={accessToken}
  //           card={card}
  //           toggle={handleCardLimit}
  //         />
  //       </DrawerBody>
  //     );
  //   }
  // };

  const renderStatements = () => {
    if (isStatements) {
      return (
        <>
          <div className="row">
            <div className={"col60"}>
              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">
                  <h2>Card Statements</h2>
                </div>
              </div>
            </div>
          </div>
          <DrawerBody>
            <Statements statements={statement} />
          </DrawerBody>
        </>
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
            cardName="reset"
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
            cardName="reset"
          />
        </DrawerBody>
      );
    }
  };

  const renderLockCard = () => {
    if (isLockCard) {
      return (
        <DrawerBody>
          <LockCard
            phone={phone}
            accessToken={accessToken}
            // toggle={handleLockCard}
            card={card}
            handleOTP={handleOTP}
            toggleLockUnlock={toggleLockUnlock}
          />
        </DrawerBody>
      );
    }
  };

  return loading ? (
    <div className="text-center" style={{ width: "100%" }}>
      <div className="loader"></div>
    </div>
  ) : emis && name && card ? (
    <div className={"pcardWrapper"}>
      <div className={"card"}>
        <ResetCardWrapper>
          <div className="row">
            <div className={"col60"}>
              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">
                  <h1>Reset Card Details</h1>
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
              {card.card_status == "BLOCKED"
                ? `Your card is blocked. Contact customer support.`
                : card.card_status == "ISSUED"
                ? `Your card is being activated. If it is taking too long
                      please contact customer support.`
                : `Your card is inactive. Please contact customer support.`}
            </div>
          ) : (
            <Fragment>
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
                <p style={{ fontSize: 20, marginBottom: 0 }}>
                  Available Limit:{" "}
                  <span style={{ color: `#dd285d`, marginLeft: 0 }}>
                    ₹ {card["card_balance"]}
                  </span>
                </p>
              </center>

              <div className="reset-button" style={{ marginBottom: "1.5rem" }}>
                <Button
                  onClick={(e) => handleStatements()}
                  title="My Transactions"
                  isMaterial="true"
                  className="btn"
                ></Button>
                {card.card_status == "ACTIVE" && (
                  <Fragment>
                    <Button
                      onClick={(e) => handleRenderCvv()}
                      title="View CVV"
                      isMaterial="true"
                      className="btn"
                    ></Button>
                    <Button
                      onClick={(e) => handleResetPin()}
                      title="Reset Pin"
                      isMaterial="true"
                      className="btn"
                    ></Button>
                    {/* <Button
                      onClick={() => {
                        handleCardLimit();
                      }}
                      title="Set Card Limit"
                      isMaterial="true"
                      className="btn"
                    /> */}
                  </Fragment>
                )}
                <Button
                  onClick={() => handleLockCard()}
                  title={
                    card.card_status === "LOCKED" ? "Unlock Card" : "Lock Card"
                  }
                  isMaterial="true"
                  className="btn"
                ></Button>
              </div>

              <div style={{ width: "100%" }}>
                {renderStatements()}
                {renderResetPin()}
                {renderCvv()}
                {renderLockCard()}
                {/* {renderCardSetting()} */}
              </div>

              <div className="row">
                <div className={"col60"}>
                  <div className="row-left">
                    <div className="col30">
                      <hr className="line" />
                    </div>
                    <div className="col70">
                      <h2>Your Card Details</h2>
                    </div>
                  </div>
                </div>
              </div>
              {count === 0 ? (
                <h5 style={{ fontStyle: "italic" }}>Your loan is Completed!</h5>
              ) : (
                <div className="details-box">
                  <div className="reset-box">
                    <div className="details-number">
                      <h3>{count}</h3>
                    </div>
                    <div className="details-type">
                      <h5> EMI's Left</h5>
                    </div>
                  </div>
                  <div className="reset-box">
                    <div className="details-number">
                      <h3>₹ {card.locked_limit}</h3>
                    </div>
                    <div className="details-type">
                      <h5> Locked Limit</h5>
                    </div>
                  </div>
                </div>
              )}
              {card.card_status == "ACTIVE" && count > 0 && (
                <div>
                  <div className="row">
                    <div className={"col60"}>
                      <div className="row-left">
                        <div className="col30">
                          <hr className="line" />
                        </div>
                        <div className="col70">
                          <h2>Time left for next EMI</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="details-box">
                    {overdueEMI.length > 0 && (
                      <div className="reset-box">
                        <div className="details-number">
                          <h3>₹ {totalOverDueAmount()}</h3>
                        </div>
                        <div className="details-type">
                          <h5>
                            Payment Overdue of {overdueEMI.length} EMI
                            {overdueEMI.length > 1 ? "'s" : ""} Left{" "}
                          </h5>
                        </div>
                        <ul style={{ marginBottom: "1rem" }}>
                          {overdueEMI.map((item) => (
                            <li>EMI #{item.emiNumber}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {nextEMI.length > 0 && (
                      <div className="reset-box">
                        <div className="details-number">
                          <h3>₹ {nextEMI[0].totalDueAmount}</h3>
                        </div>
                        <div className="details-type">
                          <h4>{daysRemaining(new Date(nextEMI[0].dueDate))}</h4>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="row">
                <div className={"col60"}>
                  <div className="row-left">
                    <div className="col30">
                      <hr className="line" />
                    </div>
                    <div className="col70">
                      <h2>Your Loan Schedule</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="emi-reset-details">
                {card.card_status == "ACTIVE" && emis ? (
                  emis.map((emi, id) => (
                    <RenderEmiDetail
                      emi={emi}
                      loanId={loanId}
                      userProductId={userProductId}
                      phone={phone}
                      accessToken={accessToken}
                      togglePayment={togglePayment}
                      emiStatus={emiStatus}
                      emiPay={emiToPay}
                      emiId={id}
                    />
                  ))
                ) : (
                  <div>
                    <p>Your card is locked. Unlock it to see Loan Schedule</p>
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </ResetCardWrapper>
      </div>
    </div>
  ) : (
    <div className="text-center" style={{ width: "100%" }}>
      <div className="loader"></div>
    </div>
  );
};

export default ResestCardDetails;
