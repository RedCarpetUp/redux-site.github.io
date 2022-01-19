import Button from "common/components/Button";
import React, { useState } from "react";

import { callApi } from "common/utils/loginMiddleware";
import { useNotification } from "common/hooks/useNotification";

const CardLostCard = ({ phone, accessToken, togglerFunc }) => {
  const [showUserCards, setShowUserCards] = useState(false);
  const [showCardType, setShowCardType] = useState(false);
  const [fetchCardsLoader, setFetchCardsLoader] = useState(false);
  const [blockCardLoader, setBlockCardLoader] = useState(false);
  const [blockPhyCardLoader, setBlockPhyCardLoader] = useState(false);
  const [blockVirCardLoader, setBlockVirCardLoader] = useState(false);
  const [refreshLoader, setRefreshLoader] = useState(false);
  const [userCardInfo, setUserCardInfo] = useState({});
  const [cardKit_number, setCardKit_number] = useState("");
  const [addressLoader, setAddressLoader] = useState(false);
  const notify = useNotification();

  const fetchUserCards = async () => {
    setFetchCardsLoader(true);
    setRefreshLoader(true);
    let response = await callApi(
      "/get_user_card_list",
      "GET",
      {},
      phone,
      accessToken
    );
    setFetchCardsLoader(false);
    setRefreshLoader(false);
    if (response.result === "error") {
      notify({ message: response.message, type: "error" });
      setShowUserCards(false);
    } else if (response.result === "success") {
      notify({ message: "Cards Fetched Successfully", type: "success" });
      setUserCardInfo(response.data);
      setShowUserCards(true);
    }
  };

  const blockCard = async (kit_number) => {
    setBlockCardLoader(true);
    let response = await callApi(
      "/create_activity_for_app",
      "POST",
      {
        current_disposition_code: "card lost",
        comments: "from web app",
        kit_number,
        task_id: userCardInfo.task_id,
        replace_option: "",
        lost_block: true,
        lost_issue_new: false,
      },
      phone,
      accessToken
    );
    setBlockCardLoader(false);

    if (response.result === "error") {
      notify({ message: response.message, type: "error" });
    } else if (response.result === "success") {
      notify({
        message: "Request For Card Block Submitted Successfully",
        type: "success",
      });
      togglerFunc();
    }
    setShowUserCards(false);
  };

  const loaderFunc = () => {
    setAddressLoader(true);
    setTimeout(() => {
      setAddressLoader(false);
    }, 25000);
  };

  const blockAndRequestCard = async (kit_number, replace_option, block) => {
    if (!block) {
      setShowCardType(true);
      setCardKit_number(kit_number);
    } else {
      replace_option === "virtual"
        ? setBlockVirCardLoader(true)
        : setBlockPhyCardLoader(true);
      let response = await callApi(
        "/create_activity_for_app",
        "POST",
        {
          current_disposition_code: "card lost",
          comments: "from web app",
          kit_number: cardKit_number,
          task_id: userCardInfo.task_id,
          replace_option,
          lost_block: true,
          lost_issue_new: true,
        },
        phone,
        accessToken
      );
      replace_option === "virtual"
        ? setBlockVirCardLoader(false)
        : setBlockPhyCardLoader(false);

      if (response.result === "error") {
        notify({ message: response.message, type: "error" });
      } else if (response.result === "success") {
        notify({ message: "Request Submitted Successfully", type: "success" });
        togglerFunc();
        loaderFunc();
      }
      setShowCardType(false);
      setShowUserCards(false);
    }
  };

  const displayCardLostButton = () => {
    return (
      <div className={"pcardWrapper"}>
        <div className={"card"}>
          {addressLoader ? (
            <div className="block text-center">
              <span>Please Wait. We are processing your Request...</span>
              <br />
              <div className="loader"></div>
            </div>
          ) : (
            <>
              <div
                className={"cardBody"}
                style={{ paddingBottom: "1rem", paddingTop: "1rem" }}
              >
                <>
                  {fetchCardsLoader ? (
                    <div className="btn btn-primary block text-center">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <Button
                      onClick={(e) => fetchUserCards()}
                      title="Apply For Card Block / Replace"
                      className="btn-full"
                    ></Button>
                  )}
                </>
              </div>

              <div className={"card"}>
                <div
                  className={"cardBody"}
                  style={{
                    paddingBottom: "0.5rem",
                    paddingTop: "0.5rem",
                    color: "green",
                  }}
                >
                  <b>
                    <span style={{ textDecoration: "underline" }}>
                      IMPORTANT:
                    </span>
                  </b>
                  <br />
                  <b>
                    1. After Successful Blocking Of Your Card Please Wait
                    atleast 30 Seconds To Reflect The Changes.
                  </b>
                  <br />
                  <b>
                    2. After Successful Blocking If Changes Doesn't Reflect
                    Please Contact Customer Care.
                  </b>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const displayUserCards = () => {
    return (
      <>
        {!showCardType ? (
          <div className={"pcardWrapper"}>
            <div className={"card"}>
              <div className={"cardHeader"}>
                <div className="row">
                  <div className={"col50 smartCardHeader"}>
                    <img
                      src="https://lh3.googleusercontent.com/gWybApiUlrw8YVknewflxjzIDEEzZPjzAacb8LsSlSa8d18XTaMFC-5UIK61g8P5stEI=w300-rw"
                      height="35px"
                      width="35px"
                      alt="RC"
                    />
                    <h5>All Active Cards</h5>
                  </div>
                  <div className={"col50 smartCardHeader"}>
                    <Button
                      onClick={(event) => {
                        fetchUserCards();
                      }}
                      title="Refresh"
                      style={{ marginLeft: "50%", width: "50%" }}
                      className="btn"
                    ></Button>
                  </div>
                </div>
              </div>
              <div
                className={"cardBody"}
                style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
              >
                <>
                  {!refreshLoader ? (
                    <>
                      {userCardInfo.card_list.map((e) => {
                        return e.card_type != "VIRTUAL" ? (
                          <div
                            className={"pcardWrapper"}
                            style={{ width: "100%" }}
                          >
                            <div className={"card"}>
                              <div
                                className={"cardBody"}
                                style={{
                                  paddingBottom: "0.5rem",
                                  paddingTop: "0.5rem",
                                }}
                              >
                                <b>Card Name</b>: {e.card_name}
                                <br />
                                <b>Card Number</b>: {e.card_number}
                                <br />
                                <b>Kit Number</b>: {e.kit_number}
                                <br />
                                <b>Type</b>: {e.card_type}
                                {e.card_type != "VIRTUAL" ? (
                                  userCardInfo.is_eligible_for_card_block ? (
                                    <>
                                      <>
                                        {blockCardLoader ? (
                                          <div
                                            className="btn-full block text-center"
                                            style={{
                                              marginBottom: "0.5rem",
                                              marginTop: "0.5rem",
                                            }}
                                          >
                                            <div className="loader"></div>
                                          </div>
                                        ) : (
                                          <Button
                                            onClick={(event) => {
                                              if (
                                                window.confirm(
                                                  "Are you sure you want to block your card?"
                                                )
                                              )
                                                blockCard(e.kit_number);
                                            }}
                                            title="Block Card"
                                            className="btn-full"
                                            style={{
                                              marginBottom: "0.5rem",
                                              marginTop: "0.5rem",
                                            }}
                                          ></Button>
                                        )}
                                        <h6
                                          className="text-center"
                                          style={{ color: "red" }}
                                        >
                                          *Please Note: Once the Physical card
                                          is blocked, the same card cannot be
                                          unblocked and used for further
                                          online/offline transactions.
                                          <b>
                                            The complete process is
                                            irreversible.
                                          </b>
                                        </h6>
                                        <br />
                                      </>
                                      <Button
                                        onClick={(event) =>
                                          blockAndRequestCard(
                                            e.kit_number,
                                            "",
                                            false
                                          )
                                        }
                                        className="btn-full"
                                        title="Block And Request New Card"
                                      ></Button>
                                      <h6
                                        className="text-center"
                                        style={{ color: "red" }}
                                      >
                                        *Please Note: If you request to block &
                                        reissue a card,a replacement card with a
                                        different card number will be sent to
                                        your registered mailing address or you
                                        can update the delivery address during
                                        the reissue proccess. In case of
                                        reissue/replacement, a minimal
                                        replacement fee will be charged.
                                      </h6>
                                      <br />
                                    </>
                                  ) : (
                                    <Button
                                      className="btn-full"
                                      style={{
                                        marginBottom: "0.5rem",
                                        marginTop: "0.5rem",
                                        color: "darkgreen",
                                        fontWeight: "bold",
                                      }}
                                      title="Card Block / Replace Request In Progress"
                                    ></Button>
                                  )
                                ) : (
                                  ""
                                )}
                              </div>

                              <div className={"card"}>
                                <div
                                  className={"cardBody"}
                                  style={{
                                    paddingBottom: "0.5rem",
                                    paddingTop: "0.5rem",
                                    color: "green",
                                  }}
                                >
                                  <b>
                                    <span
                                      style={{ textDecoration: "underline" }}
                                    >
                                      IMPORTANT:
                                    </span>
                                  </b>
                                  <br />
                                  <b>
                                    1. After successful submission of
                                    request,you will receive a block
                                    confirmation via SMS in your registered
                                    mobile number.
                                  </b>
                                  <br />
                                  <b>
                                    2. After Successful Blocking Of Your Card
                                    Please Wait atleast 30 Seconds To Reflect
                                    The Changes.
                                  </b>
                                  <br />
                                  <b>
                                    3. After Successful Blocking If Changes
                                    Doesn't Reflect Please Contact Customer
                                    Care.
                                  </b>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        );
                      })}
                    </>
                  ) : (
                    <div className="block text-center">
                      <div className="loader"></div>
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
        ) : (
          displayCardTypeOptions()
        )}
      </>
    );
  };

  const displayCardTypeOptions = () => {
    return (
      <div className={"pcardWrapper"}>
        <div className={"card"}>
          <div className={"cardHeader"}>
            <div className="row">
              <div className={"col50 smartCardHeader"}>
                <h5>Select Card Type</h5>
              </div>
              <div className={"col50 smartCardHeader"}>
                <Button
                  onClick={(event) => setShowCardType(false)}
                  title="Back"
                  style={{ marginLeft: "50%", width: "50%" }}
                  className="btn"
                ></Button>
              </div>
            </div>
          </div>
          <div
            className={"cardBody"}
            style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
          >
            <>
              {userCardInfo.replace_options &&
              userCardInfo.replace_options.virtual.allow ? (
                <>
                  {blockVirCardLoader ? (
                    <div
                      className="btn btn-primary block text-center"
                      style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                    >
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <Button
                      onClick={(event) =>
                        blockAndRequestCard("", "virtual", true)
                      }
                      title={
                        "Apply For New Virtual Card " +
                        userCardInfo.replace_options.virtual.message
                      }
                      style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                      className="btn-full"
                    >
                      <br />
                      {/* <span style={{ color: 'green' }}>({userCardInfo.replace_options.virtual.message})</span> */}
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  title={
                    "Apply For New Virtual Card " +
                    userCardInfo.replace_options.virtual.message
                  }
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                  className="btn-full"
                  disabled
                >
                  <br />
                  {/* <span style={{ color: 'red' }}>({userCardInfo.replace_options.virtual.message})</span> */}
                </Button>
              )}
              <br />
              <b>OR</b>
              <br />
              {userCardInfo.replace_options &&
              userCardInfo.replace_options.physical.allow ? (
                <>
                  {blockPhyCardLoader ? (
                    <div
                      className="btn btn-primary block text-center"
                      style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                    >
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <Button
                      onClick={(event) =>
                        blockAndRequestCard("", "physical", true)
                      }
                      title={
                        "Apply For New Physical Card " +
                        userCardInfo.replace_options.physical.message
                      }
                      style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                      className="btn-full"
                    >
                      <br />
                      {/* <span style={{ color: 'green' }}>({userCardInfo.replace_options.physical.message})</span> */}
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  title={
                    "Apply For New Physical Card " +
                    userCardInfo.replace_options.physical.message
                  }
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                  disabled
                  className="btn-full"
                >
                  <br />
                  {/* <span style={{ color: 'red' }}>({userCardInfo.replace_options.physical.message})</span> */}
                </Button>
              )}
            </>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!showUserCards ? (
        <div>{displayCardLostButton()}</div>
      ) : (
        <div>{displayUserCards()}</div>
      )}
    </div>
  );
};

export default CardLostCard;
