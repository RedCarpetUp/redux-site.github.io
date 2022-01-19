import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React from "react";
import Slide from "react-reveal/Slide";
import { anyTimeMoney } from "common/data/design_and_built";
import SectionWrapper, { ContentWrapper } from "./designedAndBuilt.style";

const DesignedAndBuilt = () => {
  return (
    <SectionWrapper id="know_more">
      <Container>
        {anyTimeMoney.map((e, i) => {
          return (
            <ContentWrapper>
              <Slide left>
                <div className="image">
                  <Image src={e.image} alt="Built Logo" />
                </div>
              </Slide>
              <div className="content">
                <Heading content={e.title} />
                <Text
                  content={e.description[0]}
                  style={{ textAlign: "justify" }}
                />
                <Text
                  content={e.description[1]}
                  style={{ textAlign: "justify" }}
                />
              </div>
            </ContentWrapper>
          );
        })}
      </Container>
    </SectionWrapper>
  );
};

export default DesignedAndBuilt;
