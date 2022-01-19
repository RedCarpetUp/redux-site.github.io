import Box from "common/components/Box";
import Button from "common/components/Button";
import FeatureBlock from "common/components/FeatureBlock";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { header } from "common/data/cards";
import CardSection from "../cards.style";
import BannerWrapper from "./bannerSection.style";

const SmartCardBanner = ({ row, col, description }) => {
  return (
    <CardSection>
      <BannerWrapper
        id="banner_section"
        style={{
          backgroundImage: "linear-gradient(85deg, #e6e9f0 0%, #eef1f5 100%)",
        }}
      >
        <Box className="row ma" style={{ margin: "0 auto" }} {...row}>
          <Box className="col" {...col}>
            <Container>
              <FeatureBlock
                className="feature"
                title={
                  <Heading content={header.title} style={{ fontWeight: 400 }} />
                }
                description={
                  <>
                    <Text content={header.description[1]} {...description} />
                  </>
                }
                button={
                  <AnchorLink href="#know_more">
                    <Button
                      className="primary"
                      title="Read More"
                      style={{ borderRadius: "8px" }}
                    />
                  </AnchorLink>
                }
              />
            </Container>
          </Box>

          <Box className="col" {...col}>
            <div className="mobile_banner_image">
              <Image
                src={header.image}
                alt="BannerObject1"
                style={{ height: "580px", width: "80%" }}
              />
            </div>
          </Box>
        </Box>
      </BannerWrapper>
    </CardSection>
  );
};

SmartCardBanner.propTypes = {
  description: PropTypes.object,
};

SmartCardBanner.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    width: ["90%", "90%", "90%", "90%"],
    alignItems: "center",
    margin: "0 auto",
  },
  col: {
    pr: "15px",
    pl: "15px",
    width: [1, 1, "50%", "50%"],
    margin: "0 auto",
  },
  description: {
    fontSize: ["15px", "15px", "15px", "16px", "16px"],
    color: "#343d48cc",
    lineHeight: "2",
    mb: "2rem",
  },
};

export default SmartCardBanner;
