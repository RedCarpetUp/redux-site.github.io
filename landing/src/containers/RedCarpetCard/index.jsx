import Box from "common/components/Box";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import Slide from "react-reveal/Slide";
import { redCarpetCard } from "common/data/design_and_built";
import BlockWrapper, {
  ContentWrapper,
  ImageWrapper,
} from "./designedAndBuilt.style";

const RedCarpetCard = ({ row, col }) => {
  return (
    <BlockWrapper id="ourCommunity">
      {redCarpetCard.map((e, i) => {
        return (
          <Container>
            <Box className="row" {...row}>
              <Box className="col" {...col}>
                <ContentWrapper>
                  <Heading as="h1" content={e.title} />
                  <br />
                  <Text
                    content={e.description}
                    style={{ textAlign: "justify" }}
                  />
                </ContentWrapper>
              </Box>
              <Box className="col" {...col}>
                <Slide right>
                  <ImageWrapper>
                    <Image src={e.image} alt={e.title} />
                  </ImageWrapper>
                </Slide>
              </Box>
            </Box>
          </Container>
        );
      })}
    </BlockWrapper>
  );
};

// PromotionBlock style props
RedCarpetCard.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

// PromotionBlock default style
RedCarpetCard.defaultProps = {
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

export default RedCarpetCard;
