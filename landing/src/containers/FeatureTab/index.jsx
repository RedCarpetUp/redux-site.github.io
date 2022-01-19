import FeatureBlock from "common/components/FeatureBlock";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Tab, { Panel } from "common/components/Tabs";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React, { Fragment } from "react";
import { Icon } from "react-icons-kit";
import { mediaRecordOutline } from "react-icons-kit/typicons/mediaRecordOutline";
import { plus } from "react-icons-kit/typicons/plus";
import { starOutline } from "react-icons-kit/typicons/starOutline";
import Fade from "react-reveal/Fade";
import { featuresTab } from "common/data/design_and_built";
import { SectionHeader } from "public/styles/appClassic.style";
import SectionWrapper, { TabArea } from "./featureTab.style";

const FeatureTab = () => {
  const { slogan, title, tab } = featuresTab;
  return (
    <SectionWrapper id="scroll">
      <Container>
        <SectionHeader>
          <Fade up>
            <Heading as="h5" content={slogan} />
            <Heading content={title} />
          </Fade>
        </SectionHeader>
        <Fade up>
          <TabArea>
            <Tab active={0}>
              {tab.map((item) => (
                <Panel
                  title={
                    <FeatureBlock
                      style={{ "--color": `${item.color}` }}
                      iconPosition="left"
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
                  }
                  key={`app-tab--key${item.id}`}
                >
                  <Fade>
                    <Image src={item.image} alt={item.title} />
                  </Fade>
                </Panel>
              ))}
            </Tab>
          </TabArea>
        </Fade>
      </Container>
    </SectionWrapper>
  );
};

export default FeatureTab;
