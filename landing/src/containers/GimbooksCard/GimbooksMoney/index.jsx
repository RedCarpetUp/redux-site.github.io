import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Image from "common/components/Image";
import { SectionWrapper, CardItem } from "./money.style";
import Container from "common/components/UI/Container";

const MoneyComponent = ({ learnMoreRef }) => {
  return (
    <SectionWrapper ref={learnMoreRef}>
      <Container>
        <Heading className="text-heading" content={`We are simple to use!`} />
        <Text
          className="text-content"
          content={`You do the business we'll handle the money`}
        />
        <div className="flex-container">
          <CardItem>
            <Image src={"/images/rebel/Flexibility.svg"} />
            <Heading content={`100% ONLINE`} />
            <Text
              content={`No physical Docs required, it is a completely online application.`}
            />
          </CardItem>
          <CardItem>
            <Image
              src={"/images/rebel/No Hidden Fees, No Membership Fees.svg"}
            />
            <Heading content={`We won't keep you waiting`} />
            <Text
              content={`It takes only 10 mins! Get the card instantly, no more waiting.`}
            />
          </CardItem>
          <CardItem>
            <Image src={"/images/gimbook/india_map.svg"} />
            <Heading content={`Use it anywhere`} />
            <Text
              content={`We're accepted throughout India. Use this card to make all types of payments`}
            />
          </CardItem>
        </div>
      </Container>
    </SectionWrapper>
  );
};

export default MoneyComponent;
