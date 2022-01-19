import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Image from "common/components/Image";
import { SectionWrapper, CardItem } from "./money.style";
import Container from "common/components/UI/Container";

const MoneyComponent = ({ learnMoreRef }) => {
  return (
    <SectionWrapper ref={learnMoreRef}>
      <Container>
        <Heading className="text-heading" content={`It’s really simple!`} />
        <Text className="text-content" content={`Your dream MI phone`} />
        <div className="flex-container">
          <CardItem>
            <Image src={"/images/xiaomi/register.svg"} />
            <Heading content={`Register`} />
            <Text
              content={
                <>
                  <ul style={{ marginLeft: 20, marginBottom: 10 }}>
                    <li style={{ listStyleType: "circle" }}>
                      Complete your KYC
                    </li>
                    <li style={{ listStyleType: "circle" }}>
                      Upload Pan and Aadhar
                    </li>
                  </ul>
                  You will get an Instant approval and a credit limit assigned
                </>
              }
            />
          </CardItem>
          <CardItem odd>
            <Image src={"/images/xiaomi/downpayment.svg"} />
            <Heading content={`Downpayment`} />
            <Text
              content={
                <>
                  Once you are provided with a credit limit a small% of the
                  price is required to be made as a down payment. The rest will
                  be taken care by us
                </>
              }
            />
          </CardItem>
          <CardItem>
            <Image src={"/images/xiaomi/confirmation.svg"} />
            <Heading content={`Confirmation`} />
            <Text
              content={
                <>
                  An invoice and other details will be shared to you for
                  confirmation. Accept the loan agreement to confirm your
                  purchase and Voila! you have purchased your Mi in just a few
                  mins!!
                </>
              }
            />
          </CardItem>
        </div>
      </Container>
    </SectionWrapper>
  );
};

export default MoneyComponent;
