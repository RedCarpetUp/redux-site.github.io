import Box from "common/components/Box";
import Card from "common/components/Card";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import Zoom from "react-reveal/Zoom";
import { alterImage } from "common/data/career";
import CareerSection from "../careers.style";
import CareerContentWrapper, {
  SectionObject,
} from "./careerContentSection.style";

const CareerContent = ({ imageWrapper, textArea, reverse }) => {
  const { alterImages } = alterImage;
  return (
    <CareerSection>
      <Container>
        <Box>
          {alterImages.map((m, key) => {
            if (key % 2 !== 0) {
              return (
                <CareerContentWrapper key={key}>
                  <SectionObject>
                    <Card
                      className="objectWrapper"
                      style={{ margin: "0 auto", width: "100%" }}
                      {...imageWrapper}
                    >
                      <Zoom>
                        <img className="careerImage" src={m.image} alt="..." />
                      </Zoom>
                    </Card>
                  </SectionObject>
                  <Container>
                    <Box {...textArea}>
                      <div className="textDiv">
                        <h3>{m.title}</h3>
                        <p>{m.description}</p>
                      </div>
                    </Box>
                  </Container>
                </CareerContentWrapper>
              );
            } else {
              return (
                <CareerContentWrapper key={key}>
                  <SectionObject style={{ width: "100%" }} {...reverse}>
                    <Card
                      className="objectWrapper"
                      style={{ marginRight: "0" }}
                      {...imageWrapper}
                    >
                      <Zoom>
                        <img className="careerImage" src={m.image} alt="..." />
                      </Zoom>
                    </Card>
                  </SectionObject>
                  <Container>
                    <Box {...textArea} style={{ marginLeft: 0 }}>
                      <div className="textDiv">
                        <h3>{m.title}</h3>
                        <p>{m.description}</p>
                      </div>
                    </Box>
                  </Container>
                </CareerContentWrapper>
              );
            }
          })}
        </Box>
      </Container>
    </CareerSection>
  );
};

CareerContent.propTypes = {
  description: PropTypes.object,
  btnStyle: PropTypes.object,
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  secondImageArea: PropTypes.object,
  reverse: PropTypes.object,
};

CareerContent.defaultProps = {
  textArea: {
    width: ["100%", "100%", "45%"],
    ml: [0, 0, "58%"],
  },
  secondImageArea: {
    width: "100%",
    mr: "0",
  },
  sectionHeader: {
    mb: ["2rem", "2rem", "2rem", "2rem"],
    textAlign: "center",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: ["2.10938rem", "2.10938rem"],
    fontWeight: "400",
    color: "#0f2137",
    letterSpacing: "0.5px",
    mb: "0",
  },
  imageWrapper: {
    boxShadow: "none",
    flexDirection: "row",
    mr: ["auto", 0],
    width: ["100%", "100%", "45%"],
  },
  title: {
    fontSize: ["20px", "26px", "26px", "36px", "48px"],
    fontWeight: "400",
    color: "#0f2137",
    letterSpacing: "-0.010em",
    mb: "20px",
    maxWidth: ["100%", "100%", "100%", "440px", "440px"],
    lineHeight: "1.5",
  },
  description: {
    fontSize: "16px",
    color: "#343d48cc",
    lineHeight: "1.75",
    mb: "33px",
    maxWidth: ["100%", "100%", "100%", "440px", "440px"],
  },
  btnStyle: {
    minWidth: "156px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#fff",
    borderRadius: "4px",
    pl: "22px",
    pr: "22px",
    colors: "primaryWithBg",
  },
};

export default CareerContent;
