import React, { Fragment } from "react";
import { NextSeo } from "next-seo";

import { home } from "common/data/seo";

import img from "public/images/banner2.png";
import { REDC_URL } from "common/constants";

import Banner from "containers/Banner";
import AppSlider from "containers/AppSlider";
import FeatureTab from "containers/FeatureTab";
import TimelineSection from "containers/TimelineSection";
import RedCarpetCard from "containers/RedCarpetCard";
import AnyTimeMoney from "containers/AnyTimeMoney";
import KeyFeatures from "containers/KeyFeatures";
import AboutTeam from "containers/About/AboutTeam";
import Newsletter from "containers/Newsletter";

const Home = () => {
  return (
    <Fragment>
      <NextSeo
        title={home.title}
        description={home.description}
        canonical={home.canonical}
        additionalMetaTags={[
          { name: "twitter:description", content: `${home.description}` },
          { name: "twitter:title", content: `${home.title}` },
          { name: "twitter:card", content: "app" },
          { name: "twitter:text:title", content: `${home.title}` },
          {
            name: "twitter:app:name:googleplay",
            content: "ATM Cash + Credit + Card + Coupons: RedCarpet",
          },
          {
            name: "twitter:app:id:googleplay",
            content: "com.redcarpetup.rewardpay",
          },
          {
            name: "twitter:app:url:googleplay",
            content:
              "https://play.google.com/store/apps/details?id=com.redcarpetup.rewardpay",
          },
          {
            name: "twitter:app:country",
            content: "IN",
          },
          {
            name: "keywords",
            content: `${home.keywords}`,
          },
          { name: "theme-color", content: "#2563FF" },
          { name: "author", content: `${home.author}` },
        ]}
        openGraph={{
          url: `${home.canonical}`,
          title: `${home.title}`,
          description: `${home.description}`,
          images: [
            {
              url: `${home.image}`,
              alt: `${home.title}`,
            },
          ],
        }}
      />

      {/* start app page content */}
      <Fragment>
        <Banner />
        <KeyFeatures />
        <Newsletter />
        <TimelineSection />
        <AboutTeam />
      </Fragment>
      {/* end of app classic landing */}
    </Fragment>
  );
};

export default Home;
