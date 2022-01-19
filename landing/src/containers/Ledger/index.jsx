import React from "react";
import styled from "styled-components";
import Container from "common/components/UI/Container";

import Intro from "./Intro";
import WhatIsLedger from "./WhatIsLedger";
import Events from "./Events";
import HowItWorks from "./HowItWorks";

const SectionWrapper = styled.div`
  padding: 150px 0;
  overflow: hidden;
  line-height: 29px;
  font-size: 16px;
  color: #5c5c5c;
`;

const Ledger = () => {
  return (
    <SectionWrapper>
      <Container>
        <Intro />
        <WhatIsLedger />
        <HowItWorks />
        <Events />
      </Container>
    </SectionWrapper>
  );
};

export default Ledger;
