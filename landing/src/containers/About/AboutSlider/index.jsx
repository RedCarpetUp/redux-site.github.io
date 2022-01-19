import React from "react";
import Banner from "../Banner";

const AboutSlider = () => {
  const carouselOptions = {
    type: "carousel",

    autoplay: 100,

    perView: 3,

    gap: 10,

    animationDuration: 3000,

    animationTimingFunc: "linear",

    breakpoints: {
      800: {
        perView: 1,
      },
    },
  };

  return (
    <Banner />
  );
};

export default AboutSlider;
