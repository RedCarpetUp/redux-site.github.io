import React, { useState, useEffect, Fragment } from "react";
import Button from "common/components/Button";
import AddUpdateAddress from "./AddUpdateAddress";

import AnchorLink from "react-anchor-link-smooth-scroll";
import AddUpdateAddressWrapper from "./styles";
import CardNowReplace from "./CardNowReplace";

const CardReplace = ({ phone, accessToken, migrationData, isMigration }) => {
  const [cardNowReplace, setCardNowReplace] = useState(false);
  const [issueDate, setIssueDate] = useState();
  const [issueDatePhysical, setIssueDatePhysical] = useState();
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
  });

  const handleCardNowReplace = () => {
    setCardNowReplace(true);
  };
  const renderCardNowReplace = () => {
    return (
      <CardNowReplace
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
        {cardNowReplace ? (
          renderCardNowReplace()
        ) : (
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
                  Thank you for updating your information. We are processing
                  this and will be replacing your card{" "}
                  {daysInWordForVirtual(issueDate)}.
                </h2>
                <h3>
                  We will be issuing a new card <b>free of cost</b> to you and
                  there will be no change to your existing credit limit
                </h3>
                <h3>Your new card will be issued as follows</h3>
                <h4 style={{ margin: 0 }}>
                  &bull; Your virtual card will be issued{" "}
                  {daysInWordForVirtual(issueDate)}. We will send you
                  confirmation once issued. You can use your virtual card
                  immediately once issued
                </h4>
                {migrationData.card_type == "Physical" ? (
                  <h4 style={{ marginTop: 5 }}>
                    &bull; Your physical card will be printed and delivered to
                    you {daysInWordForPhysical(issueDatePhysical)}.
                  </h4>
                ) : (
                  ""
                )}
                <div className="row">
                  <AnchorLink href="#scroll-up" className="scroll-btn">
                    <Button
                      className="btn"
                      title="Continue"
                      onClick={() => handleCardNowReplace()}
                    />
                  </AnchorLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </AddUpdateAddressWrapper>
    </Fragment>
  );
};

export default CardReplace;
