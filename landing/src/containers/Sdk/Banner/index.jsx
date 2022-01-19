import Button from "common/components/Button";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import Link from "next/link";
import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import bannerImg from "public/images/banner2.png";
import BannerWrapper, {
  BannerContent,
  BannerImage,
  ButtonGroup,
} from "./banner.style";

const Banner = () => {
  const download = () => {
    document.location.href =
      "https://play.google.com/store/apps/details?id=com.redcarpetup.rewardpay";
  };
  return (
    <BannerWrapper id="home">
      <Container>
        <BannerContent>
          <Heading as="h1" content="RedCarpet Cobranded Card SDK" />

          <Text content="Integrate Redcarpet SDK into your app. KYC & credit-scoring pre-integrated." />

          <Text
            content="Start issuing cobranded credit lines on cards. Go live in days. We take care of risk & collections"
            style={{ marginBottom: "0px" }}
          />
          <ButtonGroup>
            <Link href="/sdk-documentation">
              <Button
                className="primary"
                title="Documentation"
                style={{ borderRadius: "8px" }}
              />
            </Link>
            <AnchorLink href="#demo">
              <Button
                className="primary"
                title="Request Demo"
                style={{ borderRadius: "8px", marginLeft: "10px" }}
              />
            </AnchorLink>
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
