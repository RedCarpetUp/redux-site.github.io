import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Container from "common/components/UI/Container";
import { SectionWrapper } from "./winners.style";
import { winners } from "common/data/ratings";

const Winners = () => {
  return (
    winners.length && (
      <SectionWrapper>
        <Container>
          <Heading className="heading" content={`This Week’s Winners`} />
          <div className="flex-section">
            {winners.map((e, i) => (
              <div key={i} className="flex-items">
                <Image className="center-it" alt={"profile"} src={e.image} />
                <Heading content={e.name} />
              </div>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    )
  );
};

export default Winners;
