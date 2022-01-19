import Icon from "react-icons-kit";
import { quoteLeft } from "react-icons-kit/fa/quoteLeft";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import { SectionWrapper, CardItem } from "./testimonials.style";
import Carousel from "react-multi-carousel";
import { testimonials } from "common/data/xiaomi";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import { useEffect } from "react";

const StarRating = () => (
  <>
    <span>&#9733;</span>
    <span>&#9733;</span>
    <span>&#9733;</span>
    <span>&#9733;</span>
    <span>&#9733;</span>
  </>
);

const ShrinkReview = ({ review }) => {
  const [state, setState] = useState(review);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    if (state.length > 230) {
      setState(state.slice(0, state.indexOf(" ", 230)));
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

const TestimonialsComponent = () => {
  return (
    <SectionWrapper>
      <Container>
        <Heading className="review-title" content={`Why customers love us`} />
        <Carousel
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
          {testimonials.map((e, i) => (
            <CardItem odd={i % 2 == 0} key={i}>
              <Icon className="review-quote-icon" size={42} icon={quoteLeft} />
              <Text
                className="review-content"
                content={<ShrinkReview review={e.review} />}
              />
              <Text className="review-rating" content={<StarRating />} />
              <Heading className="review-heading" content={e.name} />
            </CardItem>
          ))}
        </Carousel>
      </Container>
    </SectionWrapper>
  );
};

export default TestimonialsComponent;
