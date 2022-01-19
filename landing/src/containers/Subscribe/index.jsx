import bg1 from "common/assets/image/agencyModern/cta/1.png";
import bg2 from "common/assets/image/agencyModern/cta/2.png";
import bg3 from "common/assets/image/agencyModern/cta/3.png";
import bg4 from "common/assets/image/agencyModern/cta/4.png";
import bg5 from "common/assets/image/agencyModern/cta/5.png";
import Image from "common/components/Image";
import Container from "common/components/UI/ContainerTwo";
import React from "react";
import Faq from "../Faq";
import SectionWrapper, { FooterInner } from "./subscribe.style";
import ReduxMainBanner from "containers/ReduxMainBanner";

const Subscribe = () => {
  return (
    <>
      {/* <ReduxMainBanner title={`Frequently Asked Questions`}/> */}
      <SectionWrapper>
        <Container>
          <FooterInner style={{ justifyContent: "center" }}>
            <Faq />
          </FooterInner>
        </Container>
        <Image src={bg1} alt="bg1" className="illustration bg1" />
        <Image src={bg2} alt="bg2" className="illustration bg2" />
        <Image src={bg3} alt="bg3" className="illustration bg3" />
        <Image src={bg4} alt="bg4" className="illustration bg4" />
        <Image src={bg5} alt="bg5" className="illustration bg5" />
      </SectionWrapper>
    </>
  );
};

export default Subscribe;
