import Button from "common/components/Button";
import Input from "common/components/Input";
import React, { useEffect, useState, Fragment } from "react";

import styled, { keyframes } from "styled-components";
import { callApi } from "common/utils/loginMiddleware";
import ResetPin from "./resetPin";
import Statements from "./statements";
import UnbilledStatements from "./unbilledStatements";
import ViewCvv from "./viewCvv";
import ResetCardDetails from "./resetCardDetails";
import RebelCardDetails from "./rebelCardDetails";
import GimbooksCardDetails from "./gimbooksCardDetails";
import UpdateAddress from "./updateAddress";
import LockCard from "./lockCard";
import RubyCardWrapper from "public/styles/ruby.style";
import SmoothScrolling from "../../common/hooks/smoothScrolling";
import CardSettings from "./cardSettings";
import useAnalytics from "../../common/hooks/useAnalytics";
import { analyticsData } from "../../common/data/analytics";
import { closeModal, openModal } from "@redq/reuse-modal";
import { ModalSection } from "../../pages/login/login.style";
import { textAlign } from "styled-system";
// import { clear } from 'tsparticles/Utils';
import { useNotification } from "common/hooks/useNotification";
import Icon from "react-icons-kit";
import { reload } from "react-icons-kit/iconic/reload";

const CardDetails = (props) => {
  const {
    cards,
    phone,
    accessToken,
    setShowReloadHandler,
    altPayment,
    getUserCardDetails,
    showReload,
  } = props;
  const [loading, setLoading] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [loadingCfNEFT, setLoadingCfNEFT] = useState(false);

  const [cardLoanId, setCardLoanId] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const [showStatementOptions, setShowStatementOptions] = useState(true);
  const [showCurrentYearOption, setShowCurrentYearOption] = useState(true);

  const [statements, setStatements] = useState({});
  const [unbilledStatements, setUnbilledStatements] = useState({});
  const [isStatements, setIsStatements] = useState(false);
  const [isResetPinOpen, setIsResetPinOpen] = useState(false);
  const [isRenderCvvOpen, setIsRenderCvvOpen] = useState(false);
  const [isUnbilledStatements, setIsUnbilledStatements] = useState(false);
  const [isUpdateAddress, setIsUpdateAddress] = useState(false);
  const [isLockCard, setIsLockCard] = useState(false);

  const [cardPayAmount, setCardPayAmount] = useState({});
  const [minCardPayAmount, setMinCardPayAmount] = useState({});
  const [maxCardPayAmount, setMaxCardPayAmount] = useState({});

  const [payment, setPayment] = useState(false);

  const [valueOnTabClose, setValueOnTabClose] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState({});
  const [showCashfreeUPIDetails, setShowCashfreeUPIDetails] = useState(false);
  const [loadingCfUPI, setLoadingCfUPI] = useState(false);
  const [cashFreeUPI, setCashFreeUPI] = useState("");
  const [cashFreeUPIForCopy, setCashFreeUPIForCopy] = useState("");
  const [cashfreeUPIError, setCashfreeUPIError] = useState("");
  const [showCashfreeNEFTDetails, setShowCashfreeNEFTDetails] = useState(false);
  const [cashfreeNEFTDetails, setCashfreeNEFTDetails] = useState({});
  const [accountNumberCF, setAccountNumberCF] = useState("");
  const [accountNameCF, setDisplayNameCF] = useState("");
  const [ifscCF, setIfscCF] = useState("");
  const [bankNameCF, setBankNameCF] = useState("");
  const [cashfreeNEFTError, setCashfreeNEFTError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountError, setAmountError] = useState({});
  const rubyCard = cards.find((item) => item.card_display_name === "Ruby Card");
  const [isCardLimit, setIsCardLimit] = useState(false);
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
            setLoading(false);
            setLoadingPayment(false);
            setPayment(toggle(payment));
          }}
        ></Button>
      </center>
    </ModalSection>
  );
  const handleOTP = async (setOtpScreen = () => {}) => {
    try {
      let response = await callApi(
        "/send_user_otp",
        "POST",
        { source_type: "lk_ul_card" },
        phone,
        accessToken
      );
      if (response.result === "success") {
        notify({ message: response.message, type: "success" });
        setOtpScreen(true);
      } else {
        notify({ message: response.message, type: "error" });
        setOtpScreen(false);
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
      setOtpScreen(false);
    }
  };

  const ModalForLockCard = () => (
    <ModalSection>
      <center style={{ padding: "0px 10px 0px 10px" }}>
        <div style={{ marginTop: "10px", fontSize: "20px", color: "#dd285d" }}>
          <h3>
            <b>
              Are you sure if you want to{" "}
              {rubyCard.card_status === "LOCKED" ? "Unlock Card" : "Lock Card"}
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
            setIsLockCard(false);
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

  const resetValues = () => {
    setPaymentOptions();
    setLoadingCfUPI(false);
    setLoadingCfNEFT(false);
    setLoadingPayment(false);
    setShowCashfreeUPIDetails(false);
    setCashFreeUPI("");
    setCashfreeUPIError("");
    setShowCashfreeNEFTDetails(false);
    setAccountNumberCF("");
    setDisplayNameCF("");
    setIfscCF("");
    setBankNameCF("");
    setCashfreeNEFTError("");
  };

  const setPaymentOptions = () => {
    let showUserPaymentOptions = {};
    cardLoanId.map((id) => {
      showUserPaymentOptions[id] = false;
    });
    setShowPaymentOptions(showUserPaymentOptions);
  };

  const getData = async () => {
    clearCashFreeRelatedLocalStorage();
    setValueOnTabClose("");
    try {
      setLoading(true);
      let response = await callApi(
        "/get_orders",
        "GET",
        {
          case: "drawdown",
        },
        phone,
        accessToken
      );
      setLoading(false);
      if (response.result === "success") {
        const loanIDS = [];
        const userStatements = {};
        const userUnbilledStatements = {};
        const userCardPayAmount = {};
        const userMaxPayAmount = {};
        const userMinPayAmount = {};
        let count = 0;
        if (response.loans.length > 0) {
          response.loans.forEach(async (loan) => {
            let loan_id = loan["loan_id"];
            loanIDS.push(loan_id);
            setLoading(true);
            let response2 = await callApi(
              "/get_statement/" + loan_id,
              "GET",
              {},
              phone,
              accessToken
            );
            setLoading(false);
            if (response2.result === "success") {
              userStatements[loan_id] = response2.statement;
              userUnbilledStatements[loan_id] =
                response2.unbilled_card_txns_data;
              userCardPayAmount[loan_id] =
                response2.min_max_values.max_amount_to_pay;
              userMaxPayAmount[loan_id] =
                response2.min_max_values.max_amount_to_pay;
              userMinPayAmount[loan_id] =
                response2.min_max_values.min_amount_to_pay;
              count++;
            }
            if (count === loanIDS.length) {
              setCardLoanId(loanIDS);
              setStatements(userStatements);
              setUnbilledStatements(userUnbilledStatements);
              setCardPayAmount(userCardPayAmount);
              setMinCardPayAmount(userMinPayAmount);
              setMaxCardPayAmount(userMaxPayAmount);
            }
          });
        }
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };
  useEffect(() => {
    getData();
  }, [payment]);

  const getProfile = async () => {
    try {
      let response1 = await callApi(
        "/get_new_user_profile",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response1.result === "success") {
        setUserEmail(response1.user.user_data.email);
      } else {
        setUserEmail("your mail");
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };
  useEffect(() => {
    getProfile();
    setPaymentOptions();
  }, []);
  const RefreshAppData = () => {
    getData();
    getUserCardDetails();
    getProfile();
  };
  const toggle = (req) => {
    return req === true ? false : true;
  };

  const fadeIn = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
  }`;

  const handleStatements = () => {
    let analyticData = {
      Event: analyticsData.BUTTON_PRESSED,
      Card_Name: "Ruby",
      Button_Pressed: analyticsData.CARD_STATEMENT_BUTTON,
      Screen: analyticsData.CARD_ACTIVE_SCREEN,
    };
    useAnalytics(analyticData);
    setIsStatements(toggle(isStatements));
    setIsUnbilledStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    setIsUpdateAddress(false);
    setIsCardLimit(false);
  };

  const sendStatementPDF = async (currentYear) => {
    notify({ message: "Sending Mail...", type: "success" });
    let input = {};
    if (currentYear) {
      input.years = 1;
    }
    try {
      let response = await callApi(
        "/get_user_card_statement",
        "GET",
        {
          ...input,
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        if (currentYear) setShowCurrentYearOption(false);
        else setShowStatementOptions(false);
      }
    } catch (error) {
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    }
  };

  const handleResetPin = () => {
    setIsResetPinOpen(toggle(isResetPinOpen));
    setIsUnbilledStatements(false);
    setIsStatements(false);
    setIsRenderCvvOpen(false);
    setIsUpdateAddress(false);
    setIsCardLimit(false);
  };

  const handleRenderCvv = () => {
    setIsRenderCvvOpen(toggle(isRenderCvvOpen));
    setIsUnbilledStatements(false);
    setIsStatements(false);
    setIsResetPinOpen(false);
    setIsUpdateAddress(false);
    setIsCardLimit(false);
  };

  const handleUnbilledStatements = () => {
    let analyticData = {
      Event: analyticsData.BUTTON_PRESSED,
      Card_Name: "Ruby",
      Button_Pressed: analyticsData.CARD_STATEMENT_BUTTON,
      Screen: analyticsData.CARD_ACTIVE_SCREEN,
    };
    useAnalytics(analyticData);
    setIsUnbilledStatements(toggle(isUnbilledStatements));
    setIsStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    setIsUpdateAddress(false);
    setIsCardLimit(false);
  };

  const handleUpdateAddress = () => {
    setIsUnbilledStatements(false);
    setIsStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    setIsUpdateAddress(toggle(isUpdateAddress));
    setIsCardLimit(false);
  };

  const handleCardLimit = () => {
    setIsUnbilledStatements(false);
    setIsStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    setIsUpdateAddress(false);
    setIsCardLimit(toggle(isCardLimit));
  };

  const renderCardSetting = () => {
    if (isCardLimit) {
      return (
        <DrawerBody>
          <CardSettings
            kitNumber={rubyCard.kit_no}
            phone={phone}
            accessToken={accessToken}
            card={rubyCard}
            toggle={handleCardLimit}
          />
        </DrawerBody>
      );
    }
  };

  const toggleLockUnlock = () => {
    getUserCardDetails();
  };

  const toggleOpen = () => {
    setIsLockCard(toggle(true));
    setIsModalOpen(false);
  };

  const handleLockCard = () => {
    setIsUnbilledStatements(false);
    setIsStatements(false);
    setIsResetPinOpen(false);
    setIsRenderCvvOpen(false);
    setIsUpdateAddress(false);
    // setIsLockCard(toggle(isLockCard));
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

  const DrawerBody = styled.div`
    animation: 0.35s ${fadeIn} ease-in;
  `;

  const renderStatements = () => {
    if (isStatements) {
      return (
        <>
          <h2
            style={{ fontSize: "20px", fontWeight: "500", textAlign: "center" }}
          >
            Request Card Statements PDF:
          </h2>
          {showStatementOptions ? (
            <>
              <div className="reset-button">
                {showCurrentYearOption && (
                  <Button
                    onClick={(e) => sendStatementPDF(true)}
                    title="Current Year"
                    isMaterial="true"
                    className="btn"
                  />
                )}
                <Button
                  onClick={(e) => sendStatementPDF()}
                  title="Full Statement"
                  isMaterial="true"
                  className="btn"
                />
              </div>
              {!showCurrentYearOption && (
                <h2 style={{ color: "#666666", fontSize: "15px" }}>
                  Current year card statement has been sent to{" "}
                  <span style={{ fontWeight: "bold", fontStyle: "Italic" }}>
                    {userEmail}
                  </span>{" "}
                  successfully
                </h2>
              )}
            </>
          ) : (
            <h2 style={{ color: "#666666", fontSize: "15px" }}>
              Card statement has been sent to{" "}
              <span style={{ fontWeight: "bold", fontStyle: "Italic" }}>
                {userEmail}
              </span>{" "}
              successfully
            </h2>
          )}
          <DrawerBody>
            <Statements statements={statements} />
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
            cardName="ruby"
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
            cardName="ruby"
          />
        </DrawerBody>
      );
    }
  };

  const renderUnbilledStatements = () => {
    if (isUnbilledStatements) {
      return (
        <DrawerBody>
          <UnbilledStatements unbilledStatements={unbilledStatements} />
        </DrawerBody>
      );
    }
  };

  const renderUpdateAddress = () => {
    if (isUpdateAddress) {
      return (
        <DrawerBody>
          <UpdateAddress
            phone={phone}
            accessToken={accessToken}
            toggle={handleUpdateAddress}
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
            handleOTP={handleOTP}
            card={rubyCard}
            toggleLockUnlock={toggleLockUnlock}
          />
        </DrawerBody>
      );
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
          setLoadingPayment(false);
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
        setLoadingPayment(false);
        closeModal();
        setPayment(toggle(payment));
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [valueOnTabClose]);

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

  const handleRZPay = async (response) => {
    const payment_gateway_options = JSON.parse(
      response.payment_request[0].payment_gateway_options
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
          setLoadingPayment(true);
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
          setLoading(false);
          if (response2.status === "failed") {
            notify({
              message: `Your transaction ${
                response2.status === "processing"
                  ? " is"
                  : " was " + response2.status
              }. Transaction ID: ${response2.transaction_id}`,
              type: "error",
            });
            setLoadingPayment(false);
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
            setTimeout(() => {
              if (payment) {
                setPayment(false);
              } else {
                setPayment(true);
              }
              setLoadingPayment(false);
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
    setLoadingPayment(false);
    setLoading(false);
  };

  const handlePayment = async (loanId) => {
    setLoadingPayment(true);
    setCashfreeUPIError("");
    setShowCashfreeUPIDetails(false);
    setCashfreeNEFTError("");
    setShowCashfreeNEFTDetails(false);
    setValueOnTabClose("");
    setLoading(true);
    let analyticData = {
      Button_Pressed: analyticsData.MAKE_PAYMENT_BUTTON,
      Card_Name: "Ruby",
      Event: analyticsData.BUTTON_PRESSED,
      Screen: analyticsData.RUBY_DUE_PAY_SCREEN,
    };
    useAnalytics(analyticData);
    if (cardPayAmount[loanId] <= 0) {
      notify({ message: `Amount should be greater than 0`, type: "error" });
      setLoadingPayment(false);
      setLoading(false);
    } else if (
      cardPayAmount[loanId] >= minCardPayAmount[loanId] &&
      cardPayAmount[loanId] <= maxCardPayAmount[loanId]
    ) {
      let payment_requests = [];
      payment_requests.push({
        amount: Number(cardPayAmount[loanId]),
        type: "loan_id",
        value: parseInt(loanId).toString(),
      });
      try {
        let response = await callApi(
          "/create_payment_requests",
          "POST",
          {
            for_ledger_loan: false,
            payment_requests,
          },
          phone,
          accessToken
        );
        //setLoading(false);

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
          const error = new Error(
            "Payment can't be processed. Please contact customer support!"
          );
          throw error;
        }
      } catch (error) {
        setLoadingPayment(false);
        setLoading(false);
        notify({ message: error.message, type: "error" });
      }
    } else {
      setLoadingPayment(false);
      notify({
        message: `Amount should be greater than ₹${minCardPayAmount[loanId]} and lesser than ₹${maxCardPayAmount[loanId]}`,
        type: "error",
      });
    }
  };

  const handleCardPayAmount = (event, loanId) => {
    const amount = event;
    let error = { ...amountError };
    if (
      typeof amount == "string" &&
      amount != "" &&
      !isNaN(amount) &&
      Number(amount) >= minCardPayAmount[loanId] &&
      Number(amount) <= maxCardPayAmount[loanId] &&
      Number(amount) > 0
    ) {
      let userCardPayAmount = { ...cardPayAmount };
      userCardPayAmount[loanId] = amount;
      error[loanId] = "";
      setCardPayAmount(userCardPayAmount);
      setAmountError(error);
    } else {
      error[loanId] = `Amount must be a number between ${
        minCardPayAmount[loanId] < 0 ? 0 : minCardPayAmount[loanId]
      } & ${maxCardPayAmount[loanId]}`;
      setAmountError(error);
    }
  };

  const handleCashFreeNEFTPayment = async (loanId) => {
    if (!showCashfreeNEFTDetails) {
      setShowCashfreeUPIDetails(false);
      setCashfreeUPIError("");
      try {
        setLoadingCfNEFT(true);
        let response = await callApi(
          "/get_virtual_account",
          "POST",
          { loan_id: loanId },
          phone,
          accessToken
        );
        setLoadingCfNEFT(false);
        if (response.result != "success") {
          setShowCashfreeNEFTDetails(false);
          setCashfreeNEFTDetails({});
          setCashfreeNEFTError(response.message);
        } else if (response.result === "success") {
          setShowCashfreeNEFTDetails(true);
          setCashfreeNEFTDetails(response.data);
          setAccountNumberCF(response.data["accountNumber"]);
          setDisplayNameCF(response.data["displayName"]);
          setIfscCF(response.data["ifsc"]);
          setBankNameCF(response.data["bankName"]);
          SmoothScrolling.scrollTo("neftDetailButton");
        }
      } catch (error) {
        setLoadingCfNEFT(false);
        setCashfreeNEFTError(
          `NEFT/IMPS payment option is unavailable right now. Please try again later.`
        );
      }
    } else {
      setShowCashfreeNEFTDetails(false);
    }
  };

  const handleCashFreeUPIPayment = async (loanId) => {
    if (!showCashfreeUPIDetails) {
      setShowCashfreeNEFTDetails(false);
      setCashfreeNEFTError("");
      try {
        setLoadingCfUPI(true);
        setCashfreeUPIError("");
        setShowCashfreeUPIDetails(false);
        let response = await callApi(
          "/get_virtual_upi_vpa",
          "POST",
          { loan_id: loanId },
          phone,
          accessToken
        );
        setLoadingCfUPI(false);
        if (response.result != "success") {
          setShowCashfreeUPIDetails(false);
          setCashfreeUPIError(response.message);
        } else if (response.result === "success") {
          setShowCashfreeUPIDetails(true);
          setCashFreeUPI(response.vpa);
          setCashFreeUPIForCopy(response.vpa);
          SmoothScrolling.scrollTo("UPIDetailButton");
        }
      } catch (error) {
        setLoadingCfUPI(false);
        setCashfreeUPIError(
          `UPI details not available right now. Check back later.`
        );
      }
    } else {
      setShowCashfreeUPIDetails(false);
    }
  };

  const copyToClipboardHandler = (key) => {
    switch (key) {
      case "UPI":
        navigator.clipboard.writeText(cashFreeUPI);
        setCashFreeUPI("copied!");
        setTimeout(() => {
          setCashFreeUPI(cashFreeUPIForCopy);
        }, 2000);
        break;

      case "displayName":
        navigator.clipboard.writeText(accountNameCF);
        setDisplayNameCF("copied!");
        setTimeout(() => {
          setDisplayNameCF(cashfreeNEFTDetails["displayName"]);
        }, 2000);
        break;

      case "accountNumber":
        navigator.clipboard.writeText(accountNumberCF);
        setAccountNumberCF("copied!");
        setTimeout(() => {
          setAccountNumberCF(cashfreeNEFTDetails["accountNumber"]);
        }, 2000);
        break;

      case "ifsc":
        navigator.clipboard.writeText(ifscCF);
        setIfscCF("copied!");
        setTimeout(() => {
          setIfscCF(cashfreeNEFTDetails["ifsc"]);
        }, 2000);
        break;

      case "bankName":
        navigator.clipboard.writeText(bankNameCF);
        setBankNameCF("copied!");
        setTimeout(() => {
          setBankNameCF(cashfreeNEFTDetails["bankName"]);
        }, 2000);
        break;
    }
  };

  const checkIfCashFreeAvailable = (loanId) => {
    if (altPayment) {
      let showUserPaymentOptions = { ...showPaymentOptions };
      showUserPaymentOptions[loanId] = toggle(showPaymentOptions[loanId]);
      setShowPaymentOptions(showUserPaymentOptions);
      setShowCashfreeUPIDetails(false);
      setShowCashfreeNEFTDetails(false);
    } else {
      handlePayment(loanId);
    }
  };

  return (
    <div>
      {cards.map((card, index) => {
        if (card.card_display_name == "Reset Card") {
          return (
            <ResetCardDetails
              cards={cards}
              card={card}
              phone={phone}
              accessToken={accessToken}
              getUserCardDetails={getUserCardDetails}
              handleOTP={handleOTP}
            />
          );
        } else if (card.card_display_name == "Rebel Card") {
          return (
            <RebelCardDetails
              cards={cards}
              card={card}
              phone={phone}
              accessToken={accessToken}
              handleOTP={handleOTP}
            />
          );
        } else if (card.card_display_name == "Redcarpet Gimbooks Card") {
          return (
            <GimbooksCardDetails
              cards={cards}
              card={card}
              phone={phone}
              accessToken={accessToken}
              handleOTP={handleOTP}
            />
          );
        } else if (
          (card.card_name == "zeta" && card.card_status != "ALLOCATED") ||
          (card.card_name != "ruby" && card.card_status != "ACTIVE")
        ) {
          return "";
        } else if (card.card_display_name == "Ruby Card") {
          return (
            <div className={"pcardWrapper"}>
              <div className={"card"}>
                <RubyCardWrapper>
                  <div className="row">
                    <div className={"col60"}>
                      <div className="row-left">
                        <div className="col30">
                          <hr className="line" />
                        </div>
                        <div id="heading-text" className="col50">
                          <h1 style={{ fontSize: "30px" }}>
                            Ruby Card Details
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="refresh-row">
                      <Icon
                        icon={reload}
                        size="30px"
                        className="refresh-btn"
                        style={{ marginTop: "11px", marginLeft: "5px" }}
                        onClick={() => RefreshAppData()}
                      />
                    </div>
                  </div>
                  {card.card_status != "ACTIVE" &&
                  card.card_status != "LOCKED" ? (
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
                      {cardLoanId.map((loanId) => {
                        return cardPayAmount[loanId] > 0 ? (
                          <div className="row" style={{ marginBottom: "50px" }}>
                            <div className={"col60"}>
                              <div className="row-left">
                                <div className="col30">
                                  <hr className="line" />
                                </div>
                                <div className="col50">
                                  <h2
                                    style={{
                                      fontSize: "18px",
                                      fontStyle: "italic",
                                      color: "rgb(79, 83, 98)",
                                    }}
                                  >{`Loan ID : ${loanId}`}</h2>
                                </div>
                              </div>
                            </div>
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
                              <span className={"inputPayCombo"}>
                                <Input
                                  className="payinput"
                                  placeholder="Pay Amount"
                                  onChange={(event) => {
                                    //setCardPayAmount(event);
                                    handleCardPayAmount(event, loanId);
                                  }}
                                  value={cardPayAmount[loanId]}
                                  disabled={loading ? true : false}
                                  required
                                  type="number"
                                />
                                {loadingPayment ||
                                (altPayment && !showPaymentOptions[loanId]) ? (
                                  <Button title="Loading.." className="paybtn">
                                    {/* <FormattedMessage
                                    id="payment.loading"
                                    defaultMessage="Loading"
                                  /> */}
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => {
                                      resetValues();
                                      checkIfCashFreeAvailable(loanId);
                                    }}
                                    title="PAY DUES"
                                    className="paybtn"
                                  ></Button>
                                )}
                              </span>
                              <div
                                style={{
                                  fontSize: "15px",
                                  fontStyle: "italic",
                                  color: "rgb(79, 83, 98)",
                                }}
                              >
                                <p>{`Min Amount : ${minCardPayAmount[loanId]}`}</p>
                                <p>{`Max Amount : ${maxCardPayAmount[loanId]}`}</p>
                              </div>
                              {amountError[loanId] &&
                              amountError[loanId] !== "" ? (
                                <span
                                  className={"col100red"}
                                  style={{
                                    paddingRight: "10px",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  <h5 className="text-center">
                                    {amountError[loanId]}
                                  </h5>
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            {showPaymentOptions[loanId] ? (
                              <div className="col100">
                                <center>
                                  <h5>
                                    UPI and NEFT/IMPS transactions are charged{" "}
                                    <b>ZERO Transaction Fee</b>
                                  </h5>
                                </center>
                                <div className="reset-button">
                                  {loadingCfUPI ? (
                                    <Button
                                      title="Loading.."
                                      isMaterial="true"
                                      className="btn"
                                    />
                                  ) : (
                                    <Button
                                      onClick={() => {
                                        handleCashFreeUPIPayment(loanId);
                                      }}
                                      title="UPI"
                                      isMaterial="true"
                                      className="btn"
                                      id="UPIDetailButton"
                                    />
                                  )}
                                  {loadingCfNEFT ? (
                                    <Button
                                      title="Loading.."
                                      isMaterial="true"
                                      className="btn"
                                    />
                                  ) : (
                                    <Button
                                      onClick={() => {
                                        handleCashFreeNEFTPayment(loanId);
                                      }}
                                      title="NEFT/IMPS"
                                      isMaterial="true"
                                      className="btn"
                                      id="neftDetailButton"
                                    />
                                  )}
                                </div>
                                <div className="col100">
                                  <div className="reset-button">
                                    {loadingPayment ? (
                                      <Button
                                        title="Loading.."
                                        isMaterial="true"
                                        className="btn"
                                      ></Button>
                                    ) : (
                                      <Button
                                        onClick={() => {
                                          handlePayment(loanId);
                                        }}
                                        title="Debit Card/ Credit Card"
                                        isMaterial="true"
                                        className="btn"
                                      ></Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {showPaymentOptions[loanId] &&
                            showCashfreeUPIDetails ? (
                              <>
                                <div className={"col100"}>
                                  <center>
                                    <h5 className="text-center">
                                      Transfer the due amount to the provided
                                      UPI ID
                                    </h5>
                                  </center>
                                </div>
                                <div className="col100">
                                  <div className="UPIDevsContainer">
                                    <div className="UPILabelContainer">
                                      <center>UPI ID:</center>
                                    </div>
                                    <div
                                      onClick={() => {
                                        copyToClipboardHandler("UPI");
                                      }}
                                      className={
                                        cashFreeUPI == "copied!"
                                          ? "greenText UPI_VPA"
                                          : "UPI_VPA"
                                      }
                                    >
                                      <center>{cashFreeUPI}</center>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            {showPaymentOptions[loanId] &&
                            cashfreeUPIError != "" ? (
                              <div className={"col100red"}>
                                <h5 className="text-center">
                                  {cashfreeUPIError}
                                </h5>
                              </div>
                            ) : (
                              ""
                            )}
                            {showPaymentOptions[loanId] &&
                            showCashfreeNEFTDetails ? (
                              <>
                                <div className={"col100"}>
                                  <center>
                                    <h5 className="text-center">
                                      Transfer the due amount to the provided
                                      bank details.
                                    </h5>
                                  </center>
                                </div>
                                <div className="col100">
                                  <center>
                                    <table className="neftTable">
                                      <tr>
                                        <td>Account Number</td>
                                        <td
                                          onClick={() => {
                                            copyToClipboardHandler(
                                              "accountNumber"
                                            );
                                          }}
                                          className={
                                            accountNumberCF == "copied!"
                                              ? "greenText"
                                              : ""
                                          }
                                        >
                                          {accountNumberCF}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Beneficiary Name</td>
                                        <td
                                          onClick={() => {
                                            copyToClipboardHandler(
                                              "displayName"
                                            );
                                          }}
                                          className={
                                            accountNameCF == "copied!"
                                              ? "greenText"
                                              : ""
                                          }
                                        >
                                          {accountNameCF}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>IFSC Code</td>
                                        <td
                                          onClick={() => {
                                            copyToClipboardHandler("ifsc");
                                          }}
                                          className={
                                            ifscCF == "copied!"
                                              ? "greenText"
                                              : ""
                                          }
                                        >
                                          {ifscCF}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Bank Name</td>
                                        <td
                                          onClick={() => {
                                            copyToClipboardHandler("bankName");
                                          }}
                                          className={
                                            bankNameCF == "copied!"
                                              ? "greenText"
                                              : ""
                                          }
                                        >
                                          {bankNameCF}
                                        </td>
                                      </tr>
                                    </table>
                                  </center>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                            {showPaymentOptions[loanId] &&
                            cashfreeNEFTError != "" ? (
                              <div className={"col100red"}>
                                <h5 className="text-center">
                                  {cashfreeNEFTError}
                                </h5>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          ""
                        );
                      })}
                      <div className="refresh-row-mobile">
                        <p
                          onClick={() => {
                            RefreshAppData();
                            SmoothScrolling.scrollTo("heading-text");
                          }}
                          className="refresh-btn-mobile"
                        >
                          Refresh
                        </p>
                      </div>
                      <center>
                        <p style={{ fontSize: 20, marginBottom: 0 }}>
                          Available Limit:{" "}
                          <span style={{ color: `#dd285d`, marginLeft: 0 }}>
                            ₹ {card["card_balance"]}
                          </span>
                        </p>
                      </center>
                      <center>
                        <p style={{ fontSize: 20, marginBottom: 0 }}>
                          Daily Limit:{" "}
                          <span style={{ color: `#dd285d`, marginLeft: 0 }}>
                            ₹ {card["remaining_daily_limit"]}
                          </span>
                        </p>
                      </center>
                      <center>
                        <p style={{ fontSize: 20, marginBottom: 0 }}>
                          Weekly Limit:{" "}
                          <span style={{ color: `#dd285d`, marginLeft: 0 }}>
                            ₹ {card["remaining_weekly_limit"]}
                          </span>
                        </p>
                      </center>
                      <div className="reset-button">
                        <Button
                          onClick={() => {
                            handleStatements();
                          }}
                          title="Statements"
                          isMaterial="true"
                          className="btn"
                        />
                        <Button
                          onClick={() => {
                            handleUnbilledStatements();
                          }}
                          title="Unbilled Txn"
                          isMaterial="true"
                          className="btn"
                        />
                        <Button
                          onClick={() => {
                            handleLockCard();
                          }}
                          title={
                            card.card_status === "LOCKED"
                              ? "Unlock Card"
                              : "Lock Card"
                          }
                          isMaterial="true"
                          className="btn"
                        />
                        {card.card_status == "ACTIVE" && (
                          <Fragment>
                            <Button
                              onClick={() => {
                                handleRenderCvv();
                              }}
                              title="View CVV"
                              isMaterial="true"
                              className="btn"
                            />
                            <Button
                              onClick={() => {
                                handleResetPin();
                              }}
                              title="Reset PIN"
                              isMaterial="true"
                              className="btn"
                            />
                            <Button
                              onClick={() => {
                                handleUpdateAddress();
                              }}
                              title="Update address"
                              isMaterial="true"
                              className="btn"
                            />
                            {showReload && (
                              <Button
                                onClick={() => {
                                  setShowReloadHandler(card);
                                }}
                                title="Reload Smart Card"
                                isMaterial="true"
                                className="btn"
                              />
                            )}
                            <Button
                              onClick={() => {
                                handleCardLimit();
                              }}
                              title="Set Card Limit"
                              isMaterial="true"
                              className="btn"
                            />
                          </Fragment>
                        )}
                      </div>
                      <div style={{ width: "100%" }}>
                        {renderStatements()}
                        {renderResetPin()}
                        {renderUnbilledStatements()}
                        {renderCvv()}
                        {renderUpdateAddress()}
                        {renderLockCard()}
                        {renderCardSetting()}
                      </div>
                    </Fragment>
                  )}
                </RubyCardWrapper>
              </div>
            </div>
          );
        } else {
          ("");
        }
      })}
    </div>
  );
};

export default CardDetails;
