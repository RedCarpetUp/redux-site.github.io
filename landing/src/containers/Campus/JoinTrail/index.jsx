import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import React from "react";
import Fade from "react-reveal/Fade";
import JoinTrailArea, { ContentWrapper } from "./joinTrail.style";
import { trail } from "../../../common/data/campus_leader";

const JoinTrail = () => {
  return (
    <JoinTrailArea id="trail">
      <ContentWrapper>
        <Fade up>
          <Image src="/images/logo.svg" alt="Slack" />
        </Fade>
        <Fade up delay={100}>
          <Heading content={trail.title} />
        </Fade>
        <Fade up delay={200}>
          <Text style={{ textAlign: "justify" }} content={trail.description} />
        </Fade>
      </ContentWrapper>
    </JoinTrailArea>
  );
};

export default JoinTrail;
