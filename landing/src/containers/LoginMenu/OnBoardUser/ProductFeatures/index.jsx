import React, { Fragment, useState, useEffect } from "react";
import ProductFeaturesWrapper from "./style";
import Icon from "react-icons-kit";
import { check } from "react-icons-kit/feather/check";
import UploadDocuments from "../UploadDocuments";
import ProductSelection from "../../Reset/ProductSelection";
import Button from "common/components/Button";

import { callApi } from "common/utils/loginMiddleware";
import AddUpdateAddressRebel from "../../Rebel/AddUpdateAddress";
import CardTrackingRebel from "../../Rebel/CardTracking";
import CardIssuedRebel from "../../Rebel/CardIssued";
import AddUpdateAddressGimbooks from "../../Gimbooks/AddUpdateAddress";
import CardTrackingGimbooks from "../../Gimbooks/CardTracking";
import CardIssuedGimbooks from "../../Gimbooks/CardIssued";
import AnchorLink from "react-anchor-link-smooth-scroll";
import GovtDocs from "../../Reset/GovtDocs";
import GovtDocsRebel from "../../Rebel/GovtDocs";
import GovtDocsGimbooks from "../../Gimbooks/GovtDocs";
import TncScreen from "../../Reset/TncScreen";
import PayProcessingFee from "../../Reset/PayProcessingFee";
import GovtDocsRuby from "../../Ruby/GovtDocs";
import { analyticsData } from "../../../../common/data/analytics";
import useAnalytics from "../../../../common/hooks/useAnalytics";
import { useNotification } from "common/hooks/useNotification";
import { useCookies } from "react-cookie";

const ProductFeatures = ({
  phone,
  accessToken,
  redirectUser,
  selectedProduct,
  unSelectProduct,
  dataBranch,
  productData,
  userProfile,
}) => {
  const [userStatus, setUserStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [newAddress, setNewAddress] = useState({});
  const [userAddressess, setUserAddressess] = useState([]);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [userProductId, setUserProductId] = useState();
  const [kycScreen, setKycScreen] = useState(false);
  const [rubyStatus, setRubyStatus] = useState("");
  const notify = useNotification();
  const [cookies, setCookies] = useCookies();

  const getBacktoProduct = () => {
    setCookies("selectedProduct", `list_${selectedProduct}`, { path: "/" });
    setRubyStatus("");
    setUserStatus("");
    setKycScreen(false);
  };

  useEffect(() => {
    let analyticData = {
      Event: analyticsData.VISITED_SCREEN,
      "Screen Name": analyticsData.PRODUCT_FEATURES_SCREEN,
    };
    useAnalytics(analyticData);
    if (cookies.selectedProduct && !cookies.selectedProduct.includes("list_")) {
      selectProduct();
    }
  }, []);

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
  const moveRebel = async (prdct) => {
    setKycScreen(false);
    try {
      let response = await callApi(
        "/user_products_and_states/" + prdct,
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success" && response.data.length == 0) {
        setKycScreen(true);
      } else if (response.result == "success" && response.data.length > 0) {
        response.data.map(async (product) => {
          if (
            product.current_task == "review_n_pending" &&
            product.product_type == prdct
          ) {
            setKycScreen(true);
          } else if (
            product.current_task == "mandatory_gov_id" &&
            product.product_type == prdct
          ) {
            setKycScreen(true);
          } else if (
            product.current_task != null &&
            product.product_type == prdct
          ) {
            setUserStatus(product.current_task);
            setUserProductId(product.user_product_id);
          } else if (
            product.current_task == null &&
            product.product_type == prdct
          ) {
            setKycScreen(true);
          }
        });
      } else {
        notify({
          message: "Some Error Occurred, try again later.",
          type: "error",
        });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };
  const moveRubyUser = async (product) => {
    setKycScreen(false);
    try {
      let response = await callApi(
        "/product_path_selection",
        "POST",
        {
          product_type: selectedProduct || product,
        },
        phone,
        accessToken
      );
      let resp = await callApi(
        "/get_user_status",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        setUserStatus(response.task_status);
        try {
          if (dataBranch["~id"]) {
            let response = await callApi(
              "/get_events_branch",
              "GET",
              {},
              phone,
              accessToken
            );
            if (response.result == "success") {
              if (response.data) {
                response.data.map(async (d) => {
                  let custom_data = {
                    event: d.event,
                    userName: userProfile.user_data.first_name,
                    userId: userProfile.user_data.user_id,
                    userPhone: userProfile.user_data.phone_number,
                    platform: "webstite",
                  };
                  branch.logEvent(d.event, custom_data, function (err) {
                    console.log(err);
                  });
                  let response1 = await callApi(
                    "/event_hit_success",
                    "POST",
                    {
                      product_type: d.product_type,
                      type: d.tag,
                    },
                    phone,
                    accessToken
                  );
                });
              }
            }
          }
        } catch (err) {}
      } else {
        notify({
          message: "Currently not available, Check back later!",
          type: "error",
        });
      }
    } catch (err) {
      notify({ message: err.message, type: "error" });
    }
  };

  const moveUser = async (product) => {
    setKycScreen(false);
    try {
      setLoader(true);
      let response = await callApi(
        "/product_path_selection",
        "POST",
        {
          product_type: selectedProduct || product,
        },
        phone,
        accessToken
      );
      setLoader(false);
      if (response.result == "success") {
        setUserStatus(response.task_status);
        try {
          if (dataBranch["~id"]) {
            let response = await callApi(
              "/get_events_branch",
              "GET",
              {},
              phone,
              accessToken
            );
            if (response.result == "success") {
              if (response.data) {
                response.data.map(async (d) => {
                  let custom_data = {
                    event: d.event,
                    userName: userProfile.user_data.first_name,
                    userId: userProfile.user_data.user_id,
                    userPhone: userProfile.user_data.phone_number,
                    platform: "website",
                  };
                  branch.logEvent(d.event, custom_data, function (err) {
                    console.log(err);
                  });
                  let response1 = await callApi(
                    "/event_hit_success",
                    "POST",
                    {
                      product_type: d.product_type,
                      type: d.tag,
                    },
                    phone,
                    accessToken
                  );
                });
              }
            }
          }
        } catch (err) {}
      } else {
        setLoader(false);
        notify({ message: response.message, type: "error" });
      }
    } catch (err) {
      setLoader(false);
      notify({ message: err.message, type: "error" });
    }
  };

  const getStates = async () => {
    try {
      setLoader(true);
      let response = await callApi(
        "/user_products_and_states/" + selectedProduct,
        "GET",
        {},
        phone,
        accessToken
      );
      setLoader(false);
      if (response.result == "success" && response.data.length == 0) {
        setKycScreen(true);
      } else if (response.result == "success" && response.data.length > 0) {
        response.data.map(async (product) => {
          if (
            product.current_task == "review_n_pending" &&
            product.product_type == selectedProduct
          ) {
            setKycScreen(true);
          } else if (
            product.current_task == "mandatory_gov_id" &&
            product.product_type == selectedProduct
          ) {
            setKycScreen(true);
          } else if (
            product.current_task == "pan_verification" &&
            product.product_type == selectedProduct
          ) {
            setKycScreen(true);
          } else if (
            product.current_task == "app_dl" &&
            product.product_type == selectedProduct
          ) {
            setKycScreen(true);
          } else if (
            product.current_task != null &&
            product.product_type == selectedProduct
          ) {
            setUserProductId(product.user_product_id);
            setUserStatus(product.current_task);
          } else if (
            product.current_task == null &&
            product.product_type == selectedProduct
          ) {
            setKycScreen(true);
          }
        });
      } else {
        setLoader(false);
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      setLoader(false);
      notify({ message: error.message, type: "error" });
    }
  };

  const getRubyStates = async () => {
    try {
      setLoader(true);
      let response = await callApi(
        "/get_user_status",
        "GET",
        {},
        phone,
        accessToken
      );
      setLoader(false);
      if (response.result == "success") {
        setRubyStatus(response.data.funnel_status);
      }
    } catch (err) {
      setLoader(false);
      notify({ message: err.message, type: "error" });
    }
  };

  const getUserProductsAndStates = async () => {
    try {
      let response = await callApi(
        "/user_products_and_states/" + selectedProduct,
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success" && response.data.length > 0) {
        response.data.map(async (product) => {
          if (
            product.current_task != null &&
            product.product_type == selectedProduct
          ) {
            setUserStatus(product.current_task);
            setUserProductId(product.user_product_id);
          } else {
            let response1 = await callApi(
              "/product_path_selection",
              "POST",
              {
                product_type: selectedProduct,
              },
              phone,
              accessToken
            );
            if (response1.result == "success") {
              setUserStatus(response1.task_status);
              try {
                if (dataBranch["~id"]) {
                  let response = await callApi(
                    "/get_events_branch",
                    "GET",
                    {},
                    phone,
                    accessToken
                  );
                  if (response.result == "success") {
                    //setUserStatus(response.task_status);
                    if (response.data) {
                      response.data.map(async (d) => {
                        let custom_data = {
                          event: d.event,
                          userName: userProfile.user_data.first_name,
                          userId: userProfile.user_data.user_id,
                          userPhone: userProfile.user_data.phone_number,
                          platform: "website",
                        };
                        branch.logEvent(d.event, custom_data, function (err) {
                          console.log(err);
                        });
                        let response1 = await callApi(
                          "/event_hit_success",
                          "POST",
                          {
                            product_type: d.product_type,
                            type: d.tag,
                          },
                          phone,
                          accessToken
                        );
                      });
                    }
                  }
                }
              } catch (err) {}
            } else {
              notify({
                message: "Some Error Occurred, try again later.",
                type: "error",
              });
            }
          }
        });
      } else if (response.result == "success" && response.data.length == 0) {
        let response1 = await callApi(
          "/product_path_selection",
          "POST",
          {
            product_type: selectedProduct,
          },
          phone,
          accessToken
        );
        if (response1.result == "success") {
          setUserStatus(response1.task_status);
          try {
            if (dataBranch["~id"]) {
              let response = await callApi(
                "/get_events_branch",
                "GET",
                {},
                phone,
                accessToken
              );
              if (response.result == "success") {
                //setUserStatus(response.task_status);
                if (response.data) {
                  response.data.map(async (d) => {
                    let custom_data = {
                      event: d.event,
                      userName: userProfile.user_data.first_name,
                      userId: userProfile.user_data.user_id,
                      userPhone: userProfile.user_data.phone_number,
                      platform: "website",
                    };
                    branch.logEvent(d.event, custom_data, function (err) {
                      console.log(err);
                    });
                    let response1 = await callApi(
                      "/event_hit_success",
                      "POST",
                      {
                        product_type: d.product_type,
                        type: d.tag,
                      },
                      phone,
                      accessToken
                    );
                  });
                }
              }
            }
          } catch (err) {}
        } else {
          notify({
            message: "Currently not available, Check back later!",
            type: "error",
          });
        }
      }
    } catch (err) {
      notify({
        message: "Currently not available, Check back later!",
        type: "error",
      });
    }
  };

  const downloadApp = () => {
    notify({ message: "Redirecting to play store...!", type: "success" });
    setTimeout(() => {
      window.open(
        "https://play.google.com/store/apps/details?id=com.redcarpetup.rewardpay",
        "_blank"
      );
    }, 5000);
  };

  const selectProduct = async () => {
    let product;
    if (selectedProduct == "term_loan_reset") product = "reset";
    else if (selectedProduct == "rebel") product = "rebel";
    else if (selectedProduct == "redcarpet_gimbooks")
      product = "redcarpet_gimbooks";
    try {
      setLoader(true);
      let response = await callApi(
        `/select_${product}_as_a_product`,
        "GET",
        {},
        phone,
        accessToken
      );
      await getStates();
      setLoader(false);
    } catch (err) {
      setLoader(false);
      notify({ message: err.message, type: "error" });
    }
  };

  const uploadDocument = () => {
    setCookies("selectedProduct", selectedProduct, { path: "/" });
    selectProduct();
  };

  const addUpdateAddress = () => {
    getUserAddress(selectedProduct);
  };

  return (
    <Fragment>
      {loader ? (
        <div className="text-center">
          <div className="loader">
            <div className="lds-dual-ring"></div>
          </div>
        </div>
      ) : userStatus == "doc_upload" && selectedProduct == "rebel" ? (
        <AddUpdateAddressRebel
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          userProfile={userProfile}
        />
      ) : userStatus == "doc_upload" &&
        selectedProduct == "redcarpet_gimbooks" ? (
        <AddUpdateAddressGimbooks
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          userProfile={userProfile}
        />
      ) : (userStatus == "card_dispatch" || userStatus == "card_activate") &&
        selectedProduct == "rebel" ? (
        <CardTrackingRebel
          phone={phone}
          accessToken={accessToken}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          userProductId={userProductId}
          redirectUser={redirectUser}
        />
      ) : (userStatus == "card_dispatch" || userStatus == "card_activate") &&
        selectedProduct == "redcarpet_gimbooks" ? (
        <CardTrackingGimbooks
          phone={phone}
          accessToken={accessToken}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          userProductId={userProductId}
          redirectUser={redirectUser}
        />
      ) : (userStatus == "manual_eval" ||
          userStatus == "card_issue" ||
          userStatus == "card_printing" ||
          userStatus == "rejects") &&
        selectedProduct == "rebel" ? (
        <CardIssuedRebel
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          userProfile={userProfile}
        />
      ) : (userStatus == "manual_eval" ||
          userStatus == "card_issue" ||
          userStatus == "card_printing" ||
          // userStatus == "doc_dedupe" ||
          userStatus == "rejects") &&
        selectedProduct == "redcarpet_gimbooks" ? (
        <CardIssuedGimbooks
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          userProfile={userProfile}
        />
      ) : selectedProduct == "ruby" &&
        (rubyStatus == "app_dl" ||
          rubyStatus == "mandatory_gov_doc" ||
          rubyStatus == "pan_verification") ? (
        <GovtDocsRuby
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveRubyUser}
          dataBranch={dataBranch}
        />
      ) : userStatus == "doc_upload" ? (
        <UploadDocuments
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          dataBranch={dataBranch}
          userProfile={userProfile}
        />
      ) : userStatus == "product_agreement" ? (
        <TncScreen
          phone={phone}
          accessToken={accessToken}
          userProductId={userProductId}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          unSelectProduct={unSelectProduct}
          dataBranch={dataBranch}
          userProfile={userProfile}
        />
      ) : userStatus == "product_payment" ? (
        <PayProcessingFee
          phone={phone}
          accessToken={accessToken}
          userProductId={userProductId}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          dataBranch={dataBranch}
          userProfile={userProfile}
        />
      ) : userStatus == "product_selection" ? (
        <ProductSelection
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          dataBranch={dataBranch}
          userProfile={userProfile}
        />
      ) : kycScreen && selectedProduct == "term_loan_reset" ? (
        <GovtDocs
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          dataBranch={dataBranch}
          userProfile={userProfile}
        />
      ) : kycScreen && selectedProduct == "rebel" ? (
        <GovtDocsRebel
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          dataBranch={dataBranch}
          moveRebel={moveRebel}
        />
      ) : kycScreen && selectedProduct == "redcarpet_gimbooks" ? (
        <GovtDocsGimbooks
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          dataBranch={dataBranch}
          moveRebel={moveRebel}
        />
      ) : (
        <ProductFeaturesWrapper>
          {selectedProduct == "term_loan_reset" ? (
            <Fragment>
              {" "}
              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">
                  <h1>Reset Card Features</h1>
                </div>
              </div>
              <div className="card">
                <div className="row">
                  <div className="col50">
                    <img
                      src="/images/login/Reset_Score.png"
                      style={{
                        border: "1px solid #dd285d",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <div className="col50-left">
                    <p>
                      <b>
                        Pay ₹1500/m & get upto ₹1400/m in your reset card and
                        increase your credit score.
                      </b>
                    </p>
                  </div>
                  <hr className="black-line" />
                  <ul>
                    {productData.offer.map((data, id) => {
                      return (
                        <li style={{ display: "flex" }}>
                          <div
                            style={{ display: "inline-block", marginRight: 5 }}
                          >
                            <Icon icon={check} size={20} />
                          </div>

                          <div style={{ display: "inline-block" }}>{data}</div>
                        </li>
                      );
                    })}
                    {productData.pricing.map((data, id) => {
                      return (
                        <li style={{ display: "flex" }}>
                          <div
                            style={{ display: "inline-block", marginRight: 5 }}
                          >
                            <Icon icon={check} size={20} />
                          </div>

                          <div style={{ display: "inline-block" }}>{data}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="row">
                <AnchorLink href="#scroll-up" className="scroll-btn">
                  <Button
                    title="Continue"
                    className="btn"
                    onClick={uploadDocument}
                  />
                </AnchorLink>
                <AnchorLink href="#scroll-up" className="scroll-btn">
                  <Button
                    title="Back"
                    className="btn-light"
                    onClick={unSelectProduct}
                  />
                </AnchorLink>
              </div>
            </Fragment>
          ) : selectedProduct == "rebel" ? (
            <Fragment>
              {" "}
              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">
                  <h1>Rebel Card Features</h1>
                </div>
              </div>
              <div className="card">
                <div className="row">
                  <div className="col50">
                    <img src="/images/login/Rebel.png" />
                  </div>
                  <div className="col50-left">
                    <p>
                      Convert your high-value transactions or your credit card
                      bills into Easy Monthly Installments in just a few clicks
                      AT THE LOWEST INTEREST RATE!
                    </p>
                  </div>
                  <hr className="black-line" />
                  <ul>
                    {productData.offer.map((data, id) => {
                      return (
                        <li style={{ display: "flex" }}>
                          <div
                            style={{ display: "inline-block", marginRight: 5 }}
                          >
                            <Icon icon={check} size={20} />
                          </div>

                          <div style={{ display: "inline-block" }}>{data}</div>
                        </li>
                      );
                    })}
                    {productData.pricing.map((data, id) => {
                      return (
                        <li style={{ display: "flex" }}>
                          <div
                            style={{ display: "inline-block", marginRight: 5 }}
                          >
                            <Icon icon={check} size={20} />
                          </div>

                          <div style={{ display: "inline-block" }}>{data}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="row">
                <AnchorLink href="#scroll-up" className="scroll-btn">
                  <Button
                    title="Continue"
                    className="btn"
                    onClick={uploadDocument}
                  />
                </AnchorLink>
                <AnchorLink href="#scroll-up" className="scroll-btn">
                  <Button
                    title="Back"
                    className="btn-light"
                    onClick={unSelectProduct}
                  />
                </AnchorLink>
              </div>
            </Fragment>
          ) : selectedProduct == "redcarpet_gimbooks" ? (
            <Fragment>
              {" "}
              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">
                  <h1>GimBooks Card Features</h1>
                </div>
              </div>
              <div className="card">
                <div className="row">
                  <div className="col50">
                    <img
                      width="267px"
                      height="137px"
                      src="/images/gimbook/gimbook_card.png"
                    />
                  </div>
                  <div className="col50-left">
                    <p>
                      Don't let your large bills stop your shopping spree!
                      Convert your high value transactions or credit card bills
                      into Easy Monthly Installments in just a few clicks
                    </p>
                  </div>
                  <hr className="black-line" />
                  <ul>
                    {productData.offer.map((data, id) => {
                      return (
                        <li style={{ display: "flex" }}>
                          <div
                            style={{ display: "inline-block", marginRight: 5 }}
                          >
                            <Icon icon={check} size={20} />
                          </div>

                          <div style={{ display: "inline-block" }}>{data}</div>
                        </li>
                      );
                    })}
                    {productData.pricing.map((data, id) => {
                      return (
                        <li style={{ display: "flex" }}>
                          <div
                            style={{ display: "inline-block", marginRight: 5 }}
                          >
                            <Icon icon={check} size={20} />
                          </div>

                          <div style={{ display: "inline-block" }}>{data}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="row">
                <AnchorLink href="#scroll-up" className="scroll-btn">
                  <Button
                    title="Continue"
                    className="btn"
                    onClick={uploadDocument}
                  />
                </AnchorLink>
                <AnchorLink href="#scroll-up" className="scroll-btn">
                  <Button
                    title="Back"
                    className="btn-light"
                    onClick={unSelectProduct}
                  />
                </AnchorLink>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {" "}
              <div className="row-left">
                <div className="col30">
                  <hr className="line" />
                </div>
                <div className="col70">
                  <h1>Ruby Card Features</h1>
                </div>
              </div>
              <div className="card">
                <div className="row">
                  <div className="col50">
                    <img src="/images/login/Ruby.png" />
                  </div>
                  <div className="col50-left">
                    <p>
                      Get Credit limit upto 10,000, do transactions online and
                      offline and earn points to claim offers-in-app
                    </p>
                  </div>
                  <hr className="black-line" />
                  <ul>
                    {productData.offer.map((data, id) => {
                      return (
                        <li style={{ display: "flex" }}>
                          <div
                            style={{ display: "inline-block", marginRight: 5 }}
                          >
                            <Icon icon={check} size={20} />
                          </div>

                          <div style={{ display: "inline-block" }}>{data}</div>
                        </li>
                      );
                    })}
                    {productData.pricing.map((data, id) => {
                      return (
                        <li style={{ display: "flex" }}>
                          <div
                            style={{ display: "inline-block", marginRight: 5 }}
                          >
                            <Icon icon={check} size={20} />
                          </div>

                          <div style={{ display: "inline-block" }}>{data}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="row">
                <AnchorLink href="#scroll-up" className="scroll-btn">
                  <Button
                    title="Continue"
                    className="btn"
                    onClick={() => downloadApp()}
                  />
                </AnchorLink>
                <AnchorLink href="#scroll-up" className="scroll-btn">
                  <Button
                    title="Back"
                    className="btn-light"
                    onClick={unSelectProduct}
                  />
                </AnchorLink>
              </div>
            </Fragment>
          )}
        </ProductFeaturesWrapper>
      )}
    </Fragment>
  );
};

export default ProductFeatures;
