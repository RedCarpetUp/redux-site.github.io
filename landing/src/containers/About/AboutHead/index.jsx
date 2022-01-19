import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Button from "common/components/Button";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { about } from "common/data/about";
import AboutSection from "../about.style";

const About = (row, col) => {
  const { abouts } = about;

  return (
    <AboutSection id="about">
      <header className="aboutHeader">
        <Box>
          <Container className="headerContainer">
            <Heading
              as="h1"
              content={about.heading}
              style={{ textAlign: "center", paddingBottom: "30px" }}
            />
            <Box className="row" {...row}>
              <Box
                className="col ma"
                {...col}
                style={{ margin: "0 auto" }}
                key={`box-key--${abouts[0].id}`}
              >
                <Heading as="h4" content={abouts[0].heading} />

                <Text content={abouts[0].description} />
              </Box>

              <Box
                className="col ma"
                {...col}
                style={{ margin: "0 auto" }}
                key={`box-key--${abouts[1].id}`}
              >
                <Heading as="h4" content={abouts[1].heading} />

                <Text content={abouts[1].description} />
              </Box>
            </Box>
          </Container>
        </Box>
        <Box style={{marginTop: "50px"}}>
          <Container className="headerContainer">
            <section class="section shadow-8" style={{ margin: "2%" }}>
              <div class="container">
                <div>
                  <div>
                    <Heading content={`Our Sourcing Partners`} />
                  </div>
                  <div style={{ marginTop: "50px", textAlign: "center" }}>
                    <img
                      src={`/images/redcarpet_logo.png`}
                      alt={`RedCarpet Logo`}
                      width={150}
                    />
                    <h3>RedCarpet Pvt Ltd</h3>
                    <a
                      href="https://www.redcarpetup.com/contact/"
                      target="_blank"
                    >
                      <Button style={{ borderRadius: "5px" }} className="btn btn-success" title="Contact RedCarpet" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </Container>
        </Box>
      </header>
    </AboutSection>
  );
};

About.propTypes = {
  row: PropTypes.object,

  col: PropTypes.object,
};

About.defaultProps = {
  row: {
    flexBox: true,

    flexWrap: "wrap",

    ml: "-15px",

    mr: "-15px",
  },

  col: {
    pr: "15px",

    pl: "15px",

    width: [1, "80%", "50%", "50%"],

    margin: "0 auto",
  },
};

export default About;
