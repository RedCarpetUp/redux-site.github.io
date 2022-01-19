import React, { useState, useEffect, Fragment } from "react";
import { callApi } from "common/utils/loginMiddleware";
import Button from "common/components/Button";
import Input from "common/components/Input";
import Icon from "react-icons-kit";
import UploadDocuments from "../LoginMenu/OnBoardUser/UploadDocuments";

import { info } from "react-icons-kit/feather/info";
import validator from "validator";
import AnchorLink from "react-anchor-link-smooth-scroll";
import UpdateKyc from "./UpdateKyc";
import AddUpdateAddressWrapper from "./styles";
import CardMigrate from "./CardMigrate";
import { useNotification } from "common/hooks/useNotification";

const AddUpdateAddress = ({
  phone,
  accessToken,
  migrationData,
  isMigration,
}) => {
  const [loader, setLoader] = useState(false);
  const [newAddress, setNewAddress] = useState({});
  const [userAddressess, setUserAddressess] = useState([]);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [updateAddress, setUpdateAddress] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState(false);

  const [newLocality, setNewLocality] = useState("");
  const [newAddressType, setNewAddressType] = useState("Home with family");
  const [newBuilding, setNewBuilding] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newPincode, setNewPincode] = useState("");

  const [states, setStates] = useState([]);
  const [cardReplace, setCardReplace] = useState(false);
  const [isKyc, setIsKyc] = useState(false);
  const notify = useNotification();

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
    getUserAddress();
  }, []);

  const handlePOA = () => {
    setUpdateAddress(toggle(updateAddress));
  };

  const handleConfirmAddress = async () => {
    try {
      let response = await callApi(
        "/add_update_address",
        "POST",
        {
          locality: newAddress.locality,
          address_type: newAddress.address_type,
          building: newAddress.building,
          city: newAddress.city,
          state: newAddress.state,
          pincode: newAddress.pincode,
          source: "sbm_migration_address",
          type: "add",
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        notify({ message: "Address confirmed successfully", type: "success" });
        setIsKyc(toggle(isKyc));
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (e) {
      notify({ message: e.message, type: "error" });
    }
  };

  const handleBackUpdate = () => {
    handlePOA();
    getUserAddress();
  };

  let handleUpdateAddress = async () => {
    if (
      newLocality == "" ||
      newBuilding == "" ||
      newCity == "" ||
      newPincode == "" ||
      newState == ""
    ) {
      return notify({ message: "Please fill all details", type: "error" });
    }
    try {
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
          source: "sbm_migration_address",
          type: "add",
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        notify({ message: "Address Updated Successfully", type: "success" });
        handlePOA();
        setIsKyc(toggle(isKyc));
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (e) {
      notify({ message: e.message, type: "error" });
    }
  };

  const handleCardReplace = () => {
    setCardReplace(toggle(cardReplace));
  };

  const renderKyc = () => {
    return (
      <UpdateKyc
        phone={phone}
        accessToken={accessToken}
        migrationData={migrationData}
        isMigration={isMigration}
      />
    );
  };
  const renderPOA = () => {
    if (updateAddress) {
      return (
        <Fragment>
          <div
            style={{
              textAlign: "center",
              marginTop: "70px",
              marginBottom: "30px",
            }}
          >
            <h1>Update current address</h1>
            <h3 style={{ margin: 0 }}>
              Your new card will be shipped to this address. Please confirm or
              update your current address
            </h3>
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
                <option value="Rented with friends">Rented with friends</option>
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
          </div>

          <div
            style={{
              textAlign: "center",
              paddingTop: "20px",
              paddingBottom: "30px",
            }}
            className="row"
          >
            <Button
              onClick={(event) => handleUpdateAddress()}
              title="Update Address"
            />
            <span style={{ marginLeft: "2%" }}>
              <Button
                onClick={() => {
                  handleBackUpdate();
                }}
                title="Back"
              />
            </span>
          </div>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      {updateAddress ? (
        <AddUpdateAddressWrapper>
          <div className={"pcardWrapper"}>
            <div style={{ margin: "2%" }}>{renderPOA()}</div>
          </div>
        </AddUpdateAddressWrapper>
      ) : !isKyc && migrationData.address_update_needed && !cardReplace ? (
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
                      <h1>Confirm current address</h1>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h3 className="">
                      Your new card will be shipped to this address. Please
                      confirm or update your current address
                    </h3>
                    <div className="form-control">
                      <select
                        name="address"
                        placeholder="Address"
                        value={JSON.stringify(newAddress)}
                        onChange={(e) =>
                          setNewAddress(JSON.parse(e.target.value))
                        }
                        className="form-control-select"
                      >
                        {userAddressess.map((obj) => {
                          return (
                            <option
                              value={JSON.stringify({
                                id: obj.id,
                                locality: obj.locality,
                                address_type: obj.address_type,
                                building: obj.building,
                                city: obj.city,
                                state: obj.state,
                                pincode: obj.pincode,
                                current_address: obj.current_address,
                                extra_details: obj.extra_details,
                              })}
                            >
                              {obj.current_address}, {obj.city}, {obj.state} (
                              {obj.pincode})
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <h3 style={{ textAlign: "center" }}>
                      {newAddress.building} {newAddress.locality}{" "}
                      {newAddress.city} {newAddress.state}{" "}
                    </h3>
                    <h3 style={{ textAlign: "center" }}>
                      {" "}
                      Pincode: {newAddress.pincode}{" "}
                    </h3>
                  </div>

                  <div className="row">
                    <AnchorLink href="#scroll-up" className="scroll-btn">
                      <Button
                        onClick={() => {
                          handleConfirmAddress();
                        }}
                        className="btn"
                        title="Confirm Address"
                      />
                    </AnchorLink>
                    <Button
                      onClick={() => {
                        handlePOA();
                      }}
                      title="Update Address"
                      className="btn-light"
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          </AddUpdateAddressWrapper>
        </div>
      ) : cardReplace ? (
        <CardMigrate
          phone={phone}
          accessToken={accessToken}
          migrationData={migrationData}
          isMigration={isMigration}
        />
      ) : (
        <div>{renderKyc()}</div>
      )}
    </Fragment>
  );
};

export default AddUpdateAddress;
