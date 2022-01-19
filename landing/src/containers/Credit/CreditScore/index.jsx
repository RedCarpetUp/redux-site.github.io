import React from "react";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import ContentWrapper from "./creditScore.style";

import icon from "public/images/credit/Credit-Score.jpg";

const CreditScore = () => {
  return (
    <ContentWrapper>
      <Heading className="Heading" content="Do you know?" />
      <Image className="image-top" src={icon} alt="Built Logo" />
      <div className="row">
        <div className="col-50">
          <Heading
            className="Heading-2"
            style={{ color: "#dd285d" }}
            content="What is a credit/cibil score?"
          />
          <p style={{ marginBottom: "0" }}>
            A credit score is a value between 300 to 900. This score is derived
            using the credit history found in your credit report(CIR) by{" "}
            <span className="highlight">credit bureau companies</span> in India.
          </p>
          <Text
            content="Higher the score, more 
              are the chances to qualify you to get loans or credit cards from banks and NBFCs."
          />
        </div>
        <div className="col-50">
          <Image className="image-side" src={icon} alt="Built Logo" />
        </div>
      </div>
      <Heading
        style={{ marginTop: "30px" }}
        className="Heading"
        content="Always keep your credit score between 750 - 900"
      />
    </ContentWrapper>
  );
};

export default CreditScore;
