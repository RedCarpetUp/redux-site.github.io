import React, { Fragment, useState, useEffect } from "react";
import ProductListWrapper from "./style";
import Icon from "react-icons-kit";
import Button from "common/components/Button";
import { checkCircle } from "react-icons-kit/feather/checkCircle";
import { callApi } from "common/utils/loginMiddleware";
import ProductFeatures from "../ProductFeatures";
import UnServiceable from "../UnServiceable";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useNotification } from "common/hooks/useNotification";
import useTriggerBranchEvent from "../../../../common/hooks/useTriggerBranchEvent";
import { analyticsData } from "../../../../common/data/analytics";
import useAnalytics from "../../../../common/hooks/useAnalytics";
import { useCookies } from "react-cookie";

const ProductList = ({
  phone,
  accessToken,
  redirectUser,
  dataBranch,
  userProfile,
  isServicable,
  ...props
}) => {
  const [showProductFeatures, setShowProductFeatures] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [doesUserHasXiaomiCard, setDoesUserHasXiaomiCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [servicable, setServicable] = useState(true);
  const [recommendProducts, setRecommendProducts] = useState([]);
  const notify = useNotification();
  const [cookies, setCookies] = useCookies();

  const showProductFeature = (product, data) => {
    setCookies("mi_selectedProduct", product, { path: "/" });
    setSelectedProduct(product);
    setShowProductFeatures(true);
  };

  const UnSelectProduct = () => {
    setShowProductFeatures(false);
  };
  const checkForXiaomiCard = async () => {
    try {
      let response = await callApi(
        "/user_products_and_states/redcarpet_xiaomi",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        response.data.map((product) => {
          if (product.current_task == "payfee" && product.loan_id != null) {
            setDoesUserHasXiaomiCard(true);
          }
        });
      } else {
        setDoesUserHasXiaomiCard(false);
      }
    } catch (err) {
      setDoesUserHasXiaomiCard(false);
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      let response = await callApi(
        "/app_card_description",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success" && response.cards.length > 0) {
        let analyticData = {
          Event: analyticsData.VISITED_SCREEN,
          "Screen Name": analyticsData.PRODUCT_LIST_SUCCESS,
        };
        useAnalytics(analyticData);
        let recommendCard = response.cards.filter((card) => {
          return card.show == true && card.eligibility == true;
        });
        if (props.userFrom) {
          let userFrom = props.userFrom;
          if (userFrom === "xiaomi") {
            setRecommendProducts(
              recommendCard.filter((card) => card.name === "Redcarpet_Xiaomi")
            );
          }
        } else {
          setRecommendProducts(recommendCard);
        }
      }
    } catch (error) {
      let analyticData = {
        Event: analyticsData.PRODUCT_LIST_ERROR,
      };
      useAnalytics(analyticData);
      notify({ message: error.message, type: "error" });
    }
  };

  const checkUserStatus = async () => {
    try {
      setIsLoading(true);
      let response = await callApi(
        "/get_user_status",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result === "success") {
        if (
          response.data.funnel_status === "card_selection" ||
          response.data.funnel_status === "app_dl"
        )
          checkServiceAvailability();
        else {
          setServicable(true);
          setIsLoading(false);
        }
      }
      if (response.result === "error") {
        notify({ message: response.message, type: "error" });
        setIsLoading(false);
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
      setIsLoading(false);
    }
  };

  const checkServiceAvailability = async () => {
    try {
      isLoading === false ? setIsLoading(true) : "";

      let response = await callApi(
        "/check_user_pin_code_availability",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result === "success") {
        setServicable(true);
      } else setServicable(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notify({ message: error.message, type: "error" });
    }
  };

  useEffect(() => {
    // dataBranch,productType,phone,accessToken,userProfile,branch
    try {
      const trigger = useTriggerBranchEvent(
        dataBranch,
        phone,
        accessToken,
        userProfile,
        branch
      );
    } catch (error) {}
    getProducts();
    checkForXiaomiCard();
    if (!isServicable) checkUserStatus();
    if (cookies.mi_selectedProduct) {
      showProductFeature(cookies.mi_selectedProduct);
    }
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <div className="loader">
          <div class="lds-dual-ring"></div>
        </div>
      ) : showProductFeatures ? (
        <ProductFeatures
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          unSelectProduct={UnSelectProduct}
          dataBranch={dataBranch}
          userProfile={userProfile}
          isServicable={isServicable}
        />
      ) : servicable ? (
        <ProductListWrapper>
          <div className="row-left">
            <div className="col30">
              <hr className="line" />
            </div>
            <div className="col70">
              <h1>Choose a Product</h1>
            </div>
          </div>
          {recommendProducts.length > 0 ? (
            <div className="row">
              <h1 className="product-header">Recommended</h1>
              {recommendProducts.map((product, id) => {
                if (product.name == "Redcarpet_Xiaomi") {
                  return (
                    <div
                      className={
                        doesUserHasXiaomiCard ? "card-disabled" : "card"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={
                        doesUserHasXiaomiCard
                          ? ""
                          : () =>
                              showProductFeature("redcarpet_xiaomi_customer")
                      }
                    >
                      <div className="row">
                        <div className="col50">
                          <img
                            width="267px"
                            height="137px"
                            src="/images/xiaomi/xiaomi_card.png"
                          />
                        </div>
                        <div className="col50-left">
                          <p style={{ fontWeight: "bolder" }}>MI Credit</p>
                          <p style={{ fontSize: "initial" }}>
                            {product.content.introduction}
                          </p>
                        </div>
                      </div>
                      <p className="note">
                        <Icon
                          icon={checkCircle}
                          style={{ color: "green" }}
                          size={22}
                        />{" "}
                        {doesUserHasXiaomiCard
                          ? "You already have purchased this product."
                          : "Congrats, You are eligible for this product."}
                      </p>
                      <AnchorLink href="#scroll-up">
                        <Button
                          className={
                            doesUserHasXiaomiCard
                              ? "btn-full-disabled"
                              : "btn-full"
                          }
                          title="Continue"
                        />
                      </AnchorLink>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <span
              style={{
                padding: "100px",
                color: "#696969",
                textAlign: "center",
              }}
            >
              <b>Your profile is being reviewed.</b>
              We are diligently working on getting you approved. Thanks for your
              patience
            </span>
          )}
        </ProductListWrapper>
      ) : (
        <UnServiceable
          phone={phone}
          accessToken={accessToken}
          currentComponent={"ProductList"}
          userFrom={props.userFrom ? props.userFrom : ""}
        />
      )}
    </Fragment>
  );
};

export default ProductList;
