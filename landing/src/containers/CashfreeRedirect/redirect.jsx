import React, { useEffect, useState } from "react";
import Countdown from "../../common/components/Countdown";
import Section, { ContentWrapper } from "./redirect.style";
import Button from "common/components/Button";

const CashfreeRedirect = (props) => {
  const { query } = props;
  const [showTimerPage, setShowTimerPage] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const asyncLocalStorage = {
    setItem: async function (key, value) {
      await null;
      return localStorage.setItem(key, value);
    },
    getItem: async function (key) {
      await null;
      return localStorage.getItem(key);
    },
    removeItem: async function (key) {
      await null;
      return localStorage.removeItem(key);
    },
  };

  const messageToDisplay = (status) => {
    switch (status) {
      case "SUCCESS":
      case "PAID":
        return "Your Payment was Successful";
        break;

      case "PENDING":
        return "Your Payment is Pending";
        break;

      case "FAILED":
        return "Your Payment Failed";
        break;

      default:
        return "Your Payment didn't complete. Please try again!";
        break;
    }
  };

  const clearCashFreeRelatedLocalStorage = async () => {
    Object.entries(localStorage)
      .map((x) => x[0])
      .filter((x) => x.substring(0, 8) == "cashFree")
      .forEach((x) => localStorage.removeItem(x));
  };

  const closeWindow = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };

  useEffect(() => {
    if (showTimerPage) {
      const closeTab = () => {
        document.getElementById("closeThisTab").click();
      };
      const timer = setTimeout(() => {
        if (showTimerPage) {
          closeTab();
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showTimerPage]);

  useEffect(() => {
    async function callable() {
      if (query.status) {
        setPaymentStatus(query.status);
      }
      var paymentStatus = localStorage.getItem("cashFreePaymentStarted");
      await clearCashFreeRelatedLocalStorage();
      if (paymentStatus == "yes") {
        setShowTimerPage(true);
        if (query.reference_id) {
          localStorage.setItem(
            "cashFreePaymentReferenceId",
            query.reference_id
          );
        }
        if (query.status) {
          localStorage.setItem("cashFreePaymentStatus", query.status);
        }
        window.addEventListener("beforeunload", function (e) {
          localStorage.setItem("cashFreeTabClosed", "yes");
          return undefined;
        });
      } else {
        clearCashFreeRelatedLocalStorage();
      }
    }
    callable();
  }, []);

  return (
    <Section>
      <center>
        {showTimerPage ? (
          <div
            style={{ width: "80%", marginTop: "150px", marginBottom: "100px" }}
          >
            {paymentStatus != "" ? (
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "20px",
                  color: "#dd285d",
                }}
              >
                <h1>
                  <b>{messageToDisplay(paymentStatus)}</b>
                </h1>
              </div>
            ) : (
              ""
            )}
            <div style={{ marginTop: "20px", fontSize: "20px" }}>
              <h1>
                <b>Close this tab if this doesn't close automatically in</b>
              </h1>
            </div>
            <div style={{ marginTop: "20px", fontSize: "50px" }}>
              <Countdown time={20} />
            </div>
            <div
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                color: "#dd285d",
              }}
            >
              <div className="loader"></div>
            </div>
            <div style={{ marginTop: "50px" }}>
              <Button
                title="CLOSE THIS TAB"
                className="paybtn"
                id="closeThisTab"
                onClick={() => {
                  closeWindow();
                }}
              ></Button>
            </div>
          </div>
        ) : (
          <div
            style={{ width: "80%", marginTop: "250px", marginBottom: "200px" }}
          >
            <div style={{ marginTop: "20px", fontSize: "20px" }}>
              <h1>
                <b>404 Page Not Found</b>
              </h1>
            </div>
          </div>
        )}
      </center>
    </Section>
  );
};

export default CashfreeRedirect;
