import { closeModal, openModal } from "@redq/reuse-modal";
import Box from "common/components/Box";
import Button from "common/components/Button";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import Icon from "react-icons-kit";
import { play } from "react-icons-kit/entypo/play";
import Fade from "react-reveal/Fade";
import BannerImage from "public/images/thumb16.png";
import NewsletterWrapper, {
  PlayButton,
  VideoModal,
  VideoWrapper,
} from "./newsletter.style";
import { newsletter } from "common/data/reset";

// close button for modal
const CloseModalButton = () => (
  <Button
    className="modalCloseBtn"
    variant="fab"
    onClick={() => closeModal()}
    icon={<i className="flaticon-plus-symbol" />}
  />
);

const ModalContent = () => (
  <VideoWrapper>
    <iframe title="Video" src={newsletter.video} frameBorder="0" />
  </VideoWrapper>
);

const Newsletter = ({ sectionWrapper, textArea, title, description }) => {
  const handleVideoModal = () => {
    openModal({
      config: {
        className: "video-modal",
        disableDragging: true,
        default: {
          width: "75%",
          height: "75%",
          x: 0,
          y: 0,
        },
      },
      component: ModalContent,
      componentProps: {},
      closeComponent: CloseModalButton,
      closeOnClickOutside: true,
    });
  };

  return (
    <Box {...sectionWrapper} as="section">
      <NewsletterWrapper>
        <Container>
          <Box {...textArea}>
            <Heading content={newsletter.title} {...title} />
            <Text
              content={newsletter.description}
              {...description}
              style={{ textAlign: "justify" }}
            />
          </Box>
          <Box>
            <Fade bottom>
              <VideoModal>
                <Image src={BannerImage} alt="banner image" />
                <PlayButton tabIndex="1000" onClick={handleVideoModal}>
                  <Icon icon={play} size={40} />
                </PlayButton>
              </VideoModal>
            </Fade>
          </Box>
        </Container>
      </NewsletterWrapper>
    </Box>
  );
};

Newsletter.propTypes = {
  sectionWrapper: PropTypes.object,
  textArea: PropTypes.object,
  buttonArea: PropTypes.object,
  buttonStyle: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
};

Newsletter.defaultProps = {
  sectionWrapper: {},
  textArea: {
    mb: ["40px", "40px", "40px", "0", "0"],
    pr: ["0", "0", "0", "80px", "100px"],
  },
  title: {
    fontSize: ["18px", "20px", "22px", "24px", "26px"],
    fontWeight: "500",
    color: "#fff",
    lineHeight: "1.34",
    mb: ["14px", "14px", "14px", "14px", "13px"],
    textAlign: ["center", "center", "center", "left", "left"],
    letterSpacing: "-0.025em",
  },
  description: {
    fontSize: ["14px", "14px"],
    maxWidth: ["100%", "400px"],
    fontWeight: "400",
    color: "#fefefe",
    lineHeight: "1.7",
    mb: 0,
    textAlign: ["center", "center", "center", "left", "left"],
  },
  buttonArea: {
    zIndex: 1,
  },
  buttonStyle: {
    type: "button",
    fontSize: "14px",
    fontWeight: "700",
    pl: "30px",
    pr: "30px",
  },
};

export default Newsletter;
