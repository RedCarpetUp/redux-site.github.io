import React from "react";
import moment from "moment";
import { callApi } from "common/utils/loginMiddleware";
import { useState, useEffect } from "react";

import { useNotification } from "common/hooks/useNotification";

const RebelUnbilledStatements = ({ phone, accessToken, loanId }) => {
  const [unbilledStatements, setUnbilledStatements] = useState();
  const [loading, setLoading] = useState();
  const notify = useNotification();

  const getData = async () => {
    try {
      setLoading(true);
      let response = await callApi(
        "/get_statement/" + loanId,
        "GET",
        {
          source: "ledger",
          product_type: "rebel",
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        setLoading(false);
        setUnbilledStatements(
          response.unbilled_card_txns_data.unbilled_card_txns
        );
      } else {
        setLoading(false);
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      setLoading(false);
      notify({ message: error.message, type: "error" });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderUnbilledStatements = () => {
    if (unbilledStatements) {
      return (
        <div className="text-center">
          {unbilledStatements.length !== 0 ? (
            <div className="row">
              {unbilledStatements.map((t, index) => {
                return (
                  <>
                    <div className={"col33"}>
                      <small>
                        {moment(t.agreement_date).format("MMM Do YYYY")}
                      </small>
                    </div>
                    <div className={"col33"}>
                      <small>{t.source}</small>
                    </div>
                    <div className={"col33"}>
                      <small>{t.product_price}</small>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <div>
              <h5 style={{ margin: 0 }}>No Unbilled Transactions</h5>
            </div>
          )}
        </div>
      );
    } else {
      <div>
        <h5>No Unbilled Transactions</h5>
      </div>;
    }
  };
  return (
    <div className={"smartCardWrapper"}>
      {loading ? "Loading please wait..." : renderUnbilledStatements()}
    </div>
  );
};

export default RebelUnbilledStatements;
