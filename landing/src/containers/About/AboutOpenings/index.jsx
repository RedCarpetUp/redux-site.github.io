import Button from "common/components/Button";
import Container from "common/components/UI/Container";
import Link from "next/link";
import React from "react";
import { jobs } from "common/data/about";
import image from "public/images/about/thumb12.jpg";
import AboutSection from "../about.style";

const AboutOpenings = () => {
  const { title, link_to, link_text } = jobs;

  return (
    <AboutSection>
      <section className="openingsDiv back">
        <Container className="openingsText">
          <h2 className="">
            <strong>{title}</strong>
          </h2>

          <Link href={link_to}>
            <Button title={link_text} style={{ borderRadius: "5px" }} />
          </Link>
        </Container>
      </section>
      <style JSX>
        {`

.back {

background: url('` +
          image +
          `') no-repeat;

}

`}
      </style>
    </AboutSection>
  );
};

export default AboutOpenings;
