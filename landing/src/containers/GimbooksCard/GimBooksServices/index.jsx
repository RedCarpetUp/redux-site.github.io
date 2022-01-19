import Text from "common/components/Text";
import Image from "common/components/Image";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import Button from "common/components/Button";
import { SectionWrapper } from "./services.styles";

const Services = () => {
  return (
    <SectionWrapper>
      <Container className="container">
        <div className="div-1">
          <Heading content="GimBooks Services" className="Heading" />
          <Text
            className="content"
            content="Everything you need to accept and payments and grow your business anywhere on the planet"
          />
        </div>
        <div className="div-2">
          <Button
            title="Get Started"
            style={{ borderRadius: "5px" }}
            className="btn"
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: 0,
              })
            }
          />
        </div>
      </Container>
    </SectionWrapper>
  );
};

export default Services;
