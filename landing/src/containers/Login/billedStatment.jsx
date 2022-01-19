import React, { useState, Fragment, useEffect } from "react";
import { chevronRight } from "react-icons-kit/feather/chevronRight";
import { chevronDown } from "react-icons-kit/feather/chevronDown";
import Icon from "react-icons-kit";
import moment from "moment";

const BilledStatement = ({ statement, id }) => {
  const [viewEmiDetail, setViewEmiDetail] = useState(false);
  const [ico, setIco] = useState(chevronRight);
  const [buttonState, setButtonState] = useState(true);

  const showEmiDetails = () => {
    if (viewEmiDetail) {
      setViewEmiDetail(false);
      setIco(chevronRight);
    } else {
      setViewEmiDetail(true);
      setIco(chevronDown);
    }
  };

  return (
    <Fragment id="pay">
      <div className="card">
        <div
          className="row-emi"
          style={{ cursor: "pointer" }}
          onClick={() => showEmiDetails()}
        >
          <div className="col50-left">
            <p>
              Description:{" "}
              <span style={{ color: "#dd285d" }}>{statement.description}</span>{" "}
            </p>
            <h4 style={{ margin: 0 }}>
              Amount:{" "}
              <span style={{ color: "#dd285d" }}>₹{statement.amount}</span>
            </h4>
            <h4 style={{ margin: "10px 0px" }}>
              Date:{" "}
              <span style={{ color: "#dd285d" }}>
                {moment(statement.date).format("Do MMM, YYYY")}
              </span>
            </h4>
          </div>
          <div className="col50-right">
            <Icon icon={ico} />
          </div>
        </div>
        {viewEmiDetail ? (
          <div className="text-center">
            <hr />
            {statement.transactions.length > 0 ? (
              <div className="row">
                <div
                  className={"col50"}
                  style={{ width: "65%", color: "#dd285d", fontWeight: "bold" }}
                >
                  Description
                </div>
                <div
                  className={"col33"}
                  style={{ color: "#dd285d", fontWeight: "bold" }}
                >
                  Amount
                </div>
                {statement.transactions.map((t, index) => {
                  return (
                    <>
                      <div
                        className={"col50"}
                        style={{ width: "65%", marginTop: 5 }}
                      >
                        <small>{t.description}</small>
                      </div>
                      <div className={"col33"} style={{ marginTop: 5 }}>
                        <small>₹ {t.amount}</small>
                      </div>
                    </>
                  );
                })}
              </div>
            ) : (
              "No details available"
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

export default BilledStatement;
