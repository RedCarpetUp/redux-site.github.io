import { NextSeo } from "next-seo";
import React, { Fragment } from "react";

import PersonalLoanBanner from "containers/PersonalLoans/PersonalLoanBanner";
import PersonalLoanContent from "containers/PersonalLoans/PersonalLoanContent";

import { personal } from "common/data/seo";
import img from "public/images/personal-loans/main.png";
import { REDC_URL } from "common/constants";

const PersonalLoan = () => {
  return (
    <Fragment>
      <NextSeo
        title={personal.title}
        description={personal.description}
        canonical={personal.canonical}
        additionalMetaTags={[
          { name: "twitter:description", content: `${personal.description}` },
          { name: "twitter:title", content: `${personal.title}` },
          {
            name: "keywords",
            content: `${personal.keywords}`,
          },
          { name: "theme-color", content: "#2563FF" },
          { name: "author", content: `${personal.author}` },
        ]}
        openGraph={{
          url: `${personal.canonical}`,
          title: `${personal.title}`,
          description: `${personal.description}`,
          images: [
            {
              url: `${personal.image}`,
              alt: `${personal.title}`,
            },
          ],
        }}
      />
      <Fragment>
        <PersonalLoanBanner />
        <PersonalLoanContent />
      </Fragment>
    </Fragment>
  );
};

export default PersonalLoan;
