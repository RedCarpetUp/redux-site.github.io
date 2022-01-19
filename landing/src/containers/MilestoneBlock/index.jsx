import Image from "common/components/Image";
import Container from "common/components/UI/Container";
import React from "react";
import BlockWrapper from "./milestoneBlock.style";

const MilestoneBlock = (image) => {
  return (
    <Container id="milestone">
      <BlockWrapper>
        <center>
          <Image src={image.image} className="img" />
        </center>
      </BlockWrapper>
    </Container>
  );
};

export default MilestoneBlock;
