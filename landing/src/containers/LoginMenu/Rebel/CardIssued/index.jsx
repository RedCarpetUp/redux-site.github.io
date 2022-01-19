import React, { Fragment, useState, useEffect } from "react";
import CardIssuedWrapper from "./styles";
import Image from "common/components/Image";
import { callApi } from "common/utils/loginMiddleware";
import CardPrinting from "../CardPrinting";
import Icon from "react-icons-kit";
import Celebrate from "public/images/rebel/celebrate.svg";
import { useNotification } from "common/hooks/useNotification";
import { reload } from "react-icons-kit/iconic/reload";
import CardTracking from "../CardTracking";
import UploadDocuments from "../../OnBoardUser/UploadDocuments";
import useAnalytics from "../../../../common/hooks/useAnalytics";
import { analyticsData } from "../../../../common/data/analytics";

const CardIssued = ({
  phone,
  accessToken,
  redirectUser,
  selectedProduct,
  getBacktoProduct,
  moveUser,
  userProfile,
}) => {
  //const [currentStatus, setCurrentStatus] = useState("")
  const [userStatus, setUserStatus] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [userProductId, setUserProductId] = useState();
  const [userName, setUserName] = useState("");
  const notify = useNotification();

  const getProductStates = async () => {
    setIsLoading(true);
    try {
      let response = await callApi(
        "/user_products_and_states/" + selectedProduct,
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        setIsLoading(false);
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

  const getUserDetail = async () => {
    setIsLoading(true);
    try {
      let response = await callApi(
        "/get_new_user_profile",
        "GET",
        {},
        phone,
        accessToken
      );
      if (response.result == "success") {
        setIsLoading(false);
        setUserName(response.user.user_data.first_name);
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
    let analyticData = {
      Event: analyticsData.VISITED_SCREEN,
      "Screen Name": analyticsData.REBEL_WAITLIST_SCREEN,
    };
    useAnalytics(analyticData);
    getUserDetail();
    getProductStates();
  }, []);

  return (
    <Fragment>
      {isloading ? (
        <div className="loader">
          <div className="lds-dual-ring"></div>
          <center>
            <p>Hold Back and Relax we are processing your request...</p>
          </center>
        </div>
      ) : userStatus == "doc_upload" ? (
        <UploadDocuments
          phone={phone}
          accessToken={accessToken}
          redirectUser={redirectUser}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          moveUser={moveUser}
          userProfile={userProfile}
        />
      ) : userStatus == "card_printing" && selectedProduct == "rebel" ? (
        <CardPrinting
          phone={phone}
          accessToken={accessToken}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          redirectUser={redirectUser}
        />
      ) : (userStatus == "card_dispatch" || userStatus == "card_activate") &&
        selectedProduct == "rebel" ? (
        <CardTracking
          phone={phone}
          accessToken={accessToken}
          selectedProduct={selectedProduct}
          getBacktoProduct={getBacktoProduct}
          userProductId={userProductId}
          redirectUser={redirectUser}
        />
      ) : userStatus == "rejects" && selectedProduct == "rebel" ? (
        <CardIssuedWrapper>
          <div className="row-left">
            <div className="col30">
              <hr className="line" />
            </div>
            <div className="col70">Application Rejected</div>
          </div>
          <div class="row">
            <div style={{ margin: "20px 0 0px 0" }}>
              <Image
                src={`/images/user_rejects.svg`}
                alt="Application Rejected"
                height={300}
                width={300}
              />
            </div>
            <h4>
              <span className="cong-reject">We are sorry!</span>{" "}
              <span className="user-name-reject">{userName}</span>
            </h4>
            <p className="reject-message">
              We regret to inform you that your application has been rejected as
              it doesn't meet the bank's policy norms
            </p>
          </div>
        </CardIssuedWrapper>
      ) : (
        <CardIssuedWrapper>
          <div className="refresh">
            <Icon
              icon={reload}
              size="30px"
              onClick={() => getProductStates()}
            />
          </div>
          <div className="row-left">
            <div className="col30">
              <hr className="line" />
            </div>
            <div className="col70">Application Submitted</div>
          </div>
          <center>
            <img src={Celebrate} style={{ marginTop: "5%" }} />
          </center>
          <div class="row">
            <h4>
              <span className="cong">Congratulations</span>{" "}
              <span className="user-name">{userName}</span>
            </h4>
            <p style={{ marginBottom: "5%", marginTop: 0 }}>
              You have unlocked the priority access to your rebel card. Thank
              you for joining us on this journey. We assure you, this is going
              to be the most rewarding experience. We will update you soon on
              your status.
            </p>
          </div>
        </CardIssuedWrapper>
      )}
    </Fragment>
  );
};

export default CardIssued;
