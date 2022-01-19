import Button from "common/components/Button";
import Input from "common/components/Input";
import React, { useEffect, useState } from "react";

import LoginWrapper from "../../pages/login/login.style.js";
import { callApi } from "common/utils/loginMiddleware";
import validator from "validator";
import { useNotification } from "common/hooks/useNotification";

const UpdateAddress = (props) => {
  const { phone, accessToken } = props;

  const [newLocality, setNewLocality] = useState("");
  const [newAddressType, setNewAddressType] = useState("Home with family");
  const [newBuilding, setNewBuilding] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [states, setStates] = useState([]);
  const [entryErr, setEntryErr] = useState(false);
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
  }, []);

  const handleAddAddress = async () => {
    if (
      newLocality === "" ||
      newBuilding === "" ||
      newCity === "" ||
      newState === "" ||
      newPincode === ""
    ) {
      setEntryErr(true);
    } else {
      if (!validator.isAlpha(newCity)) {
        notify({ message: "Please Enter a valid city Name", type: "error" });
        return;
      }
      setEntryErr(false);
      try {
        let response = await callApi(
          "/add_update_address",
          "POST",
          {
            type: "add",
            source: "card_migration",
            locality: newLocality,
            address_type: newAddressType,
            building: newBuilding,
            city: newCity,
            state: newState,
            pincode: newPincode,
          },
          phone,
          accessToken
        );
        if (response.result === "success") {
          props.toggle();
          notify({ message: "Address Updated Successfully.", type: "success" });
        } else {
          notify({ message: response.message, type: "error" });
        }
      } catch (error) {
        notify({ message: error.message, type: "error" });
      }
    }
  };

  const displayUpdateAddressForm = () => {
    return (
      <div className="form input-line">
        <div className="form-group">
          <Input
            name="building"
            placeholder="Building"
            className="form-control"
            value={newBuilding}
            onChange={(e) => setNewBuilding(e)}
            type="text"
          />
          <div className="form-group">
            <select
              name="address_type"
              placeholder="Address Type"
              value={newAddressType}
              onChange={(e) => setNewAddressType(e.target.value)}
              className="form-control-select"
              style={{ marginTop: "1rem", marginLeft: "0.6rem" }}
            >
              <option value="Home with family">Home with family</option>
              <option value="Rented with family">Rented with family</option>
              <option value="Rented with friends">Rented with friends</option>
              <option value="Hostel/PG">Hostel/PG</option>
            </select>
          </div>
          <Input
            name="locality"
            placeholder="Locality"
            className="form-control"
            value={newLocality}
            onChange={(e) => setNewLocality(e)}
            type="text"
          />
          <Input
            name="city"
            placeholder="City"
            className="form-control"
            value={newCity}
            onChange={(e) => setNewCity(e)}
            type="text"
            style={{ marginTop: "0.5rem" }}
          />
          <div className="form-group">
            <select
              name="state"
              placeholder="State"
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
              className="form-control-select"
              style={{ marginTop: "1rem", marginLeft: "0.6rem" }}
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
          <Input
            name="pincode"
            placeholder="Pincode"
            className="form-control"
            value={newPincode}
            onChange={(e) => setNewPincode(e)}
            type="number"
            style={{ marginTop: "0.5rem" }}
          />
        </div>
        <Button
          onClick={(event) => handleAddAddress()}
          title="Update Address"
          style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          className="btn"
        ></Button>
        {entryErr ? (
          <>
            <br />
            <span style={{ color: "red" }}>All Fields Are Mandatory</span>
          </>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div className={"smartCardWrapper"}>
      <div className={"card"}>
        <div
          className={"cardBody"}
          style={{ paddingBottom: 0, paddingTop: "0.5rem" }}
        >
          <div>{displayUpdateAddressForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
