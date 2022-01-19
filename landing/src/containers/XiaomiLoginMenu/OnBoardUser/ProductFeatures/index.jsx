import React, { Fragment, useState, useEffect } from "react";
import ProductFeaturesWrapper from "./style";
import Icon from "react-icons-kit";
import { check } from "react-icons-kit/feather/check";
import UploadDocuments from "../UploadDocuments";
import Button from "common/components/Button";

import { callApi } from "common/utils/loginMiddleware";
import AddUpdateAddressXiaomi from "../../Xiaomi/AddUpdateAddress";
import CardTrackingXiaomi from "../../Xiaomi/CardTracking";
import CardIssuedXiaomi from "../../Xiaomi/CardIssued";
import AnchorLink from "react-anchor-link-smooth-scroll";
import GovtDocsXiaomi from "../../Xiaomi/GovtDocs";
import { analyticsData } from "../../../../common/data/analytics";
import useAnalytics from "../../../../common/hooks/useAnalytics";
import { useNotification } from "common/hooks/useNotification";
import ProductList from "../ProductList";
import { useCookies } from "react-cookie";

const ProductFeatures = ({
  phone,
  accessToken,
  redirectUser,
  selectedProduct,
  unSelectProduct,
  dataBranch,
  userProfile,
  isServicable,
}) => {
  const [userStatus, setUserStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [userProductId, setUserProductId] = useState();
  const [kycScreen, setKycScreen] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies();
  const notify = useNotification();

  const getBacktoProduct = () => {
    removeCookies("mi_selectedProduct", { path: "/" });
    setUserStatus("");
    setKycScreen(false);
  };

  useEffect(() => {
    let analyticData = {
      Event: analyticsData.VISITED_SCREEN,
      "Screen Name": analyticsData.PRODUCT_FEATURES_SCREEN,
    };
    useAnalytics(analyticData);
    uploadDocument();
  }, []);

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

  const selectProduct = async () => {
    let product;
    if (selectedProduct == "redcarpet_xiaomi_customer")
      product = "redcarpet_xiaomi_customer";
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
    selectProduct();
  };

  return (
    <Fragment>
      {loader ? (
        <div className="text-center">
          <div className="loader">
            <div className="lds-dual-ring"></div>
          </div>
        </div>
      ) : userStatus == "doc_upload" &&
        selectedProduct == "redcarpet_xiaomi_customer" ? (
        <AddUpdateAddressXiaomi
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          userProfile={userProfile}
        />
      ) : (userStatus == "card_dispatch" || userStatus == "card_activate") &&
        selectedProduct == "redcarpet_xiaomi_customer" ? (
        <CardTrackingXiaomi
          phone={phone}
          accessToken={accessToken}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          userProductId={userProductId}
          redirectUser={redirectUser}
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
      ) : kycScreen && selectedProduct == "redcarpet_xiaomi_customer" ? (
        <GovtDocsXiaomi
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          dataBranch={dataBranch}
          moveRebel={moveRebel}
        />
      ) : [
          "merchant_eval",
          "disburse_amount",
          "loan_agreement",
          "awaiting_merchant",
          "card_issue",
          "card_activate",
          "card_load",
          "rejects",
        ].includes(userStatus) &&
        selectedProduct == "redcarpet_xiaomi_customer" ? (
        <CardIssuedXiaomi
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          userProfile={userProfile}
        />
      ) : (
        <>
          <ProductList
            phone={phone}
            accessToken={accessToken}
            redirectUser={redirectUser}
            isServicable={isServicable}
            dataBranch={dataBranch}
            userProfile={userProfile}
            userFrom={"xiaomi"}
          />
        </>
      )}
    </Fragment>
  );
};

export default ProductFeatures;
