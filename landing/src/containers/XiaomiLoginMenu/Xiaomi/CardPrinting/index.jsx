import React, { Fragment, useState, useEffect } from "react";
import Button from "common/components/Button";

import { callApi } from "common/utils/loginMiddleware";
import CardPrintingWrapper from "./styles";
import CardTracking from "../CardTracking";
import Icon from "react-icons-kit";
import { reload } from "react-icons-kit/iconic/reload";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useNotification } from "common/hooks/useNotification";

const CardPrinting = ({
  phone,
  accessToken,
  redirectUser,
  selectedProduct,
  getBacktoProduct,
}) => {
  const [userStatus, setUserStatus] = useState("");
  const [tracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProductId, setUserProductId] = useState();
  const notify = useNotification();

  const moveToTracking = () => {
    if (userStatus == "card_dispatch") {
      setTracking(true);
    } else {
      notify({ message: "Card is still to be dispatched", type: "error" });
    }
  };

  const getProductStates = async () => {
    try {
      setLoading(true);
      let response = await callApi(
        "/user_products_and_states/" + selectedProduct,
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        setLoading(false);
        response.data.map((data) => setUserStatus(data.current_task));
        response.data.map((data) => setUserProductId(data.user_product_id));
      }
    } catch (error) {
      console.log(error);
      notify({
        message: "Some Error Occurred, try again later.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    getProductStates();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <div className="loader">
          <div className="lds-dual-ring"></div>
          <center>
            <p>Hold Back and Relax we are processing your request...</p>
          </center>
        </div>
      ) : tracking ? (
        <CardTracking
          phone={phone}
          accessToken={accessToken}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          userProductId={userProductId}
          redirectUser={redirectUser}
        />
      ) : (
        <CardPrintingWrapper>
          <div className="refresh">
            <Icon
              icon={reload}
              size="30px"
              onClick={() => getProductStates()}
            />
          </div>
          <div class="row">
            <h1 className="cong">Congratulations!!!!</h1>
            <p>
              Your Card has been issued and moved to printing we will notify you
              with the tracking Id when it will get dispatched.
            </p>
            <p>
              It can take upto 72 hours for your card to get printed and
              dispatched. You can click on the refresh icon above to know the
              updated status.
            </p>
          </div>
          <div className="btn-section">
            <AnchorLink href="#scroll-up">
              <Button
                className="btn"
                title="Track Your Card"
                onClick={() => moveToTracking()}
              />
            </AnchorLink>
            <AnchorLink href="#scroll-up">
              <Button
                className="btn-light"
                title="Back"
                onClick={() => getBacktoProduct()}
              />
            </AnchorLink>
          </div>
        </CardPrintingWrapper>
      )}
    </Fragment>
  );
};

export default CardPrinting;
