import React, { useState, useEffect, Fragment } from "react";
import Text from "common/components/Text";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";

import OnBoardUser from "../index";
import ProductList from "../ProductList";
import { useNotification } from "common/hooks/useNotification";

const UnServiceable = (props) => {
  const { phone, accessToken, userStatus, showOnboard, redirectUser } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [servicable, setServicable] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const notify = useNotification();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
    getUserProfile();
  }, []);

  const checkServiceAvailability = async () => {
    try {
      setIsLoading(true);

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

  const getUserProfile = async () => {
    try {
      setIsLoading(true);
      let response = await callApi(
        "/get_new_user_profile",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result === "success") {
        setUserProfile(response.user);
        setIsLoading(false);
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

  return (
    <Fragment>
      {isLoading ? (
        <div className="loader">
          <div class="lds-dual-ring"></div>
        </div>
      ) : servicable ? (
        props.currentComponent === "ProductList" ? (
          <ProductList
            phone={phone}
            accessToken={accessToken}
            userProfile={userProfile}
            isServicable={servicable}
            userFrom={props.userFrom ? props.userFrom : ""}
          />
        ) : (
          <OnBoardUser
            phone={phone}
            accessToken={accessToken}
            userProfile={userProfile}
            userStatus={userStatus}
            redirectUser={redirectUser}
            branchData={props.branchData ? props.branchData : ""}
            showOnboard={showOnboard}
            userFrom={props.userFrom ? props.userFrom : ""}
          />
        )
      ) : (
        <div
          className={"pcardWrapper"}
          style={{ padding: "30px", textAlign: "center" }}
        >
          <div className={"card"}>
            <div className={"cardHeader"}>
              <h1>Pin-Code Unavailable</h1>
            </div>
            <div
              className={"cardBody"}
              style={{
                paddingBottom: "1rem",
                paddingTop: "1rem",
              }}
            >
              <Text content="We are not available in this area. Kindly try again after some time." />
              <Button
                title="Re-Check Availability"
                style={{ borderRadius: "5px", backgroundColor: "#dd285d" }}
                className="btn"
                onClick={(event) => {
                  checkServiceAvailability(event);
                }}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UnServiceable;
