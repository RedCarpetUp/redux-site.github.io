import Button from "common/components/Button";
import GlideCarousel from "common/components/GlideCarousel";
import GlideSlide from "common/components/GlideCarousel/glideSlide";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";
import { userReview } from "common/data/career";
import { SectionHeader } from "public/styles/appClassic.style";
import SectionWrapper, { CarouselWrapper } from "./testimonial.style";
//import { testimonial } from "common/data/AppClassic";

const Testimonial = () => {
  const { title, description, reviews } = userReview;

  const glideOptions = {
    type: "carousel",
    gap: 0,
    autoplay: 5000,
    perView: 1,
    animationDuration: 700,
    breakpoints: {
      991: {
        perView: 1,
      },
    },
  };

  return (
    <SectionWrapper id="testimonial">
      <Container>
        <SectionHeader>
          <Fade up>
            <Heading as="h5" content={title} />
            <Heading content={description} />
          </Fade>
        </SectionHeader>

        <CarouselWrapper>
          <Fade up delay={100}>
            <GlideCarousel
              options={glideOptions}
              nextButton={
                <Button
                  icon={<i className="flaticon-next" />}
                  aria-label="Next"
                  variant="fab"
                />
              }
              prevButton={
                <Button
                  icon={<i className="flaticon-left-arrow" />}
                  aria-label="Prev"
                  variant="fab"
                />
              }
            >
              <Fragment>
                {reviews.map((item) => (
                  <GlideSlide key={`testimonial--key${item.id}`}>
                    <div className="review-card">
                      <Text content={item.text} />
                      <div className="card-footer">
                        <div className="reviewer-info">
                          <div className="content">
                            <Heading as="h4" content={`- ${item.name}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlideSlide>
                ))}
              </Fragment>
            </GlideCarousel>
          </Fade>
        </CarouselWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default Testimonial;
