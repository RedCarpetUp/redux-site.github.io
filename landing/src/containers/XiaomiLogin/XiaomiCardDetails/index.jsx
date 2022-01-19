import React, { useState, useEffect } from "react";

import { callApi } from "common/utils/loginMiddleware";
import {
  RebelCardWrapper,
  ResetCardWrapper,
} from "public/styles/miCredit.style";
import { useNotification } from "common/hooks/useNotification";
import RenderEmiDetail from "./renderEmiDetail";
import moment from "moment";

const XiaomiCardDetails = ({ phone, accessToken }) => {
  const notify = useNotification();
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [deviceInfoLoading, setDeviceInfoLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emis, setEmis] = useState([]);
  const [unpaidEmis, setUnpaidEmis] = useState([]);
  const [overdueEMI, setOverdueEMI] = useState([]);
  const [emiToPay, setEmiToPay] = useState([]);
  const [count, setCount] = useState("");
  const [emiStatus, setEmiStatus] = useState("");
  const [nextEMI, setNextEMI] = useState([]);
  const [loanId, setLoanId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [payment, setPayment] = useState(false);

  const getCardSchdule = async () => {
    setLoading(true);
    try {
      let response = await callApi(
        "/user_products_and_states/redcarpet_xiaomi_customer",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        setLoanId(response.data[0].loan_id);
        setProductId(response.data[0].user_product_id);
        const loan_id = response.data[0].loan_id;
        try {
          let response1 = await callApi(
            "/redcarpet_xiaomi_customer_card_schedule/" + loan_id,
            "GET",
            {},
            phone,
            accessToken
          );
          if (response1.result == "success") {
            const compareDate = (dueDate) => {
              const currentDay = new Date();
              return moment(dueDate).isAfter(currentDay, "day");
            };
            setEmis(response1.message.card_emis);
            const emisUnpaidArr = response1.message.card_emis.filter(
              (item) => item.payment_status === "UnPaid"
            );
            setUnpaidEmis(emisUnpaidArr);
            const emisUnpaid = emisUnpaidArr.map((item) => {
              return {
                totalDueAmount: item.total_due_amount,
                emiNumber: item.emi_number,
                isOverDue: compareDate(new Date(item.due_date)),
                dueDate: item.due_date,
              };
            });
            const overdueemi = emisUnpaid.filter(
              (item) => item.isOverDue === false
            );
            const nextEmiUnpaid = emisUnpaid.filter(
              (item) => item.isOverDue === true
            );
            setOverdueEMI(overdueemi);
            setNextEMI(nextEmiUnpaid);
            if (response1.message.status == "COMPLETED") {
              setEmiStatus("COMPLETED");
              setCount(0);
            } else {
              setCount(
                response1.message.card_emis.reduce(function (id, emi) {
                  return id + (emi.payment_status != "Paid");
                }, 0)
              );
              let v = [];
              let flag = 0;
              response1.message.card_emis.map((emi, index) => {
                if (emi.payment_status == "UnPaid" && flag == 0) {
                  v.push(true);
                  flag = 1;
                } else {
                  v.push(false);
                }
              });
              setEmiToPay(v);
            }
          } else {
            notify({ message: response.message, type: "error" });
          }
        } catch (error) {
          console.log(error);
          notify({
            message: "Some Error Occurred, try again later.",
            type: "error",
          });
        }
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDeviceInfo = async () => {
    setDeviceInfoLoading(true);
    try {
      const response = await callApi(
        "/redcarpet_xiaomi_customer_in_loan_agreement_details",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        setDeviceInfo(response.data);
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
      console.log(error);
    } finally {
      setDeviceInfoLoading(false);
    }
  };

  const togglePayment = () => {
    if (payment) {
      setPayment(false);
    } else {
      setPayment(true);
    }
  };

  useEffect(() => {
    getDeviceInfo();
    getCardSchdule();
  }, []);

  return (
    <>
      <div className={"pcardWrapper"}>
        <div className={"card"}>
          <RebelCardWrapper>
            <div className="row">
              <div className={"col60"}>
                <div className="row-left">
                  <div className="col30">
                    <hr className="line" />
                  </div>
                  <div className="col50">
                    <h1 styles={{ fontSize: "20px" }}>MI Credit</h1>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {deviceInfoLoading ? (
                <div className="text-center" style={{ width: "100%" }}>
                  <div className="loader"></div>
                </div>
              ) : (
                deviceInfo && (
                  <div className="xiaomi-loan-agreement-description">
                    <ul>
                      <li>
                        <b>Device Name : </b> {deviceInfo.product_name}
                      </li>
                      <li>
                        <b>IMEI Number : </b> {deviceInfo.imei_number}
                      </li>
                    </ul>
                  </div>
                )
              )}
              <br />
            </div>
          </RebelCardWrapper>
        </div>
      </div>
      <div className={"pcardWrapper"}>
        <div className={"card"}>
          <RebelCardWrapper>
            <div className="row">
              <div className={"col60"}>
                <div className="row-left">
                  <div className="col30">
                    <hr className="line" />
                  </div>
                  <div className="col50">
                    <h1 styles={{ fontSize: "20px" }}>
                      Loan Agreement Details
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {deviceInfoLoading ? (
                <div className="text-center" style={{ width: "100%" }}>
                  <div className="loader"></div>
                </div>
              ) : (
                deviceInfo && (
                  <div className="xiaomi-loan-agreement-description">
                    <ul>
                      <li>
                        <b>Down Payment : </b> {deviceInfo.down_payment}
                      </li>
                      <li>
                        <b>Interest Rate : </b> {deviceInfo.interest_rate}%
                      </li>
                      <li>
                        <b>Interest Type : </b> {deviceInfo.interest_type}
                      </li>
                      <li>
                        <b>Monthly Installment : </b>{" "}
                        {deviceInfo.monthly_instalment}
                      </li>
                      <li>
                        <b>Product Price : </b> {deviceInfo.product_price}
                      </li>
                      <li>
                        <b>Tenure : </b> {deviceInfo.tenure}
                      </li>
                      <li>
                        <b>Total Amount : </b> {deviceInfo.total_amount}
                      </li>
                    </ul>
                  </div>
                )
              )}
              <br />
            </div>
          </RebelCardWrapper>
        </div>
      </div>
      <>
        <div className={"pcardWrapper"}>
          <div className={"card"}>
            <ResetCardWrapper>
              <div className="row">
                <div className={"col60"}>
                  <div className="row-left">
                    <div className="col30">
                      <hr className="line" />
                    </div>
                    <div className="col70">
                      <h1>Your Card Details</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "20px 0 30px 0" }}>
                {count === 0 ? (
                  <h5 style={{ fontStyle: "italic" }}>
                    Your loan is Completed!
                  </h5>
                ) : (
                  <div className="details-box">
                    <div className="reset-box">
                      <div className="details-number">
                        <h3>{count}</h3>
                      </div>
                      <div className="details-type">
                        <h5> EMI's Left</h5>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ResetCardWrapper>
          </div>
        </div>
      </>
      <div className={"pcardWrapper"}>
        <div className={"card"}>
          <ResetCardWrapper>
            <div className="row">
              <div className={"col60"}>
                <div className="row-left">
                  <div className="col30">
                    <hr className="line" />
                  </div>
                  <div className="col50">
                    <h1 styles={{ fontSize: "20px" }}>Your Loan Schedule</h1>
                  </div>
                </div>
              </div>
              {loading ? (
                <div
                  className="text-center"
                  style={{ width: "100%", margin: "20px 0" }}
                >
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  <div className="emi-reset-details">
                    {emis.length &&
                      emis.map((emi, id) => (
                        <RenderEmiDetail
                          emi={emi}
                          loanId={loanId}
                          userProductId={productId}
                          phone={phone}
                          accessToken={accessToken}
                          togglePayment={togglePayment}
                          emiStatus={emiStatus}
                          emiPay={emiToPay}
                          emiId={id}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          </ResetCardWrapper>
        </div>
      </div>
    </>
  );
};

export default XiaomiCardDetails;
