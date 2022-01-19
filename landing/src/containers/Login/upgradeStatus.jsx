import React from "react";

const UpgradeStatus = (props) => {
  const displayRequestedUpgrade = () => {
    return (
      <div className={"pcardWrapper"}>
        <div className={"card"}>
          <div className="row">
            <div className={"col100"}>
              <h6 className="text-center">
                Your request to Increase your Card Limit is been accepted, The
                result will be reflected in the App and it may take upto 8 hours
                for that.
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={"cardBody"}
      style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
    >
      {props.requested_upgrade && !props.upgrade_complete ? (
        <div>
          {displayRequestedUpgrade(
            "Your request to Increase your Card Limit is been accepted, The result will be reflected in the App and it may take upto 8 hours for that."
          )}
        </div>
      ) : props.days_since_upgrade == 0 ? (
        <div>
          {displayRequestedUpgrade("Your Card Limit is Upgraded, Enjoy!")}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UpgradeStatus;
