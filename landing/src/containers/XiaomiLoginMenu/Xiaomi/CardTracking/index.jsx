import React, { Fragment } from "react";
import CardTrackingWrapper from "./styles";
import Button from "common/components/Button";

import { callApi } from "common/utils/loginMiddleware";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useNotification } from "common/hooks/useNotification";

const CardTracking = ({
  phone,
  accessToken,
  redirectUser,
  getBacktoProduct,
  userProductId,
}) => {
  const product_id = userProductId;
  const notify = useNotification();
  const viewActivateCard = async () => {
    try {
      let response = await callApi(
        "/create_activity_for_redcarpet_xiaomi_customer",
        "POST",
        {
          product_id: product_id,
          cvv: "",
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        redirectUser();
      } else if (response.result === "error") {
        notify({ message: response.message, type: "error" });
      }
    } catch {
      notify({
        message: "unable to process request please try again later",
        type: "error",
      });
    }
  };
  const copyMailId = document.querySelectorAll(".mail-text");

  copyMailId.forEach((copyText) => {
    copyText.addEventListener("click", () => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(copyText);
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        document.execCommand("copy");
        selection.removeAllRanges();

        const mailId = copyText.textContent;
        copyText.textContent = "Copied!";
        copyText.classList.add("success");

        setTimeout(() => {
          copyText.textContent = mailId;
          copyText.classList.remove("success");
        }, 1000);
      } catch (e) {
        copyText.textContent = "Couldn't copy, hit Ctrl+C!";
        copyText.classList.add("error");

        setTimeout(() => {
          errorMsg.classList.remove("show");
        }, 1200);
      }
    });
  });

  return (
    <Fragment>
      <CardTrackingWrapper>
        <div className="row-left">
          <div className="col30">
            <hr className="line" />
          </div>
          <div className="col70">
            <h1>Card Tracking and Activation</h1>
          </div>
        </div>
        <div className="row">
          <div>
            <p>
              <h2>To activate your virtual card, click activate</h2>
            </p>
          </div>
        </div>
        <br />
        <div className="btn-section">
          <AnchorLink href="#scroll-up">
            <Button
              className="btn-light"
              title="Back"
              onClick={() => getBacktoProduct()}
            />
          </AnchorLink>
          <Button
            className="btn"
            title="Activate Your Card"
            onClick={() => viewActivateCard()}
          />
        </div>
      </CardTrackingWrapper>
    </Fragment>
  );
};

export default CardTracking;
