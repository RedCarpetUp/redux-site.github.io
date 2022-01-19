import Box from "common/components/Box";
import Button from "common/components/Button";
import Heading from "common/components/Heading";
import Input from "common/components/Input";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import NewsletterWrapper, { ContactFormWrapper } from "./newsletter.style";
import { tracking } from "common/data/cards";

const SmartCardTracking = ({
  sectionWrapper,
  textArea,
  buttonArea,
  buttonStyle,
  title,
  description,
}) => {
  return (
    <Box {...sectionWrapper} as="section">
      <Container>
        <NewsletterWrapper style={{ marginTop: "0px" }}>
          <Box {...textArea}>
            <Heading content={tracking.title} {...title} />
            <Text content={tracking.description} {...description} />
          </Box>
          <Box {...buttonArea}>
            <ContactFormWrapper>
              <Input
                inputType="text"
                label="Tracking Id"
                isMaterial={true}
                className="email_input"
              />
              <Button {...buttonStyle} title="Track" />
            </ContactFormWrapper>
          </Box>
        </NewsletterWrapper>
      </Container>
    </Box>
  );
};

SmartCardTracking.propTypes = {
  sectionWrapper: PropTypes.object,
  textArea: PropTypes.object,
  buttonArea: PropTypes.object,
  buttonStyle: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
};

SmartCardTracking.defaultProps = {
  sectionWrapper: {},
  textArea: {
    mb: ["40px", "40px", "40px", "0", "0"],
    pr: ["0", "0", "0", "80px", "100px"],
  },
  title: {
    fontSize: ["18px", "20px", "22px", "24px", "26px"],
    fontWeight: "500",
    color: "#fff",
    lineHeight: "1.34",
    mb: ["14px", "14px", "14px", "14px", "13px"],
    textAlign: ["center", "center", "center", "left", "left"],
    letterSpacing: "-0.025em",
  },
  description: {
    fontSize: ["14px", "14px"],
    maxWidth: ["100%", "400px"],
    fontWeight: "400",
    color: "#fefefe",
    lineHeight: "1.7",
    mb: 0,
    textAlign: ["center", "center", "center", "left", "left"],
  },
  buttonArea: {
    zIndex: 1,
    width: ["100%", "auto"],
  },
  buttonStyle: {
    type: "button",
    fontSize: "14px",
    fontWeight: "700",
    pl: "30px",
    pr: "30px",
  },
};

export default SmartCardTracking;
