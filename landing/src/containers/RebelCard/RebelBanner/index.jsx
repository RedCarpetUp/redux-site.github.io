import Box from "common/components/Box";
import Button from "common/components/Button";
import Input from "common/components/Input";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { arrowRight } from "react-icons-kit/feather/arrowRight";
import React, { useState } from "react";
import { header } from "common/data/rebel";
import CareerSection from "../rebel.style";
import BannerWrapper from "./bannerSection.style";
import validator from "validator";

import { useNotification } from "common/hooks/useNotification";
import { useCookies } from "react-cookie";

const RebelBanner = ({ row, col, redirect }) => {
  const { title_static, image, description, description1, link_text } = header;
  const [phone, setPhone] = useState("");
  const notify = useNotification();
  const [cookies] = useCookies();

  const redirectPhone = () => {
    validator.isMobilePhone(phone, "en-IN")
      ? redirect(phone)
      : notify({ message: "Wrong Phone Number", type: "error" });
  };
  return (
    <CareerSection>
      <BannerWrapper className="section">
        <center>
          <img
            src="/images/rebel/RedCarpet Rebel Card.svg"
            className=" contain"
          />
        </center>

        <Container style={{ paddingTop: "50px" }}>
          <Box
            className="row pad"
            style={{
              margin: "0 auto",
              textAlign: "center",
            }}
            {...row}
          >
            <Box className="col" {...col} style={{ margin: "0" }}>
              <div className="textDiv" {...row}>
                <h1
                  style={{
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    marginTop: "0rem",
                  }}
                >
                  {title_static}
                </h1>
                <p
                  className="lead-2"
                  style={{
                    paddingTop: "0rem",
                    color: "black",
                    marginBottom: "0rem",
                    marginTop: "0rem",
                  }}
                >
                  {description}
                </p>
                <p
                  className="lead-2"
                  style={{
                    paddingTop: "0rem",
                    color: "black",
                    marginTop: "0rem",
                  }}
                >
                  {description1}
                </p>
                {!cookies.phone &&
                !cookies.accessToken &&
                !cookies.mi_phone &&
                !cookies.mi_accessToken &&
                !cookies.store_phone &&
                !cookies.store_accessToken && (
                  <>
                    <div className="input-row">
                      <Input
                        type="number"
                        placeholder="Mobile Number"
                        required={true}
                        onChange={(event) => setPhone(event)}
                        value={phone}
                        className="input"
                      />
                    </div>
                    <div className="input-row">
                      <Button
                        title={link_text}
                        style={{ borderRadius: "5px" }}
                        onClick={redirectPhone}
                        className="btn"
                        icon={<Icon icon={arrowRight} />}
                      />
                    </div>
                  </>
                )}
              </div>
            </Box>
            <Box className="col back" {...col}></Box>
          </Box>
        </Container>
      </BannerWrapper>
    </CareerSection>
  );
};

RebelBanner.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

RebelBanner.defaultProps = {
  row: {
    alignItems: "center",
    width: [1, "100%", "100%", "100%"],
    textAlign: "center",
  },
  col: {
    width: [1, 1, "50%", "50%"],
  },
};

// const LoadableCareerBanner = Loadable(() => import("./index"))

export default RebelBanner;
