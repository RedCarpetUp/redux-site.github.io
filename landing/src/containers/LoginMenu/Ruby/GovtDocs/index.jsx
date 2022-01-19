import React, { useState, Fragment, useEffect } from "react";
import Input from "common/components/Input";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";

import validator from "validator";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { info } from "react-icons-kit/feather/info";
import Icon from "react-icons-kit";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useAnalytics from "../../../../common/hooks/useAnalytics";
import { analyticsData } from "../../../../common/data/analytics";
import { useNotification } from "common/hooks/useNotification";

const GovtDocRuby = (props) => {
  const { phone, accessToken, moveUser, selectedProduct, getBacktoProduct } =
    props;
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [work, setWork] = useState("");
  const [newAddressType, setNewAddressType] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [OTP, setOTP] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpScreen, setOtpScreen] = useState("1");
  const [tncScreen, setTncScreen] = useState(false);
  const [verifyAadhar, setVerifyAadhar] = useState(false);
  const [clientId, setClientId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const [lender, setLender] = useState("");
  const [lender2, setLender2] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [userProfile, setUserProfile] = useState("");

  const [dataBranch, setDataBranch] = useState(
    props.branchData ? props.branchData.data_parsed : ""
  );

  const notify = useNotification();

  const getUserProfile = async () => {
    setIsLoading(true);
    let response = await callApi(
      "/get_new_user_profile",
      "GET",
      {},
      phone,
      accessToken
    );
    setIsLoading(false);
    if (response.result == "success") {
      setUserProfile(response.user);
      setPincode(response.user.address_data.pincode);
      setNewAddressType(response.user.address_data.address_type);
      setEmail(response.user.user_data.email);
      setWork(response.user.user_data.work_type);
    }
  };
  const getUserStatus = async () => {
    setIsLoading(true);
    let response = await callApi(
      "/get_user_status",
      "GET",
      {},
      phone,
      accessToken
    );
    setIsLoading(false);
    if (response.result == "success") {
      if (response.data.funnel_status == "pan_verification") {
        setUserStatus(true);
      }
    } else {
      notify({ message: response.message, type: "error" });
    }
  };

  useEffect(() => {
    useAnalytics(analyticsData.KYC_SCREEN, {
      product_type: "ruby",
    });
    getUserProfile();
    getUserStatus();
  }, []);

  const DownloadEsign = (url) => {
    window.open(url, "_blank");
  };

  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      let response = await callApi(
        "/verify_aadhar_id_for_alt",
        "POST",
        {
          otp: OTP,
          type: "verify",
          client_id: clientId,
          aadhar_no: aadhar,
          product_type: "ruby",
        },
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response.result === "success") {
        useAnalytics(analyticsData.AADHAR_VERIFICATION_SUCCESS, {
          product_type: "ruby",
        });
        notify({ message: "OTP verified Successfully", type: "success" });

        setOtpScreen("3");
        setIsOtpVerified(true);

        try {
          if (dataBranch["~id"]) {
            let response = await callApi(
              "/get_events_branch",
              "GET",
              {},
              phone,
              accessToken
            );
            if (response.result == "success") {
              if (response.data) {
                response.data.map(async (d) => {
                  if (!d.hit_status) {
                    let custom_data = {
                      event: d.event,
                      userName: userProfile.user_data.first_name,
                      userId: userProfile.user_data.user_id,
                      userPhone: userProfile.user_data.phone_number,
                      platform: "website",
                    };
                    branch.logEvent(d.event, custom_data, function (err) {
                      console.log(err);
                    });
                    let response1 = await callApi(
                      "/event_hit_success",
                      "POST",
                      {
                        product_type: d.product_type,
                        type: d.tag,
                      },
                      phone,
                      accessToken
                    );
                  }
                });
              }
            }
          }
        } catch (err) {
          notify({
            message: "Some Error Occurred, try again later.",
            type: "error",
          });
        }
      } else {
        useAnalytics(analyticsData.AADHAR_VERIFICATION_ERROR, {
          product_type: "ruby",
          message: response.message,
        });
        notify({ message: response.message, type: "error" });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      useAnalytics(analyticsData.AADHAR_VERIFICATION_ERROR, {
        product_type: "ruby",
        message: error.message,
      });
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
        "/verify_aadhar_id_for_alt",
        "POST",
        {
          pincode: pincode,
          occupation: work,
          address_type: newAddressType,
          aadhar_no: aadhar,
          type: "generate",
          email: email,
          product_type: "ruby",
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        useAnalytics(analyticsData.AADHAR_OTP_SUCCESS, {
          product_type: "ruby",
        });
        if (response.skip_otp == true) {
          useAnalytics(analyticsData.AADHAR_VERIFICATION_SUCCESS, {
            product_type: "ruby",
          });
          setVerifyAadhar(true);
          setOtpScreen("3");
          setIsOtpVerified(true);
          notify({ message: "Aadhaar already verified", type: "success" });
        } else {
          notify({ message: "OTP sent Successfully", type: "success" });
          setClientId(response.client_id);
          setOtpScreen("2");
          setVerifyAadhar(true);
        }
      } else {
        useAnalytics(analyticsData.AADHAR_OTP_ERROR, {
          product_type: "ruby",
          message: response.message,
        });
        notify({ message: response.message, type: "error" });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      useAnalytics(analyticsData.AADHAR_OTP_ERROR, {
        product_type: "ruby",
        message: error.message,
      });
      notify({ message: error.message, type: "error" });
    }
  };

  const AcceptTnc = async () => {
    if (pan == "") {
      notify({ message: "Please Enter PAN", type: "error" });
      return;
    }
    try {
      setIsLoading(true);
      let response = await callApi(
        "/accept_user_agreement_esign",
        "GET",
        {
          //from: "legder",
          product_type: "ruby",
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        setTncScreen(true);
        setLender(response.data.url_data);
        useAnalytics(analyticsData.ESIGN_SCREEN, {
          product_type: "ruby",
        });
      } else {
        notify({ message: "Something Went Wrong", type: "error" });
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
        "/set_pan_alternate",
        "POST",
        {
          pan: pan,
          product_type: "ruby",
        },
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response2.result === "success") {
        useAnalytics(analyticsData.PAN_VERIFICATION_SUCCESS, {
          product_type: "ruby",
        });

        try {
          if (dataBranch["~id"]) {
            setIsLoading(true);
            let response = await callApi(
              "/get_events_branch",
              "GET",
              {},
              phone,
              accessToken
            );
            setIsLoading(false);
            if (response.result == "success") {
              //setUserStatus(response.task_status);
              if (response.data) {
                response.data.map(async (d) => {
                  if (!d.hit_status) {
                    let custom_data = {
                      event: d.event,
                      userName: userProfile.user_data.first_name,
                      userId: userProfile.user_data.user_id,
                      userPhone: userProfile.user_data.phone_number,
                      platform: "website",
                    };
                    branch.logEvent(d.event, custom_data, function (err) {
                      console.log(err);
                    });
                    setIsLoading(true);
                    let response1 = await callApi(
                      "/event_hit_success",
                      "POST",
                      {
                        product_type: d.product_type,
                        type: d.tag,
                      },
                      phone,
                      accessToken
                    );
                  }
                  setIsLoading(false);
                });
              }
            }
          }
        } catch (err) {
          notify({
            message: "Some Error Occurred, try again later.",
            type: "error",
          });
        }
        moveUser(selectedProduct);
      } else {
        setTncScreen(false);
        useAnalytics(analyticsData.PAN_VERIFICATION_ERROR, {
          product_type: "ruby",
          message: response2.message,
        });
        notify({ message: response2.message, type: "error" });
      }
    } catch (error) {
      setIsLoading(false);
      useAnalytics(analyticsData.PAN_VERIFICATION_ERROR, {
        product_type: "ruby",
        message: error.message,
      });
      notify({ message: error.message, type: "error" });
    }
    setIsLoading(false);
  };

  let aadharVerified = userStatus;

  return (
    <>
      <div className="row">
        {isLoading ? (
          <div className="loader">
            <div class="lds-dual-ring"></div>
          </div>
        ) : !tncScreen ? (
          <div className={""}>
            <div className="section-dialog">
              <div className="form Input-line">
                <div className="row-left">
                  <div className="col30">
                    <hr className="line" />
                  </div>
                  <div className="col70">
                    <h1 style={{ marginLeft: 5 }}>Ruby Documents</h1>
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
                          aadhar
                            ? aadhar
                            : aadharVerified
                            ? "XXXX-XXXX-XXXX"
                            : ""
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
                            validator.isLength(OTP, { min: 6, max: 6 })) ||
                          aadharVerified ? (
                            <Icon icon={ic_check_circle} className="green" />
                          ) : (
                            ""
                          )
                        }
                        className={
                          (validator.isNumeric(OTP) &&
                            validator.isLength(OTP, { min: 6, max: 6 })) ||
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
                        An OTP is sent to you registered mobile number with
                        Aadhaar ending with {aadhar.substring(8)}, It can take
                        upto 10 minutes to be delivered.
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
                      value={aadhar}
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
                      If you have verified your aadhaar details before then they
                      are hidden for your security purpose therefore please
                      enter your PAN Details and proceed.
                    </div>
                  </span>
                ) : (
                  <span className={"inputPayCombo-note"}>
                    <div
                      className="note-black"
                      style={{ display: "inline-block" }}
                    >
                      <Icon icon={info} />
                    </div>
                    <span className="note-txt">
                      Submitting Pan Card Number for ruby is mandatory for
                      various assessments which in turn enables us to offer you
                      better and personalized products.
                    </span>
                  </span>
                )}
              </div>
            </div>

            <div className={"col100"} style={{ marginBottom: "1.5rem" }}>
              <AnchorLink href="#scroll-up">
                <Button
                  onClick={(e) => AcceptTnc()}
                  title="Submit"
                  isMaterial="true"
                  className={
                    aadharVerified || (verifyAadhar && isOtpVerified)
                      ? "btn-full-kyc"
                      : "btn-full-kyc-grey"
                  }
                  disabled={
                    aadharVerified ? false : !(verifyAadhar && isOtpVerified)
                  }
                ></Button>
              </AnchorLink>
              <AnchorLink href="#scroll-up">
                <Button
                  className="btn-full-kyc-light"
                  title="Back"
                  onClick={() => getBacktoProduct()}
                />
              </AnchorLink>
              <div className="note-red">*All Fields are Mandatory.</div>
            </div>
          </div>
        ) : (
          <div className={"col60"}>
            <br />
            <div className="row-left">
              <div className="col30">
                <hr className="line" />
              </div>
              <div className="col70">
                <h1>Lender Agreement</h1>
              </div>
            </div>
            <Text content="Please download and read the Lender agreement for ruby card below carefully before proceeding." />
            {lender
              ? lender.map((lend) => {
                  return (
                    <div className={"col80"}>
                      <span className={"inputPayCombo"}>
                        <div className="payinput">
                          <Heading content={lend.name} />
                        </div>
                        <Button
                          onClick={(e) => DownloadEsign(lend.url)}
                          title="Download"
                          isMaterial="true"
                          className="paybtn-down"
                        ></Button>
                      </span>
                    </div>
                  );
                })
              : "No Agreements Available"}

            <div className="row">
              <div
                className="col100"
                style={{
                  marginLeft: "1.7rem",
                  marginRight: "1.7rem",
                  marginTop: "4.5rem",
                  textAlign: "justify",
                }}
              >
                <label for="tnc">
                  <div className="row">
                    <div className="col10">
                      <input
                        type="checkbox"
                        id="tnc"
                        name="tnc"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />{" "}
                    </div>
                    <div className="col90 lender-agreement">
                      <p style={{ textAlign: "justify" }}>
                        I confirm that I have read the above terms of agreement
                        and understand that in case of any default of loan
                        payment legal and criminal action can be taken against
                        me as per Indian Contract Act 1872 and IPC Section 138.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className={"col100"} style={{ marginBottom: "1.5rem" }}>
              <AnchorLink href="#scroll-up">
                <Button
                  onClick={(e) => SignUpUser()}
                  title="Continue"
                  isMaterial="true"
                  className="btn-full"
                ></Button>
              </AnchorLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GovtDocRuby;
