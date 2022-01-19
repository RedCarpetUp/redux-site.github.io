import React, { useState, useEffect, Fragment } from "react";
import Button from "common/components/Button";

import AddUpdateAddress from "./AddUpdateAddress";

import AnchorLink from "react-anchor-link-smooth-scroll";

import AddUpdateAddressWrapper from "./styles";
import CardExpire from "./CardExpire";

const CardMigrate = ({ phone, accessToken, migrationData, isMigration }) => {
  const [confirmAddress, setConfirmAddress] = useState(false);
  var d1 = migrationData.expiry_date;
  var d2 = new Date().toISOString().split("T")[0];
  d1 = new Date(d1);
  d2 = new Date(d2);
  var days = (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
  const daysInWordforExpiry = (noOfDays) => {
    switch (true) {
      case noOfDays < 0:
        return `has been deactivated ${Math.abs(noOfDays)} ${
          Math.abs(noOfDays) > 1 ? `days` : `day`
        } ago`;
        break;

      case noOfDays == 0:
        return "will be deactivated today";
        break;

      case noOfDays == 1:
        return `will be deactivated in ${noOfDays} day`;
        break;

      case noOfDays > 1:
        return `will be deactivated in ${noOfDays} days`;
        break;

      default:
        return `will be deactivated soon`;
        break;
    }
  };
  return (
    <Fragment>
      {confirmAddress ? (
        <AddUpdateAddress
          phone={phone}
          accessToken={accessToken}
          migrationData={migrationData}
          isMigration={isMigration}
        />
      ) : days < 1 ? (
        <CardExpire
          phone={phone}
          accessToken={accessToken}
          migrationData={migrationData}
          isMigration={isMigration}
        />
      ) : (
        <div>
          <AddUpdateAddressWrapper>
            <Fragment>
              <div className={"pcardWrapper"}>
                <div style={{ margin: "3%" }}>
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
                      alignItems: "center",
                    }}
                  >
                    <h2>
                      Your existing card ending with {migrationData.last_digits}{" "}
                      {daysInWordforExpiry(days)}.
                    </h2>
                    <h3>
                      We will be issuing a new card <b>free of cost</b> to you
                      and there will be no change to your existing credit limit.
                    </h3>
                    {migrationData.aadhar_needed ||
                    migrationData.pan_needed ||
                    migrationData.address_update_needed ? (
                      <h3>
                        We need you to update the following information so that
                        we can issue the new card
                      </h3>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row-left">
                    {migrationData.address_update_needed ? (
                      <h3 style={{ margin: 0 }}>
                        &bull; Update your current address
                      </h3>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row-left" style={{ margin: 0 }}>
                    {migrationData.aadhar_needed || migrationData.pan_needed ? (
                      <h3 style={{ margin: 0 }}>&bull; Update your KYC</h3>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="row" style={{ marginTop: "3%" }}>
                    <Button
                      className="btn"
                      onClick={() => {
                        setConfirmAddress(true);
                      }}
                      title="Update Now"
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          </AddUpdateAddressWrapper>
        </div>
      )}
    </Fragment>
  );
};

export default CardMigrate;
