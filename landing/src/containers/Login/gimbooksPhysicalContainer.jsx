import React, { useState, useEffect } from "react";

import { callApi } from "common/utils/loginMiddleware";
import Button from "common/components/Button";
import Input from "common/components/Input";
import RebelPhysical from "public/styles/rebelPhysicalComponent.style";
import { useNotification } from "common/hooks/useNotification";

const GimbooksPhysicalCard = ({ phone, accessToken, refresh }) => {
  const [showAddressCard, setShowAddressCard] = useState(false);
  const [isDisbursed, setIsDisbursed] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddressType, setNewAddressType] = useState("Home with family");
  const [building, setBuilding] = useState();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [awbNumber, setAwbNumber] = useState();
  const [showTrackingNumber, setShowTrackingNumber] = useState(false);
  const notify = useNotification();
  useEffect(() => {
    checkUserAddress();
  }, [refresh]);
  const checkUserAddress = async () => {
    try {
      let response = await callApi(
        "/check_redcarpet_gimbooks_user_in_disbursed",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result === "success") {
        if (response.verify_address === true) setShowAddressCard(true);
        else if (response.verify_address === false) {
          if (response.message === "Card Already Delivered") {
            setIsDisbursed(true);
          } else {
            setShowAddressCard(false);
          }
        }
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (err) {
      notify({ message: err.message, type: "error" });
    }
  };
  //regex to block numbers
  const reg_for_string = /^([^0-9]*)$/;
  const submitAddressForm = async () => {
    if (building === "" || state === "" || city === "") {
      notify({ message: "Please Fill All The Details.", type: "error" });
    } else if (pincode.length !== 6) {
      notify({
        message: "Pincode Has To Be 6 Digits Number Only.",
        type: "error",
      });
    } else if (!reg_for_string.test(state) || !reg_for_string.test(city)) {
      notify({
        message: "Numbers Are Not Allowed In City And State",
        type: "error",
      });
    } else {
      try {
        let response = await callApi(
          "/add_update_address",
          "POST",
          {
            type: "add",
            source: "redcarpet_gimbooks_upgrade",
            locality: pincode,
            address_type: newAddressType,
            building: building,
            city: city,
            state: state,
            pincode: pincode,
          },
          phone,
          accessToken
        );
        if (response.result === "error") {
          notify({
            message: "Something Went Wrong,Please Try After Sometime.",
            type: "error",
          });
        } else if (response.result === "success") {
          checkUserAddress();
        }
      } catch (err) {
        notify({
          message: "Something Went Wrong,Please Try After Sometime.",
          type: "error",
        });
      }
    }
  };
  const addressForm = () => {
    if (showAddressForm) {
      return (
        <div
          style={{ margin: "15px" }}
          styles={{ marginRight: "10px", marginLeft: "10px" }}
          className="address-form"
        >
          <select
            value={newAddressType}
            onChange={(e) => {
              setNewAddressType(e.target.value);
            }}
            name="address_type"
            placeholder="Address Type"
            className="form-control-select"
          >
            <option value="Home with family">Home with family</option>
            <option value="Rented with family">Rented with family</option>
            <option value="Rented with friends">Rented with friends</option>
            <option value="Hostel/PG">Hostel/PG</option>
          </select>

          <div>
            <Input
              type="text"
              className="input-style"
              placeholder="Home Address"
              value={building}
              onChange={(e) => setBuilding(e)}
            />
            <Input
              className="input-style"
              placeholder="Pincode"
              type="number"
              value={pincode}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e === "" || re.test(e)) {
                  setPincode(e);
                }
              }}
              name="pincode"
              maxlength="6"
            />
            <Input
              className="input-style"
              value={state}
              onChange={(e) => {
                setState(e);
              }}
              placeholder="State"
              type="text"
              name="state"
            />
            <Input
              className="input-style"
              value={city}
              onChange={(e) => setCity(e)}
              placeholder="City"
              type="text"
              name="city"
              onChange={(e) => {
                setCity(e);
              }}
            />
          </div>
          <Button
            className="btn"
            title="Cancel"
            onClick={() => {
              setShowAddressForm(!showAddressForm);
            }}
            style={{ margin: "15px" }}
          />
          <Button
            className="btn"
            title="Submit"
            style={{ margin: "15px" }}
            onClick={submitAddressForm}
          />
        </div>
      );
    }
  };

  const getAwbNumber = async () => {
    try {
      let response = await callApi(
        "/get_user_awb_number",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        setAwbNumber(response.data[0].awb_number);
        setShowTrackingNumber(true);
      } else if (response.result === "error") {
        setShowTrackingNumber(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  if (!showAddressCard) {
    getAwbNumber();
  }
  return !isDisbursed ? (
    <div className={"pcardWrapper"}>
      <div className="card">
        <RebelPhysical>
          <div className="row-left">
            <div className="col30">
              <hr className="line" />
            </div>
            <div>
              <h1 styles={{ fontSize: "20px" }}>Physical Card</h1>
            </div>
          </div>
          {showAddressCard ? (
            <div className="addressMain">
              <h4>
                Please add an address to acquire a Physical Redcarpet GimBooks
                Card:
              </h4>
              <div className="address-btn">
                <Button
                  title="Add Address"
                  onClick={() => {
                    setShowAddressForm(!showAddressForm);
                  }}
                  className="btn"
                />
              </div>
              {addressForm()}
            </div>
          ) : (
            <div>
              <h4 style={{ textAlign: "center" }}>
                We have received your request for Physical Redcarpet GimBooks
                Card. Your card will be delivered soon.
              </h4>
              {showTrackingNumber ? (
                <div>
                  <div className="tracking-container">
                    <div className={"col60-sub"}>
                      <div className="row-left">
                        <div className="col30">
                          <hr className="line" />
                        </div>
                        <div>
                          <h2>Card Tracking</h2>
                        </div>
                      </div>
                    </div>
                    <div className="tracking-container">
                      <h3 style={{ textAlign: "center" }}>Tracking Number:</h3>
                      <div className="container">
                        <div className="tracking-number">{awbNumber}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <span>
                          {" "}
                          <a
                            href="https://www.bookmypacket.com/ERP/tracking_shipment"
                            target="_blank"
                            style={{ textAlign: "center" }}
                          >
                            Click here{" "}
                          </a>
                        </span>
                        To Track Your Order
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <br />
            </div>
          )}
        </RebelPhysical>
      </div>
    </div>
  ) : null;
};

export default GimbooksPhysicalCard;
