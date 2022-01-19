import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import ParticlesComponent from "../../Particle";
import JoinTrail from "../JoinTrail";
import BannerWrapper from "./banner.style";

const BannerSection = ({
  row,
  title,
  description,
  button,
  textArea,
  searchArea,
  discountAmount,
  discountText,
}) => {
  return (
    <BannerWrapper id="banner_section">
      <ParticlesComponent />
      <Container className="banner_container">
        <Box {...row}>
          <Box {...textArea}>
            <JoinTrail />
            {/* <Heading
              {...title}
              content="Got it in you to become a campus leader?"
            />
            <Text
              {...description}
              content="Welcome to the RedCarpet Campus Leader program. This program is a task-based internship where you will be working to complete small tasks in order to achieve a bigger goal. Each task will be theme based, and upon completion of each task, you will unlock the next. On this page, you can go ahead and apply for the internship and start Task 1. Simply follow the steps to understand and complete them. In case of doubts or queries, you can get in touch with our representatives. If you decide to come on board, then from today, forget the definition of impossible. On this page everything will be possible, we just need to find a way to solve it. All the best."
            /> */}
          </Box>
        </Box>
      </Container>
    </BannerWrapper>
  );
};

BannerSection.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
  button: PropTypes.object,
  searchArea: PropTypes.object,
  discountAmount: PropTypes.object,
  discountText: PropTypes.object,
};

BannerSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  textArea: {
    width: ["100%", "100%", "90%", "100%", "55%"],
  },
  title: {
    fontSize: ["26px", "32px", "42px", "46px", "55px"],
    fontWeight: "400",
    color: "#0f2137",
    letterSpacing: "-0.025em",
    mb: ["20px", "25px", "25px", "25px", "25px"],
    lineHeight: "1.31",
    textAlign: "center",
  },
  description: {
    fontSize: ["15px", "16px", "16px", "16px", "16px"],
    color: "#343d48cc",
    lineHeight: "1.75",
    mb: "0",
    textAlign: "center",
  },
  button: {
    title: "Search",
    type: "button",
    fontSize: "18px",
    fontWeight: "500",
    color: "#fff",
    pl: "22px",
    pr: "22px",
    colors: "primaryWithBg",
    iconPosition: "left",
  },
  searchArea: {
    className: "search_area",
    width: ["100%", "100%", "80%", "100%", "70%"],
    mt: ["45px", "50px", "60px", "60px", "60px"],
  },
  discountAmount: {
    fontSize: ["13px", "14px", "14px", "14px", "14px"],
    fontWeight: "600",
    color: "#eb4d4b",
    mb: 0,
    as: "span",
    mr: "0.4em",
  },
  discountText: {
    fontSize: ["13px", "14px", "14px", "14px", "14px"],
    fontWeight: "400",
    color: "#0f2137",
    mb: 0,
    as: "span",
  },
};

export default BannerSection;
