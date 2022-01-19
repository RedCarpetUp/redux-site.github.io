import FeatureBlock from "common/components/FeatureBlock";
import GlideCarousel from "common/components/GlideCarousel";
import GlideSlide from "common/components/GlideCarousel/glideSlide";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React, { Fragment } from "react";
import { appslider } from "common/data/design_and_built";
import SectionWrapper, { CarouseWrapper, TextWrapper } from "./appSlider.style";

const AppSlider = () => {
  const { title, description, image, features, carousel } = appslider;

  const glideOptions = {
    type: "carousel",
    gap: 0,
    autoplay: 5000,
    perView: 1,
    animationDuration: 700,
  };

  return (
    <SectionWrapper>
      <Container>
        <CarouseWrapper>
          <GlideCarousel
            bullets={true}
            controls={false}
            numberOfBullets={3}
            options={glideOptions}
            carouselSelector="appFeatureSlider"
          >
            <Fragment>
              {carousel.map((item) => (
                <GlideSlide key={`feature-side--key${item.id}`}>
                  <Image src={item.image} alt={item.title} /> {/*374x748*/}
                </GlideSlide>
              ))}
            </Fragment>
          </GlideCarousel>
        </CarouseWrapper>
        <TextWrapper>
          <Heading content={title} />
          <Text content={description} />
          {features.map((item) => (
            <FeatureBlock
              key={`app-feature--key${item.id}`}
              iconPosition="left"
              icon={<i className={item.icon}></i>}
              title={<Heading as="h3" content={item.title} />}
              description={<Text content={item.description} />}
            />
          ))}
        </TextWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default AppSlider;
