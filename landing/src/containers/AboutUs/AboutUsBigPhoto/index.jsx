import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { bigPhoto } from "common/data/about_us";
import AboutUsSection from "../aboutus.style";

const AboutUsBigPhoto = ({ row, col }) => {
  const { list } = bigPhoto;

  return (
    <AboutUsSection>
      <Box style={{ marginTop: "30px" }}>
        <Container>
          <div style={{ width: "100%" }}>
            {list.map((photo) => (
              <img
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                  verticalAlign: "center",
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                src={photo.image}
                key={photo.id}
                alt={photo.name}
              />
            ))}
          </div>
        </Container>
      </Box>
    </AboutUsSection>
  );
};

AboutUsBigPhoto.propTypes = {
  row: PropTypes.object,

  col: PropTypes.object,
};

AboutUsBigPhoto.defaultProps = {
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

export default AboutUsBigPhoto;
