import React, { useState, useEffect, Fragment } from "react";
import Button from "common/components/Button";

import AddUpdateAddress from "./AddUpdateAddress";

import AnchorLink from "react-anchor-link-smooth-scroll";

import AddUpdateAddressWrapper from "./styles";

const CardNowReplace = ({ phone, accessToken, migrationData, isMigration }) => {
  const [issueDate, setIssueDate] = useState();
  const [issueDatePhysical, setIssueDatePhysical] = useState();
  const [expiryDate, setExpiryDate] = useState();
  useEffect(() => {
    var d1 = migrationData.issue_date;
    var d2 = new Date().toISOString().split("T")[0];
    d1 = new Date(d1);
    d2 = new Date(d2);
    var days1 = (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
    setIssueDate(days1);
    if (migrationData.card_type == "Physical") {
      var d3 = migrationData.issue_date_physical;
      var d4 = new Date().toISOString().split("T")[0];
      d3 = new Date(d3);
      d4 = new Date(d4);
      var days2 = (d3.getTime() - d4.getTime()) / (1000 * 60 * 60 * 24);
      setIssueDatePhysical(days2);
    }
    var d5 = migrationData.expiry_date;
    var d6 = new Date().toISOString().split("T")[0];
    d5 = new Date(d5);
    d6 = new Date(d6);
    var days3 = (d5.getTime() - d6.getTime()) / (1000 * 60 * 60 * 24);
    setExpiryDate(days3);
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

  const daysInWordForVirtual = (noOfDays) => {
    switch (true) {
      case noOfDays < 0:
        return "soon";
        break;

      case noOfDays == 0:
        return "today";
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
                <h1>Your card will be replaced</h1>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2>
                Thank you for updating your information. We are processing this
                and will be replacing your card{" "}
                {daysInWordForVirtual(issueDate)}.
              </h2>
              {migrationData.card_type == "Physical" ? (
                <h3 style={{ marginTop: 5 }}>
                  Your physical card will be printed and delivered to you{" "}
                  {daysInWordForPhysical(issueDatePhysical)}.
                </h3>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </AddUpdateAddressWrapper>
    </Fragment>
  );
};

export default CardNowReplace;
