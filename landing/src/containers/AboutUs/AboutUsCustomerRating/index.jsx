import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import Heading from "common/components/Heading";
import PropTypes from "prop-types";
import React from "react";
import { customers } from "common/data/about_us";
import AboutUsSection from "../aboutus.style";

const AboutUsCustomerRating = ({ row, col }) => {
  const { list } = customers;

  return (
    <AboutUsSection>
      <Box
        style={{ marginTop: "100px", color: "#383838", marginBottom: "50px" }}
      >
        <Container>
          <Heading
            as="h1"
            content={customers.heading1}
            style={{ textAlign: "center", paddingBottom: "10px" }}
          />

          <Box className="partnersDiv">
            <div>
              {list.map((customer) => (
                <img
                  style={{
                    borderRadius: "5px",
                    verticalAlign: "top",
                    margin: "auto",
                    maxWidth: "300px",
                  }}
                  src={customer.image}
                  key={customer.id}
                  alt={customer.name}
                />
              ))}
            </div>
          </Box>
        </Container>
      </Box>
    </AboutUsSection>
  );
};

AboutUsCustomerRating.propTypes = {
  row: PropTypes.object,

  col: PropTypes.object,
};

AboutUsCustomerRating.defaultProps = {
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

export default AboutUsCustomerRating;
