import React, { useState, useEffect } from "react";

import { callApi } from "common/utils/loginMiddleware";
import Button from "common/components/Button";
import Input from "common/components/Input";
import RebelPhysical from "public/styles/rebelPhysicalComponent.style";
import { useNotification } from "common/hooks/useNotification";

const PhysicalCard = ({ phone, accessToken, refresh }) => {
  const [showAddressCard, setShowAddressCard] = useState(false);
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
        "/check_rebel_user_in_disbursed",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.verify_address === true) setShowAddressCard(true);
      else if (response.verify_address === false) setShowAddressCard(false);
    } catch (err) {
      console.error(err);
    }
  };
  //regex to block numbers
  const reg_for_string = /^([^0-9]*)$/;
  const submitAddressForm = async (e) => {
    e.preventDefault();
    if (!reg_for_string.test(state) || !reg_for_string.test(city)) {
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
            source: "rebel_upgrade",
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
            message: response.message,
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
        <form className="address-form" onSubmit={(e) => submitAddressForm(e)}>
          <br />
          <select
            name="address_type"
            placeholder="Select Address Type"
            value={newAddressType}
            onChange={(e) => {
              setNewAddressType(e.target.value);
            }}
            style={{
              width: "80%",
              margin: "auto",
              display: "block",
              borderRadius: "10px",
            }}
            name="address_type"
            placeholder="Address Type"
            className="form-control-select"
          >
            <option selected disabled hidden value="">
              Select Address Type
            </option>
            <option value="Home with family">Home with family</option>
            <option value="Rented with family">Rented with family</option>
            <option value="Rented with friends">Rented with friends</option>
            <option value="Hostel/PG">Hostel/PG</option>
          </select>
          <br />
          <div className="lable-input">
            <label>House Address Information</label>
          </div>
          <Input
            type="text"
            className="input-style"
            placeholder="Home Address"
            value={building}
            onChange={(e) => setBuilding(e)}
            required
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
            required
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
            required
          />
          <Input
            className="input-style"
            placeholder="Pincode"
            type="number"
            pattern="^[0-9]*$"
            value={pincode}
            onChange={(e) => {
              setPincode(e);
            }}
            name="pincode"
            maxlength="6"
            minLength="6"
            required
          />
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
            type="submit"
            style={{ margin: "15px" }}
          />
        </form>
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
  return (
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
              <h4>Please add an address to acquire a Physical Rebel Card:</h4>
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
                We have received your request for Physical Rebel Card. Your card
                will be delivered soon.
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
  );
};

export default PhysicalCard;
