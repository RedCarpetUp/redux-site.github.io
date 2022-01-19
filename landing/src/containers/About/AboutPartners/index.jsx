import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { partner } from "common/data/about";
import AboutSection from "../about.style";

const AboutPartners = ({ row, col }) => {
  const { advisorName, advisorRole, advisorImage, partners, backers } = partner;

  return (
    <AboutSection>
      <Box>
        <Container>
          <header className="header">
            <h2 className="partner">{partner.heading1}</h2>
          </header>

          <Box className="row" style={{ textAlign: "center" }}>
            <Box className="col advisors">
              <img src={advisorImage} alt="..." className="h125w125" />

              <h6>{advisorName}</h6>

              <small>{advisorRole}</small>
            </Box>
          </Box>

          <header className="header">
            <h2 className="partner">{partner.heading2}</h2>
          </header>

          <Box className="partnersDiv">
            <div className="partner partner-sm">
              {partners.map((partner) => (
                <img
                  style={{ width: "150px", height: "40px" }}
                  src={partner.image}
                  key={partner.id}
                  alt={partner.name}
                />
              ))}
            </div>

            <Box
              className="row backersDivRow"
              {...row}
              style={{ justifyContent: "center", textAlign: "center" }}
            >
              {backers.map((b) => (
                <Box className="col backersDiv" {...col} key={b.id}>
                  <img src={b.image} alt={b.name} />

                  <h6>{b.name}</h6>

                  <small>{b.role}</small>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </AboutSection>
  );
};

AboutPartners.propTypes = {
  row: PropTypes.object,

  col: PropTypes.object,
};

AboutPartners.defaultProps = {
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

export default AboutPartners;
