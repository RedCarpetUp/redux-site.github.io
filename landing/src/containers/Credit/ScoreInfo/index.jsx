import React from "react";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Button from "common/components/Button";
import ContentWrapper from "./scoreInfo.style";
import Link from "next/link";

import icon from "public/images/credit/Score-Info.jpg";

const ScoreInfo = () => {
  return (
    <ContentWrapper>
      <Heading
        style={{ color: "#dd285d" }}
        className="Heading"
        content="What makes up your credit score and how to improve?"
      />
      <div className="row">
        <div className="col-50">
          <Image className="image" src={icon} alt="Built Logo" />
        </div>
        <div className="col-50">
          <Heading
            className="Heading-2"
            content="How to improve your bad credit score?"
          />
          <p>
            Boost your credit score with{" "}
            <span className="highlight">Redcarpet Reset Card</span>.
          </p>
          <Link href="/reset">
            <Button
              title="Get Now"
              style={{
                borderRadius: "5px",
                backgroundColor: "#dd285d",
              }}
              className="btn"
            ></Button>
          </Link>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default ScoreInfo;
