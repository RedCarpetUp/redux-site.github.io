import React, { useState } from "react";
import Input from "common/components/Input";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import OnBoardWrapper from "./style";
import { useNotification } from "common/hooks/useNotification";
import validator from "validator";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { ic_error } from "react-icons-kit/md/ic_error";
import Icon from "react-icons-kit";
import AnchorLink from "react-anchor-link-smooth-scroll";

const PersonalInfo = (props) => {
  const { phone, accessToken, getUserStatus } = props;
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [gst, setGst] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [accHolder, setAccHolder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bankName, setBankName] = useState("");
  const notify = useNotification();

  const regex_for_gst =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const regex_for_ifsc = /^[A-Za-z]{4}\d{7}$/;
  const regex_for_bank_account = /^\d{9,18}$/;
  const sendPersonalData = async () => {
    if (
      bankName === "" ||
      city === "" ||
      state === "" ||
      locality === "" ||
      shopAddress === "" ||
      shopName === "" ||
      gst === "" ||
      pincode === "" ||
      email === "" ||
      ifsc === "" ||
      accNumber === "" ||
      accHolder === ""
    ) {
      notify({ type: "error", message: "Please fill all the details" });
      return;
    } else if (!regex_for_ifsc.test(ifsc)) {
      notify({ type: "error", message: "Please enter a valid ifsc code" });
      return;
    } else if (!regex_for_gst.test(gst)) {
      notify({ type: "error", message: "Please enter a valid gst number" });
      return;
    } else if (!regex_for_bank_account.test(accNumber)) {
      notify({
        type: "error",
        message: "Please enter a valid bank account number",
      });
      return;
    }
    try {
      let response = await callApi(
        "/register_xiaomi_merchant",
        "POST",
        {
          email: email,
          shop_name: shopName,
          pincode: pincode,
          building: shopAddress,
          locality: locality,
          city: city,
          state: state,
          gstin: gst,
          address_type: "shop",
          bank_ifsc: ifsc,
          account_no: accNumber,
          account_holder_name: accHolder,
          bank_name: bankName,
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        getUserStatus();
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (e) {
      notify({ message: e.message, type: "error" });
    }
  };
  let aadharVerified = false;
  return (
    <OnBoardWrapper>
      <div className="row">
        {isLoading ? (
          <div className="loader">
            <div class="lds-dual-ring"></div>
          </div>
        ) : (
          <div className={"col60"}>
            <div className="section-dialog" style={{ background: "#fafbfb" }}>
              <div>
                <div className="row-left">
                  <div className="col30">
                    <hr className="line" />
                  </div>
                  <div className="col70">
                    <h1>Personal Information</h1>
                  </div>
                </div>
                <form className="form-control">
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Email Address"
                    icon={
                      validator.isEmail(email) ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : email.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required
                    onChange={(event) => setEmail(event)}
                    value={email}
                    className={
                      validator.isEmail(email)
                        ? "green-border"
                        : email.length > 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="text"
                    label="GST Number"
                    placeholder="GST Number"
                    icon={
                      regex_for_gst.test(gst) ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : gst.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    maxLength="15"
                    minLength="15"
                    iconPosition="right"
                    required
                    onChange={(event) => setGst(event)}
                    value={gst}
                    className={
                      regex_for_gst.test(gst)
                        ? "green-border"
                        : gst.length > 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="text"
                    label="Shop Name"
                    placeholder="Shop Name"
                    icon={
                      shopName.length > 3 ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : shopName.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required
                    onChange={(event) => setShopName(event)}
                    value={shopName}
                    className={
                      validator.isAlpha(shopName)
                        ? "green-border"
                        : shopName.length < 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="text"
                    label="Shop Address"
                    placeholder="Shop Address"
                    icon={
                      shopAddress.length > 3 ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : shopAddress.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required
                    onChange={(event) => setShopAddress(event)}
                    value={shopAddress}
                    className={
                      validator.isAlpha(shopAddress)
                        ? "green-border"
                        : shopAddress.length < 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="text"
                    label="Locality"
                    placeholder="Locality"
                    icon={
                      locality.length > 3 ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : locality.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required
                    onChange={(event) => setLocality(event)}
                    value={locality}
                    className={
                      validator.isAlphanumeric(locality)
                        ? "green-border"
                        : pincode.length < 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="text"
                    label="State"
                    placeholder="State"
                    icon={
                      state.length > 3 ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : state.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required
                    onChange={(event) => setState(event)}
                    value={state}
                    className={
                      validator.isAlphanumeric(state)
                        ? "green-border"
                        : pincode.length < 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="number"
                    label="Pincode"
                    placeholder="Pincode"
                    icon={
                      pincode.length === 6 && validator.isNumeric(pincode) ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : pincode.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    maxLength="6"
                    minLength="6"
                    pattern="^[0-9]*$"
                    iconPosition="right"
                    required={true}
                    onChange={(event) => setPincode(event)}
                    value={pincode}
                    className={
                      pincode.length === 6 && validator.isNumeric(pincode)
                        ? "green-border"
                        : pincode.length > 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="text"
                    label="City"
                    placeholder="City"
                    icon={
                      city.length > 3 ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : city.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required
                    onChange={(event) => setCity(event)}
                    value={city}
                    className={
                      validator.isAlphanumeric(city)
                        ? "green-border"
                        : pincode.length < 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="text"
                    label="IFSC Code"
                    placeholder="IFSC Code"
                    icon={
                      regex_for_ifsc.test(ifsc) ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : ifsc.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    maxLength="11"
                    iconPosition="right"
                    required
                    onChange={(event) => setIfsc(event)}
                    value={ifsc}
                    className={
                      regex_for_ifsc.test(ifsc)
                        ? "green-border"
                        : ifsc.length < 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="text"
                    label="Bank Name"
                    placeholder="Bank Name"
                    icon={
                      bankName.length > 3 ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : bankName.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required
                    onChange={(event) => setBankName(event)}
                    value={bankName}
                    className={
                      validator.isAlpha(bankName)
                        ? "green-border"
                        : bankName.length < 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="text"
                    label="Account Holder Name"
                    placeholder="Account Holder Name"
                    icon={
                      accHolder.length > 3 ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : accHolder.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required
                    onChange={(event) => setAccHolder(event)}
                    value={accHolder}
                    className={
                      validator.isAlpha(accHolder)
                        ? "green-border"
                        : accHolder.length < 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    inputType="number"
                    label="Account Number"
                    placeholder="Account Number"
                    icon={
                      regex_for_bank_account.test(accNumber) ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : accNumber.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required
                    onChange={(event) => setAccNumber(event)}
                    value={accNumber}
                    className={
                      regex_for_bank_account.test(accNumber)
                        ? "green-border"
                        : accNumber.length < 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <AnchorLink href="#scroll-up">
                    <Button
                      type="submit"
                      title="Submit"
                      isMaterial="true"
                      style={{ marginBottom: "10px" }}
                      className="btn-full"
                      onClick={sendPersonalData}
                    />
                  </AnchorLink>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </OnBoardWrapper>
  );
};

export default PersonalInfo;
