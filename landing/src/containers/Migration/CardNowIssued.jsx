import React, { useState, useEffect, Fragment } from "react";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";

import AddUpdateAddress from "./AddUpdateAddress";

import AnchorLink from "react-anchor-link-smooth-scroll";

import AddUpdateAddressWrapper from "./styles";
import CardReplace from "./CardReplace";
const CardNowIssued = ({ phone, accessToken, migrationData, isMigration }) => {
  const [kycComplete, setKycComplete] = useState(false);
  const [cardIssued, setCardIssued] = useState(false);
  const [issueDatePhysical, setIssueDatePhysical] = useState();
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
        <div className={"pcardWrapper"}>
          <div style={{ margin: "3%", marginBottom: "5%" }}>
            {" "}
            <div className="row-left">
              <div className="col30">
                <hr className="line" />
              </div>
              <div className="col70">
                <h1>Your card is replaced</h1>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2>
                You can start using your virtual card immediately. Your physical
                card will be printed and delivered to you{" "}
                {daysInWordForPhysical(issueDatePhysical)}.
              </h2>
            </div>
          </div>
        </div>
      </AddUpdateAddressWrapper>
    </Fragment>
  );
};

export default CardNowIssued;
