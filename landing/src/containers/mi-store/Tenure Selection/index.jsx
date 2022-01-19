import React, { Fragment, useState } from "react";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Input from "common/components/Input";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";
import ProductSelectionWrapper from "./style";
import { Modal, openModal, closeModal } from "@redq/reuse-modal";
import "@redq/reuse-modal/lib/index.css";
import PopUpModal from "../deviceInfoForm/style";

const TenureSelection = ({ phone, accessToken, getUserStatus, resetUser }) => {
  const [productPrice, setProductPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [tenure, setTenure] = useState("");
  const [showTenure, setShowTenure] = useState(false);
  const [emiVariations, setEmiVariations] = useState([]);
  const [tenureID, setTenureID] = useState(-1);
  const [selectedTenure, setSelectedTenure] = useState({});
  const notify = useNotification();

  const getTenure = async () => {
    setTenureID(-1);
    if (Number(productPrice) < Number(downPayment)) {
      notify({
        message: "Product price cannot be less than downpayment",
        type: "error",
      });
      return;
    } else if (Number(productPrice) <= 0 || Number(downPayment) <= 0) {
      notify({
        message: "Please enter a valid amount",
        type: "error",
      });
      return;
    } else if (!tenure) {
      notify({
        message: "Please select a tenure period",
        type: "error",
      });
      return;
    }
    try {
      let arr = [];
      let response = await callApi(
        "/get_emi_variations",
        "POST",
        {
          product_price: parseInt(productPrice),
          product_name: productName,
          down_payment: parseInt(downPayment) || none,
          tenure: parseInt(tenure),
          // customer_id: 
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        error.min, error.max
        if (response.data) {
          arr.push(response.data);
          setEmiVariations(arr);
        }
        setShowTenure(true);
        notify({
          message: response.message,
          type: "success",
        });
      } else {
        notify({
          message: response.message,
          type: "error",
        });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };
  const BigModalComponent = () => (
    <Fragment>
      <PopUpModal>
        <div className="parent">
          <div className="child">
            <div className="masterPiece">
              <h3 style={{ margin: "15px", textAlign: "center" }}>
                Are you sure you want to continue? This will reject the present
                customer and start a new process.
              </h3>

              <div style={{ width: "100%" }}>
                <div className="btn-container">
                  <Button
                    className="btn"
                    title="Continue"
                    onClick={resetUser}
                  />
                  <Button
                    className="btn-light"
                    title="Cancel"
                    onClick={closeModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopUpModal>
    </Fragment>
  );
  const modalToggle = () => {
    openModal({
      config: {
        className: "customModal",
        disableDragging: false,
        enableResizing: {
          bottom: true,
          bottomLeft: true,
          bottomRight: true,
          left: true,
          right: true,
          top: true,
          topLeft: true,
          topRight: true,
        },
        width: 480,
        height: 390,
        animationFrom: { transform: "scale(0.3)" }, // react-spring <Spring from={}> props value
        animationTo: { transform: "scale(1)" }, //  react-spring <Spring to={}> props value
        transition: {
          mass: 1,
          tension: 130,
          friction: 26,
        }, // react-spring config props
      },
      withRnd: false,
      overlayClassName: "customeOverlayClass",
      closeOnClickOutside: false,
      component: BigModalComponent,
      componentProps: { customData: "your custom props" },
    });
  };
  const handleSelect = (id, tenure) => {
    setTenureID(id);
    setSelectedTenure(tenure);
  };
  const confirmSelection = async () => {
    if (tenureID === -1) {
      return notify({ message: "Please select a tenure", type: "error" });
    }
    try {
      let response = await callApi(
        "/select_emi_variation",
        "POST",
        {
          down_payment: parseInt(selectedTenure.down_payment),
          interest_charged: parseInt(selectedTenure.interest_charged),
          interest_rate: parseInt(selectedTenure.interest_rate),
          monthly_emi: parseInt(selectedTenure.monthly_emi),
          principal_amount: parseInt(selectedTenure.principal_amount),
          product_name: selectedTenure.product_name,
          product_price: parseInt(selectedTenure.product_price),
          tenure_in_months: parseInt(selectedTenure.tenure_in_months),
          total_amount_with_interest: parseInt(
            selectedTenure.total_amount_with_interest
          ),
        },
        phone,
        accessToken
      );
      if (response.result === "success") {
        notify({
          message: response.message,
          type: "success",
        });
        getUserStatus();
      } else {
        notify({
          message: response.message,
          type: "error",
        });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  return (
    <div>
      <ProductSelectionWrapper>
        <Heading content="Select Tenure" />
        <Text content="Product price" />
        <Input
          inputType="number"
          value={productPrice}
          min="1"
          onChange={(e) => {
            setProductPrice(e);
          }}
          aria-label="Product price"
        />
        <Text content="Product Name" />
        <Input
          inputType="text"
          value={productName}
          onChange={(e) => {
            setProductName(e);
          }}
          aria-label="Product name"
        />
        <Text content="Down Payment" />
        <Input
          inputType="number"
          value={downPayment}
          onChange={(e) => {
            setDownPayment(e);
          }}
          aria-label="Downpayment"
        />
        <Text content="Select Tenure" />
        <select
          name="tenure_selection"
          className="form-control-select"
          placeholder="Select Monthly Tenure"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        >
          <option value="" selected disabled hidden>
            Select Monthly Tenure
          </option>
          <option value="3">3 Months</option>
          <option value="6">6 Months</option>
          <option value="12">12 Months</option>
        </select>
        <br />
        <Button title="Search" onClick={getTenure} />
        <Button
          title="Reject Customer"
          className="btn-light"
          onClick={() => {
            modalToggle();
          }}
        />
        {showTenure && (
          <Fragment>
            <Heading as="h3" content="Available Tenure :" />
            {emiVariations.map((item, index) => {
              return (
                <div className="tenure-card">
                  <Text
                    className="tenure-emi"
                    content={`${item.tenure_in_months} EMIs @ ${item.interest_rate}% pa`}
                  />
                  <div className="tenure-price">
                    <Text
                      as="h3"
                      content={`Principal Amount : ₹${item.principal_amount}`}
                    />
                    <Text
                      as="h3"
                      content={`Monthly Amount : ₹${item.monthly_emi.toFixed(
                        2
                      )}`}
                    />
                    <Text
                      as="h3"
                      content={`Total Amount with Interest : ₹${item.total_amount_with_interest.toFixed(
                        2
                      )}`}
                    />
                  </div>
                  <Button
                    title={index === tenureID ? "Selected" : "Select"}
                    className={index === tenureID ? "selected" : "select"}
                    onClick={() => handleSelect(index, item)}
                  />
                </div>
              );
            })}
            <Button
              title="Continue"
              className="confirm"
              onClick={confirmSelection}
            />
          </Fragment>
        )}
      </ProductSelectionWrapper>
      <Modal />
    </div>
  );
};

export default TenureSelection;
