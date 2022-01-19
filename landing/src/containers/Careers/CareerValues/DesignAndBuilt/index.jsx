import React from "react";
import Text from "common/components/Text";
import Heading from "common/components/Heading";
import List from "common/components/List";
import Fade from "react-reveal/Fade";
import Image from "common/components/Image";
import Container from "common/components/UI/Container";
import SectionWrapper, {
  ContentWrapper,
  ListGroup,
} from "./designedAndBuilt.style";
import { Icon } from "react-icons-kit";
import { ic_check_circle } from "react-icons-kit/md/ic_check_circle";

//import { anyTimeMoney } from "common/data/design_and_built";

const DesignedAndBuilt = ({ option }) => {
  return (
    <SectionWrapper id="know_more">
      <Container>
        <Fade up>
          <ContentWrapper>
            <div className="image">
              <Image
                src={option.image}
                alt="Built Logo"
                style={{ width: "80%" }}
              />
            </div>
            <div className="content">
              <Heading as="h1" content={option.title} />
              <Text
                content={option.description}
                style={{ textAlign: "justify" }}
              />
              <ListGroup>
                {option.points.map((item, id) => (
                  <List
                    className="list-item"
                    key={id}
                    text={item}
                    icon={
                      <Icon
                        icon={ic_check_circle}
                        size={18}
                        style={{ color: "#56BBD0" }}
                      />
                    }
                  />
                ))}
              </ListGroup>
            </div>
          </ContentWrapper>
        </Fade>
      </Container>
    </SectionWrapper>
  );
};

export default DesignedAndBuilt;
