import React from "react";
import Container from "common/components/UI/Container";
import SectionWrapper from "./credit.style";

import CreditScore from "./CreditScore";
import CreditBureau from "./CreditBureau";
import CreditReport from "./CreditReport";
import ScoreInfo from "./ScoreInfo";

const Credit = () => {
  return (
    <SectionWrapper>
      <Container>
        <CreditScore />
        <CreditBureau />
        <CreditReport />
        <ScoreInfo />
      </Container>
    </SectionWrapper>
  );
};

export default Credit;
