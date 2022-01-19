import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import Heading from "common/components/Heading";
import PropTypes from "prop-types";
import React from "react";
import {
  bureauPartners,
  cardPartners,
  lendingPartners,
} from "common/data/about_us";
import AboutUsSection from "../aboutus.style";

const AboutUsPartners = ({ row, col }) => {
  const { partnerList } = bureauPartners;
  const { lendersList } = lendingPartners;
  const { partnerList: cardPartner } = cardPartners;

  return (
    <AboutUsSection>
      <Container className="partnersBigDiv">
        <Box
          style={{
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            marginTop: "50px",
            padding: "20px",
          }}
        >
          <Heading
            as="h1"
            content={"Our Partners"}
            style={{ textAlign: "center", paddingTop: "20px" }}
          />
          <Box style={{ marginTop: "50px" }}>
            <Container>
              <Heading
                as="h3"
                content={bureauPartners.heading1}
                style={{ textAlign: "center", marginBottom: "40px" }}
              />

              <Box className="partnersDiv">
                <div className="partner-sm">
                  {partnerList.map((partner) => (
                    <img
                      style={{
                        width: "150px",
                        marginRight: "30px",
                        marginLeft: "30px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        borderRadius: "8px",
                        verticalAlign: "middle",
                      }}
                      src={partner.image}
                      key={partner.id}
                      alt={partner.name}
                    />
                  ))}
                </div>
              </Box>
            </Container>
          </Box>
          <Box style={{ marginTop: "50px" }}>
            <Container>
              <Heading
                as="h3"
                content={lendingPartners.heading1}
                style={{ textAlign: "center", marginBottom: "40px" }}
              />

              <Box className="partnersDiv">
                <div className="partner-sm">
                  {lendersList.map((investor) => (
                    <img
                      style={{
                        width: "150px",
                        marginRight: "30px",
                        marginLeft: "30px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        borderRadius: "8px",
                        verticalAlign: "middle",
                      }}
                      src={investor.image}
                      key={investor.id}
                      alt={investor.name}
                    />
                  ))}
                </div>
              </Box>
            </Container>
          </Box>
          <Box style={{ marginTop: "50px" }}>
            <Container>
              <Heading
                as="h3"
                content={cardPartners.heading1}
                style={{ textAlign: "center" }}
              />

              <Box className="partnersDiv">
                <div className="partner partner-sm">
                  {cardPartner.map((card) => (
                    <img
                      style={{
                        borderRadius: "8px",
                        width: "150px",
                        verticalAlign: "middle",
                      }}
                      src={card.image}
                      key={card.id}
                      alt={card.name}
                    />
                  ))}
                </div>
              </Box>
            </Container>
          </Box>
        </Box>
      </Container>
    </AboutUsSection>
  );
};

AboutUsPartners.propTypes = {
  row: PropTypes.object,

  col: PropTypes.object,
};

AboutUsPartners.defaultProps = {
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

export default AboutUsPartners;
