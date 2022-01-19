import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { pressRoom } from "common/data/about_us";
import AboutUsSection from "../aboutus.style";

const AboutUsNewsReel = ({ row, col }) => {
  const { pressList } = pressRoom;
  function isOdd(num) {
    return num % 2;
  }
  return (
    <AboutUsSection>
      <Box style={{ marginTop: "20px", color: "#383838" }}>
        <Container>
          <Heading
            as="h1"
            content={pressRoom.heading1}
            style={{ textAlign: "center", paddingBottom: "30px" }}
          />
          {pressList.map((press) => (
            <div
              style={{
                fontWeight: "normal",
                backgroundColor: `${isOdd(press.id) ? "#F0F0F0" : ""}`,
                cursor: "pointer",
                padding: "1px",
                maxWidth: "100%",
                borderRadius: "4px",
              }}
            >
              <p
                style={{ marginLeft: "5px" }}
                onClick={() => window.open(press.link, "_blank")}
              >
                {press.name}
                <br />
                <u>{press.company}</u> <i>{press.date}</i>
              </p>
            </div>
          ))}
        </Container>
      </Box>
    </AboutUsSection>
  );
};

AboutUsNewsReel.propTypes = {
  row: PropTypes.object,

  col: PropTypes.object,
};

AboutUsNewsReel.defaultProps = {
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

export default AboutUsNewsReel;
