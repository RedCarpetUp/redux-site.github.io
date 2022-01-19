import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Button from "common/components/Button";
import Image from "common/components/Image";
import Container from "common/components/UI/Container";
import { SectionWrapper } from "./submitRating.style";
import Icon from "react-icons-kit";
import { arrowRight } from "react-icons-kit/fa/arrowRight";

const SubmitRating = () => {
  return (
    <SectionWrapper>
      <Container>
        <div className="flex-section">
          <div className="flex-image">
            <Image src={"/images/ratings/opinion.svg"} />
          </div>
          <div className="flex-content">
            <Heading
              content={`Have you completed with above requested task to win an exciting prize?`}
            />
            <Text
              content={`If yes, please help us with few answers required to forward your won prize.`}
            />
            <a
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfSU8JF6L_C7zxY85D2NVTVk7PTQULdFAmuaeJ2GwdJWxJCpg/viewform"
              rel="noopener noreferrer"
            >
              <Button title={`Google Form`} icon={<Icon icon={arrowRight} />} />
            </a>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
};

export default SubmitRating;
