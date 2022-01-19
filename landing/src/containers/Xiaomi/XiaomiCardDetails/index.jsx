import React from "react";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Button from "common/components/Button";
import Icon from "react-icons-kit";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";
import { benefits } from "common/data/xiaomi";
import { SectionWrapper, ContentWrapper } from "./designedAndBuilt.style";

const XiaomiCardContent = () => {
  return (
    <SectionWrapper>
      {benefits.map((item, index) =>
        index === 1 ? (
          <ContentWrapper>
            <Image className="image-top" src={item.image} alt="Built Logo" />
            <div className="row">
              <div className="col-40">
                <div className="content">
                  <Heading className="Heading" content={item.title} />
                  <Text
                    style={{ fontSize: "20px" }}
                    content={item.description}
                  />
                </div>
              </div>
              <div className="col-40">
                <Image
                  className={`image-side ${
                    item.type === "Virtual Card" && "offers"
                  }`}
                  src={item.image}
                  alt="Built Logo"
                />
              </div>
            </div>
          </ContentWrapper>
        ) : index === 2 ? (
          <ContentWrapper>
            <Image className="image-top" src={item.image} alt="Built Logo" />
            <div className="row">
              <div className="col-40">
                <Image
                  className="image-side"
                  src={item.image}
                  alt="Built Logo"
                />
              </div>
              <div className="col-40">
                <div className="content">
                  <Heading className="Heading" content={item.title} />
                  <Text content={item.description} />
                  <div className="icon-text">
                    <Icon size={21} className="icon" icon={ic_check_circle} />
                    Easily convert your bills to EMIs
                  </div>
                  <div className="icon-text">
                    <Icon size={21} className="icon" icon={ic_check_circle} />
                    Withdraw cash from ATM
                  </div>
                  <div className="icon-text">
                    <Icon size={21} className="icon" icon={ic_check_circle} />
                    Easy transfer to a bank account
                  </div>
                  <div className="icon-text">
                    <Icon size={21} className="icon" icon={ic_check_circle} />
                    Simplify Operations
                  </div>
                </div>
              </div>
            </div>
          </ContentWrapper>
        ) : (
          <ContentWrapper>
            <div className="extra-space">
              <Image className="image-top" src={item.image} alt="Built Logo" />
              <div className="row">
                <div className="col-40">
                  <Image
                    className={`image-side ${
                      item.type === "Virtual Card" && "offers"
                    }`}
                    src={item.image}
                    alt="Built Logo"
                  />
                </div>
                <div className="col-40">
                  <div className="content">
                    <Heading className="Heading" content={item.title} />
                    <Text
                      style={{ fontSize: "20px" }}
                      content={item.description}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ContentWrapper>
        )
      )}
    </SectionWrapper>
  );
};

export default XiaomiCardContent;
