import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";
import Icon from "react-icons-kit";
import { arrowRight } from "react-icons-kit/feather/arrowRight";
import Button from "common/components/Button";
import Link from "next/link";
import Text from "common/components/Text";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Container from "common/components/UI/Container";
import FeatureBlock from "common/components/FeatureBlock";
import { SectionHeader } from "public/styles/appModern.style";
import SectionWrapper, { FeatureWrapper } from "./features.style";

import { features } from "common/data/rebel";

const Features = () => {
  const { slogan, title, items } = features;

  return (
    <SectionWrapper id="features">
      <Container>
        <SectionHeader>
          <Fade up>
            <Heading as="h5" content={slogan} />
            <Heading content={title} />
          </Fade>
        </SectionHeader>
        <FeatureWrapper>
          {items.map((item) => (
            <Fade up delay={100 * item.id} key={`feature-key${item.id}`}>
              <FeatureBlock
                style={{ "--color": `${item.color}` }}
                icon={
                  <Fragment>
                    <Image src={item.icon} alt={item.title} />
                  </Fragment>
                }
                iconPosition="left"
                description={<Text content={item.description} />}
              />
            </Fade>
          ))}
        </FeatureWrapper>
        <div className="row">
          <Link href="/login">
            <Button
              title="Join the waitlist"
              style={{ borderRadius: "5px" }}
              className="btn"
              icon={<Icon icon={arrowRight} />}
            />
          </Link>
        </div>
      </Container>
    </SectionWrapper>
  );
};

export default Features;
