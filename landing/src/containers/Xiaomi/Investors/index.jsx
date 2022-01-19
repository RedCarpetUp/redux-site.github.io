import React from "react";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Button from "common/components/Button";
import { investors } from "common/data/xiaomi";
import { SectionWrapper, ContentWrapper } from "./investors.style";

const RebelCardContent = () => {
  return (
    <SectionWrapper>
      <ContentWrapper>
        <Image className="image-top" src={investors.image} alt="Built Logo" />
        <div className="row">
          <div className="col-40">
            <Image
              width="600px"
              className="image-side"
              src={investors.image}
              alt="Built Logo"
            />
          </div>
          <div className="col-40">
            <div className="content">
              <Heading className="Heading" content={investors.title} />
              <Text content={investors.description} />
            </div>
          </div>
        </div>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default RebelCardContent;
