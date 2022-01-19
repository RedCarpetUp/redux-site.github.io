import React, { Fragment, useState, useEffect } from "react";
import ProductListWrapper from "./style";
import Icon from "react-icons-kit";
import Button from "common/components/Button";
import { arrowRight } from "react-icons-kit/fa/arrowRight";
import Heading from "common/components/Heading";
import { header } from "common/data/reset";
import Text from "common/components/Text";
import { ic_info_outline } from "react-icons-kit/md/ic_info_outline";
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
  const [doesUserHasResetCard, setDoesUserHasResetCard] = useState(false);
  const [doesUserHasRebelCard, setDoesUserHasRebelCard] = useState(false);
  const [doesUserHasGimbooksCard, setDoesUserHasGimbooksCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [servicable, setServicable] = useState(true);
  const [products, setProducts] = useState([]);
  const [recommendProducts, setRecommendProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [productData, setProductData] = useState();
  const [currentCreditScore, setCurrentCreditScore] = useState();
  const [maxCreditScore, setMaxCreditScore] = useState();
  const [userCreditAccounts, setUserCreditAccounts] = useState();
  const [cookies, setCookies, removeCookies] = useCookies();
  const notify = useNotification();

  const { icon } = header;

  const showProductFeature = (product, data, pass = true) => {
    if (pass) {
      setCookies("selectedProduct", `list_${product}`, { path: "/" });
    }
    setSelectedProduct(product);
    setShowProductFeatures(true);
    setProductData(data);
  };

  const UnSelectProduct = () => {
    removeCookies("selectedProduct", { path: "/" });
    setShowProductFeatures(false);
  };
  const checkForResetCard = async () => {
    try {
      let response = await callApi(
        "/user_products_and_states/term_loan_reset",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        response.data.map((product) => {
          if (product.current_task == "disbursed" && product.loan_id != null) {
            setDoesUserHasResetCard(true);
          }
        });
      } else {
        setDoesUserHasResetCard(false);
      }
    } catch (err) {
      setDoesUserHasResetCard(false);
    }
  };

  const checkForRebelCard = async () => {
    try {
      let response = await callApi(
        "/user_products_and_states/rebel",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        response.data.map((product) => {
          if (product.current_task == "disbursed" && product.loan_id != null) {
            setDoesUserHasRebelCard(true);
          }
        });
      } else {
        setDoesUserHasRebelCard(false);
      }
    } catch (err) {
      setDoesUserHasRebelCard(false);
    }
  };

  const checkForGimbooksCard = async () => {
    try {
      let response = await callApi(
        "/user_products_and_states/redcarpet_gimbooks",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        response.data.map((product) => {
          if (product.current_task == "disbursed" && product.loan_id != null) {
            setDoesUserHasGimbooksCard(true);
          }
        });
      } else {
        setDoesUserHasGimbooksCard(false);
      }
    } catch (err) {
      setDoesUserHasGimbooksCard(false);
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
        setProducts(response.cards);
        for (let card of response.cards) {
          if (card.name === "Reset") {
            setCurrentCreditScore(card.user_credit_score);
            setMaxCreditScore(card.user_reset_max_range_pull);
            setUserCreditAccounts(card.user_credit_accounts);
          }
        }
        let recommendCard = response.cards.filter((card) => {
          return card.show == true && card.eligibility == true;
        });
        const cookieSelectedProd = cookies.selectedProduct;
        if (cookieSelectedProd) {
          if (cookieSelectedProd.includes("list_")) {
            if (cookieSelectedProd === "list_term_loan_reset") {
              const { content } = recommendCard.find(
                (e) => e.name.toLowerCase() === "reset"
              );
              showProductFeature(cookieSelectedProd.slice(5), content);
            } else {
              const { content } = recommendCard.find(
                (e) => e.name.toLowerCase() === cookieSelectedProd.slice(5)
              );
              showProductFeature(cookieSelectedProd.slice(5), content);
            }
          } else {
            showProductFeature(
              cookieSelectedProd,
              { pricing: [], offer: [] },
              false
            );
          }
        }
        if (props.userFrom) {
          let userFrom = props.userFrom;
          if (userFrom === "reset") {
            setRecommendProducts(
              recommendCard.filter((card) => card.name === "Reset")
            );
          } else if (userFrom === "rebel") {
            setRecommendProducts(
              recommendCard.filter((card) => card.name === "Rebel")
            );
          } else if (userFrom === "gimBooks") {
            setRecommendProducts(
              recommendCard.filter((card) => card.name === "Redcarpet_GimBooks")
            );
          }
        } else {
          setRecommendProducts(recommendCard);
        }
        let otherCard = response.cards.filter((card) => {
          return card.show == true && card.eligibility == false;
        });
        setOtherProducts(otherCard);
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
    checkForResetCard();
    checkForRebelCard();
    checkForGimbooksCard();
    if (!isServicable) checkUserStatus();
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
          productData={productData}
          userProfile={userProfile}
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
                if (product.name == "Reset") {
                  return (
                    <div
                      className={
                        doesUserHasResetCard ? "card-disabled" : "card"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={
                        doesUserHasResetCard
                          ? ""
                          : () =>
                              showProductFeature(
                                "term_loan_reset",
                                product.content
                              )
                      }
                    >
                      <div className="row">
                        <div className="col50">
                          {currentCreditScore && currentCreditScore > 0 ? (
                            <>
                              <div className="creditCard">
                                <table>
                                  <tr>
                                    <td
                                      style={{
                                        boxShadow:
                                          "3px 0 4px -4px rgba(0,0,0,0.1)",
                                      }}
                                    >
                                      <div>
                                        <h2>{currentCreditScore}</h2>
                                        {userCreditAccounts &&
                                        userCreditAccounts > 0 ? (
                                          <Text
                                            style={{ marginTop: "-5px" }}
                                            content={`${userCreditAccounts} credit accounts`}
                                          />
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </td>
                                    <td>
                                      <div>
                                        <Text
                                          content={
                                            <h2>
                                              {maxCreditScore &&
                                              maxCreditScore > 0
                                                ? `${maxCreditScore}`
                                                : `${currentCreditScore + 142}`}
                                            </h2>
                                          }
                                        />
                                        <Text
                                          style={{ marginTop: "-5px" }}
                                          content="With Reset card"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                              <table
                                align="center"
                                style={{
                                  color: "#333333",
                                  fontSize: "9px",
                                  marginTop: "30px",
                                }}
                              >
                                <tr>
                                  <td>FROM</td>
                                  <td>
                                    <img
                                      src={icon}
                                      height="10px"
                                      width="50.59px"
                                    />
                                  </td>
                                </tr>
                              </table>
                            </>
                          ) : (
                            <img
                              src="/images/login/Reset_Score.png"
                              style={{
                                border: "1px solid #dd285d",
                                borderRadius: "5px",
                              }}
                            />
                          )}
                        </div>
                        <div className="col50-left">
                          <p style={{ fontWeight: "bolder" }}>Reset Card</p>
                          <p style={{ fontSize: "initial" }}>
                            {product.content.introduction}
                            <br />
                            <br />
                            <b>
                              <span style={{ color: "#dd285d" }}>RESET</span>{" "}
                              helps you build your credit score.
                            </b>
                          </p>
                        </div>
                      </div>
                      <p className="note">
                        <Icon
                          icon={checkCircle}
                          style={{ color: "green" }}
                          size={22}
                        />{" "}
                        {doesUserHasResetCard
                          ? "You already have purchased this product."
                          : "Congrats, You are eligible for this product."}
                      </p>
                      <AnchorLink href="#scroll-up">
                        <Button
                          className={
                            doesUserHasResetCard
                              ? "btn-full-disabled"
                              : "btn-full"
                          }
                          title="Continue"
                        />
                      </AnchorLink>
                    </div>
                  );
                } else if (product.name == "Rebel") {
                  return (
                    <div
                      className={
                        doesUserHasRebelCard ? "card-disabled" : "card"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={
                        doesUserHasRebelCard
                          ? ""
                          : () => showProductFeature("rebel", product.content)
                      }
                    >
                      <div className="row">
                        <div className="col50">
                          <img src="/images/login/Rebel.png" />
                        </div>
                        <div className="col50-left">
                          <p style={{ fontWeight: "bolder" }}>Rebel Card</p>
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
                        {doesUserHasRebelCard
                          ? "You already have purchased this product."
                          : "Congrats, You are eligible for this product."}
                      </p>
                      <AnchorLink href="#scroll-up">
                        <Button
                          className={
                            doesUserHasRebelCard
                              ? "btn-full-disabled"
                              : "btn-full"
                          }
                          title="Continue"
                        />
                      </AnchorLink>
                    </div>
                  );
                } else if (product.name == "Redcarpet_GimBooks") {
                  return (
                    <div
                      className={
                        doesUserHasGimbooksCard ? "card-disabled" : "card"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={
                        doesUserHasGimbooksCard
                          ? ""
                          : () =>
                              showProductFeature(
                                "redcarpet_gimbooks",
                                product.content
                              )
                      }
                    >
                      <div className="row">
                        <div className="col50">
                          <img
                            width="267px"
                            height="137px"
                            src="/images/gimbook/gimbook_card.png"
                          />
                        </div>
                        <div className="col50-left">
                          <p style={{ fontWeight: "bolder" }}>GimBooks Card</p>
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
                        {doesUserHasGimbooksCard
                          ? "You already have purchased this product."
                          : "Congrats, You are eligible for this product."}
                      </p>
                      <AnchorLink href="#scroll-up">
                        <Button
                          className={
                            doesUserHasGimbooksCard
                              ? "btn-full-disabled"
                              : "btn-full"
                          }
                          title="Continue"
                        />
                      </AnchorLink>
                    </div>
                  );
                } else if (product.name === "Ruby") {
                  return (
                    <div
                      className="card"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        showProductFeature("ruby", product.content)
                      }
                    >
                      <div className="row">
                        <div className="col50">
                          <img src="/images/login/Ruby.png" />
                        </div>
                        <div className="col50-left">
                          <p style={{ fontWeight: "bolder" }}>Ruby Card</p>
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
                        Congrats, You are eligible for this product.
                      </p>
                      <AnchorLink href="#scroll-up">
                        <Button className="btn-full" title="Continue" />
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

          {otherProducts.length > 0 ? (
            <div className="row">
              <h1 className="product-header">Others</h1>
            </div>
          ) : (
            ""
          )}
          {otherProducts.map((product, id) => {
            if (product.name == "Reset") {
              return (
                <div
                  className={doesUserHasResetCard ? "card-disabled" : "card"}
                  style={{ cursor: "pointer" }}
                  onClick={
                    doesUserHasResetCard
                      ? ""
                      : () =>
                          showProductFeature("term_loan_reset", product.content)
                  }
                >
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
                      <p style={{ fontWeight: "bolder" }}>Reset Card</p>
                      <p style={{ fontSize: "initial" }}>
                        {product.content.introduction}
                        <br />
                        <br />
                        <b>
                          <span style={{ color: "#dd285d" }}>RESET</span> helps
                          you build your credit score.
                        </b>
                      </p>
                    </div>
                  </div>
                  <p className="note">
                    <Icon icon={ic_info_outline} size={22} />{" "}
                    {doesUserHasResetCard
                      ? "You already have purchased this product."
                      : "There would be a delay for this product."}
                  </p>
                  <AnchorLink href="#scroll-up">
                    <Button
                      className={
                        doesUserHasResetCard ? "btn-full-disabled" : "btn-full"
                      }
                      title="Continue"
                    />
                  </AnchorLink>
                </div>
              );
            } else if (product.name == "Rebel") {
              return (
                <div
                  className={doesUserHasRebelCard ? "card-disabled" : "card"}
                  style={{ cursor: "pointer" }}
                  onClick={
                    doesUserHasRebelCard
                      ? ""
                      : () => showProductFeature("rebel", product.content)
                  }
                >
                  <div className="row">
                    <div className="col50">
                      <img src="/images/login/Rebel.png" />
                    </div>
                    <div className="col50-left">
                      <p style={{ fontWeight: "bolder" }}>Rebel Card</p>
                      <p style={{ fontSize: "initial" }}>
                        {product.content.introduction}
                      </p>
                    </div>
                  </div>
                  <p className="note">
                    <Icon icon={ic_info_outline} size={22} />{" "}
                    {doesUserHasRebelCard
                      ? "You already have purchased this product."
                      : "There would be a delay for this product."}
                  </p>
                  <AnchorLink href="#scroll-up">
                    <Button
                      className={
                        doesUserHasRebelCard ? "btn-full-disabled" : "btn-full"
                      }
                      title="Continue"
                    />
                  </AnchorLink>
                </div>
              );
            } else if (product.name === "Ruby") {
              return (
                <div
                  className="card"
                  style={{ cursor: "pointer" }}
                  onClick={() => showProductFeature("ruby", product.content)}
                >
                  <div className="row">
                    <div className="col50">
                      <img src="/images/login/Ruby.png" />
                    </div>
                    <div className="col50-left">
                      <p style={{ fontWeight: "bolder" }}>Ruby Card</p>
                      <p style={{ fontSize: "initial" }}>
                        {product.content.introduction}
                      </p>
                    </div>
                  </div>
                  <p className="note">
                    <Icon icon={ic_info_outline} size={22} /> There would be a
                    delay for this product.
                  </p>
                  <AnchorLink href="#scroll-up">
                    <Button className="btn-full" title="Continue" />
                  </AnchorLink>
                </div>
              );
            }
          })}
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
