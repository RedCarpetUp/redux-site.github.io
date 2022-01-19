import React, { useState, useEffect } from "react";
import { callApi } from "common/utils/loginMiddleware";

import Slider from "react-input-slider";
import Button from "common/components/Button";
import { useNotification } from "common/hooks/useNotification";

const CardSettings = ({ kitNumber, phone, accessToken, card, toggle }) => {
  const [state, setState] = useState({ x: 0 });

  const [isCardLimit, setIsCardLimit] = useState(false);

  const [min_single_txn_limit, set_min_single_txn_limit] = useState();
  const [max_single_txn_limit, set_max_single_txn_limit] = useState();
  const [single_txn_limit, set_single_txn_limit] = useState();

  const [min_daily_txn, set_min_daily_txn] = useState();
  const [max_daily_txn, set_max_daily_txn] = useState();
  const [current_daily_txn, set_current_daily_txn] = useState();

  const [min_daily_spend_limit, set_min_daily_spend_limit] = useState();
  const [max_daily_spend_limit, set_max_daily_spend_limit] = useState();
  const [current_daily_spend_limit, set_current_daily_spend_limit] = useState();
  const notify = useNotification();

  const getCardSettings = async () => {
    try {
      let response = await callApi(
        "/get_card_settings",
        "GET",
        { kit_number: kitNumber },
        phone,
        accessToken
      );
      if (response.result == "success") {
        setIsCardLimit(true);
        set_min_daily_txn(response.data.min_daily_txn);
        set_max_daily_txn(response.data.max_daily_txn);
        set_current_daily_txn(response.data.current_daily_txn);

        set_min_daily_spend_limit(response.data.min_daily_spend_limit);
        set_max_daily_spend_limit(response.data.max_daily_spend_limit);
        set_current_daily_spend_limit(response.data.current_daily_spend_limit);

        set_min_single_txn_limit(response.data.min_single_txn_limit);
        set_max_single_txn_limit(response.data.max_single_txn_limit);
        set_single_txn_limit(response.data.single_txn_limit);
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  const setCardSetting = async () => {
    try {
      let response = await callApi(
        "/set_card_settings",
        "POST",
        {
          kit_number: kitNumber,
          current_daily_txn: current_daily_txn,
          single_txn_limit: single_txn_limit,
          current_daily_spend_limit: current_daily_spend_limit,
        },
        phone,
        accessToken
      );
      if (response.result == "success") {
        notify({ message: `Limits are set successfully`, type: "success" });
        toggle();
      } else {
        notify({ message: response.message, type: "error" });
      }
    } catch (error) {
      notify({ message: error.message, type: "error" });
    }
  };

  useEffect(() => {
    getCardSettings();
  }, []);

  const renderCardSettings = () => {
    if (isCardLimit) {
      if (
        min_daily_txn >= max_daily_txn ||
        min_daily_spend_limit >= max_daily_spend_limit ||
        min_single_txn_limit >= max_single_txn_limit
      ) {
        return (
          <div className="text-center">
            <div>Sorry, you are not eligible to change card limit</div>
          </div>
        );
      } else {
        return (
          <div className="text-center">
            <div>{"Number of Daily Transaction: " + current_daily_txn}</div>
            <Slider
              axis="x"
              xstep={1}
              xmin={min_daily_txn}
              xmax={max_daily_txn}
              x={current_daily_txn}
              onChange={({ x }) => set_current_daily_txn(x)}
              style={{ width: "100%" }}
              styles={{
                active: {
                  backgroundColor: `#dd285d`,
                },
              }}
            />

            <div
              style={{
                display: "flex",
                paddingTop: "0.5rem",
              }}
            >
              <div>{min_daily_txn}</div>
              <div style={{ flex: 1, textAlign: "right" }}>{max_daily_txn}</div>
            </div>

            <div style={{ marginTop: "20px" }}>
              {"Daily Spend Limit: " + current_daily_spend_limit}
            </div>

            <Slider
              axis="x"
              xstep={1}
              xmin={min_daily_spend_limit}
              xmax={max_daily_spend_limit}
              x={current_daily_spend_limit}
              onChange={({ x }) => set_current_daily_spend_limit(x)}
              style={{ width: "100%" }}
              styles={{
                active: {
                  backgroundColor: `#dd285d`,
                },
              }}
            />
            <div
              style={{
                display: "flex",
                paddingTop: "0.5rem",
              }}
            >
              <div>{min_daily_spend_limit}</div>
              <div style={{ flex: 1, textAlign: "right" }}>
                {max_daily_spend_limit}
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              {"Single Transaction Limit: " + single_txn_limit}
            </div>
            <Slider
              axis="x"
              xstep={1}
              xmin={min_single_txn_limit}
              xmax={max_single_txn_limit}
              x={single_txn_limit}
              onChange={({ x }) => set_single_txn_limit(x)}
              style={{ width: "100%" }}
              styles={{
                active: {
                  backgroundColor: `#dd285d`,
                },
              }}
            />
            <div
              style={{
                display: "flex",
                paddingTop: "0.5rem",
              }}
            >
              <div>{min_single_txn_limit}</div>
              <div style={{ flex: 1, textAlign: "right" }}>
                {max_single_txn_limit}
              </div>
            </div>
            <Button
              title={"submit"}
              onClick={setCardSetting}
              className="btn"
            ></Button>
          </div>
        );
      }
    }
  };

  return <div className={"smartCardWrapper"}>{renderCardSettings()}</div>;
};

export default CardSettings;
