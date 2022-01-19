import React, { useState, Fragment, useEffect } from "react";
import Button from "common/components/Button";
import { callApi } from "common/utils/loginMiddleware";

import Icon from "react-icons-kit";
import { check } from "react-icons-kit/feather/check";
import TncWrapper from "./style";
import PayProcessingFee from "../PayProcessingFee";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useNotification } from "common/hooks/useNotification";

const TncScreen = ({
  phone,
  accessToken,
  userProductId,
  variationId,
  unSelectProduct,
  redirectUser,
  dataBranch,
  selectedProduct,
  userProfile,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState([]);
  const [fields, setFields] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [processingFee, setProcessingFee] = useState("");
  const [productId, setProductId] = useState(userProductId);
  const notify = useNotification();

  const goBack = () => {
    setAllDone(false);
  };

  const confirmVariation = async () => {
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
              if (!d.hit_status) {
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
              }
            });
          }
        }
      }
    } catch (err) {
      setIsLoading(false);
    }
    getTnc();
    setIsLoading(false);
  };

  const acceptTnc = async () => {
    if (isChecked == false) {
      notify({ message: "Please Accept the Order Agreement", type: "error" });
      return;
    }
    if (!fields || !notes) {
      notify({
        message: "Something Went Wrong, Please try again later.",
        type: "error",
      });
      return;
    }
    try {
      setIsLoading(true);
      let response = await callApi(
        "/accept_agreement",
        "POST",
        {
          user_product_id: productId,
        },
        phone,
        accessToken
      );
      setIsLoading(false);
      if (response.result == "success") {
        try {
          if (dataBranch && dataBranch["~id"]) {
            let response1 = await callApi(
              "/get_events_branch",
              "GET",
              {},
              phone,
              accessToken
            );
            if (response1.result == "success") {
              if (response1.data) {
                response1.data.map(async (d) => {
                  if (!d.hit_status) {
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
                    let response2 = await callApi(
                      "/event_hit_success",
                      "POST",
                      {
                        product_type: d.product_type,
                        type: d.tag,
                      },
                      phone,
                      accessToken
                    );
                  }
                });
              }
            }
          }
        } catch (err) {}
        setAllDone(true);
      } else {
        notify({ message: response.message, type: "error" });
      }
      setIsLoading(false);
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  const getTnc = async () => {
    try {
      let response = await callApi(
        "/get_review_t_and_c",
        "GET",
        {
          user_product_id: userProductId,
        },
        phone,
        accessToken
      );

      if (response.result == "success") {
        setMessage(response.agreement.msg);
        setNotes(response.agreement.notes);
        setFields(response.agreement.fields);
        response.agreement.fields.map((field) => {
          if (field.type == "Processing Fees") {
            setProcessingFee(field.value);
          }
        });
        try {
          if (dataBranch && dataBranch["~id"]) {
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
        } catch (err) {
          notify({
            message: "Some Error Occurred, try again later.",
            type: "error",
          });
        }
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };
  useEffect(() => {
    if (variationId) {
      confirmVariation();
    } else {
      getTnc();
    }
  }, [productId]);

  return (
    <Fragment>
      {isLoading ? (
        <div className="loader">
          <div className="lds-dual-ring"></div>
        </div>
      ) : allDone ? (
        <PayProcessingFee
          phone={phone}
          accessToken={accessToken}
          processingFee={processingFee}
          userProductId={userProductId}
          redirectUser={redirectUser}
          goBack={goBack}
          selectedProduct={selectedProduct}
          dataBranch={dataBranch}
          userProfile={userProfile}
        />
      ) : (
        <TncWrapper>
          <div className="row">
            <Fragment>
              <div className="col60">
                <div className="row-left">
                  <div className="col30">
                    <hr className="line" />
                  </div>
                  <div className="col70">
                    <h1>Order Agreement</h1>
                  </div>
                </div>
                <table>
                  <tr>
                    <th className="left">Type</th>
                    <th className="right">Value</th>
                  </tr>
                  {fields
                    ? fields.map((field, id) => {
                        return (
                          <tr>
                            <td className="left" id={id}>
                              {field.type}
                            </td>
                            <td className="right">
                              {field.amount
                                ? "₹ " + field.value.toFixed(2)
                                : field.value}
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                </table>
                <div className="card">
                  <div className="row">
                    <ul>
                      {notes
                        ? notes.map((note, id) => {
                            if (id == 2) {
                              return (
                                <li style={{ display: "flex" }}>
                                  <div
                                    style={{
                                      display: "inline-block",
                                      marginRight: 5,
                                    }}
                                  >
                                    <Icon icon={check} size={24} />
                                  </div>

                                  <div
                                    style={{
                                      display: "inline-block",
                                      width: "100%",
                                    }}
                                  >
                                    For detailed Terms and conditions please
                                    visit:{" "}
                                    <span style={{ wordBreak: "break-word" }}>
                                      <a
                                        href="https://www.redcarpetup.com/resetagreement"
                                        target="_blank"
                                      >
                                        https://www.redcarpetup.com/resetagreement
                                      </a>
                                    </span>
                                  </div>
                                </li>
                              );
                            }
                            return (
                              <li style={{ display: "flex" }}>
                                <div
                                  style={{
                                    display: "inline-block",
                                    marginRight: 5,
                                  }}
                                >
                                  <Icon icon={check} size={24} />
                                </div>

                                <div style={{ display: "inline-block" }}>
                                  {note}
                                </div>
                              </li>
                            );
                          })
                        : ""}
                    </ul>
                  </div>
                </div>
                <label for="tnc" className="tnc">
                  <input
                    type="checkbox"
                    id="tnc"
                    name="tnc"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    style={{ marginRight: 10 }}
                  />
                  I confirm that I have read the above terms of agreement and
                  understand that in case of any default of loan payment legal
                  and criminal action can be taken against me as per Indian
                  Contract Act 1872 and IPC Section 138.
                </label>
                <AnchorLink href="#scroll-up">
                  <Button
                    title="Continue"
                    className="btn"
                    onClick={acceptTnc}
                  />
                </AnchorLink>
              </div>
            </Fragment>
          </div>
        </TncWrapper>
      )}
    </Fragment>
  );
};

export default TncScreen;
