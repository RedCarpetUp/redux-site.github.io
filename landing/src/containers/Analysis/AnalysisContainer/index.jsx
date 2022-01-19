import Box from "common/components/Box";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { sections, upperSection } from "common/data/analysis";
import SectionWrapper from "../analysis-banner.style";
import AnalysisSection from "../analysis.styles";
import Process from "../Process";
import SkillSection from "../Skill";

const BannerSection = ({ row, col, col1 }) => {
  const renderUpperSection = () => {
    return <Process option={upperSection} />;
  };
  const renderSections = (sec_tions) => {
    return (
      <AnalysisSection>
        <div
          className="sectiondiv"
          style={{
            textAlign: "center",
            paddingBottom: "1.5rem",
            paddingTop: "1.5rem",
          }}
        >
          {sec_tions.title ? (
            <span className="hashtag">
              <h2>{sec_tions.title}</h2>
            </span>
          ) : (
            ""
          )}
          {sec_tions.section.map((s, key) => {
            return (
              <>
                <Text content={s.content} className="p" />
                <img src={s.image} alt="image" className="img" />
              </>
            );
          })}
        </div>
      </AnalysisSection>
    );
  };

  return (
    <>
      <AnalysisSection>
        <SectionWrapper
          style={{
            background: "rgb(238, 241, 245)",
            paddingTop: "2em",
            paddingBottom: "2em",
          }}
        >
          <Container>
            <Box className="row" {...row}>
              <Box className="col" {...col1}></Box>
              <Box className="col" {...col}>
                {renderUpperSection()}
              </Box>
              <Box className="col" {...col1}></Box>
            </Box>
          </Container>
        </SectionWrapper>
        <SectionWrapper style={{ paddingTop: "2em", paddingBottom: "2em" }}>
          <Container>
            <Box className="row" {...row}>
              <Box className="col" {...col1}></Box>
              <Box className="col" {...col}>
                {renderSections(sections.section1)}
              </Box>
            </Box>
          </Container>
        </SectionWrapper>
        <div
          style={{
            backgroundColor: "rgb(153, 148, 132)",
          }}
        >
          <SkillSection sections={sections.section2} />
        </div>
      </AnalysisSection>
    </>
  );
};

BannerSection.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  col1: PropTypes.object,
};

BannerSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
  },
  col: {
    pr: "15px",
    pl: "15px",
    width: [1, "100%", "100%", "60%"],
  },
  col1: {
    pr: "15px",
    pl: "15px",
    width: [1, "100%", "100%", "20%"],
  },
};

export default BannerSection;
