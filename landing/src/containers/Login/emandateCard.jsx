import Button from "common/components/Button";
import Input from "common/components/Input";
import React, { useEffect, useState } from "react";

import LoginWrapper from "../../pages/login/login.style.js";
import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const EmandateCard = ({ phone, accessToken }) => {
  const [allDone, setAllDone] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [email, setEmail] = useState("");
  const [rzLink, setRzLink] = useState("");
  const notify = useNotification();

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await callApi(
          "/get_new_user_profile",
          "GET",
          {},
          phone,
          accessToken
        );
        if (response.result === "success") {
          setEmail(response.user.user_data.email);
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }

      try {
        let resp = await callApi(
          "/get_bank_accounts",
          "GET",
          {},
          phone,
          accessToken
        );
        let isValueSet = false;
        if (resp.result === "success") {
          if (resp.accounts.length === 1) {
            setAccountHolderName(resp.accounts[0].account_holder_name);
            setAccountNumber(resp.accounts[0].account_no);
            setIfscCode(resp.accounts[0].bank_ifsc);
            isValueSet = true;
          } else {
            resp.accounts.forEach((e) => {
              if (e.verified) {
                setAccountHolderName(e.account_holder_name);
                setAccountNumber(e.account_no);
                setIfscCode(e.bank_ifsc);
                isValueSet = true;
              }
            });
          }

          if (!isValueSet) {
            const sortedArr = resp.accounts.sort(function (a, b) {
              return new Date(b.created_at) - new Date(a.created_at);
            });
            setAccountHolderName(sortedArr[0].account_holder_name);
            setAccountNumber(sortedArr[0].account_no);
            setIfscCode(sortedArr[0].bank_ifsc);
          }
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    };
    getData();
  }, []);

  let createEmandateReq = async () => {
    if (!accountHolderName || !accountNumber || !ifscCode) {
      notify({ message: "Please fill all fields", type: "error" });
      return;
    }

    setRzLink("");
    let response = await callApi(
      "/create_authorization_payment",
      "POST",
      {
        name: accountHolderName,
        account_number: accountNumber,
        ifsc_code: ifscCode,
        mobile_number: phone,
        email: email,
        user_product_id: null,
      },
      phone,
      accessToken
    );

    if (response.result === "error") {
      notify({ message: response.message, type: "error" });
    } else if (response.result === "success") {
      notify({ message: "E-Mandate requested created", type: "success" });
      setRzLink(response.data.extra_details.short_url);
      setAllDone(true);
    }
  };

  const displayEmandateRegisterationForm = () => {
    return (
      <LoginWrapper>
        <div className="row">
          <div className={"col100"}>
            <h5 style={{ textTransform: "capitalize" }}>
              Apply for RedCarpet E-Mandate
            </h5>
            <br />
            <h6 className="text-center">
              Introducing online registeration facility for common One Time
              Mandate or E-Mandate. This is a one time process that gives a
              hastle free way to to make all you bill and reload payments.
              <br />
              Fill out the below form to start the registeration process
            </h6>
            <br />
            <div className={"col100"}>
              <div className="section-dialog" style={{ background: "#fafbfb" }}>
                <div>
                  <div className="form Input-line">
                    <div className="form-group">
                      <Input
                        name="account_holder_name"
                        placeholder="Account Holder Name (ex John Joe)"
                        className="form-control"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e)}
                        type="text"
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        name="account_number"
                        placeholder="Account Number (ex 00012344)"
                        className="form-control"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e)}
                        type="text"
                      />
                    </div>
                    <div className="form-group">
                      <Input
                        name="ifsc_code"
                        placeholder="IFSC Code (ex PYAB0123456)"
                        className="form-control"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e)}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"col100"} style={{ marginBottom: "1.5rem" }}>
            <Button
              onClick={(e) => createEmandateReq()}
              title="Click to Apply"
              isMaterial="true"
              className="btn-full"
            >
              {/* <FormattedMessage
                id="payment.feepayCoupon"
                defaultMessage={
                  'Click to Apply'
                }
              /> */}
            </Button>
            <br />
          </div>
        </div>
      </LoginWrapper>
    );
  };

  const displayAllDone = () => {
    return (
      <div className="row">
        <div className={"col100"}>
          <br />
          <h6 className="text-center">
            Great! You are half way done.
            <br />
            To complete the registeration, please click on the below link and
            follow the instructions there.
            <br />
            <br />
            <a href={rzLink} target="_blank">
              {rzLink}
            </a>
          </h6>
          <br />
          <br />
        </div>
      </div>
    );
  };

  const displayEmandateForm = () => {
    return <div className="row">{displayEmandateRegisterationForm()}</div>;
  };

  return (
    <LoginWrapper>
      <div className={"pcardWrapper"}>
        <div className={"card"}>
          <div className={"cardHeader"}>
            <div className="row">
              <div className={"col50 smartCardHeader"}>
                <img
                  src="https://lh3.googleusercontent.com/gWybApiUlrw8YVknewflxjzIDEEzZPjzAacb8LsSlSa8d18XTaMFC-5UIK61g8P5stEI=w300-rw"
                  height="35px"
                  width="35px"
                  alt="RC"
                />
                <h5>RedCarpet E-Mandate Registration</h5>
              </div>
            </div>
          </div>
          <div
            className={"cardBody"}
            style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
          >
            {allDone ? (
              <div>{displayAllDone()}</div>
            ) : (
              <div>{displayEmandateForm()}</div>
            )}
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default EmandateCard;
