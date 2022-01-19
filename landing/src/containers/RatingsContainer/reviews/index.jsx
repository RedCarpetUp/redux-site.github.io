import { useState, useEffect } from "react";
import Icon from "react-icons-kit";
import { quoteLeft } from "react-icons-kit/fa/quoteLeft";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Container from "common/components/UI/Container";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Image from "common/components/Image";
import { CardItem, SectionWrapper } from "./reviews.style";
import { reviews } from "common/data/ratings";

const ShrinkReview = ({ review }) => {
  const [state, setState] = useState(review);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    if (state.length > 200) {
      setState(state.slice(0, state.indexOf(" ", 200)));
      setShrink(true);
    }
  }, []);

  const handleClick = () => {
    setState(review);
    setShrink(false);
  };

  return (
    <>
      {state}
      {shrink && (
        <span onClick={handleClick} style={{ cursor: "pointer" }}>
          ...
        </span>
      )}
    </>
  );
};

const Reviews = () => {
  return (
    <SectionWrapper>
      <Container>
        <Heading
          className="review-heading"
          content={`What our customers say about our product`}
        />
        <Carousel
          showDots
          autoPlay
          infinite
          autoPlaySpeed={2000}
          transitionDuration={500}
          itemClass="review-carousel-items"
          removeArrowOnDeviceType={[
            "tablet",
            "superLargeDesktop",
            "desktop",
            "mobile",
          ]}
          responsive={{
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 5,
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          }}
        >
          {reviews.map((e, i) => (
            <CardItem key={i}>
              <Image
                className="review-profile-pic center-it"
                alt="profile"
                src={e.image}
              />
              <Icon
                className="review-quote-icon center-it"
                size={35}
                icon={quoteLeft}
              />
              <Text
                className="review-text-content"
                content={<ShrinkReview review={e.review} />}
              />
              <hr />
              <Heading className="review-name" content={e.name} />
            </CardItem>
          ))}
        </Carousel>
      </Container>
    </SectionWrapper>
  );
};

export default Reviews;
