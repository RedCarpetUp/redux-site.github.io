import { NextSeo } from "next-seo";
import React, { Fragment } from "react";

import Subscribe from "containers/Subscribe";
import Image from "common/components/Image";

import { faq } from "common/data/seo";
import img from "public/images/banner2.png";
import { REDC_URL } from "common/constants";

const Faq = () => {
  return (
    <Fragment>
      <NextSeo
        title={faq.title}
        description={faq.description}
        canonical={faq.canonical}
        additionalMetaTags={[
          { name: "twitter:description", content: `${faq.description}` },
          { name: "twitter:title", content: `${faq.title}` },
          {
            name: "keywords",
            content: `${faq.keywords}`,
          },
          { name: "theme-color", content: "#2563FF" },
          { name: "author", content: `${faq.author}` },
        ]}
        openGraph={{
          url: `${faq.canonical}`,
          title: `${faq.title}`,
          description: `${faq.description}`,
          images: [
            {
              url: `${faq.image}`,
              alt: `${faq.title}`,
            },
          ],
        }}
      />
      <Fragment>
        <Subscribe />
      </Fragment>
    </Fragment>
  );
};

export default Faq;
