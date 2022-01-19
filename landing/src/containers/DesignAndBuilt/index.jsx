import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React from "react";
import Fade from "react-reveal/Fade";
import SectionWrapper, { ContentWrapper } from "./designedAndBuilt.style";

//import { anyTimeMoney } from "common/data/design_and_built";

const DesignedAndBuilt = ({ option }) => {
  return (
    <SectionWrapper id="know_more">
      <Container>
        <ContentWrapper>
          <Fade left delay={200}>
            <div className="image">
              <Image src={option.image} alt="Built Logo" />
            </div>
          </Fade>
          <div className="content">
            <Heading as="h1" content={option.title} />
            <Text
              content={option.description}
              style={{ textAlign: "justify" }}
            />
          </div>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default DesignedAndBuilt;
