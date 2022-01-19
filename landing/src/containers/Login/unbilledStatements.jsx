import React, { Fragment } from "react";
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

const UnbilledStatements = ({ unbilledStatements }) => {
  const renderUnbilledStatements = () => {
    return Object.keys(unbilledStatements).map((loanId) => {
      if (unbilledStatements[loanId]) {
        return (
          <Accordion>
            <Fragment>
              <AccordionItem key={`accordion-key--${loanId}`}>
                <Fragment>
                  <div className="text-center">
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
                    <AccordionBody>
                      <b>Unbilled Amount:</b> ₹
                      {unbilledStatements[loanId].unbilled_amount}
                      {unbilledStatements[loanId].unbilled_card_txns.length !==
                      0 ? (
                        <div className="row">
                          {unbilledStatements[loanId].unbilled_card_txns.map(
                            (t, index) => {
                              return (
                                <>
                                  <div className={"col33"}>
                                    <small>
                                      {moment(t.agreement_date).format(
                                        "MMM Do YYYY"
                                      )}
                                    </small>
                                  </div>
                                  <div className={"col33"}>
                                    <small>{t.product_name}</small>
                                  </div>
                                  <div className={"col33"}>
                                    <small>{t.product_price}</small>
                                  </div>
                                </>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <div>
                          <h5>No Unbilled Statements</h5>
                        </div>
                      )}
                    </AccordionBody>
                  </div>
                </Fragment>
              </AccordionItem>
            </Fragment>
          </Accordion>
        );
      }
    });
  };

  return <div className={"smartCardWrapper"}>{renderUnbilledStatements()}</div>;
};

export default UnbilledStatements;
