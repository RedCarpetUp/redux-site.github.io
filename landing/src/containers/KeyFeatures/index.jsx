import FeatureBlock from "common/components/FeatureBlock";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React, { Fragment } from "react";
import { Icon } from "react-icons-kit";
import { mediaRecordOutline } from "react-icons-kit/typicons/mediaRecordOutline";
import { plus } from "react-icons-kit/typicons/plus";
import { starOutline } from "react-icons-kit/typicons/starOutline";
import Zoom from "react-reveal/Zoom";
import { keyFeatures } from "common/data/design_and_built";
import { SectionHeader } from "public/styles/appClassic.style";
import SectionWrapper, { FeatureWrapper } from "./keyFeatures.style";

const KeyFeatures = () => {
  const { slogan, title, features } = keyFeatures;

  return (
    <SectionWrapper id="keyFeatures">
      <Container>
        <SectionHeader>
          <Zoom>
            <Heading as="h5" content={slogan} />
            <Heading content={title} />
          </Zoom>
        </SectionHeader>
        <FeatureWrapper>
          {features.map((item) => (
            <Zoom delay={100 * item.id} key={`key-feature--key${item.id}`}>
              <FeatureBlock
                style={{ "--color": `${item.color}` }}
                icon={
                  <Fragment>
                    <Icon className="plus" icon={plus} />
                    <Icon className="circle" icon={mediaRecordOutline} />
                    <Image src={item.icon} alt={item.title} />
                    <Icon className="star" icon={starOutline} />
                  </Fragment>
                }
                title={<Heading as="h3" content={item.title} />}
                description={<Text content={item.description} />}
              />
            </Zoom>
          ))}
        </FeatureWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default KeyFeatures;
