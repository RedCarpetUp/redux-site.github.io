import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import Fade from "react-reveal/Fade";
import { header } from "common/data/sa";
import { VideoWrapper } from "../../Newsletter/newsletter.style";
import SaSection from "../sa.style";

const SABanner = ({ row, col }) => {
  return (
    <SaSection>
      <Box className={"bannerWrapper"} style={{ background: "#fff" }}>
        <Container>
          <Box className="row" {...row}>
            <Box className="col" {...col}>
              <h1 style={{ fontSize: "37px" }}>{header.title}</h1>
            </Box>
            <Box className="col" {...col}>
              <p className="lead" style={{ fontSize: "17px" }}>
                {header.description}
              </p>
            </Box>
          </Box>
        </Container>
      </Box>
    </SaSection>
  );
};

SABanner.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

SABanner.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: 1,
  },
  col: {
    flexBox: true,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: 1,
  },
};

export default SABanner;
