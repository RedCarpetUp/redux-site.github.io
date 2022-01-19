import FeatureBlock from "common/components/FeatureBlock";
import Heading from "common/components/Heading";
import Box from "common/components/Box";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React from "react";
import Zoom from "react-reveal/Zoom";
import { keyFeatures } from "common/data/reset";
import { SectionHeader } from "public/styles/appClassic.style";
import SectionWrapper, { FeatureWrapper } from "./keyFeatures.style";
import Image from "common/components/Image";

const KeyFeatures = () => {
  const { title, features } = keyFeatures;

  return (
    <SectionWrapper
      id="keyFeatures"
      style={{ color: "white", paddingBottom: "70px", paddingTop: "70px" }}
    >
      <Container>
        <SectionHeader style={{ maxWidth: "452px", color: "white" }}>
          <Zoom>
            <Heading content={title} style={{ color: "white" }} />
          </Zoom>
        </SectionHeader>
        <FeatureWrapper>
          {features.map((item) => (
            <Box className={`box-${item.id}`}>
              <Zoom delay={100 * item.id} key={`key-feature--key${item.id}`}>
                <FeatureBlock
                  title={
                    item.title ? (
                      <Heading as="h3" content={item.title} />
                    ) : (
                      <div
                        style={{
                          marginTop: "25px",
                        }}
                      >
                        <Image
                          style={{
                            width: "85px",
                            height: "34px",
                            float: "left",
                            marginRight: "10px",
                          }}
                          src={item.icon}
                          alt="VISA Card"
                        />
                        <Text content={item.description1} />
                      </div>
                    )
                  }
                  description={<Text content={item.description} />}
                />
              </Zoom>
            </Box>
          ))}
        </FeatureWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default KeyFeatures;
