import React from "react";
import FeatureBlock from "common/components/FeatureBlock";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Image from "common/components/Image";
import ContentWrapper from "./intro.style";

import bankSvg from "public/images/ledger/bank.svg";
import booksSvg from "public/images/ledger/books.svg";
import circleSvg from "public/images/ledger/circled.svg";

const Intro = () => {
  return (
    <ContentWrapper>
      <Heading
        className="Heading"
        content="A ledger API for building financial products"
      />
      <Text
        className="Content-1"
        content="Like what NuBank and Square have: an idempotent, double entry ledger to handle complete loan systems."
      />
      <Heading
        className="Heading-2"
        content="Move money and track your accounting variables in simple API"
      />
      <Text
        className="Content-2"
        content="Built to handle custom products, multiple instruments and accounting reconciliation between multiple parties."
      />
      <div className="row">
        <div className="container">
          <FeatureBlock
            style={{ color: "#11B836" }}
            className="Image"
            icon={
              <div
                className="ImageContainer"
                style={{ backgroundColor: "#E4FFEE" }}
              >
                <Image className="image-side" src={bankSvg} alt="Built Logo" />
              </div>
            }
            title={<Heading as="h3" content="Multi-Lender Support" />}
            description={
              <Text
                className="description"
                content="Ability to have multiple lenders on-board with customization to settlement data based on their requirement."
              />
            }
          />
        </div>
        <div className="container">
          <FeatureBlock
            style={{ color: "#2563FF" }}
            icon={
              <div
                className="ImageContainer"
                style={{ backgroundColor: "#ECF1FF" }}
              >
                <Image
                  className="image-side"
                  src={circleSvg}
                  alt="Built Logo"
                />
              </div>
            }
            title={<Heading as="h3" content="Time Machine" />}
            description={
              <Text
                className="description"
                content="See the history of any data point in real-time. Useful to answer questions like 'What was the user's dpd around this time last year?"
              />
            }
          />
        </div>
        <div className="container">
          <FeatureBlock
            style={{ color: "#F62727" }}
            icon={
              <div
                className="ImageContainer"
                style={{ backgroundColor: "#FFECEF" }}
              >
                <Image className="image-side" src={booksSvg} alt="Built Logo" />
              </div>
            }
            title={<Heading as="h3" content="Reconciled by Design" />}
            description={
              <Text
                className="description"
                content="Track things like taxes, loan balances and liabilities in real-time, updated inline with payments"
              />
            }
          />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Intro;
