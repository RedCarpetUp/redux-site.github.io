import { NextSeo } from "next-seo";
import React, { Fragment } from "react";
import AboutHead from "containers/About/AboutHead";
import AboutOpenings from "containers/About/AboutOpenings";
import AboutPartners from "containers/About/AboutPartners";
import AboutTeam from "containers/About/AboutTeam";
import Gallery from "containers/Gallery";
import { about } from "common/data/seo";
import img from "public/images/banner2.png";
import { REDC_URL } from "common/constants";

export default function () {
  return (
    <Fragment>
      <NextSeo
        title={about.title}
        description={about.description}
        canonical={about.canonical}
        additionalMetaTags={[
          { name: "twitter:description", content: `${about.description}` },
          { name: "twitter:title", content: `${about.title}` },
          {
            name: "keywords",
            content: `${about.keywords}`,
          },
          { name: "theme-color", content: "#2563FF" },
          { name: "author", content: `${about.author}` },
        ]}
        openGraph={{
          url: `${about.canonical}`,
          title: `${about.title}`,
          description: `${about.description}`,
          images: [
            {
              url: `${about.image}`,
              alt: `${about.title}`,
            },
          ],
        }}
      />
      <Fragment>
        <AboutHead />
        {/* <AboutTeam />
        <AboutPartners />
        <Gallery />
        <AboutOpenings /> */}
      </Fragment>
    </Fragment>
  );
}
