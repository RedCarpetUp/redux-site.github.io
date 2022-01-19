import React, { useState, useEffect } from "react";

import { callApi } from "common/utils/loginMiddleware";
import LoginWrapper, { BackgroundWrapper } from "./login.style";
import Button from "common/components/Button";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { info } from "react-icons-kit/feather/info";
import Icon from "react-icons-kit";
import { useNotification } from "common/hooks/useNotification";

const Digitap = (props) => {
  const { phone, accessToken } = props;
  const notify = useNotification();
  const [loader, setLoader] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState({});
  const [screen, setScreen] = useState(1);
  const [url, setUrl] = useState();

  const getBankList = async () => {
    setLoader(true);
    let resp = await callApi(
      "/digitap_institute_list",
      "GET",
      {},
      phone,
      accessToken
    );
    setLoader(false);
    if (resp.result == "success") {
      let v = [];
      v = resp.data;
      setBankList(v);
    }
  };

  useEffect(() => {
    getBankList();
    window.onbeforeunload = () => {
      return "Data will be lost if you leave the page, are you sure?";
    };
  }, []);

  const handleBack = () => {
    setScreen(1);
    setUrl();
  };

  const handleUrl = () => {
    window.open(url, "_blank");
  };

  const getBankUrl = async () => {
    if (typeof bank.length == "undefined") {
      notify({ message: "Please select a bank", type: "error" });
      return;
    }
    let resp = bankList.filter((banks) => {
      return banks.name === bank;
    });
    try {
      let num = resp[0].id;
      setLoader(true);
      let response = await callApi(
        "/digitap_url_generate",
        "POST",
        { institution_id: parseInt(num).toString() },
        phone,
        accessToken
      );
      setLoader(false);
      if (response.result == "success") {
        setUrl(response.url);
        setScreen(2);
      }
    } catch (err) {
      setLoader(false);
      notify({ type: "error", message: err.message });
    }
  };

  const digiBanks = () => {
    return screen == 1 ? (
      <div className={"pcardWrapper"}>
        <div className={"card"}>
          <div className={"cardHeader"}>
            <div className="row">
              <div className={"smartCardHeader"}>
                <img
                  src="https://lh3.googleusercontent.com/gWybApiUlrw8YVknewflxjzIDEEzZPjzAacb8LsSlSa8d18XTaMFC-5UIK61g8P5stEI=w300-rw"
                  height="35px"
                  width="35px"
                  alt="RC"
                />
                <h4 style={{ marginLeft: "1rem" }}>
                  Bank Statement verification form
                </h4>
              </div>
            </div>
          </div>

          <div
            className={"cardBody"}
            style={{ paddingBottom: "1rem", paddingTop: "1rem" }}
          >
            <div className="row">Please select your bank name</div>
            <div className="form Input-line">
              <div className="form-control">
                <select
                  style={{ opacity: "0.6" }}
                  placeholder="Bank"
                  className={"form-control-select"}
                  style={{ marginTop: "1rem", opacity: "0.6" }}
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                >
                  <option value="" selected hidden>
                    Select Bank
                  </option>
                  {bankList.map((bank, id) => {
                    return (
                      <option value={bank.name} id={bank.id}>
                        {bank.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <AnchorLink href="#scroll-up">
              <Button
                title="Submit"
                onClick={() => getBankUrl()}
                className="btn"
              />
            </AnchorLink>
          </div>
        </div>
      </div>
    ) : (
      <div className={"pcardWrapper"}>
        <div className={"card"}>
          <div className={"cardHeader"}>
            <div className="row">
              <div className={"smartCardHeader"}>
                <img
                  src="https://lh3.googleusercontent.com/gWybApiUlrw8YVknewflxjzIDEEzZPjzAacb8LsSlSa8d18XTaMFC-5UIK61g8P5stEI=w300-rw"
                  height="35px"
                  width="35px"
                  alt="RC"
                />
                <h4 style={{ marginLeft: "1rem" }}>
                  Bank Statement verification form
                </h4>
              </div>
            </div>
          </div>

          <div
            className={"cardBody"}
            style={{ paddingBottom: "1rem", paddingTop: "1rem" }}
          >
            <div className="row">
              <h3 style={{ textAlign: "initial" }}>
                Please click on the verify button for bank statement
                verification
              </h3>
            </div>
            <div className="row" style={{ marginTop: 10, marginBottom: 20 }}>
              <span className={"inputPayCombo-note"}>
                <div className="note-black" style={{ display: "inline-block" }}>
                  <Icon icon={info} />
                </div>
                <span className="note-txt">
                  You may close the window after submitting bank statement
                </span>
              </span>
            </div>
            <AnchorLink href="#scroll-up" style={{ marginRight: 10 }}>
              <Button
                title="Verify"
                onClick={() => handleUrl()}
                className="btn"
                href={url}
              />
            </AnchorLink>
            <AnchorLink href="#scroll-up">
              <Button
                title="Back"
                onClick={() => handleBack()}
                className="btn-light"
              />
            </AnchorLink>
          </div>
        </div>
      </div>
    );
  };

  return (
    <BackgroundWrapper>
      <LoginWrapper>
        <div
          className="text-center"
          style={{ margin: "0 auto", padding: " 0" }}
        >
          {loader ? (
            <div
              className="text-center"
              style={{ width: "100%", marginTop: 100 }}
            >
              <div className="loader"></div>
            </div>
          ) : (
            <div>{digiBanks()}</div>
          )}
        </div>
      </LoginWrapper>
    </BackgroundWrapper>
  );
};

export default Digitap;
