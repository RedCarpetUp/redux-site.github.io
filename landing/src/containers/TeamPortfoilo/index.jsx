import Button from "common/components/Button";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import SectionWrapper, { ContentWrapper } from "./teamPortfolio.style";

const TeamPortfoiloSection = () => {
  const [hover, setHover] = useState({
    active: 6, // active item when start
  });

  const handleMouseEnter = (index) => {
    setHover({
      active: index,
    });
  };

  return (
    <SectionWrapper id="team">
      <Container>
        <ContentWrapper>
          <div className="image">
            {teammember.map((item, index) => (
              <Fade up key={index}>
                <div
                  className={`item_wrapper ${
                    hover.active === index ? "active" : ""
                  }`}
                  key={index}
                  onMouseEnter={() => {
                    setHover({
                      active: index,
                    });
                  }}
                  onMouseLeave={() => {
                    setHover({
                      active: index,
                    });
                  }}
                >
                  <div className="imageWrapper">
                    <Image src={item.img} alt={item.text} />
                  </div>
                  <Text className="author_name" content={item.text} />
                </div>
              </Fade>
            ))}
          </div>
          <div className="content">
            <Heading content={title} />
            <Text content={description} />
            <Button title="Learn More" />
          </div>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default TeamPortfoiloSection;
