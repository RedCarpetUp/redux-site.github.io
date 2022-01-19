import Box from "common/components/Box";
import Image from "common/components/Image";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
// import BigPicture from 'react-bigpicture'
import { heading, images, videos } from "common/data/how_to";
import { VideoWrapper } from "../../Newsletter/newsletter.style";
import HowtoContainer from "../HowTo.style";

const HowtoContent = ({ row, col, row1 }) => {
  return (
    <HowtoContainer>
      <Box>
        <section style={{ background: "#fafbfb" }}>
          <Container>
            <Box className={"row contentVideosDiv ma`"} {...row1}>
              {videos.map((video, key) => (
                <Box className={"col videoDiv"} {...col} key={key}>
                  <div className="video-btn-wrapper">
                    {/* <Image
                      className="ma"
                      src={video.thumb}
                      alt="..."
                    />
                    <LBigPicture type="youtube" src={video.url}>
                      <button
                        className="btn btn-circle btn-danger"
                        style={{ color: "#fff" }}
                      >
                        <i className="fa fa-play"></i>
                      </button>
                    </LBigPicture> */}
                    <VideoWrapper>
                      <Image className="ma" src={video.thumb} alt="..." />
                      <iframe
                        title={video.title}
                        src={video.url}
                        frameBorder="0"
                      />
                    </VideoWrapper>
                  </div>
                  <br />
                  <h6>
                    <AnchorLink href="#">{video.title}</AnchorLink>
                  </h6>
                </Box>
              ))}
            </Box>
          </Container>
        </section>

        <section className="section" id="section1">
          <Box>
            <Container className="howToTellDiv">
              <header className="section-header">
                <h2>{heading.header}</h2>
                <hr />
                <p className="lead">{heading.line}</p>
              </header>

              <Box className="row" {...row}>
                <Box className="col" {...col}>
                  <p className="feature-icon">
                    <img src={images.ruby} alt={heading.rubyline} />
                  </p>
                  <h5>{heading.rubyline}</h5>
                </Box>
                <Box className="col" {...col}>
                  <p className="feature-icon">
                    <img src={images.zeta} alt={heading.zetaheading} />
                  </p>
                  <h5>{heading.zetaline}</h5>
                </Box>
              </Box>
            </Container>
          </Box>
        </section>
      </Box>
    </HowtoContainer>
  );
};

HowtoContent.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

HowtoContent.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    alignItems: "center",
  },
  row1: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    alignItems: "center",
    width: ["80%", "80%", "70%", "70%"],
  },
  col: {
    pr: "15px",
    pl: "15px",
    width: [1, 1, "50%", "50%"],
    margin: "0 auto",
  },
};

export default HowtoContent;
