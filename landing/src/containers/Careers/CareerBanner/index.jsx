import Loadable from "@loadable/component";
import Box from "common/components/Box";
import Button from "common/components/Button";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { header } from "common/data/career";
import CareerSection from "../careers.style";
import BannerWrapper from "./bannerSection.style";

const CareerBanner = ({ row, col }) => {
  const Typing = Loadable(() => import("react-typing-effect"));
  const { title_static, title_typing, image, description, link, link_text } =
    header;
  return (
    <CareerSection>
      <BannerWrapper className="section back">
        <Container style={{ paddingTop: "50px" }}>
          <Box
            className="row pad"
            style={{
              margin: "0 auto",
              textAlign: "center",
            }}
            {...row}
          >
            <Box className="col" {...col} style={{ margin: "0 auto" }}>
              <div className="textDiv" {...row}>
                <h1 style={{ fontSize: "2.5em" }}>
                  <Typing
                    staticText={title_static}
                    text={title_typing}
                    speed={100}
                    eraseDelay={2000}
                  />
                </h1>
                <p className="lead-2" style={{ paddingTop: "4rem" }}>
                  {description}
                </p>
                <br />
                <br />
                <AnchorLink href={link}>
                  <Button title={link_text} style={{ borderRadius: "5px" }} />
                </AnchorLink>
              </div>
            </Box>
          </Box>
        </Container>
      </BannerWrapper>
      <style JSX>{`.back {background: url('` + image + `') no-repeat;}`}</style>
    </CareerSection>
  );
};

CareerBanner.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

CareerBanner.defaultProps = {
  row: {
    flexbox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    alignItems: "center",
    width: [1, "80%", "80%", "80%"],
    margin: "0 auto",
    textAlign: "center",
  },
  col: {
    pr: "15px",
    pl: "15px",
    width: [1, 1, "70%", "70%"],
    margin: "0 auto",
  },
};

// const LoadableCareerBanner = Loadable(() => import("./index"))

export default CareerBanner;
