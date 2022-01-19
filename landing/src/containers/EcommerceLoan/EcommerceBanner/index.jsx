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
import { header } from "common/data/ecommerce_loan";
import EcommerceSection from "../ecommerce.style";
import BannerWrapper from "./bannerSection.style";

const EcommerceBanner = ({ row, col, description }) => {
  return (
    <EcommerceSection>
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
                    <Text content={header.description} {...description} />
                  </>
                }
                button={
                  <AnchorLink href="#know_more">
                    <Button
                      className="primary"
                      title={header.links[0].link_text}
                      style={{ borderRadius: "8px" }}
                    />
                  </AnchorLink>
                }
              />
            </Container>
          </Box>

          <Box className="col" {...col}>
            <div className="objectWrapper">
              <Image
                src={header.image}
                alt="BannerObject1"
                style={{ width: "80%" }}
              />
            </div>
          </Box>
        </Box>
      </BannerWrapper>
    </EcommerceSection>
  );
};

EcommerceBanner.propTypes = {
  description: PropTypes.object,
};

EcommerceBanner.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    width: ["80%", "80%", "80%", "80%"],
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

export default EcommerceBanner;
