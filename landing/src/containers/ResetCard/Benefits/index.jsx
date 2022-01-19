import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React from "react";
import Button from "common/components/Button";
import Link from "next/link";
import Zoom from "react-reveal/Zoom";
import { benefits } from "common/data/reset";
import { SectionHeader } from "public/styles/appClassic.style";
import SectionWrapper from "./benefits.style";

const KeyFeatures = () => {
  const { title, description1, description2, icon } = benefits;

  return (
    <SectionWrapper id="keyFeatures">
      <Container>
        <SectionHeader style={{ maxWidth: "452px" }}>
          <Zoom>
            <Heading content={title} />
          </Zoom>
        </SectionHeader>
        <div className="row">
          <Link href="/login">
            <Button
              title="Apply"
              style={{ borderRadius: "5px" }}
              className="btn"
            />
          </Link>
        </div>
        <Text as="h3" content={description1} />
        <div className="rbi">
          <table align="center">
            <tr>
              <td>
                <Image src={icon} height="16px" width="16px" />
              </td>
              <td>{description2}</td>
            </tr>
          </table>
        </div>
      </Container>
    </SectionWrapper>
  );
};

export default KeyFeatures;
