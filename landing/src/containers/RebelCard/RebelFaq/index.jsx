import {
  Accordion,
  AccordionBody,
  AccordionItem,
  AccordionTitle,
  CloseIcon,
  IconWrapper,
  OpenIcon,
} from "common/components/Accordion";
import Box from "common/components/Box";
import Button from "common/components/Button";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Icon } from "react-icons-kit";
import { minus } from "react-icons-kit/entypo/minus";
import { plus } from "react-icons-kit/entypo/plus";
import { faqlist } from "common/data/rebel";
import FaqSectionWrapper from "./faqSection.style";

const FaqSection = ({
  sectionHeader,
  sectionTitle,
  sectionSubTitle,
  titleStyle,
  descriptionStyle,
}) => {
  return (
    <FaqSectionWrapper id="faqSection">
      <Container>
        <Box {...sectionHeader}>
          <Text
            content="Got Questions?"
            {...sectionSubTitle}
            style={{ color: "white" }}
          />
          <Heading
            content="We can help you out! Read below."
            {...sectionTitle}
            style={{ color: "white" }}
          />
        </Box>
        <Box className="row">
          <Accordion>
            <Fragment>
              {faqlist.slice(1).map((job, key) => (
                <AccordionItem key={`accordion_key-${key}`}>
                  <Fragment>
                    <AccordionTitle>
                      <Fragment>
                        <Heading content={job.q} {...titleStyle} />
                        <IconWrapper>
                          <OpenIcon>
                            <Icon icon={minus} size={18} />
                          </OpenIcon>
                          <CloseIcon>
                            <Icon icon={plus} size={18} />
                          </CloseIcon>
                        </IconWrapper>
                      </Fragment>
                    </AccordionTitle>
                    <AccordionBody>
                      <Text content={job.a} {...descriptionStyle} />
                    </AccordionBody>
                  </Fragment>
                </AccordionItem>
              ))}
            </Fragment>
          </Accordion>
        </Box>
      </Container>
    </FaqSectionWrapper>
  );
};

// FaqSection style props
FaqSection.propTypes = {
  sectionHeader: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
};

// FaqSection default style
FaqSection.defaultProps = {
  // section header default style
  sectionHeader: {
    mb: ["40px", "56px"],
  },
  // sub section default style
  sectionSubTitle: {
    as: "span",
    display: "block",
    textAlign: "center",
    fontSize: "14px",
    letterSpacing: "0.15em",
    fontWeight: "700",
    color: "#10ac84",
    mb: "10px",
  },
  // section title default style
  sectionTitle: {
    textAlign: "center",
    fontSize: ["20px", "24px"],
    fontWeight: "400",
    color: "#0f2137",
    letterSpacing: "-0.025em",
    mb: "0",
  },
  // accordion title default style
  titleStyle: {
    fontSize: ["16px", "19px"],
    fontWeight: "400",
    color: "#0f2137",
    letterSpacing: "-0.025em",
    mb: "0",
  },
  // accordion description default style
  descriptionStyle: {
    fontSize: "15px",
    color: "#343d48cc",
    lineHeight: "1.75",
    mb: "0",
  },
};

export default FaqSection;
