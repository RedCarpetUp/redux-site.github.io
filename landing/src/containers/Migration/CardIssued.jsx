import React, { useState, useEffect, Fragment } from "react";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";

import AddUpdateAddress from "./AddUpdateAddress";

import AnchorLink from "react-anchor-link-smooth-scroll";
import { useNotification } from "common/hooks/useNotification";

import AddUpdateAddressWrapper from "./styles";
import CardReplace from "./CardReplace";
import CardNowIssued from "./CardNowIssued";
const CardIssued = ({ phone, accessToken, migrationData, isMigration }) => {
  const [kycComplete, setKycComplete] = useState(false);
  const [cardIssued, setCardIssued] = useState(false);
  const [cardNowIssued, setCardNowIssued] = useState(false);
  const [issueDatePhysical, setIssueDatePhysical] = useState();
  const notify = useNotification();
  useEffect(() => {
    if (migrationData.card_type == "Physical") {
      var d1 = migrationData.issue_date_physical;
      var d2 = new Date().toISOString().split("T")[0];
      d1 = new Date(d1);
      d2 = new Date(d2);
      var days = (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
      setIssueDatePhysical(days);
    }
  });

  const getUserProfile = async () => {
    try {
      let response = await callApi(
        "/get_new_user_profile",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result === "success") {
        if (response.user.migration_experiment_data.card_issued == true) {
          setCardIssued(true);
        }
      }
      if (response.result === "error") {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  const updateKyc = async () => {
    try {
      let response = await callApi(
        "/mark_kyc_complete_migrate",
        "POST",
        { is_kyc_completed: "true" },
        phone,
        accessToken
      );
      if (response.result == "success") {
        setKycComplete(true);
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };
  useEffect(() => {
    updateKyc();
    getUserProfile();
  }, []);

  const handleCardIssued = () => {
    setCardNowIssued(true);
  };

  const renderCardNowIssued = () => {
    return (
      <CardNowIssued
        phone={phone}
        accessToken={accessToken}
        migrationData={migrationData}
        isMigration={isMigration}
      />
    );
  };

  const daysInWordForPhysical = (noOfDays) => {
    switch (true) {
      case noOfDays < 0:
        return "soon";
        break;

      case noOfDays == 0:
        return "by today";
        break;

      case noOfDays == 1:
        return `in ${noOfDays} day`;
        break;

      case noOfDays > 1:
        return `in ${noOfDays} days`;
        break;

      default:
        return `soon`;
        break;
    }
  };

  return (
    <Fragment>
      <AddUpdateAddressWrapper>
        {cardNowIssued ? (
          renderCardNowIssued()
        ) : cardIssued && kycComplete ? (
          <div className={"pcardWrapper"}>
            <div style={{ margin: "3%", marginBottom: "5%" }}>
              {" "}
              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">
                  <h1>Your card is now replaced</h1>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2>
                  Thank you for updating your information. We have deactivated
                  your existing card and issued you a new card.
                </h2>
                <h3>
                  There is no change to your existing credit limit. You can
                  start using your virtual card immediately.
                </h3>
                {migrationData.card_type == "Physical" ? (
                  <h3 style={{ marginTop: 5 }}>
                    Your physical card will be printed and delivered to you{" "}
                    {daysInWordForPhysical(issueDatePhysical)}.
                  </h3>
                ) : (
                  ""
                )}
                <div className="row">
                  <AnchorLink href="#scroll-up" className="scroll-btn">
                    <Button
                      className="btn"
                      title="Continue"
                      onClick={() => handleCardIssued()}
                    />
                  </AnchorLink>
                </div>
              </div>
            </div>
          </div>
        ) : !cardIssued && kycComplete ? (
          <CardReplace
            phone={phone}
            accessToken={accessToken}
            migrationData={migrationData}
            isMigration={isMigration}
          />
        ) : (
          ""
        )}
      </AddUpdateAddressWrapper>
    </Fragment>
  );
};

export default CardIssued;
