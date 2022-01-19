import { NextSeo } from "next-seo";
import React, { Fragment } from "react";
import { contact } from "common/data/seo";
import AboutUsStartupIndia from "containers/AboutUs/AboutUsStartupIndia";
import AboutUsNewsReel from "containers/AboutUs/AboutUsNewsReel";
import AboutUsBigPhoto from "containers/AboutUs/AboutUsBigPhoto";
import AboutUsCustomerRating from "containers/AboutUs/AboutUsCustomerRating";
import AboutUsPartners from "containers/AboutUs/AboutUsPartners";
import AboutUsStyleWrapper from "./aboutus.style";

import SdkForm from "containers/contact/SdkForm";
import Support from "containers/contact/Support";

export default function () {
  return (
    <Fragment>
      <NextSeo
        title={contact.title}
        description={contact.description}
        canonical={contact.canonical}
        additionalMetaTags={[
          { name: "twitter:description", content: `${contact.description}` },
          { name: "twitter:title", content: `${contact.title}` },
          {
            name: "keywords",
            content: `${contact.keywords}`,
          },
          { name: "theme-color", content: "#2563FF" },
          { name: "author", content: `${contact.author}` },
        ]}
        openGraph={{
          url: `${contact.canonical}`,
          title: `${contact.title}`,
          description: `${contact.description}`,
          images: [
            {
              url: `${contact.image}`,
              alt: `${contact.title}`,
            },
          ],
        }}
      />
      <Fragment>
        <div style={{ paddingTop: "75px" }}>
          <SdkForm />
        </div>
        <Support />
      </Fragment>
    </Fragment>
  );
}
