import React, { useEffect, useState } from "react";
import moment from "moment";

const LoanSchedule = ({ emis }) => {
  const renderLoanSchedule = () => {
    return (
      <div>
        <div className="row text-center" style={{ fontWeight: "bold" }}>
          <div className={"col5"}>
            <small>{"S. No."}</small>
          </div>
          <div className={"col30"}>
            <small>{"Due Date"}</small>
          </div>
          <div className={"col16"}>
            <small>{"Due Amount"}</small>
          </div>
          <div className={"col16"}>
            <small>{"Interest"}</small>
          </div>
          <div className={"col16"}>
            <small>{"Total"}</small>
          </div>
          <div className={"col16"}>
            <small>{"Limit Unlocked"}</small>
          </div>
        </div>
        <br />
        {emis
          ? emis.map((emi, index) => {
              return (
                <div key={index} className="row text-center">
                  <div className={"col5"}>
                    <small>{emi.emi_number}</small>
                  </div>
                  <div className={"col30"}>
                    <small>{emi.due_date}</small>
                  </div>
                  <div className={"col16"}>
                    <small>₹{emi.due_amount}</small>
                  </div>
                  <div className={"col16"}>
                    <small>₹{emi.interest}</small>
                  </div>
                  <div className={"col16"}>
                    <small>₹{emi.total_due_amount}</small>
                  </div>
                  <div className={"col16"}>
                    <small>₹{emi.limit_unlocked}</small>
                  </div>
                  {index < emis.length ? <hr className="line" /> : ""}
                </div>
              );
            })
          : ""}
      </div>
    );
  };

  return <div className={"smartCardWrapperLoan"}>{renderLoanSchedule()}</div>;
};

export default LoanSchedule;
