import React, { useState, useEffect, Fragment } from "react";
import { callApi } from "common/utils/loginMiddleware";
import Button from "common/components/Button";
import Input from "common/components/Input";
import Icon from "react-icons-kit";
import UploadDocuments from "../LoginMenu/OnBoardUser/UploadDocuments";

import { info } from "react-icons-kit/feather/info";
import validator from "validator";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { useNotification } from "common/hooks/useNotification";
import AnchorLink from "react-anchor-link-smooth-scroll";
import AddUpdateAddress from "./AddUpdateAddress";
import AddUpdateAddressWrapper from "./styles";
import CardMigrate from "./CardMigrate";
import CardIssued from "./CardIssued";

const UpdateKyc = ({ phone, accessToken, migrationData, isMigration }) => {
  const [loader, setLoader] = useState(false);
  const [isProofNeeded, setIsProofNeeded] = useState(false);

  const [panCard, setPanCard] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [isOtp, setIsOtp] = useState(false);

  const [newAddress, setNewAddress] = useState({});
  const [userAddressess, setUserAddressess] = useState([]);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [otp, setOtp] = useState("");
  const [clientId, setClientId] = useState("");
  const [aadharVerified, setAadharVerified] = useState(false);
  const [cardIssued, setCardIssued] = useState(false);
  const [panVerified, setPanVerified] = useState(false);
  const [loadAadhar, setLoadAadhar] = useState(false);
  const [loadPan, setLoadPan] = useState(false);
  const notify = useNotification();

  const toggle = (req) => {
    return req === true ? false : true;
  };

  const handlePOA = () => {
    setIsProofNeeded(toggle(isProofNeeded));
  };

  const getUserAddress = async () => {
    try {
      setLoader(true);
      let response = await callApi(
        "/get_user_addresses",
        "GET",
        {},
        phone,
        accessToken
      );
      setLoader(false);
      if (response.result === "success") {
        let newRespObj = {};
        if (response.address.length > 0) {
          response.address.forEach((e) => {
            if (
              e.extra_details.hasOwnProperty("dispatch_lost") &&
              e.extra_details.dispatch_lost === true
            ) {
              Object.assign(newRespObj, {
                id: e.id,
                locality: e.locality,
                address_type: e.address_type,
                building: e.building,
                city: e.city,
                state: e.state,
                pincode: e.pincode,
                current_address: e.current_address,
                extra_details: e.extra_details,
              });
            }
          });
          if (
            showNewAddress ||
            (Object.keys(newRespObj).length === 0 &&
              newRespObj.constructor === Object)
          ) {
            Object.assign(newRespObj, {
              id: response.address[0].id,
              locality: response.address[0].locality,
              address_type: response.address[0].address_type,
              building: response.address[0].building,
              city: response.address[0].city,
              state: response.address[0].state,
              pincode: response.address[0].pincode,
              current_address: response.address[0].current_address,
              extra_details: response.address[0].extra_details,
            });
          }
        }
        setNewAddress(newRespObj);
        setUserAddressess(response.address);
        setShowNewAddress(false);
      } else {
        setShowNewAddress(false);
        setUserAddressess([]);
      }
    } catch (error) {
      setShowNewAddress(false);
      notify({ message: error.message, type: "error" });
    }
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  const handlePan = async () => {
    if (!validator.isLength(panCard, { min: 10, max: 10 })) {
      return notify({ message: "Enter valid Pan Card", type: "error" });
    }
    try {
      setLoadPan(true);
      let response = await callApi(
        "/set_pan_alternate",
        "POST",
        {
          pan: panCard,
          kyc_for: "sbm",
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        setLoadPan(false);
        setPanVerified(true);
        notify({ message: "Pan verified", type: "success" });
      } else {
        setLoadPan(false);
        notify({ message: response.message, type: "error" });
      }
    } catch (err) {
      setLoadPan(false);
      notify({ message: err.message, type: "error" });
    }
  };

  const resendOtp = async () => {
    try {
      setLoadAadhar(true);
      let response = await callApi(
        "/verify_aadhar_id_for_alt",
        "POST",
        {
          pincode: newAddress.pincode,
          occupation: migrationData.occupation,
          address_type: newAddress.address_type,
          aadhar_no: aadharCard,
          type: "generate",
          email: migrationData.email,
          kyc_for: "sbm",
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        setLoadAadhar(false);
        setClientId(response.client_id);
        notify({ message: "OTP sent successfully", type: "success" });
      } else {
        setLoadAadhar(false);
        notify({ message: response.message, type: "error" });
      }
    } catch (e) {
      setLoadAadhar(false);
      notify({ message: e.message, type: "error" });
    }
  };

  const handleAadhar = async () => {
    if (isOtp) {
      try {
        setLoadAadhar(true);
        let response = await callApi(
          "/verify_aadhar_id_for_alt",
          "POST",
          {
            otp: otp,
            type: "verify",
            client_id: clientId,
            kyc_for: "sbm",
          },
          phone,
          accessToken
        );
        if (response.result === "success") {
          setLoadAadhar(false);
          setAadharVerified(true);
          notify({ message: "OTP verified Successfully", type: "success" });
        } else {
          setLoadAadhar(false);
          notify({ message: response.message, type: "error" });
        }
      } catch (e) {
        setLoadAadhar(false);
        notify({ message: e.message, type: "error" });
      }
    } else {
      if (
        !validator.isNumeric(aadharCard) ||
        !validator.isLength(aadharCard, {
          min: 12,
          max: 12,
        })
      ) {
        return notify({ message: "Enter valid Aadhaar Card", type: "error" });
      }
      try {
        setLoadAadhar(true);
        let response = await callApi(
          "/verify_aadhar_id_for_alt",
          "POST",
          {
            pincode: newAddress.pincode,
            occupation: migrationData.occupation,
            address_type: newAddress.address_type,
            aadhar_no: aadharCard,
            type: "generate",
            email: migrationData.email,
            kyc_for: "sbm",
          },
          phone,
          accessToken
        );
        if (response.result == "success") {
          setLoadAadhar(false);
          setClientId(response.client_id);
          notify({ message: "OTP sent successfully", type: "success" });
          setIsOtp(true);
        } else {
          setLoadAadhar(false);
          notify({ message: response.message, type: "error" });
        }
      } catch (e) {
        setLoadAadhar(false);
        notify({ message: e.message, type: "error" });
      }
    }
  };

  const handleCardIssued = () => {
    if (
      migrationData.aadhar_needed == true &&
      migrationData.pan_needed == true
    ) {
      if (aadharVerified == true && panVerified == true) {
        setCardIssued(toggle(cardIssued));
      } else {
        notify({ message: "Please verify all details", type: "error" });
      }
    } else if (
      migrationData.pan_needed == false &&
      migrationData.aadhar_needed == true &&
      aadharVerified == true
    ) {
      setCardIssued(toggle(cardIssued));
    } else if (
      migrationData.aadhar_needed == false &&
      migrationData.pan_needed == true &&
      panVerified == true
    ) {
      setCardIssued(toggle(cardIssued));
    } else {
      notify({ message: "Please verify all the details", type: "error" });
    }
  };

  const renderPOA = () => {
    return (
      <Fragment>
        <div>
          <div
            style={{
              textAlign: "center",
              margin: 0,
            }}
          >
            <h2>Government Documents</h2>
          </div>

          <div className="form Input-line">
            {migrationData.aadhar_needed ? (
              <div className="form-control row">
                <div className="btn-2">
                  <Input
                    label="Aadhaar Card"
                    placeholder="Aadhaar Card"
                    value={isOtp ? "XXXX-XXXX-XXXX" : aadharCard}
                    icon={
                      (validator.isNumeric(aadharCard) &&
                        validator.isLength(aadharCard, {
                          min: 12,
                          max: 12,
                        })) ||
                      aadharVerified ? (
                        <Icon icon={ic_check_circle} className="" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    onChange={(e) => {
                      setAadharCard(e);
                    }}
                    type="text"
                    className={
                      (validator.isNumeric(aadharCard) &&
                        validator.isLength(aadharCard, {
                          min: 12,
                          max: 12,
                        })) ||
                      aadharVerified
                        ? "green-border"
                        : ""
                    }
                    disabled={isOtp ? true : false}
                  />
                  <div style={{ marginTop: "5%", marginBottom: "5%" }}>
                    {isOtp ? (
                      <div>
                        <Input
                          placeholder="Enter OTP"
                          onChange={(e) => {
                            setOtp(e);
                          }}
                          type="text"
                          disabled={aadharVerified ? true : false}
                          style={{ marginBottom: 10 }}
                        />
                        <span
                          className="note-black btn_txt"
                          onClick={
                            !loadAadhar &&
                            !aadharVerified &&
                            (() => resendOtp())
                          }
                        >
                          <Icon icon={info} /> Click here to resend OTP
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="btn-1">
                  <Button
                    title={
                      loadAadhar
                        ? "Loading.."
                        : aadharVerified
                        ? "Verified"
                        : !isOtp
                        ? "Send OTP"
                        : "Verify OTP"
                    }
                    className={
                      loadAadhar
                        ? "grey-btn"
                        : aadharVerified
                        ? "grey-btn"
                        : aadharCard.length != 12
                        ? "grey-btn"
                        : "btn"
                    }
                    onClick={() => {
                      handleAadhar();
                    }}
                    style={{ padding: 0 }}
                    disabled={aadharVerified ? true : loadAadhar ? true : false}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {(migrationData.pan_needed && aadharVerified) ||
            (migrationData.pan_needed &&
              migrationData.aadhar_needed == false) ? (
              <div className="form-control row">
                <div className="btn-2">
                  <Input
                    label="Pan Card"
                    placeholder="Pan Card"
                    value={panCard}
                    onChange={(e) => {
                      setPanCard(e);
                    }}
                    type="text"
                    icon={
                      validator.isLength(panCard, {
                        min: 10,
                        max: 10,
                      }) ? (
                        <Icon icon={ic_check_circle} className="" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    className={
                      validator.isLength(panCard, {
                        min: 10,
                        max: 10,
                      })
                        ? "green-border"
                        : ""
                    }
                    disabled={panVerified ? true : false}
                  />
                </div>
                <div className="btn-1">
                  <Button
                    title={
                      loadPan
                        ? "Verifying"
                        : panVerified
                        ? "Verified"
                        : "Verify Pan"
                    }
                    className={
                      panVerified
                        ? "grey-btn"
                        : loadPan
                        ? "grey-btn"
                        : panCard.length == 10
                        ? "btn"
                        : "grey-btn"
                    }
                    onClick={() => {
                      handlePan();
                    }}
                    style={{ padding: 0, marginTop: 10 }}
                    disabled={panVerified ? true : loadPan ? true : false}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {isProofNeeded && migrationData.address_update_needed ? (
        <AddUpdateAddress
          phone={phone}
          accessToken={accessToken}
          migrationData={migrationData}
          isMigration={isMigration}
        />
      ) : isProofNeeded && !migrationData.address_update_needed ? (
        <CardMigrate
          phone={phone}
          accessToken={accessToken}
          migrationData={migrationData}
          isMigration={isMigration}
        />
      ) : cardIssued ? (
        <CardIssued
          phone={phone}
          accessToken={accessToken}
          migrationData={migrationData}
          isMigration={isMigration}
        />
      ) : migrationData.aadhar_needed == false &&
        migrationData.pan_needed == false ? (
        <CardIssued
          phone={phone}
          accessToken={accessToken}
          migrationData={migrationData}
          isMigration={isMigration}
        />
      ) : (
        <div>
          <AddUpdateAddressWrapper>
            <Fragment>
              <div className={"pcardWrapper"}>
                <div style={{ margin: "2%" }}>
                  <div className="row-left">
                    <div className="col30">
                      <hr className="line" />
                    </div>
                    <div className="col70">
                      <h1>Update your KYC</h1>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h2 className="address-heading">
                      Please update your KYC as we do not have recent
                      information about you
                    </h2>
                  </div>
                  {renderPOA()}
                  <div className="row">
                    {(migrationData.aadhar_needed &&
                      aadharVerified &&
                      migrationData.pan_needed &&
                      panVerified) ||
                    (migrationData.aadhar_needed &&
                      aadharVerified &&
                      !migrationData.pan_needed) ||
                    (migrationData.pan_needed &&
                      panVerified &&
                      !migrationData.aadhar_needed) ? (
                      <AnchorLink
                        href="#scroll-up"
                        className="scroll-btn"
                        style={{ marginBottom: 0 }}
                      >
                        <Button
                          className="btn"
                          title="Continue"
                          onClick={() => handleCardIssued()}
                        />
                      </AnchorLink>
                    ) : (
                      ""
                    )}

                    <Button
                      onClick={() => {
                        handlePOA();
                      }}
                      title="Back"
                      className="btn-light"
                      style={{ marginTop: 10 }}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          </AddUpdateAddressWrapper>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateKyc;
