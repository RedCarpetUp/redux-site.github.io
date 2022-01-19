import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { header } from "common/data/rocks";
import { VideoWrapper } from "../../Newsletter/newsletter.style";
import RocksSection from "../rocks.style";
// import BigPicture from 'react-bigpicture'

const RocksBanner = ({ row, col }) => {
  return (
    <RocksSection>
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
    </RocksSection>
  );
};

RocksBanner.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

RocksBanner.defaultProps = {
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

export default RocksBanner;
