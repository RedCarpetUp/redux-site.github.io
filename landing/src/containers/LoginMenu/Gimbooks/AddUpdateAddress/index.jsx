import React, { useState, useEffect, Fragment } from "react";
import { callApi } from "common/utils/loginMiddleware";
import Button from "common/components/Button";
import Input from "common/components/Input";
import Icon from "react-icons-kit";
import UploadDocuments from "../../OnBoardUser/UploadDocuments";

import { info } from "react-icons-kit/feather/info";
import validator from "validator";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useNotification } from "common/hooks/useNotification";
import AddUpdateAddressWrapper from "./styles";
import useAnalytics from "../../../../common/hooks/useAnalytics";
import { analyticsData } from "../../../../common/data/analytics";

const AddUpdateAddress = ({
  phone,
  accessToken,
  redirectUser,
  selectedProduct,
  getBacktoProduct,
  moveUser,
  userProfile,
}) => {
  const [loader, setLoader] = useState(false);
  const [newAddress, setNewAddress] = useState({});
  const [userAddressess, setUserAddressess] = useState([]);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [isProofNeeded, setIsProofNeeded] = useState(false);
  // by default uploadDocuments is set true so that user will skip address conformation screen
  //should be set to false when address confomation screen is required again
  const [uploadDocuments, setUploadDocuments] = useState(true);
  const [refreshMsg, setRefreshMsg] = useState(false);

  const [newLocality, setNewLocality] = useState("");
  const [newAddressType, setNewAddressType] = useState("Home with family");
  const [newBuilding, setNewBuilding] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newPincode, setNewPincode] = useState("");

  const [states, setStates] = useState([]);

  const [aadhar, setAadhar] = useState("");
  const [id, setId] = useState("");
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [idType, setIdType] = useState(" ");

  const [isLoading, setIsLoading] = useState(false);
  const notify = useNotification();

  const verifyId = async () => {
    try {
      setIsLoading(true);
      let response2 = await callApi(
        "/set_document_identification",
        "POST",
        {
          verify_type: "poa_verify",
          type: "Driving",
          id_number: id,
        },
        phone,
        accessToken
      );
      if (response2.result === "success") {
        setIsIdVerified(true);
        notify({ message: "You are Registered Successfully", type: "success" });
      } else {
        notify({ message: response2.message, type: "error" });
      }
    } catch (error) {
      setIsLoading(false);
      notify({ message: error.message, type: "error" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getStates = async () => {
      try {
        let response = await callApi(
          "/get_all_states",
          "GET",
          {},
          phone,
          accessToken
        );
        if (response.result === "success") {
          setStates(response.state_data);
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    };
    getStates();
  }, [refreshMsg]);

  const toggle = (req) => {
    return req === true ? false : true;
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
    let analyticData = {
      Event: analyticsData.VISITED_SCREEN,
      "Screen Name": analyticsData.GIMBOOKS_ADDRESS_DETAILS_SCREEN,
    };
    useAnalytics(analyticData);
    getUserAddress();
  }, []);

  const handlePOA = () => {
    setIsProofNeeded(toggle(isProofNeeded));
  };

  const handleCurrentPOA = () => {
    notify({
      message: "Currently we only delievered card at users aadhaar address",
      type: "error",
    });
  };

  let updateAddress = async () => {
    let response = await callApi(
      "/add_update_address",
      "POST",
      {
        locality: newLocality,
        address_type: newAddressType,
        building: newBuilding,
        city: newCity,
        state: newState,
        pincode: newPincode,
        source: "poa_address",
        type: "add",
      },
      phone,
      accessToken
    );

    if (response.result === "error") {
      notify({ message: response.message, type: "error" });
    } else if (response.result === "success") {
      notify({ message: "Address Updated Successfully", type: "success" });
      setUploadDocuments(true);
    }
  };

  const renderPOA = () => {
    if (isProofNeeded) {
      return (
        <Fragment>
          <div>
            <div
              style={{
                textAlign: "center",
                marginTop: "70px",
                marginBottom: "60px",
              }}
            >
              <h1>Please provide the address</h1>
              <p>*Remember you also have to provide proof of this address</p>
            </div>

            <div className="form Input-line">
              <div className="form-control">
                <Input
                  label="Building"
                  placeholder="Building"
                  value={newBuilding}
                  onChange={(e) => {
                    setNewBuilding(e);
                  }}
                  type="text"
                  style={{ marginTop: "1rem" }}
                />
              </div>
              <div className="form-control">
                <label for="address_type">Address Type</label>
                <select
                  style={{ opacity: "0.6" }}
                  name="address_type"
                  placeholder="Address Type"
                  className={"form-control-select"}
                  value={newAddressType}
                  onChange={(e) => setNewAddressType(e.target.value)}
                  style={{ marginTop: "1rem", opacity: "0.6" }}
                >
                  <option value="" selected disabled hidden>
                    Select Address Type
                  </option>
                  <option value="Home with family">Home with family</option>
                  <option value="Rented with family">Rented with family</option>
                  <option value="Rented with friends">
                    Rented with friends
                  </option>
                  <option value="Hostel/PG">Hostel/PG</option>
                </select>
              </div>
              <div className="form-control">
                <Input
                  label="Locality"
                  placeholder="Locality"
                  value={newLocality}
                  onChange={(e) => setNewLocality(e)}
                  type="text"
                  style={{ marginTop: "1rem" }}
                />
              </div>
              <div className="form-control">
                <Input
                  label="City"
                  placeholder="City"
                  value={newCity}
                  onChange={(e) => setNewCity(e)}
                  type="text"
                  style={{ marginTop: "1rem" }}
                />
              </div>

              <div className="form-control">
                <label for="state">State</label>

                <select
                  label="State"
                  placeholder="State"
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                  className={"form-control-select"}
                  style={{ marginTop: "1rem", opacity: "0.6" }}
                >
                  <option value="" selected disabled hidden>
                    Select State
                  </option>
                  {states.map((item, key) => {
                    return (
                      <option value={item.name} id={key}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-control">
                <Input
                  label="Pincode"
                  placeholder="Pincode"
                  value={newPincode}
                  onChange={(e) => setNewPincode(e)}
                  type="number"
                  style={{ marginTop: "0.5rem" }}
                />
              </div>

              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">
                  <h1>Address Confirmation</h1>
                </div>
              </div>
            </div>

            <Fragment>
              <div className="form-control">
                <label for="id_type">Identity Type</label>
                <select
                  style={{ opacity: "0.6" }}
                  name="id_type"
                  placeholder="Identity Type"
                  className={"form-control-select"}
                  onChange={(e) => setIdType(e.target.value)}
                  style={{ marginTop: "1rem", opacity: "0.6" }}
                >
                  <option value="" selected disabled hidde>
                    Select Identity Type
                  </option>
                  <option value="Voter">Voter Id</option>
                  <option value="Driving">Driving Licence</option>
                </select>
              </div>

              <span className={"inputPayCombo"}>
                <Input
                  type="number"
                  label="Enter Your Id Number"
                  className={
                    (validator.isNumeric(aadhar) &&
                      validator.isLength(aadhar, {
                        min: 12,
                        max: 12,
                      })) ||
                    "payinput"
                  }
                  placeholder="Identity Number"
                  icon={
                    (validator.isNumeric(aadhar) &&
                      validator.isLength(aadhar, {
                        min: 12,
                        max: 12,
                      })) ||
                    ""
                  }
                  iconPosition="right"
                  onChange={(event) => setId(event)}
                />
                <Button
                  className={"paybtn"}
                  onClick={(event) => {
                    verifyId(event);
                  }}
                  title={"Verify"}
                ></Button>
              </span>
              <span className={"inputPayCombo-note"}>
                <div className="note-black">
                  <Icon icon={info} />
                  Please Click verify for your Identity Verification.
                </div>
              </span>
            </Fragment>

            <div
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "50px",
              }}
            >
              <Button
                className={isIdVerified ? "btn-full" : "btn-full-grey"}
                onClick={(event) => updateAddress()}
                title="Update Address"
                disabled={isIdVerified ? false : true}
              />
            </div>
          </div>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      {uploadDocuments ? (
        <UploadDocuments
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          userProfile={userProfile}
        />
      ) : (
        <div>
          <AddUpdateAddressWrapper>
            <Fragment>
              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">
                  <h1>Address Confirmation</h1>
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
                  Please confirm You will be able to take delievery of you card
                  at the address below:
                </h2>
                <h3 className="address-response">
                  {newAddress.building} {newAddress.locality} {newAddress.city}{" "}
                  {newAddress.state}{" "}
                </h3>
                <h3 className="address-response">
                  {" "}
                  Pincode: {newAddress.pincode}{" "}
                </h3>
              </div>

              <div className="row">
                <AnchorLink href="#scroll-up" className="scroll-btn">
                  <Button
                    className="btn"
                    onClick={() => {
                      setUploadDocuments(true);
                    }}
                    title="Yes"
                  />
                </AnchorLink>
                <Button
                  onClick={() => {
                    handleCurrentPOA();
                  }}
                  title="No"
                  className="btn-light"
                />
              </div>
              <div style={{ width: "100%" }}>{renderPOA()}</div>
            </Fragment>
          </AddUpdateAddressWrapper>
        </div>
      )}
    </Fragment>
  );
};

export default AddUpdateAddress;
