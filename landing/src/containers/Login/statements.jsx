import React, { Fragment } from "react";
import styled from "styled-components";
import {
  Accordion,
  AccordionBody,
  AccordionItem,
  AccordionTitle,
  CloseIcon,
  IconWrapper,
  OpenIcon,
} from "common/components/Accordion";
import { Icon } from "react-icons-kit";
import { ic_keyboard_arrow_down } from "react-icons-kit/md/ic_keyboard_arrow_down";
import { ic_keyboard_arrow_up } from "react-icons-kit/md/ic_keyboard_arrow_up";
import moment from "moment";

const TransactionTable = styled.div`
  white-space:nowrap;
  @media only screen and (max-width: 505px) {
    font-size:14px;
  }
  @media only screen and (max-width: 455px) {
    font-size:13px;
    white-space:normal;
  }
  @media only screen and (max-width: 1269px) {
    text-align:center;
  }
  @media only screen and (min-width: 1269px) {
    text-align:center;
  }
  @media only screen and (min-width: 1200px)and (max-width:1808px) {
    font-size:18px;
  }
}`;

const TitleBar = styled.div`
white-space:nowrap;
  color:grey;
  font-weight: 550;
  @media only screen and (max-width: 455px) {
    font-size:11px;
  }
  @media only screen and (min-width: 455px) and (max-width: 653px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 430px) {
    font-size:8px;
  }
  @media only screen and (max-width: 345px) {
    font-size:7px;
  }
  @media only screen and (max-width: 430px) {
    font-size:8px;
  }
  @media only screen and (max-width: 345px) {
    font-size:7px;
  }
  @media only screen and (max-width: 345px) {
    font-size:7px;
  }
  @media only screen and (min-width: 1200px) {
    font-weight:bold;
  }
  @media only screen and (min-width: 1200px) and (max-width:1808px){
    font-size:14px;
  }
}`;

const TableTitle = () => {
  return (
    <TitleBar>
      <div className="row text-left">
        <div style={{ textAlign: "left" }} className={"col25"}>
          Date
        </div>
        <div style={{ textAlign: "center" }} className={"col25"}>
          Details
        </div>
        <div style={{ textAlign: "center" }} className={"col25"}>
          Amount
        </div>
        <div style={{ textAlign: "right" }} className={"col25"}>
          Outstanding Amount
        </div>
      </div>
    </TitleBar>
  );
};
const Statements = ({ statements }) => {
  const renderStatements = () => {
    return Object.keys(statements).map((loanId) => {
      if (statements[loanId] && statements[loanId].length > 0) {
        return (
          <Accordion>
            <Fragment>
              <AccordionItem key={`accordion-key--${loanId}`}>
                <Fragment>
                  <AccordionTitle>
                    <Fragment>
                      <h2
                        style={{
                          fontSize: "15px",
                          fontStyle: "italic",
                          color: "rgb(79, 83, 98)",
                          textAlign: "left",
                        }}
                      >{`Loan ID : ${loanId}`}</h2>
                      <IconWrapper className="icon-wrapper">
                        <OpenIcon>
                          <Icon icon={ic_keyboard_arrow_up} size={18} />
                        </OpenIcon>
                        <CloseIcon>
                          <Icon icon={ic_keyboard_arrow_down} size={18} />
                        </CloseIcon>
                      </IconWrapper>
                    </Fragment>
                  </AccordionTitle>
                  {/* Transaction Table titles */}
                  <AccordionBody>
                    <TableTitle />
                  </AccordionBody>
                  {statements[loanId].map((s, index) => {
                    return (
                      //Transaction Table Details
                      <AccordionBody>
                        <TransactionTable>
                          <br />
                          <div key={index} className="row text-left">
                            <div
                              style={{ textAlign: "left" }}
                              className={"col25"}
                            >
                              {s.amount_title && <h1>{s.amount_title}</h1>}
                              <small>
                                {moment(s.date).format("MMM Do YYYY")}
                              </small>
                            </div>
                            <div className={"col25"}>
                              <small>{s.description}</small>
                            </div>
                            <div className={"col25"}>
                              <small>₹{s.amount}</small>
                              {s.transactions && s.transactions.length !== 0 ? (
                                <i
                                  style={{ paddingLeft: "0.5rem" }}
                                  className="fa fa-caret-down"
                                ></i>
                              ) : (
                                ""
                              )}
                            </div>
                            <div
                              style={{ textAlign: "right" }}
                              className={"col25"}
                            >
                              <div>₹{s.balance}</div>
                            </div>
                          </div>
                        </TransactionTable>
                      </AccordionBody>
                    );
                  })}
                </Fragment>
              </AccordionItem>
            </Fragment>
          </Accordion>
        );
      } else if (statements[loanId] && statements[loanId].length === 0) {
        return (
          <div>
            <TableTitle />
            <br />
            <br />
            <br />
            <div style={{ textAlign: "center" }}>No Transactions</div>
            <br />
          </div>
        );
      } else {
        return <h4 style={{ textAlign: "center" }}>No Statements Found</h4>;
      }
    });
  };

  return <div className={"smartCardWrapper"}>{renderStatements()}</div>;
};

export default Statements;
