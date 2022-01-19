import React, { useState, useEffect, Fragment } from "react";
import "rc-tabs/assets/index.css";

import MenuBaseLogin from "../MenuBaseLogin";
import OnBoardUser from "./OnBoardUser";
import ProductList from "./OnBoardUser/ProductList";
import LoginList from "../../pages/mi-credit/login/loginList";
import OnBoardWrapper from "./OnBoardUser/style";
import { useNotification } from "common/hooks/useNotification";
import { callApi } from "common/utils/loginMiddleware";

const LoginMenu = (props) => {
  const { phone, accessToken, isnewUser } = props;
  const [isNewUser, setIsNewUser] = useState(isnewUser);
  const [isLoading, setIsLoading] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [redirectedUser, setRedirectedUser] = useState(false);
  const [showOnboard, setShowOnboard] = useState();
  const [showPersonalInfoPage, setShowPersonalInfoPage] = useState(false);
  const [hasXiaomiCard, setHasXiaomiCard] = useState(false);
  const notify = useNotification();

  useEffect(() => {
    getUserProfile();
    getUserStatus();
  }, [isNewUser]);

  const getXiaomiUserFunnel = async () => {
    setIsLoading(true);
    try {
      let response = await callApi(
        "/user_products_and_states/redcarpet_xiaomi_customer",
        "GET",
        {},
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response.result == "success") {
        response.data.map(
          (data) =>
            ["merchant_settlement", "disburse"].includes(data.current_task) &&
            setHasXiaomiCard(true)
        );
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      console.log(error);
      notify({
        mmessage: "Some Error Occurred, try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getXiaomiUserFunnel();
  }, [redirectedUser]);

  const getUserStatus = async () => {
    try {
      setIsLoading(true);
      let response1 = await callApi(
        "/app_card_description",
        "GET",
        {},
        phone,
        accessToken
      );
      let response = await callApi(
        "/get_user_status",
        "GET",
        {},
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response1.result == "success") {
        setShowOnboard(!response1.gov_doc);
        setShowPersonalInfoPage(!response1.personal_info);
      }
      if (response.result === "success") {
        setUserStatus(response.data);
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

  const RedirectUser = () => {
    setRedirectedUser(true);
  };

  const onBoardUser = () => {
    return (
      <OnBoardUser
        phone={phone}
        accessToken={accessToken}
        userProfile={userProfile}
        userStatus={userStatus}
        redirectUser={RedirectUser}
        branchData={props.branchData ? props.branchData : ""}
        showOnboard={showOnboard}
        showPersonalInfoPage={showPersonalInfoPage}
        getUserStatus={getUserStatus}
        userFrom={props.userFrom ? props.userFrom : ""}
      />
    );
  };

  const productSelection = () => {
    return (
      <OnBoardWrapper>
        <ProductList
          phone={phone}
          accessToken={accessToken}
          userProfile={userProfile}
          redirectUser={RedirectUser}
          userFrom={props.userFrom ? props.userFrom : ""}
        />
      </OnBoardWrapper>
    );
  };

  const menu_data1 = [
    {
      title: "",
      component: onBoardUser,
      class: "card-full",
    },
  ];
  const menu_data2 = [
    {
      title: "",
      component: productSelection,
      class: "card-full",
    },
  ];

  return (
    <Fragment>
      {isLoading ? (
        <div className="text-center">
          <div className="loader"></div>
        </div>
      ) : redirectedUser ? (
        <LoginList
          phone={phone}
          hasXiaomiCard={hasXiaomiCard}
          accessToken={accessToken}
        />
      ) : userProfile ? (
        showPersonalInfoPage || showOnboard ? (
          <MenuBaseLogin options={menu_data1} />
        ) : (
          <MenuBaseLogin options={menu_data2} />
        )
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default LoginMenu;
