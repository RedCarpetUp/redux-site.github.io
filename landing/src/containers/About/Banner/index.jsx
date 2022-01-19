import GlideCarousel from "common/components/GlideCarousel";
import GlideSlide from "common/components/GlideCarousel/glideSlide";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import { bannerData } from "common/data/Interior";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { images } from "common/data/about";
import { CircleLoader } from "public/styles/interior.style";
import BannerWrapper, { CarouselArea, Container } from "./banner.style";

const Banner = () => {
  const { discount, discountLabel, title, text, carousel } = bannerData;
  const glideOptions = {
    type: "carousel",
    perView: 4,
    gap: 20,
    autoplay: 50,
    animationDuration: 3000,
    animationTimingFunc: "linear",
    breakpoints: {
      1200: {
        perView: 2,
      },
      667: {
        perView: 2,
      },
      480: {
        perView: 1,
      },
    },
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const [state, setState] = useState({ email: "", valid: "" });
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleOnChange = (e) => {
    let value = "";
    if (e.target.value.match(emailRegex)) {
      if (e.target.value.length > 0) {
        value = e.target.value;
        setState({ ...state, email: value, valid: "valid" });
      }
    } else {
      if (e.target.value.length > 0) {
        setState({ ...state, valid: "invalid" });
      } else {
        setState({ ...state, valid: "" });
      }
    }
  };

  const handleSubscriptionForm = (e) => {
    e.preventDefault();
    if (state.email.match(emailRegex)) {
      console.log(state.email);
      setState({ email: "", valid: "" });
    }
  };

  return (
    <BannerWrapper>
      <Container>
        <CarouselArea>
          {loading ? (
            <GlideCarousel
              carouselSelector="interior_carousel"
              options={glideOptions}
              nextButton={<span className="next_arrow" />}
              prevButton={<span className="prev_arrow" />}
            >
              <Fragment>
                {images.map((img) => (
                  <GlideSlide key={`carousel_key${img.id}`}>
                    <Link href="#">
                      <a className="item_wrapper">
                        <Image src={img.original} alt={img.originalAlt} />
                        <Heading as="h4" content="" />
                      </a>
                    </Link>
                  </GlideSlide>
                ))}
              </Fragment>
            </GlideCarousel>
          ) : (
            <CircleLoader>
              <div className="circle"></div>
              <div className="circle"></div>
            </CircleLoader>
          )}
        </CarouselArea>
        {/* End of carousel section */}
      </Container>
    </BannerWrapper>
  );
};

export default Banner;
