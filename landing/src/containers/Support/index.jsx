import Box from "common/components/Box";
import Image from "common/components/Image";
import Container from "common/components/UI/ContainerTwo";
import { rgba } from "polished";
import React from "react";
import { Icon } from "react-icons-kit";
import { facebook } from "react-icons-kit/fa/facebook";
import { instagram } from "react-icons-kit/fa/instagram";
//import { social_media, emails } from "common/data/contact";
import { twitter } from "react-icons-kit/fa/twitter";
import { iosArrowThinRight } from "react-icons-kit/ionicons/iosArrowThinRight";
import { emails, helps, illustration, social_media } from "common/data/contact";
import Section, {
  Content,
  ContentWrapper,
  HelpBlock,
  Illustration,
} from "./support.style";
import Heading from "common/components/Heading";
import PropTypes from "prop-types";

const Support = () => {
  return (
    <Section>
      <Container>
        <ContentWrapper style={{ paddingTop: "50px" }}>
          <Content className="cont">
            <Heading
              as="h1"
              content={"Contact Us"}
              style={{ textAlign: "left", paddingTop: "20px" }}
            />

            {helps.map((help) => (
              <HelpBlock key={help.id}>
                <div className="icon">
                  <Image src={help.icon} alt={help.title} />
                </div>
                <div className="content">
                  <h4>
                    {help.title}{" "}
                    <Icon
                      icon={iosArrowThinRight}
                      size={30}
                      style={{ color: rgba("#0F2137", 0.3) }}
                    />
                  </h4>
                  {help.id == 1 ? (
                    <p>
                      For support kindly{" "}
                      <b>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.redcarpetup.rewardpay"
                          target="_blank"
                        >
                          Download
                        </a>
                      </b>{" "}
                      the app and Raise a ticket
                    </p>
                  ) : (
                    <p>{help.desc}</p>
                  )}
                </div>
              </HelpBlock>
            ))}
            <p className="fw-400">
              {emails.map((email, key) => (
                <span key={key}>
                  <b>{email.heading}: </b>
                  {email.email}
                  <br />
                </span>
              ))}
            </p>
            <Box className="fw-400">Follow Us:</Box>
            <Box className="social-links">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={social_media.twitter}
              >
                <Icon icon={twitter} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="social"
                href={social_media.facebook}
              >
                <Icon icon={facebook} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={social_media.instagram}
              >
                <Icon icon={instagram} />
              </a>
              {/* <a className="social-dribbble" href="#"><i className="fa fa-dribbble"></i></a> */}
            </Box>
          </Content>
          <Illustration>
            <Image
              src={illustration.image}
              style={{ maxHeight: "600px" }}
              alt=""
            />
          </Illustration>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

Support.propTypes = {
  row: PropTypes.object,

  col: PropTypes.object,
};

Support.defaultProps = {
  row: {
    flexBox: true,

    flexWrap: "wrap",

    ml: "-15px",

    mr: "-15px",

    alignItems: "center",
  },

  col: {
    width: ["33%", "33%", "33%", "16%"],
  },
};

export default Support;
