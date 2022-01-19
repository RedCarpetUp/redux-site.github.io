import SlideMockup from "common/assets/image/appModern/screen.png";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import Fade from "react-reveal/Fade";
import "swiper/css/swiper.css";
import { productData } from "common/data/product_slide";
import ProductSlideWrapper, {
  CarouselArea,
  CircleLoader,
  Container,
  MockupWrapper,
  SectionHeader,
} from "./productSlide.style";

const params = {
  slidesPerView: 5,
  centeredSlides: true,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2500,
  },
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
};
const ProductSlide = () => {
  const { carousel, slogan, title } = productData;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <ProductSlideWrapper>
      <Container>
        <SectionHeader>
          <Fade up>
            <Heading as="h5" content={slogan} />
            <Heading content={title} />
          </Fade>
        </SectionHeader>
        <CarouselArea>
          {loading ? (
            <Fragment>
              <MockupWrapper>
                <Image src={SlideMockup} alt="mockup" />
              </MockupWrapper>
              <Swiper {...params}>
                {carousel.map((item, index) => (
                  <div key={index}>
                    <Link href={item.link} key={`productSlide--key${item.id}`}>
                      <a className="item_wrapper">
                        <Image src={item.thumb_url} alt={item.title} />
                      </a>
                    </Link>
                  </div>
                ))}
              </Swiper>
            </Fragment>
          ) : (
            <CircleLoader>
              <div className="circle"></div>
              <div className="circle"></div>
            </CircleLoader>
          )}
        </CarouselArea>
        {/* End of carousel section */}
      </Container>
    </ProductSlideWrapper>
  );
};

export default ProductSlide;
