import React, { useState, Fragment } from "react";
import Input from "common/components/Input";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import validator from "validator";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { info } from "react-icons-kit/feather/info";
import Icon from "react-icons-kit";
import AnchorLink from "react-anchor-link-smooth-scroll";

import useAnalytics from "../../../common/hooks/useAnalytics";
import { analyticsData } from "../../../common/data/analytics";
import { useNotification } from "common/hooks/useNotification";

const Govtdocs = ({ phone, accessToken, getUserStatus }) => {
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [OTP, setOTP] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpScreen, setOtpScreen] = useState("1");
  const [verifyAadhar, setVerifyAadhar] = useState(false);
  const [serviceable, setServiceable] = useState(false);
  const [clientId, setClientId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotification();
  let aadharVerified = false;

  const checkServiceAvailability = async () => {
    try {
      isLoading === false ? setIsLoading(true) : "";

      let response = await callApi(
        "/check_user_pin_code_availability",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result === "success") {
        setServiceable(true);
      } else setServiceable(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notify({ message: error.message, type: "error" });
    }
  };
  const getOtp = async () => {
    if (
      !validator.isLength(aadhar, {
        min: 12,
        max: 12,
      })
    ) {
      notify({
        message: "Please Enter a correct Aadhaar Number(12 digits).",
        type: "error",
      });
      return;
    }
    try {
      setIsLoading(true);
      let response = await callApi(
        "/verify_aadhar_id_base",
        "POST",
        {
          aadhar_no: aadhar,
          type: "generate",
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        let data = {
          Event: analyticsData.AADHAR_OTP_SUCCESS,
        };
        useAnalytics(data);
        if (response.skip_otp == true) {
          checkServiceAvailability();
          setOtpScreen("3");
          setVerifyAadhar(true);
          setIsOtpVerified(true);
          notify({ message: "Aadhar already verified", type: "success" });
        } else {
          notify({ message: "OTP sent Successfully", type: "success" });
          setClientId(response.client_id);
          setOtpScreen("2");
          setVerifyAadhar(true);
        }
      } else {
        notify({ message: response.message, type: "error" });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      notify({ message: error.message, type: "error" });
    }
  };

  const SignUpUser = async () => {
    if (isChecked == false) {
      notify({
        message: "Please Accept the Terms and Conditions",
        type: "error",
      });
      return;
    }
    try {
      setIsLoading(true);
      let response2 = await callApi(
        "/set_pan",
        "POST",
        {
          pan: pan,
        },
        phone,
        accessToken
      );
      if (response2.result === "success") {
        let analyticData = {
          Event: analyticsData.PAN_BASE_VERIFICATION_SUCCESS,
        };
        useAnalytics(analyticData);
        getUserStatus();
        notify({ message: "You are Registered Successfully", type: "success" });
      } else {
        let analyticData = {
          Event: analyticsData.PAN_BASE_VERIFICATION_ERROR,
        };
        useAnalytics(analyticData);
        notify({ message: response2.message, type: "error" });
      }
    } catch (error) {
      setIsLoading(false);
      let analyticData = {
        Event: analyticsData.PAN_BASE_VERIFICATION_ERROR,
      };
      useAnalytics(analyticData);
      notify({ message: error.message, type: "error" });
    }
    setIsLoading(false);
  };
  const verifyOtp = async () => {
    try {
      setIsLoading(true);

      let response = await callApi(
        "/verify_aadhar_id_base",
        "POST",
        {
          otp: OTP,
          type: "verify",
          client_id: clientId,
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        checkServiceAvailability();
        let analyticData = {
          Event: analyticsData.AADHAR_BASE_VERIFICATION_SUCCESS,
        };
        useAnalytics(analyticData);
        notify({ message: "OTP verified Successfully", type: "success" });
        setOtpScreen("3");
        setIsOtpVerified(true);
        //setBranchStatus(response4.data.slice(0, 3));
      } else {
        let analyticData = {
          Event: analyticsData.AADHAR_BASE_VERIFICATION_ERROR,
        };
        useAnalytics(analyticData);
        notify({ message: response.message, type: "error" });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      let analyticData = {
        Event: analyticsData.AADHAR_BASE_VERIFICATION_ERROR,
      };
      useAnalytics(analyticData);
      notify({ message: error.message, type: "error" });
    }
  };
  return (
    <div>
      <div>
        <div>
          <div className="form Input-line">
            <div className="row-left">
              <div className="col30">
                <hr className="line" />
              </div>
              <div className="col70">
                <h1>Government Documents</h1>
              </div>
            </div>
            {otpScreen == "1" ? (
              <Fragment>
                <div className="form-control">
                  <Input
                    type="number"
                    label="Aadhaar Card Number"
                    className={
                      (validator.isNumeric(aadhar) &&
                        validator.isLength(aadhar, {
                          min: 12,
                          max: 12,
                        })) ||
                      aadharVerified
                        ? "green-border"
                        : ""
                    }
                    placeholder="Aadhaar Card Number"
                    icon={
                      (validator.isNumeric(aadhar) &&
                        validator.isLength(aadhar, {
                          min: 12,
                          max: 12,
                        })) ||
                      aadharVerified ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    onChange={(event) => setAadhar(event)}
                    value={
                      aadhar ? aadhar : aadharVerified ? "XXXX-XXXX-XXXX" : ""
                    }
                    disabled={aadharVerified ? true : verifyAadhar}
                  />
                  &nbsp;&nbsp;
                  <Button
                    className={aadharVerified ? "btn-1-grey" : "btn-1"}
                    onClick={(event) => {
                      getOtp(event);
                    }}
                    title={aadharVerified ? "Verified" : "Verify"}
                    disabled={aadharVerified ? true : verifyAadhar}
                  ></Button>
                </div>
                <span className={"inputPayCombo-note"}>
                  <div
                    className="note-black"
                    style={{ display: "inline-block" }}
                  >
                    <Icon icon={info} />
                  </div>
                  <span className="note-txt">
                    Please Click verify to get OTP for Aadhaar Verification.
                  </span>
                </span>
              </Fragment>
            ) : otpScreen == "2" ? (
              <Fragment>
                <div className="form-control">
                  <Input
                    type="number"
                    label="OTP"
                    icon={
                      (validator.isNumeric(OTP) &&
                        validator.isLength(OTP, {
                          min: 6,
                          max: 6,
                        })) ||
                      aadharVerified ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : (
                        ""
                      )
                    }
                    className={
                      (validator.isNumeric(OTP) &&
                        validator.isLength(OTP, {
                          min: 6,
                          max: 6,
                        })) ||
                      aadharVerified
                        ? "green-border"
                        : ""
                    }
                    iconPosition="right"
                    placeholder="OTP Number"
                    onChange={(event) => setOTP(event)}
                    value={OTP}
                  />
                </div>
                <span className={"btngroup"}>
                  <div className="col50">
                    <Button
                      className="otpbtn"
                      onClick={(event) => {
                        verifyOtp(event);
                      }}
                      title="Verify"
                    />
                  </div>
                  <div className="col50">
                    <Button
                      className="otpbtn"
                      onClick={(event) => {
                        setOtpScreen("1");
                        setClientId("");
                        setVerifyAadhar(false);
                        setOTP("");
                      }}
                      title="Cancel"
                    />
                  </div>
                </span>
                <span className={"inputPayCombo-note"}>
                  <div
                    className="note-black"
                    style={{ display: "inline-block" }}
                  >
                    <Icon icon={info} />
                  </div>
                  <span className="note-txt">
                    An OTP is sent to you registered mobile number with Aadhaar
                    ending with {aadhar.substring(8)}, It can take upto 10
                    minutes to be delivered.
                  </span>
                </span>
              </Fragment>
            ) : (
              <div className={"form-control"}>
                <Input
                  type="number"
                  label="Aadhaar Card Number"
                  className={
                    (validator.isNumeric(aadhar) &&
                      validator.isLength(aadhar, {
                        min: 12,
                        max: 12,
                      })) ||
                    aadharVerified
                      ? "green-border"
                      : ""
                  }
                  icon={
                    (validator.isNumeric(aadhar) &&
                      validator.isLength(aadhar, {
                        min: 12,
                        max: 12,
                      })) ||
                    aadharVerified ? (
                      <Icon icon={ic_check_circle} className="green" />
                    ) : (
                      ""
                    )
                  }
                  iconPosition="right"
                  placeholder="Aadhaar Card Number"
                  onChange={(event) => setAadhar(event)}
                  value={"XXXX-XXXX-XXXX"}
                  disabled
                />
                &nbsp;&nbsp;
                <Button
                  className="btn-2"
                  title="Verified"
                  disabled="true"
                ></Button>
              </div>
            )}
            <div className="form-control">
              <Input
                type="text"
                placeholder="PAN Card"
                label="PAN Card"
                icon={
                  validator.isLength(pan, { min: 10, max: 10 }) ? (
                    <Icon icon={ic_check_circle} className="green" />
                  ) : (
                    ""
                  )
                }
                iconPosition="right"
                onChange={(event) => setPan(event)}
                value={pan}
                disabled={
                  aadharVerified ? false : !(verifyAadhar && isOtpVerified)
                }
                className={
                  validator.isLength(pan, { min: 10, max: 10 })
                    ? "green-border"
                    : ""
                }
              />
            </div>
            {aadharVerified ? (
              <span className={"inputPayCombo-note"}>
                <div className="note-red">
                  If you have verified your aadhar details before then they are
                  hidden for your security purpose therefore please enter your
                  PAN Details and proceed.
                </div>
              </span>
            ) : (
              <span className={"inputPayCombo-note"}>
                <div className="note-black" style={{ display: "inline-block" }}>
                  <Icon icon={info} />
                </div>
                <span className="note-txt">
                  Submitting Pan Card Number is mandatory for various
                  assessments which in turn enables us to offer you better and
                  personalized products.
                </span>
              </span>
            )}
          </div>
        </div>
        <label for="agreement" className="agreement">
          <div className="row">
            <div className="col10">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />{" "}
            </div>
            <div className="col90">
              <span>
                I hereby appoint Redcarpet Tech Private Limited as my authorised
                representative to receive my credit information from{" "}
              </span>
              <a
                href="https://www.redcarpetup.com/terms-and-conditions/?showLayout=false"
                target="_blank"
              >
                Experian
              </a>
              <span> & </span>
              <a
                href="https://www.redcarpetup.com/terms-and-conditions/?agreementType=equifax&showLayout=false"
                target="_blank"
              >
                Equifax
              </a>
              <span> (bureau).</span>
            </div>
          </div>
        </label>
        <div className={"col100"} style={{ marginBottom: "1.5rem" }}>
          <AnchorLink href="#scroll-up">
            <Button
              onClick={(e) => SignUpUser()}
              title="Submit"
              isMaterial="true"
              className={
                aadharVerified || (verifyAadhar && isOtpVerified)
                  ? isChecked
                    ? "btn-full"
                    : "btn-full-grey"
                  : "btn-full-grey"
              }
              disabled={
                aadharVerified && isChecked
                  ? false
                  : !(verifyAadhar && isOtpVerified && isChecked)
              }
            ></Button>
          </AnchorLink>
          <div className="note-red">*All Fields are Mandatory.</div>
        </div>
      </div>
    </div>
  );
};

export default Govtdocs;
