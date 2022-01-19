import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { SkillAbout, SkillDetails, SkillIcon, SkillItem } from "./skill.style";

const SkillSection = ({
  sectionWrapper,
  secTitleWrapper,
  secTitle,
  secDescription,
  row,
  col,
  skillTitle,
  skillDescription,
  skillSuccessRate,
  successRateText,
  sections,
}) => {
  return (
    <Box {...sectionWrapper} as="section">
      <Container noGutter mobileGutter>
        <Box {...secTitleWrapper}>
          <Heading {...secTitle} content={sections.title} />
          {/* <Text
            {...secDescription}
            content="Have a look, some could be interesting to help you achieve your business goals or start that project you always wanted to do... Yes, that one!"
          /> */}
        </Box>

        <Box {...row}>
          {sections.section.map((item, index) => (
            <Box {...col} key={`skill-item-${index}`}>
              <SkillItem>
                <SkillDetails>
                  <SkillIcon>
                    <Image src={item.image} alt={`skill-icon-${index + 1}`} />
                  </SkillIcon>
                  <SkillAbout>
                    {/* <Heading content={item.title} {...skillTitle} /> */}
                    <Text content={item.content} {...skillDescription} />
                  </SkillAbout>
                </SkillDetails>
              </SkillItem>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

SkillSection.propTypes = {
  sectionWrapper: PropTypes.object,
  secTitleWrapper: PropTypes.object,
  secTitle: PropTypes.object,
  secDescription: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  skillTitle: PropTypes.object,
  skillDescription: PropTypes.object,
  skillSuccessRate: PropTypes.object,
  successRateText: PropTypes.object,
};

SkillSection.defaultProps = {
  sectionWrapper: {
    pt: ["60px", "80px", "100px", "110px", "140px"],
    pb: ["150px", "160px", "160px", "180px", "210px"],
    bg: "#f9f9f9",
  },
  secTitleWrapper: {
    mb: ["65px", "65px", "80px", "90px", "105px"],
  },
  secTitle: {
    fontSize: ["22px", "26px", "26px", "30px", "30px"],
    fontWeight: "700",
    color: "#302b4e",
    lineHeight: "1.34",
    mb: ["15px", "18px", "18px", "20px", "20px"],
    textAlign: "center",
  },
  secDescription: {
    fontSize: ["15px", "16px"],
    fontWeight: "400",
    color: "#43414e",
    lineHeight: "1.5",
    mb: "0",
    textAlign: "center",
    width: "600px",
    maxWidth: "100%",
    ml: "auto",
    mr: "auto",
  },
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: ["-15px", "-15px", "-15px", "-25px", "-25px"],
    mr: ["-15px", "-15px", "-15px", "-25px", "-25px"],
  },
  col: {
    width: [1, 1, 1 / 2],
    pl: ["15px", "15px", "15px", "25px", "25px"],
    pr: ["15px", "15px", "15px", "25px", "25px"],
    mb: ["30px", "30px", "30px", "50px", "50px"],
  },
  skillTitle: {
    fontSize: ["16px", "18px", "18px", "20px", "20px"],
    fontWeight: "600",
    color: "#302b4e",
    mb: "12px",
  },
  skillDescription: {
    fontSize: ["15px", "15px", "15px", "16px", "16px"],
    fontWeight: "400",
    color: "#43414e",
    lineHeight: "1.5",
    mb: "0",
  },
  skillSuccessRate: {
    fontSize: ["15px", "15px", "14px", "15px", "16px"],
    fontWeight: "400",
    color: "#302b4e",
    lineHeight: "1.5",
    mb: "0",
  },
  successRateText: {
    ml: ".3em",
    display: ["none", "none", "none", "none", "inline-block"],
  },
};

export default SkillSection;
