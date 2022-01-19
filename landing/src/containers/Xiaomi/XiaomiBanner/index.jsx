import Button from "common/components/Button";
import Input from "common/components/Input";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { arrowRight } from "react-icons-kit/feather/arrowRight";
import { angleDoubleDown } from "react-icons-kit/fa/angleDoubleDown";
import { arrowDown } from "react-icons-kit/fa/arrowDown";
import React, { useState } from "react";
import { header } from "common/data/xiaomi";
import { SectionWrapper } from "./bannerSection.style";
import validator from "validator";
import { useNotification } from "common/hooks/useNotification";
import { useCookies } from "react-cookie";

const XiaomiBanner = ({ row, col, redirect, handleLearnMore }) => {
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
    <SectionWrapper>
      <Container>
        <div className="flex-section">
          <div className="flex-content">
            <Heading content={title_static} />
            <p>{description}</p>
            <div className="phone-number-container">
              {!cookies.phone &&
                !cookies.accessToken &&
                !cookies.mi_phone &&
                !cookies.mi_accessToken &&
                !cookies.store_phone &&
                !cookies.store_accessToken && (
                  <>
                    <Input
                      value={phone}
                      placeholder={`Mobile Number`}
                      onChange={(e) => setPhone(e)}
                      className="phone-input"
                    />
                    <Button
                      title={link_text}
                      onClick={redirectPhone}
                      className="apply-now-btn"
                      icon={<Icon icon={arrowRight} />}
                    />
                  </>
                )}
              <Button
                title={"Learn More"}
                onClick={handleLearnMore}
                className="learn-more-btn"
                icon={<Icon icon={arrowDown} />}
              />
            </div>
          </div>
          <div className="flex-image">
            <Image
              width="500px"
              className="center-it"
              src={`/images/xiaomi/xiaomi_card.png`}
            />
          </div>
        </div>
        <div className="go-down" onClick={handleLearnMore}>
          <Icon size={72} icon={angleDoubleDown} />
        </div>
      </Container>
    </SectionWrapper>
  );
};

XiaomiBanner.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

XiaomiBanner.defaultProps = {
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

export default XiaomiBanner;
