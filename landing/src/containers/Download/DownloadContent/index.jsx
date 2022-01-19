// import BigPicture from 'react-bigpicture'
import { closeModal, openModal } from "@redq/reuse-modal";
import Box from "common/components/Box";
import Button from "common/components/Button";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import Icon from "react-icons-kit";
import { play } from "react-icons-kit/entypo/play";
import { process } from "common/data/download";
import {
  PlayButton,
  VideoModal,
  VideoWrapper,
} from "../../Newsletter/newsletter.style";
import DownloadWrapper from "../download.style";
import TimelineSection from "./TimelineSection";

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
    <iframe title="Video" src={process.video} frameBorder="0" />
  </VideoWrapper>
);

const DownloadContent = ({ containerWidth, col, row }) => {
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
    <DownloadWrapper>
      <Box className={"contentMainSection"} style={{ marginTop: "-10%" }}>
        <Container>
          <Box {...containerWidth} style={{ margin: "3rem auto" }}>
            <header className={"contentHeader"}>
              <h2 className="head">{process.title}</h2>

              <p className="lead">{process.description}</p>
              <p>{process.description1}</p>
              <h4>
                <strong>{process.description2}</strong>
              </h4>
            </header>

            <Box className={"secondContainer"}>
              <Box className="row" {...row}>
                <Box className="col ma" {...col}>
                  <VideoModal>
                    <img src={process.image} alt="banner image" />
                    <PlayButton tabIndex="1000" onClick={handleVideoModal}>
                      <Icon icon={play} size={40} />
                    </PlayButton>
                  </VideoModal>
                </Box>

                <Box className="col ma" {...col}>
                  <TimelineSection />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </DownloadWrapper>
  );
};

DownloadContent.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

DownloadContent.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    alignItems: "center",
    margin: "0 auto",
    textAlign: "center",
  },
  col: {
    pr: "15px",
    pl: "15px",
    width: [1, "70%", "50%", "50%"],
    margin: "0 auto",
  },
  containerWidth: {
    width: [1, 1, "80%", "80%"],
    margin: "0 auto",
  },
};

export default DownloadContent;
