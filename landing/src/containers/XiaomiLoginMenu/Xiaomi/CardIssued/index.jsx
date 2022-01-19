import React, { Fragment, useState, useEffect } from "react";
import CardIssuedWrapper from "./styles";
import Button from "common/components/Button";
import Image from "common/components/Image";
import Text from "common/components/Text";

import { callApi } from "common/utils/loginMiddleware";
import CardPrinting from "../CardPrinting";
import Celebrate from "public/images/rebel/celebrate.svg";

import CardTracking from "../CardTracking";
import AnchorLink from "react-anchor-link-smooth-scroll";
import UploadDocuments from "../../OnBoardUser/UploadDocuments";
import useAnalytics from "../../../../common/hooks/useAnalytics";
import { analyticsData } from "../../../../common/data/analytics";
import { useNotification } from "common/hooks/useNotification";

const CardIssued = ({
  phone,
  accessToken,
  redirectUser,
  selectedProduct,
  getBacktoProduct,
  moveUser,
  userProfile,
}) => {
  //const [currentStatus, setCurrentStatus] = useState("")
  const [userStatus, setUserStatus] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const [userProductId, setUserProductId] = useState();
  const [userName, setUserName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loanAgreementDetails, setLoanAgreementDetails] = useState(null);
  const [callM2PAPI, setCallM2PAPI] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [approvvedLimit, setApprovedLimit] = useState(null);
  const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);
  const notify = useNotification();

  const M2PAPI = async () => {
    setIsLoading(true);
    try {
      let response = await callApi(
        "/rerun_m2p_for_redcarpet_xiaomi_customer",
        "GET",
        {},
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response.result == "success") {
        setCallM2PAPI(false);
        getProductStates();
      } else {
        notify({
          message: "Something went wrong, Please try again after some time!",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProductStates = async () => {
    setIsLoading(true);
    try {
      let response = await callApi(
        "/user_products_and_states/" + selectedProduct,
        "GET",
        {},
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response.result == "success") {
        response.data.map((data) => setUserStatus(data.current_task));
        response.data.map((data) => setUserProductId(data.user_product_id));
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getLoanAgreementDetails = async () => {
    setIsLoading(true);
    try {
      let response = await callApi(
        "/redcarpet_xiaomi_customer_in_loan_agreement_details",
        "GET",
        {},
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response.result == "success") {
        setLoanAgreementDetails(response);
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSecretCode = async () => {
    setIsLoading(true);
    try {
      let response = await callApi(
        "/generate_secret_code_for_redcarpet_xiaomi_customer",
        "POST",
        {},
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response.result == "success") {
        setSecretCode(response.pin);
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const approveLoanAgreement = async () => {
    if (!isChecked) {
      notify({ message: "Please check the Loan Agreement Details" });
    } else {
      setIsLoading(true);
      try {
        let response = await callApi(
          "/redcarpet_xiaomi_customer_in_loan_agreement_approval",
          "GET",
          {},
          phone,
          accessToken
        );
        setIsLoading(false);
        if (response.result == "success") {
          notify({
            message: "Thanks for accepting the Loan Agreement",
            type: "success",
          });
          setUserStatus("awaiting_merchant");
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        console.log(error);
        notify({
          message: "Some Error Occurred, try again later.",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const declineLoanAgreement = async () => {
    setIsLoading(true);
    try {
      let response = await callApi(
        "/decline_loan_agreement_for_redcarpet_xiaomi_customer",
        "GET",
        {},
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response.result == "success") {
        notify({
          message: "You have declined the Loan Agreement",
        });
        setUserStatus("merchant_eval");
        setShowConfirmationScreen(false);
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
      notify({
        message: error.message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDetail = async () => {
    setIsLoading(true);
    try {
      let response = await callApi(
        "/get_new_user_profile",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        setIsLoading(false);
        setUserName(response.user.user_data.first_name);
      }
    } catch (error) {
      console.log(error);
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getApprovedLimit = async () => {
    setIsLoading(true);
    try {
      let response = await callApi(
        "/get_approved_limit_for_redcarpet_xiaomi_customer",
        "GET",
        {},
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response.result == "success") {
        setApprovedLimit(response.approved_limit);
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      console.log("here");
      console.log(error);
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (["card_issue", "card_activate", "card_load"].includes(userStatus)) {
      setCallM2PAPI(true);
    } else if (userStatus === "loan_agreement") {
      getLoanAgreementDetails();
    } else if (userStatus === "disburse_amount") {
      getSecretCode();
    } else if (["merchant_settlement", "disburse"].includes(userStatus)) {
      redirectUser();
    } else if ("merchant_eval") {
      getApprovedLimit();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userStatus]);

  useEffect(() => {
    let analyticData = {
      Event: analyticsData.VISITED_SCREEN,
      "Screen Name": analyticsData.XIAOMI_WAITLIST_SCREEN,
    };
    if (userStatus === "loan_agreement") {
      getLoanAgreementDetails();
    } else if (userStatus === "disburse_amount") {
      getSecretCode();
    }
    useAnalytics(analyticData);
    getUserDetail();
    getProductStates();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const refreshStatus = () => {
    if (callM2PAPI) {
      M2PAPI();
    } else {
      getProductStates();
    }
  };

  return (
    <Fragment>
      {isloading ? (
        <div className="loader">
          <div className="lds-dual-ring"></div>
          <center>
            <p>Hold Back and Relax we are processing your request...</p>
          </center>
        </div>
      ) : userStatus == "doc_upload" ? (
        <UploadDocuments
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          userProfile={userProfile}
        />
      ) : userStatus == "card_printing" &&
        selectedProduct == "redcarpet_xiaomi_customer" ? (
        <CardPrinting
          phone={phone}
          accessToken={accessToken}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          redirectUser={redirectUser}
        />
      ) : (userStatus == "card_dispatch" || userStatus == "card_activate") &&
        selectedProduct == "redcarpet_xiaomi_customer" ? (
        <CardTracking
          phone={phone}
          accessToken={accessToken}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          userProductId={userProductId}
          redirectUser={redirectUser}
        />
      ) : userStatus == "loan_agreement" &&
        !isloading &&
        loanAgreementDetails &&
        selectedProduct === "redcarpet_xiaomi_customer" ? (
        <CardIssuedWrapper>
          {showConfirmationScreen ? (
            <div className="confirmation">
              <Text
                style={{ fontFamily: "MiClock" }}
                content={"Are you sure ?"}
              />
              <div className="confirmation-buttons">
                <Button
                  style={{ backgroundColor: "#00d88d" }}
                  title="Yes"
                  onClick={() => declineLoanAgreement()}
                />
                <Button
                  style={{ backgroundColor: "#00d88d" }}
                  title="No"
                  onClick={() => setShowConfirmationScreen(false)}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">Loan Agreement</div>
              </div>
              <div style={{ padding: "5%" }}>
                <div className="loan-agreement-description">
                  <ul>
                    <li>
                      <b>Down Payment : </b>{" "}
                      {loanAgreementDetails.data.down_payment}
                    </li>
                    <li>
                      <b>IMEI Number : </b>{" "}
                      {loanAgreementDetails.data.imei_number}
                    </li>
                    <li>
                      <b>Interest Rate : </b>{" "}
                      {loanAgreementDetails.data.interest_rate}%
                    </li>
                    <li>
                      <b>Monthly Installment : </b>{" "}
                      {loanAgreementDetails.data.monthly_instalment}
                    </li>
                    <li>
                      <b>Product Name : </b>{" "}
                      {loanAgreementDetails.data.product_name}
                    </li>
                    <li>
                      <b>Product Price : </b>{" "}
                      {loanAgreementDetails.data.product_price}
                    </li>
                    <li>
                      <b>Tenure : </b> {loanAgreementDetails.data.tenure}
                    </li>
                    <li>
                      <b>Total Amount : </b>{" "}
                      {loanAgreementDetails.data.total_amount}
                    </li>
                  </ul>
                </div>
                <div className="check-flex-section">
                  <div className="flex-checkbox">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onClick={() => setIsChecked(!isChecked)}
                    />
                  </div>
                  <div className="flex-content">
                    <p>
                      I confirm that I have read the above terms of agreement
                      and understand that in case of any default of loan payment
                      legal and criminal action can be taken against me as per
                      Indian Contract Act 1872 and IPC Section 138.
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <AnchorLink href="#scroll-up">
                    <Button
                      style={{
                        backgroundColor: "#00d88d",
                        borderRadius: "0.4rem",
                        marginBottom: "5%",
                        marginRight: "5%",
                      }}
                      title="Accept"
                      onClick={() => approveLoanAgreement()}
                    />
                  </AnchorLink>
                  <AnchorLink href="#scroll-up">
                    <Button
                      style={{
                        backgroundColor: "#00d88d",
                        borderRadius: "0.4rem",
                        marginBottom: "5%",
                      }}
                      title="Decline"
                      onClick={() => setShowConfirmationScreen(true)}
                    />
                  </AnchorLink>
                </div>
              </div>
            </>
          )}
        </CardIssuedWrapper>
      ) : userStatus === "disburse_amount" &&
        !isloading &&
        secretCode &&
        selectedProduct === "redcarpet_xiaomi_customer" ? (
        <CardIssuedWrapper>
          <div className="row-left">
            <div className="col30">
              <hr className="line" />
            </div>
            <div className="col70">Secret Pin</div>
          </div>
          <div
            className="secret-code"
            style={{
              fontSize: "1.2rem",
              margin: "50px",
              fontStyle: "Italic",
              textAlign: "center",
            }}
          >
            Your secret pin is displayed below. Please ask the merchant to enter
            this secret pin in their screen.
            <p>
              <b>{secretCode}</b>
            </p>
            <Button
              style={{
                backgroundColor: "#00d88d",
                borderRadius: "0.4rem",
                marginBottom: "25px",
                marginTop: "25px",
              }}
              title="Check Status"
              onClick={() => refreshStatus()}
            />
          </div>
        </CardIssuedWrapper>
      ) : userStatus === "rejects" &&
        selectedProduct === "redcarpet_xiaomi_customer" ? (
        <CardIssuedWrapper>
          <div className="row-left">
            <div className="col30">
              <hr className="line" />
            </div>
            <div className="col70">Application Rejected</div>
          </div>
          <div class="row">
            <div style={{ margin: "20px 0 0px 0" }}>
              <Image
                src={`/images/user_rejects_xiaomi.svg`}
                alt="Application Rejected"
                height={300}
                width={300}
              />
            </div>
            <h4>
              <span className="cong-reject">We are sorry!</span>{" "}
              <span className="user-name-reject">{userName}</span>
            </h4>
            <p className="reject-message">
              We regret to inform you that your application has been rejected.
            </p>
          </div>
        </CardIssuedWrapper>
      ) : (
        <CardIssuedWrapper>
          <div className="row-left">
            <div className="col30">
              <hr className="line" />
            </div>
            <div className="col70">Application Submitted</div>
          </div>
          {["merchant_eval"].includes(userStatus) && (
            <center>
              <img src={Celebrate} style={{ marginTop: "5%" }} />
            </center>
          )}
          <div class="row">
            <h4>
              <span className="cong">Congratulations</span>{" "}
              <span className="user-name">{userName}</span>
            </h4>
            {["merchant_eval"].includes(userStatus) &&
              !isloading &&
              approvvedLimit !== null && (
                <p style={{ marginBottom: "3%", marginTop: 0 }}>
                  Congratulations, your approved limit is {approvvedLimit}
                </p>
              )}
            <p style={{ marginBottom: "5%", marginTop: 0 }}>
              Waiting For Merchant's Action
            </p>
            <Button
              style={{
                backgroundColor: "#00d88d",
                borderRadius: "0.4rem",
                marginBottom: "5%",
              }}
              title="Refresh Status"
              onClick={() => refreshStatus()}
            />
          </div>
        </CardIssuedWrapper>
      )}
    </Fragment>
  );
};

export default CardIssued;
