import React from "react";
import moment from "moment";

const RebelBilledStatements = ({ billedStatements }) => {
  const renderBilledStatements = () => {
    if (billedStatements) {
      return (
        <div className="text-center">
          {billedStatements.length !== 0 ? (
            <div className="row">
              {billedStatements.map((t, index) => {
                return (
                  <>
                    <div className={"col33"}>
                      <small>{moment(t.date).format("MMM Do YYYY")}</small>
                    </div>
                    <div className={"col33"}>
                      <small>{t.description}</small>
                    </div>
                    <div className={"col33"}>
                      <small>{t.amount}</small>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <div>
              <h5>No Billed Transactions</h5>
            </div>
          )}
        </div>
      );
    }
  };

  return <div className={"smartCardWrapper"}>{renderBilledStatements()}</div>;
};

export default RebelBilledStatements;
