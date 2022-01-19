import React, { useState, useEffect } from "react";
import moment from "moment";

import Icon from "react-icons-kit";
import { info } from "react-icons-kit/feather/info";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import { id } from "date-fns/locale";
import { useNotification } from "common/hooks/useNotification";

const EmiConversion = ({ toggle, phone, accessToken, loanId, productId }) => {
  const [txn, setTxn] = useState([]);
  const [configData, setConfigData] = useState([]);
  const [fee, setFee] = useState();
  const [screen, setScreen] = useState(1);
  const [selections, setSelections] = useState("");
  const [variationId, setVariationId] = useState("");
  const [txnSelections, setTxnSelections] = useState("");
  const [unbilledStatements, setUnbilledStatements] = useState();
  const [loading, setLoading] = useState(false);
  const [txnAmount, setTxnAmount] = useState(0);
  const notify = useNotification();

  const getData = async () => {
    setLoading(true);
    try {
      let response2 = await callApi(
        "/get_statement/" + loanId,
        "GET",
        {
          source: "ledger",
          product_type: "rebel",
        },
        phone,
        accessToken
      );
      if (response2.result === "success") {
        setLoading(false);
        let v1 = [];
        setUnbilledStatements(
          response2.unbilled_card_txns_data.unbilled_card_txns
        );
        response2.unbilled_card_txns_data.unbilled_card_txns.map(
          (variation, id) => {
            v1[id] = false;
          }
        );
        setTxnSelections(v1);

        setLoading(true);
        let response = await callApi(
          "/get_transaction_to_loan_config",
          "GET",
          {
            user_product_id: productId,
          },
          phone,
          accessToken
        );

        if (response.result == "success") {
          setLoading(false);
          let v = [];
          setFee(response.data.fee);
          setConfigData(response.data.tenure_and_rates);
          response.data.tenure_and_rates.map((variation, id) => {
            v[id] = false;
          });
          setSelections(v);
        } else {
          setLoading(false);
          notify({ message: response.message, type: "error" });
        }
      } else {
        setLoading(false);
        notify({ message: response2.message, type: "error" });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  const setTxnsChecked = () => {
    let v = [];
    unbilledStatements.map((variation, id) => {
      v[id] = false;
    });
    setTxnSelections(v);
  };

  useEffect(() => {
    getData();
  }, []);

  const setChecked = (transaction, index) => {
    let txns = [...txn];
    let amount = txnAmount;
    if (document.getElementById(index).checked == true) {
      txns.push(transaction.id);
      txnSelections[index] = true;
      amount = amount + transaction.product_price;
    } else {
      txns = txns.filter((item) => item !== transaction.id);
      txnSelections[index] = false;
      amount = amount - transaction.product_price;
    }
    setTxn(txns);
    setTxnAmount(amount);
  };

  const handleContinue = () => {
    if (txn.length < 1) {
      return notify({
        message: "Please select atleast one transaction",
        type: "error",
      });
    } else {
      setScreen(2);
    }
  };

  const choosePlan = (id, identifier) => {
    setVariationId(identifier);
    for (let i = 0; i < selections.length; i++) {
      if (i == id) {
        selections[i] = true;
      } else {
        selections[i] = false;
      }
    }
  };

  const handleSubmit = async () => {
    try {
      let response = await callApi(
        "/transaction_to_loan",
        "POST",
        {
          transaction_ids: txn,
          tenure: variationId.tenure,
          interest_rate: variationId.interest_rate,
          fee: fee,
          user_product_id: productId,
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        toggle();
        notify({
          message: `Transactions converted into emi's successfully`,
          type: "success",
        });
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      return notify({ message: error.message, type: "error" });
    }
  };

  const renderUnbilledStatements = () => {
    if (unbilledStatements) {
      return (
        <div className="text-center">
          {unbilledStatements.length !== 0 ? (
            screen == 1 ? (
              <div className="row">
                {unbilledStatements.map((t, index) => {
                  return (
                    <>
                      <label className="row" style={{ marginBottom: "2%" }}>
                        <input
                          type="checkbox"
                          style={{ marginRight: "2%" }}
                          onChange={() => setChecked(t, index)}
                          id={index}
                          checked={txnSelections[index] == true ? true : false}
                        />
                        <div className={"col25"}>
                          <small>
                            {moment(t.agreement_date).format("MMM Do YYYY")}
                          </small>
                        </div>
                        <div className={"col25"}>
                          <small>{t.source}</small>
                        </div>
                        <div className={"col25"}>
                          <small>{t.product_price}</small>
                        </div>
                      </label>
                    </>
                  );
                })}
                <span className="inputPayCombo-note">
                  <div
                    className="note-black"
                    style={{ display: "inline-block" }}
                  >
                    <Icon icon={info} />
                  </div>

                  <span className="note-txt">
                    Convert any transaction(s) to emi with just a click
                  </span>
                </span>
                <Button
                  title="Continue"
                  className="btn"
                  onClick={() => {
                    handleContinue();
                  }}
                />
              </div>
            ) : (
              <div className="row">
                {configData.map((t, index) => {
                  return (
                    <div
                      className={selections[index] ? "card-green" : "card"}
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        margin: 10,
                        padding: 15,
                      }}
                      onClick={() => choosePlan(index, t)}
                    >
                      <div className={"col50-left"}>
                        <small>Total Amount: ₹ {txnAmount}</small>
                      </div>
                      <div className={"col50-left"}>
                        <small>Fee: ₹ {fee}</small>
                      </div>
                      <div className={"col50-left"}>
                        <small>
                          Interest Rate: {t.interest_rate}% per month
                        </small>
                      </div>
                      <div className={"col50-left"}>
                        <small>Tenure: {t.tenure} months</small>
                      </div>
                    </div>
                  );
                })}

                <Button
                  title="Confirm"
                  className="btn"
                  onClick={() => {
                    handleSubmit();
                  }}
                  style={{ padding: 0, marginTop: 10 }}
                />
                <Button
                  title="Back"
                  className="btn"
                  onClick={() => {
                    setScreen(1);
                  }}
                  style={{ padding: 0, marginTop: 10 }}
                />
              </div>
            )
          ) : (
            <div>
              <h5 style={{ margin: 0 }}>
                No Unbilled Transactions to convert to EMI
              </h5>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className={"smartCardWrapper"}>
      {loading ? "Loading please wait..." : renderUnbilledStatements()}
    </div>
  );
};

export default EmiConversion;
