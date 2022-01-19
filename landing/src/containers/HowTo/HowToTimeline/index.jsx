import Box from "common/components/Box";
import Image from "common/components/Image";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { cardreload, history } from "common/data/how_to";
import HowtoContainer from "../HowTo.style";

const HowtoTimeline = ({ row, col }) => {
  return (
    <>
      <HowtoContainer>
        <section className="section">
          <Box>
            <Container className={"timelineContainer"}>
              <header className="section-header">
                <h2>{history.title}</h2>
                <hr />
              </header>

              <Box className="row" {...row}>
                <Box className={"col timelineCol"} {...col}>
                  <ol className="timeline">
                    {history.events.map((event, key) => (
                      <li className="timeline-item" key={key}>
                        <h4>{event.title}</h4>
                        <p>
                          <Image src={event.image} alt={event.title} />
                        </p>
                        <p>{event.description}</p>
                      </li>
                    ))}
                  </ol>
                </Box>
              </Box>
            </Container>
          </Box>
        </section>

        {/* Card Reload */}
        <section className="section">
          <Box>
            <Container className="timelineContainer">
              <header className="section-header">
                <h2>{cardreload.title}</h2>
                <hr />
              </header>

              <Box className="row" {...row}>
                <Box className={"col timelineCol"} {...col}>
                  <ol className="timeline">
                    {cardreload.events.map((event, key) => (
                      <li className="timeline-item" key={key}>
                        <h4>{event.title}</h4>
                        <p>
                          <Image src={event.image} alt="..." />
                        </p>
                        <p>{event.description}</p>
                      </li>
                    ))}
                  </ol>
                </Box>
              </Box>
            </Container>
          </Box>
        </section>
      </HowtoContainer>
    </>
  );
};

HowtoTimeline.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

HowtoTimeline.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    alignItems: "center",
  },
  col: {
    pr: "15px",
    pl: "15px",
    width: ["80%", "80%", "60%", "60%"],
    margin: "0 auto",
  },
};
export default HowtoTimeline;
