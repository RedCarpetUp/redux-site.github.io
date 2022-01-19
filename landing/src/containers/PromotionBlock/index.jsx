import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import Fade from "react-reveal/Fade";
import BlockWrapper, {
  ContentWrapper,
  ImageWrapper,
} from "./promotionBlock.style";

const PromotionBlock = ({ row, col, option }) => {
  return (
    <BlockWrapper id="ourCommunity">
      <Container>
        <Box className="row" {...row}>
          <Box className="col" {...col}>
            <ContentWrapper>
              <Heading as="h1" content={option.title} />
              <br />
              <Text
                content={option.description}
                style={{ textAlign: "justify" }}
              />
            </ContentWrapper>
          </Box>

          <Box className="col" {...col}>
            <Fade right delay={200}>
              <ImageWrapper>
                <Image src={option.image} alt={option.title} />
              </ImageWrapper>
            </Fade>
          </Box>
        </Box>
      </Container>
    </BlockWrapper>
  );
};

// PromotionBlock style props
PromotionBlock.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

// PromotionBlock default style
PromotionBlock.defaultProps = {
  // PromotionBlock row default style
  row: {
    flexBox: true,
    flexWrap: "wrap",
    mr: "-15px",
  },
  // PromotionBlock col default style
  col: {
    width: ["100%", "50%", "50%"],
    pl: "15px",
    pr: "15px",
    mb: "30px",
  },
};

export default PromotionBlock;
