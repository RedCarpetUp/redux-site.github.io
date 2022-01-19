import React from "react";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import ContentWrapper from "./creditBureau.style";

import icon from "public/images/credit/Credit-Bureau.jpg";

const CreditScore = () => {
  return (
    <ContentWrapper>
      <Heading
        style={{ color: "#dd285d" }}
        className="Heading"
        content="What are Credit Bureau Companies?"
      />
      <div className="row">
        <div className="col-50">
          <Image className="image" src={icon} alt="Built Logo" />
        </div>
        <div className="col-50">
          <Heading
            className="Heading-2"
            content="Credit Information Companies(Credit Bureau) are specialized financial institutions"
          />
          <Text
            style={{ marginBottom: "0" }}
            content="They have its own unique formula which it uses to calculate a person’s credit score. 
            Thus even the same individual’s credit score varies from one credit bureau to another."
          />
          <p style={{ marginBottom: "0" }}>
            At present there are <span className="highlight">2 major</span>{" "}
            Credit Information Companies in India.
          </p>
          <Text style={{ marginBottom: "0" }} content="1. TransUnion - CIBIL" />
          <Text style={{ marginBottom: "0" }} content="2. Equifax" />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default CreditScore;
