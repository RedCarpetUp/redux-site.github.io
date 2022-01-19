import React, { useState, Fragment, useEffect } from "react";
import Input from "common/components/Input";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import OnBoardWrapper from "./style";

import ProductList from "./ProductList";
import UnServiceable from "./UnServiceable";
import validator from "validator";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { info } from "react-icons-kit/feather/info";
import { ic_error } from "react-icons-kit/md/ic_error";
import Icon from "react-icons-kit";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useAnalytics from "../../../common/hooks/useAnalytics";
import { analyticsData } from "../../../common/data/analytics";
import Govtdocs from "./govt_docs";
import { useRouter } from "next/router";
import { useNotification } from "common/hooks/useNotification";

const OnBoardUser = (props) => {
  const {
    phone,
    accessToken,
    userProfile,
    userStatus,
    showOnboard,
    showPersonalInfoPage,
    getUserStatus,
    query_to_send,
    userFrom,
  } = props;
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [work, setWork] = useState("");
  const [newAddressType, setNewAddressType] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpScreen, setOtpScreen] = useState("1");
  const [verifyAadhar, setVerifyAadhar] = useState(false);
  const [clientId, setClientId] = useState("");
  const [serviceable, setServiceable] = useState(false);
  const [emailOTP, setEmailOTP] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [workEmailScreen, setWorkEmailScreen] = useState(0);
  const notify = useNotification();
  const [productList, setProductList] = useState(false);

  const [dataBranch, setDataBranch] = useState(
    props.branchData ? props.branchData : ""
  );
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const setWorkAndToggleWorkEmail = (e) => {
    setWork(e);
    if (e == "Employee(With Company Email)") {
      setWorkEmailScreen(1);
      setEmailVerified(false);
    } else {
      setWorkEmailScreen(0);
      setEmailOTP("");
      setEmailVerified(true);
    }
  };

  const sendVerifyWorkEmailOTP = async () => {
    try {
      let response = await callApi(
        "/send_verification_mail_otp_app",
        "POST",
        {
          type: "corporate",
          email: email,
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        setWorkEmailScreen(2);
        notify({ message: response.message, type: "success" });
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  const verifyWorkEmailOTP = async () => {
    try {
      let response = await callApi(
        "/verify_mail_otp",
        "POST",
        {
          otp: emailOTP,
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        setEmailVerified(true);
        setWorkEmailScreen(3);
        notify({ message: response.message, type: "success" });
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  const DownloadEsign = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    let data = {
      "Screen Name": analyticsData.GLOBAL_ONBOARD_SCREEN,
      Event: analyticsData.VISITED_SCREEN,
    };
    useAnalytics(data);
    if (typeof userProfile != "undefined") {
      if (userProfile.user_data.email) {
        setEmail(userProfile.user_data.email);
        setEmailVerified(true);
      }
      if (
        userProfile.address_data.pincode &&
        userProfile.address_data.pincode > 0
      ) {
        setPincode(userProfile.address_data.pincode.toString());
      }
      if (userProfile.user_data.work_type) {
        setWork(userProfile.user_data.work_type);
      }
      if (userProfile.address_data.address_type) {
        setNewAddressType(userProfile.address_data.address_type);
      }
    }
  }, []);

  const sendPersonalData = async () => {
    try {
      let response = await callApi(
        "/set_personal_info",
        "POST",
        {
          pincode: pincode,
          occupation: work,
          address_type: newAddressType,
          email: email,
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        if (userFrom === "gimBooks" || userFrom === "rebel") {
          setProductList(true);
        } else {
          getUserStatus();
        }
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (e) {
      notify({ message: e.message, type: "error" });
    }
  };

  const isWorkMail = (email) => {
    return !email.includes("@gmail");
  };
  let aadharVerified = false;
  return (
    <OnBoardWrapper>
      {productList ? (
        <ProductList
          phone={phone}
          accessToken={accessToken}
          redirectUser={props.redirectUser}
          dataBranch={dataBranch}
          userProfile={userProfile}
          query_to_send={query_to_send}
          userFrom={userFrom}
        />
      ) : isOtpVerified && !serviceable ? (
        <UnServiceable
          phone={phone}
          accessToken={accessToken}
          userStatus={userStatus}
          redirectUser={props.redirectUser}
          branchData={props.branchData ? props.branchData : ""}
          showOnboard={showOnboard}
        />
      ) : (
        <div className="row">
          {isLoading ? (
            <div className="loader">
              <div class="lds-dual-ring"></div>
            </div>
          ) : (
            <div className={"col60"}>
              <div className="section-dialog" style={{ background: "#fafbfb" }}>
                {showPersonalInfoPage && (
                  <div>
                    <div className="row-left">
                      <div className="col30">
                        <hr className="line" />
                      </div>
                      <div className="col70">
                        <h1>Personal Information</h1>
                      </div>
                    </div>
                    <div className="form-control">
                      <label for="work">Work Type</label>
                      <select
                        name="work"
                        placeholder="Work"
                        value={
                          aadharVerified
                            ? userProfile.user_data.work_type
                            : work
                        }
                        onChange={(e) =>
                          setWorkAndToggleWorkEmail(e.target.value)
                        }
                        disabled={aadharVerified ? true : verifyAadhar}
                        className={
                          validator.isEmpty(work)
                            ? aadharVerified
                              ? "form-control-select green-border-select"
                              : "form-control-select"
                            : "form-control-select green-border-select"
                        }
                      >
                        <option value="" selected disabled hidden>
                          Select Work
                        </option>
                        <option value="Student">Student</option>
                        <option value="Driver">Driver</option>
                        <option value="Employee(With Company Email)">
                          Employee(With Company Email)
                        </option>
                        <option value="Employee(Without Company Email)">
                          Employee(Without Company Email)
                        </option>
                        <option value="Shop Owner">Shop Owner</option>
                        <option value="Delivery Boy">Delivery Boy</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {workEmailScreen == 0 ? (
                      <div className="form-control">
                        <Input
                          type="email"
                          label="Email Address"
                          placeholder="Email Address"
                          icon={
                            validator.isEmail(email) || aadharVerified ? (
                              <Icon icon={ic_check_circle} className="green" />
                            ) : email.length > 0 ? (
                              <Icon icon={ic_error} className="red" />
                            ) : (
                              ""
                            )
                          }
                          iconPosition="right"
                          required={true}
                          onChange={(event) => setEmail(event)}
                          value={
                            aadharVerified ? userProfile.user_data.email : email
                          }
                          disabled={aadharVerified ? true : verifyAadhar}
                          className={
                            validator.isEmail(email) || aadharVerified
                              ? "green-border"
                              : email.length > 0
                              ? "red-border"
                              : ""
                          }
                        />
                      </div>
                    ) : workEmailScreen == 1 ? (
                      <Fragment>
                        <div className="form-control">
                          <Input
                            type="email"
                            label="Company Email Address"
                            placeholder="Company Email Address"
                            icon={
                              (validator.isEmail(email) && isWorkMail(email)) ||
                              aadharVerified ? (
                                <Icon
                                  icon={ic_check_circle}
                                  className="green"
                                />
                              ) : email.length > 0 ? (
                                <Icon icon={ic_error} className="red" />
                              ) : (
                                ""
                              )
                            }
                            iconPosition="right"
                            required={true}
                            onChange={(event) => setEmail(event)}
                            value={
                              aadharVerified
                                ? userProfile.user_data.email
                                : email
                            }
                            disabled={aadharVerified ? true : verifyAadhar}
                            className={
                              (validator.isEmail(email) && isWorkMail(email)) ||
                              aadharVerified
                                ? "green-border"
                                : email.length > 0
                                ? "red-border"
                                : ""
                            }
                          />
                          &nbsp;&nbsp;
                          <Button
                            className={emailVerified ? "btn-1-grey" : "btn-1"}
                            onClick={(event) => {
                              sendVerifyWorkEmailOTP(event);
                            }}
                            title={
                              emailVerified ? "Email Verified" : "Verify Email"
                            }
                            disabled={
                              validator.isEmail(email) &&
                              isWorkMail(email) &&
                              !emailVerified
                                ? false
                                : true
                            }
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
                            Please Click Verify Email to get OTP for Email
                            Verification.
                          </span>
                        </span>
                      </Fragment>
                    ) : workEmailScreen == 2 ? (
                      <Fragment>
                        <div className="form-control">
                          <Input
                            type="number"
                            label="OTP"
                            icon={
                              (validator.isNumeric(emailOTP) &&
                                validator.isLength(emailOTP, {
                                  min: 6,
                                  max: 6,
                                })) ||
                              aadharVerified ? (
                                <Icon
                                  icon={ic_check_circle}
                                  className="green"
                                />
                              ) : (
                                ""
                              )
                            }
                            className={
                              (validator.isNumeric(emailOTP) &&
                                validator.isLength(emailOTP, {
                                  min: 6,
                                  max: 6,
                                })) ||
                              aadharVerified
                                ? "green-border"
                                : ""
                            }
                            iconPosition="right"
                            placeholder="OTP Number"
                            onChange={(event) => setEmailOTP(event)}
                            value={emailOTP}
                          />
                        </div>
                        <center>
                          <h4>
                            <span
                              className="btn_text"
                              onClick={(event) => sendVerifyWorkEmailOTP(event)}
                            >
                              Didn't receive the OTP? Try Again
                            </span>
                          </h4>
                        </center>
                        <span className={"btngroup"}>
                          <div className="col50">
                            <Button
                              className="otpbtn"
                              onClick={(event) => {
                                verifyWorkEmailOTP(event);
                              }}
                              title="Verify"
                            />
                          </div>
                          <div className="col50">
                            <Button
                              className="otpbtn"
                              onClick={(event) => {
                                setEmailOTP("");
                                setWorkEmailScreen(1);
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
                            An OTP is sent to your Work Email Address
                          </span>
                        </span>
                      </Fragment>
                    ) : workEmailScreen == 3 ? (
                      <Fragment>
                        <div className="form-control">
                          <Input
                            type="email"
                            label="Company Email Address"
                            placeholder="Company Email Address"
                            icon={
                              <Icon icon={ic_check_circle} className="green" />
                            }
                            iconPosition="right"
                            required={true}
                            value={
                              aadharVerified
                                ? userProfile.user_data.email
                                : email
                            }
                            disabled={true}
                            className={"green-border"}
                          />
                          &nbsp;&nbsp;
                          <Button
                            className={"btn-1-grey"}
                            title={"Email Verified"}
                            disabled={true}
                          ></Button>
                        </div>
                        <span className={"inputPayCombo-note"}></span>
                      </Fragment>
                    ) : (
                      ""
                    )}
                    <div className="form-control">
                      <Input
                        type="number"
                        label="Pin Code"
                        placeholder="Pin Code"
                        onChange={(event) => setPincode(event)}
                        icon={
                          (validator.isNumeric(pincode) &&
                            validator.isLength(pincode, {
                              min: 6,
                              max: 6,
                            })) ||
                          aadharVerified ? (
                            <Icon icon={ic_check_circle} className="green" />
                          ) : (
                            ""
                          )
                        }
                        iconPosition="right"
                        value={
                          aadharVerified
                            ? userProfile.address_data.pincode
                            : pincode
                        }
                        disabled={aadharVerified ? true : verifyAadhar}
                        className={
                          (validator.isNumeric(pincode) &&
                            validator.isLength(pincode, {
                              min: 6,
                              max: 6,
                            })) ||
                          aadharVerified
                            ? "green-border"
                            : ""
                        }
                      />
                    </div>
                    <div className="form-control">
                      <label for="address_type">Address Type</label>
                      <select
                        name="address_type"
                        placeholder="Address Type"
                        value={
                          aadharVerified
                            ? userProfile.address_data.address_type
                            : newAddressType
                        }
                        onChange={(e) => setNewAddressType(e.target.value)}
                        disabled={aadharVerified ? true : verifyAadhar}
                        className={
                          validator.isEmpty(newAddressType)
                            ? aadharVerified
                              ? "form-control-select green-border-select"
                              : "form-control-select"
                            : "form-control-select green-border-select"
                        }
                      >
                        <option value="" selected disabled hidden>
                          Select Address Type
                        </option>
                        <option value="Home with family">
                          Home with family
                        </option>
                        <option value="Rented with family">
                          Rented with family
                        </option>
                        <option value="Rented with friends">
                          Rented with friends
                        </option>
                        <option value="Hostel/PG">Hostel/PG</option>
                      </select>
                    </div>
                    <AnchorLink href="#scroll-up">
                      <Button
                        onClick={(e) => sendPersonalData()}
                        title="Submit"
                        isMaterial="true"
                        className="btn-full"
                      ></Button>
                    </AnchorLink>
                  </div>
                )}
              </div>
              {!showPersonalInfoPage && showOnboard ? (
                <Govtdocs
                  pincode={pincode}
                  occupation={work}
                  address_type={newAddressType}
                  email={email}
                  phone={phone}
                  accessToken={accessToken}
                  redirectUser={props.redirectUser}
                  dataBranch={dataBranch}
                  userProfile={userProfile}
                  query_to_send={query_to_send}
                  userFrom={userFrom}
                  getUserStatus={getUserStatus}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </OnBoardWrapper>
  );
};

export default OnBoardUser;
