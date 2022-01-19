import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { header } from "common/data/how_to";
import HowtoContainer from "../HowTo.style";
import BannerWrapper from "./bannerSection.style";

const HowtoBanner = ({ row, col }) => {
  return (
    <BannerWrapper
      id="banner_section"
      style={{
        backgroundImage: "linear-gradient(85deg, #e6e9f0 0%, #eef1f5 100%)",
        paddingBottom: "5rem",
        paddingTop: "8rem",
      }}
    >
      <HowtoContainer>
        <Box>
          <Container>
            <Box className="row" {...row}>
              <Box className={"col bannerDiv"} {...col}>
                <h1>{header.title}</h1>
              </Box>
              <Box className={"col bannerDiv"} {...col}>
                <img src={header.image} alt="img" />
              </Box>
            </Box>
          </Container>
        </Box>
      </HowtoContainer>
    </BannerWrapper>
  );
};

HowtoBanner.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

HowtoBanner.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    alignItems: "center",
  },
  col: {
    pr: "15px",
    pl: "15px",
    width: [1, "70%", "50%", "50%"],
  },
};
export default HowtoBanner;
