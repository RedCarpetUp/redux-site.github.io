import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import AboutUsSection from "../aboutus.style";

const AboutUsStartupIndia = ({ row, col }) => {
  return (
    <AboutUsSection>
      <Box style={{ marginTop: "100px" }}>
        <Container>
          <div
            style={{
              color: "#dd285d",
              fontSize: "30px",
              textAlign: "center",
              fontWeight: "bold",
              padding: "20px",
            }}
          >
            RedCarpet -{" "}
            <em
              style={{
                color: "#383838",
              }}
            >
              A Startup India Registered Company
            </em>
          </div>
        </Container>
      </Box>
    </AboutUsSection>
  );
};

AboutUsStartupIndia.propTypes = {
  row: PropTypes.object,

  col: PropTypes.object,
};

AboutUsStartupIndia.defaultProps = {
  row: {
    flexBox: true,

    flexWrap: "wrap",

    ml: "-15px",

    mr: "-15px",

    alignItems: "center",
  },

  col: {
    width: ["33%", "33%", "33%", "16%"],
  },
};

export default AboutUsStartupIndia;
