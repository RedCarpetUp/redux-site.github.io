import React, { Fragment, useState } from "react";
import Icon from "react-icons-kit";
import PhoneNumberWrapper from "./style";
import Input from "common/components/Input";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { ic_error } from "react-icons-kit/md/ic_error";
import Button from "common/components/Button";
import validator from "validator";
import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const PhoneNumber = ({ phone, accessToken, getUserStatus }) => {
  const [isloading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const notify = useNotification();
  const [showUserInformation, setShowUserInformation] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const renderUserInformation = () => (
    <div className="xiaomi-user-details">
      <ul>
        <li>
          <b>Email : </b>
          {userDetails.email}
        </li>
        <li>
          <b>Name : </b>
          {userDetails.name}
        </li>
        <li>
          <b>Phone : </b>
          {userDetails.phone}
        </li>
      </ul>
      <br />
      <AnchorLink href="#scroll-up">
        <Button
          onClick={() => getUserStatus()}
          title="Continue"
          isMaterial="true"
          className="btn-full"
        ></Button>
      </AnchorLink>
    </div>
  );

  const sendPersonalData = async () => {
    if (!name) {
      notify({
        message: "Please enter the customer name",
        type: "error",
      });
      return;
    }
    if (!phoneNumber) {
      notify({
        message: "Please enter the phone number",
        type: "error",
      });
      return;
    }
    if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      notify({
        message: "Please enter a valid phone number",
        type: "error",
      });
      return;
    }
    try {
      let response = await callApi(
        "/select_customer",
        "POST",
        {
          phone: phoneNumber,
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        setUserDetails(response.data);
        setShowUserInformation(true);
      } else if (response.result === "error") {
        notify({
          message: response.message,
          type: "error",
        });
      }
    } catch (e) {
      notify({
        message: e.message,
        type: "error",
      });
      console.error(e);
    }
  };
  return (
    <Fragment>
      {isloading ? (
        <div className="loader">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <PhoneNumberWrapper>
          <div className="col60">
            <div className="section-dialog">
              <div>
                <div className="row-left">
                  <div className="col30">
                    <hr className="line" />
                  </div>
                  <div className="col70">
                    <h1>Customer Information</h1>
                  </div>
                </div>
                {showUserInformation ? (
                  userDetails && renderUserInformation()
                ) : (
                  <form className="form-control">
                    <Input
                      inputType="text"
                      label="Customer Name"
                      placeholder="Customer Name"
                      icon={
                        name.length > 3 ? (
                          <Icon icon={ic_check_circle} className="green" />
                        ) : name.length > 0 ? (
                          <Icon icon={ic_error} className="red" />
                        ) : (
                          ""
                        )
                      }
                      iconPosition="right"
                      required
                      onChange={(event) => {
                        setName(event);
                      }}
                      value={name}
                      className={
                        validator.isAlpha(name)
                          ? "green-border"
                          : name.length < 0
                          ? "red-border"
                          : ""
                      }
                    />
                    <br />
                    <Input
                      inputType="number"
                      label="Phone Number"
                      placeholder="Phone Number"
                      maxLength="10"
                      minLength="10"
                      icon={
                        validator.isMobilePhone(phoneNumber, "en-IN") ? (
                          <Icon icon={ic_check_circle} className="green" />
                        ) : phoneNumber.length > 0 ? (
                          <Icon icon={ic_error} className="red" />
                        ) : (
                          ""
                        )
                      }
                      iconPosition="right"
                      required={true}
                      onChange={(event) => setPhoneNumber(event)}
                      value={phoneNumber}
                      className={
                        validator.isMobilePhone(phoneNumber, "en-IN")
                          ? "green-border"
                          : phoneNumber.length > 0
                          ? "red-border"
                          : ""
                      }
                    />
                    <br />
                    <AnchorLink href="#scroll-up">
                      <Button
                        onClick={() => sendPersonalData()}
                        title="Submit"
                        isMaterial="true"
                        className="btn-full"
                      ></Button>
                    </AnchorLink>
                  </form>
                )}
              </div>
            </div>
          </div>
        </PhoneNumberWrapper>
      )}
    </Fragment>
  );
};

export default PhoneNumber;
