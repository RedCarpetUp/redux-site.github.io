import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import { Timeline } from "common/data/timeLine";
import PropTypes from "prop-types";
import React from "react";
import Slide from "react-reveal/Slide";
import {
  Hidden,
  TimelineContent,
  TimelineDot,
  TimelineIndex,
  TimelineItem,
  TimelineWrapper,
} from "./timeline.style";

const TimelineSection = ({
  sectionWrapper,
  sectionHeader,
  sectionTitle,
  sectionSubTitle,
  row,
  col,
  textArea,
  imageArea,
  imageTwo,
  indexStyle,
  timelineTitle,
  timelineDescription,
}) => {
  return (
    <Box {...sectionWrapper}>
      <Container>
        <Box {...sectionHeader}>
          <Text {...sectionSubTitle} content="How to take loan?" />
          {/* <Heading {...sectionTitle} content="How to apply for card?" /> */}
        </Box>
        <Box {...row}>
          <Box {...col} {...textArea}>
            <TimelineWrapper>
              {Timeline.map((item, index) => (
                <TimelineItem key={`timeline-item-${index}`}>
                  <TimelineIndex>
                    <Hidden>
                      <Slide bottom>
                        <Text
                          as="span"
                          content={item.index || `0${index + 1}`}
                          {...indexStyle}
                        />
                      </Slide>
                    </Hidden>
                  </TimelineIndex>
                  <TimelineContent>
                    <Hidden>
                      <Slide bottom delay={100}>
                        <Heading
                          as="h2"
                          content={item.title}
                          {...timelineTitle}
                        />
                      </Slide>
                    </Hidden>
                    <Hidden>
                      <Slide bottom delay={200}>
                        <Text
                          content={item.description}
                          {...timelineDescription}
                        />
                      </Slide>
                    </Hidden>
                  </TimelineContent>
                  <TimelineDot />
                </TimelineItem>
              ))}
            </TimelineWrapper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

TimelineSection.propTypes = {
  sectionWrapper: PropTypes.object,
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  button: PropTypes.object,
  textArea: PropTypes.object,
  imageArea: PropTypes.object,
  imageTwo: PropTypes.object,
  buttonWrapper: PropTypes.object,
  indexStyle: PropTypes.object,
  timelineTitle: PropTypes.object,
  timelineDescription: PropTypes.object,
};

TimelineSection.defaultProps = {
  sectionWrapper: {
    as: "section",
    pt: ["60px", "80px", "80px", "80px"],
    pb: ["160px", "180px", "180px", "180px"],
  }, // section header default style
  sectionHeader: {
    mb: "56px",
  },
  // sub section default style
  sectionSubTitle: {
    as: "span",
    display: "block",
    textAlign: "center",
    fontSize: "14px",
    letterSpacing: "0.15em",
    fontWeight: "700",
    color: "#5268db",
    mb: "10px",
  },
  // section title default style
  sectionTitle: {
    textAlign: "center",
    fontSize: ["20px", "24px"],
    fontWeight: "500",
    color: "#0f2137",
    letterSpacing: "-0.025em",
    mb: "0",
  },
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-365px",
    flexDirection: "column",
    alignItems: "center",
  },
  imageAreaRow: {
    flexDirection: "row-reverse",
  },
  col: {
    pr: "15px",
    pl: "15px",
  },
  textArea: {
    width: ["100%", "100%", "55%", "50%", "55%"],
    mb: ["40px", "40px", "0", "0", "0"],
  },
  imageArea: {
    width: ["100%", "100%", "45%", "50%", "45%"],
    mb: ["30px", "40px", "40px", "0", "0"],
  },
  title: {
    fontSize: ["30px", "38px", "38px", "48px", "48px"],
    fontWeight: "300",
    color: "headingColor",
    letterSpacing: "-0.025em",
    mb: "15px",
  },
  description: {
    fontSize: "16px",
    color: "textColor",
    lineHeight: "1.75",
    mb: "33px",
  },
  buttonWrapper: {
    mt: ["25px", "50px"],
    flexBox: true,
    justifyContent: "center",
  },
  button: {
    type: "button",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "4px",
    pl: "22px",
    pr: "22px",
    colors: "primaryWithBg",
    height: "46px",
  },
  imageOne: {
    mb: "40px",
    ml: "auto",
    mr: "auto",
  },
  imageTwo: {
    ml: "auto",
    mr: "auto",
  },
  indexStyle: {
    fontSize: ["36px", "42px", "52px", "56px", "72px"],
    fontWeight: "300",
    color: "#eaebec",
    display: "block",
    lineHeight: "1",
    mb: "0",
  },
  timelineTitle: {
    fontSize: ["16px", "17px", "18px", "18px", "20px"],
    fontWeight: "500",
    color: "#0f2137",
    letterSpacing: "-0.025em",
    mb: "13px",
  },
  timelineDescription: {
    fontSize: ["14px", "15px", "15px", "15px", "16px"],
    lineHeight: "2",
    color: "#5d646d",
    mb: "0",
  },
};

export default TimelineSection;
