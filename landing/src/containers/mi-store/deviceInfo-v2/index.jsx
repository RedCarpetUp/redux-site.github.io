import React, { Fragment, useState } from "react";
import Icon from "react-icons-kit";
import PhoneNumberWrapper from "../PhoneForm/style";
import Input from "common/components/Input";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { ic_error } from "react-icons-kit/md/ic_error";
import Button from "common/components/Button";
import validator from "validator";

const DeviceInfo2 = ({ phone, accessToken, selectedProduct }) => {
  const [isloading, setIsLoading] = useState(false);
  const [imei, setImei] = useState("");

  return (
    <Fragment>
      {isloading ? (
        <div className="loader">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <PhoneNumberWrapper>
          <div className="col60">
            <div className="section-dialog" style={{ background: "#fafbfb" }}>
              <div>
                <div className="row-left">
                  <div className="col30">
                    <hr className="line" />
                  </div>
                  <div className="col70">
                    <h1>Device Information</h1>
                  </div>
                </div>
                <form
                  className="form-control"
                  //   onSubmit={(e) => sendPersonalData(e)}
                >
                  <Input
                    type="string"
                    label="Product Name"
                    placeholder="Product Name"
                    icon={
                      validator.isIMEI(imei) ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : imei.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required={true}
                    onChange={(event) => setImei(event)}
                    value={imei}
                    className={
                      validator.isMobilePhone(imei, "en-IN")
                        ? "green-border"
                        : imei.length > 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <Input
                    type="number"
                    label="Product Price"
                    placeholder="Product Price"
                    icon={
                      validator.isIMEI(imei) ? (
                        <Icon icon={ic_check_circle} className="green" />
                      ) : imei.length > 0 ? (
                        <Icon icon={ic_error} className="red" />
                      ) : (
                        ""
                      )
                    }
                    iconPosition="right"
                    required={true}
                    onChange={(event) => setImei(event)}
                    value={imei}
                    className={
                      validator.isMobilePhone(imei, "en-IN")
                        ? "green-border"
                        : imei.length > 0
                        ? "red-border"
                        : ""
                    }
                  />
                  <br />
                  <AnchorLink href="#scroll-up">
                    <Button
                      onClick={(e) => sendPersonalData()}
                      title="Submit"
                      isMaterial="true"
                      className="btn-full"
                    ></Button>
                  </AnchorLink>
                </form>
              </div>
            </div>
          </div>
          <br />
        </PhoneNumberWrapper>
      )}
    </Fragment>
  );
};

export default DeviceInfo2;
