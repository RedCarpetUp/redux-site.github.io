import React, { Fragment, useEffect, useState } from "react";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";
import ProductSelectionWrapper from "./style";
import OnBoardUser from "../../OnBoardUser";
import Icon from "react-icons-kit";
import { check } from "react-icons-kit/feather/check";
import TncScreen from "../TncScreen";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useNotification } from "common/hooks/useNotification";
const ProductSelection = ({
  phone,
  accessToken,
  redirectUser,
  getBacktoProduct,
  dataBranch,
  selectedProduct,
  userProfile,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [variations, setVariations] = useState([]);
  const [docUpload, setDocUpload] = useState(false);
  const [userProductId, setUserProductId] = useState("");
  const [variationId, setVariationId] = useState("");
  const [tncScreen, setTncScreen] = useState(false);
  const [userProductType, setUserProductType] = useState("");
  const [selections, setSelections] = useState("");
  const notify = useNotification();
  const chooseProduct = (id, identifier) => {
    setVariationId(identifier);
    for (let i = 0; i < selections.length; i++) {
      if (i == id) {
        selections[i] = true;
      } else {
        selections[i] = false;
      }
    }
  };

  const confirmVariation = async () => {
    if (variationId) {
      try {
        setIsLoading(true);
        let response = await callApi(
          "/select_product",
          "POST",
          {
            user_product_id: userProductId,
            product_identifier: variationId,
          },
          phone,
          accessToken
        );
        setIsLoading(false);
        if (response.result == "error") {
          setIsLoading(false);
          notify({ message: response.message, type: "error" });
        } else {
          setTncScreen(true);
        }
      } catch (error) {
        setIsLoading(false);
        notify({ message: error.message, type: "error" });
      }
    } else {
      notify({ message: "Please Select a Plan to Proceed", type: "error" });
      return;
    }
  };

  const unSelectProduct = () => {
    setTncScreen(false);
  };

  const getUserProductVariation = async () => {
    try {
      setIsLoading(true);
      let response = await callApi(
        "/user_products_and_states/term_loan_reset",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        if (response.data[0].current_task == "doc_upload") {
          notify({
            message: "Your Documents were rejected, Please Upload them again.",
            type: "error",
          });
          setDocUpload(true);
        }
        if (
          response.data[0].current_task == "product_selection" ||
          response.data[0].current_task == "product_agreement" ||
          response.data[0].current_task == "product_payment"
        ) {
          setUserProductId(response.data[0].user_product_id);
          setUserProductType(response.data[0].product_type);
          let response1 = await callApi(
            "/product_variations/" + response.data[0].user_product_id,
            "GET",
            {},
            phone,
            accessToken
          );
          setIsLoading(false);
          if (response1.result == "success") {
            let v = [];
            setVariations(response1.data);
            response1.data.map((variation, id) => {
              v[id] = false;
            });
            setSelections(v);
          } else {
            notify({ message: response1.message, type: "error" });
          }
        }
        try {
          if (dataBranch["~id"]) {
            setIsLoading(true);
            let response = await callApi(
              "/get_events_branch",
              "GET",
              {},
              phone,
              accessToken
            );
            setIsLoading(false);
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
                  setIsLoading(true);
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
                  setIsLoading(false);
                });
              }
            }
          }
        } catch (err) {
          setIsLoading(false);
        }
      } else {
        notify({ message: response.message, type: "error" });
      }
      setIsLoading(false);
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };
  useEffect(() => {
    getUserProductVariation();
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <div className="text-center">
          <div className="loader">
            <div className="lds-dual-ring"></div>
          </div>
        </div>
      ) : tncScreen ? (
        <TncScreen
          phone={phone}
          accessToken={accessToken}
          userProductId={userProductId}
          userProductType={userProductType}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          variationId={variationId}
          unSelectProduct={unSelectProduct}
          dataBranch={dataBranch}
          userProfile={userProfile}
        />
      ) : docUpload ? (
        <OnBoardUser
          phone={phone}
          accessToken={accessToken}
          userProfile={userProfile}
        />
      ) : (
        <ProductSelectionWrapper>
          <Fragment>
            <div className="row-left">
              <div className="col30">
                <hr className="line" />
              </div>
              <div className="col70">
                <h1>Choose a Plan</h1>
              </div>
            </div>
            <div className="row">
              {variations ? (
                variations.map((variation, id) => {
                  return (
                    <Fragment>
                      <div
                        className="card"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          chooseProduct(id, variation.identifier);
                        }}
                      >
                        <div className="row">
                          <div className="card-options">
                            <div className="row">
                              <p className="col100-left">Reset Card</p>
                              <p className="col100 emi">
                                Due Amount/m: ₹
                                {variation.monthly_emi.toFixed(2)}
                              </p>
                              <p className="col100 tenure">
                                Total Unlocked Limit: ₹
                                {variation.principal_amount}
                              </p>
                              <p className="col100-right">
                                Program Duration: {variation.tenure_in_months}{" "}
                                months
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr className="black-line" />
                        <ul>
                          <li>
                            <Icon icon={check} /> Program Fees: ₹
                            {variation.joining_fee}
                          </li>
                          <li>
                            <Icon icon={check} /> Monthly Interest:
                            {(
                              (((variation.total_plan_amount -
                                variation.principal_amount) /
                                variation.tenure_in_months) *
                                100) /
                              variation.principal_amount
                            ).toFixed(2)}{" "}
                            %
                          </li>
                          <li>
                            <Icon icon={check} /> Total Plan Amount : ₹
                            {variation.total_plan_amount.toFixed(2)}
                          </li>
                        </ul>
                        <Button
                          icon={
                            selections[id] ? (
                              <Icon
                                icon={check}
                                style={{ color: "white" }}
                                size={24}
                              />
                            ) : (
                              ""
                            )
                          }
                          title={
                            selections[id]
                              ? "Plan Selected"
                              : "Select this Plan"
                          }
                          iconPostion="left"
                          className={selections[id] ? "btn-f" : "btn-take"}
                          id={id}
                        />
                      </div>
                    </Fragment>
                  );
                })
              ) : (
                <div>Some Error Occurred, try again later.</div>
              )}
            </div>
            <div className="row">
              <AnchorLink href="#scroll-up" className="scroll-btn">
                <Button
                  title="Proceed"
                  onClick={confirmVariation}
                  className="btn"
                />
              </AnchorLink>
              <AnchorLink href="#scroll-up" className="scroll-btn">
                <Button
                  title="Back"
                  onClick={getBacktoProduct}
                  className="btn-light"
                />
              </AnchorLink>
            </div>
          </Fragment>
        </ProductSelectionWrapper>
      )}
    </Fragment>
  );
};

export default ProductSelection;
