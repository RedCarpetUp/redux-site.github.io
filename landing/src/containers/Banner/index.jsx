import Button from "common/components/Button";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import bannerImg from "public/images/phone.png";
import playImg from "public/images/google-play-badge.png";
import BannerWrapper, {
  BannerContent,
  BannerImage,
  ButtonGroup,
} from "./banner.style";
import { home } from "common/data/home";

const Banner = () => {
  const download = () => {
    document.location.href =
      "https://play.google.com/store/apps/details?id=com.redcarpetup.rewardpay";
  };
  return (
    <BannerWrapper id="home">
      <Container>
        <BannerContent>
          <Heading as="h1" content={home.title} />

          <Text content={home.desc1} />

          <Text content={home.desc2} style={{ marginBottom: "0px" }} />
          <Text content={home.desc3} />

          <ButtonGroup>
            <AnchorLink href="#scroll">
              <Button
                className="primary"
                title="Learn More"
                style={{ borderRadius: "8px" }}
              />
            </AnchorLink>
            {/* <div className="btn">
              <Image
                className="imag"
                src={playImg}
                alt="Banner"
                onClick={download}
              />
            </div> */}
            {/* <Button
                className="text"
                variant="textButton"
                icon={
                  <Image
                    style={{ maxHeight: "50px" }}
                    src={playImg}
                    alt="Banner"
                  />
                }
                iconPosition="left"
                onClick={download}
              /> */}
          </ButtonGroup>
        </BannerContent>
        <BannerImage>
          <Image src={bannerImg} alt="Banner" style={{ maxHeight: "580px" }} />
        </BannerImage>
      </Container>
    </BannerWrapper>
  );
};

export default Banner;
