import Box from "common/components/Box";
import Image from "common/components/Image";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { Icon } from "react-icons-kit";
import { check } from "react-icons-kit/fa/check";
import { Fade, Slide } from "react-reveal";
import { block1, block2, block3, block4 } from "common/data/sa";
import SaSection from "../sa.style";
import SAContentWrapper from "./saContentSection.style";

const SAContent = ({
  row,
  col,
  colb1,
  colb11,
  colb2,
  colb22,
  imageWrapper,
  b1image,
}) => {
  return (
    <SaSection>
      <section>
        <main className="main-content">
          {/* block 1 */}
          <Box style={{ backgroundColor: "#f64d62" }}>
            <Container className="block1Container">
              <Box className="row" {...row}>
                <Box className="col" {...colb1}>
                  <small>{block1.question}</small>
                  <h2 className="head">{block1.title}</h2>
                  <p className="lead">{block1.description}</p>
                  <hr />

                  <Box className="row" {...row}>
                    {block1.features.map((feature, key) => (
                      <Box {...col} className="col benefitsDiv" key={key}>
                        <p>{feature.title}</p>
                        <ul>
                          {feature.description.map((f, key) => (
                            <li key={key} style={{ marginLeft: "1.5rem" }}>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box className={"col centerImage"} {...colb11}>
                  <Fade up>
                    <Image
                      src={block1.image}
                      alt="..."
                      className="block-image"
                    />
                  </Fade>
                </Box>
              </Box>
            </Container>
          </Box>

          {/* block 2 */}
          <SAContentWrapper style={{ background: "#fafbfb" }}>
            <Container>
              <Box className={"row block1Row"} {...row}>
                <Box className={"col block1Col order2"} {...colb2}>
                  <small>{block2.question}</small>
                  <h2 className="head">{block2.title}</h2>
                  <p>{block2.description}</p>

                  <Box className="row" {...row}>
                    {block2.features.map((feature, key) => (
                      <Box className={"col blockFeatures"} {...col} key={key}>
                        <h5>{feature.title}</h5>
                        <ul>
                          {feature.description.map((f, key) => (
                            <li key={key}>{f}</li>
                          ))}
                        </ul>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box className={"col centerImage order1"} {...colb22}>
                  <Slide left>
                    <img
                      style={{ maxHeight: "20rem" }}
                      {...imageWrapper}
                      src={block2.image}
                      alt="..."
                    />
                  </Slide>
                </Box>
              </Box>
            </Container>
          </SAContentWrapper>

          {/* block 3 */}
          <SAContentWrapper>
            <Container>
              <Box className="row" {...row}>
                <Box className="col" {...colb2}>
                  <small>{block3.question}</small>
                  <h2 className="head">{block3.title}</h2>
                  <p className="lead">{block3.description}</p>
                  <br />

                  <Box className="row" {...row}>
                    {block3.features.map((feature, key) => (
                      <Box className={"col blockFeatures"} {...col} key={key}>
                        {/* <i className="fa fa-tv text-primary lead-4 mb-5"></i> */}
                        <h6 style={{ textTransform: "uppercase" }}>
                          {feature.title}
                        </h6>
                        <ul>
                          {feature.description.map((d, key) => (
                            <li className="fs-14" key={key}>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box className={"col centerImage"} {...colb22}>
                  <Slide right>
                    <img
                      style={{ maxHeight: "20rem" }}
                      {...imageWrapper}
                      className="shadow-3"
                      src={block3.image}
                      alt="..."
                    />
                  </Slide>
                </Box>
              </Box>
            </Container>
          </SAContentWrapper>

          {/* block 4 */}
          <SAContentWrapper style={{ background: "#fafbfb" }}>
            <Container>
              <Box className="row" {...row}>
                <Box className={"col order2"} {...colb2}>
                  <small>{block4.question}</small>
                  <h2 className="head">{block4.title}</h2>
                  <p className="lead mb-7">{block4.description}</p>

                  {block4.features.map((feature, key) => (
                    <Box className={"blockFeatures"} key={key}>
                      <Icon
                        icon={check}
                        style={{
                          color: "#3cd458",
                          fontSize: ".9375rem",
                          marginRight: ".5rem",
                        }}
                      ></Icon>
                      <span className="fs-14">{feature.title}</span>
                      <ul>
                        {feature.description.map((d, key) => (
                          <li style={{ marginLeft: "3rem" }} key={key}>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </Box>
                  ))}
                </Box>

                <Box className={"col order1 centerImage"} {...colb22}>
                  <Slide left>
                    <img
                      style={{ maxHeight: "30rem" }}
                      {...imageWrapper}
                      className="shadow-3"
                      src={block4.image}
                      alt="..."
                    />
                  </Slide>
                </Box>
              </Box>
            </Container>
          </SAContentWrapper>
        </main>
      </section>
    </SaSection>
  );
};

SAContent.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

SAContent.defaultProps = {
  textArea: {
    width: ["100%", "100%", "30%", "30%"],
    ml: [0, 0, 0],
  },
  imageWrapper: {
    boxShadow: "none",
    flexDirection: "row",
    ml: ["auto", "auto"],
    width: ["100%", "70%", "70%"],
  },
  b1image: {
    width: [1, 1, "30%"],
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    alignItems: "center",
    // width: 1,
  },
  col: {
    pr: "15px",
    pl: "15px",
    flex: "0 0 50%",
    maxWidth: ["50%", "50%", "50%", "50%"],
    margin: "0 auto",
  },
  colb1: {
    pr: "15px",
    pl: "15px",
    width: [1, 1, "50%", "50%"],
    margin: "0 auto",
  },
  colb11: {
    pr: "15px",
    pl: "15px",
    width: [1, 1, "50%", "50%"],
    margin: "0 auto",
  },
  colb2: {
    pr: "15px",
    pl: "15px",
    width: [1, 1, "66%", "66%"],
    margin: "0 auto",
  },
  colb22: {
    pr: "15px",
    pl: "15px",
    width: [1, 1, "34%", "34%"],
    margin: "0 auto",
    textAlign: "center",
  },
  col2: {
    pr: "15px",
    pl: "15px",
    width: [1, 1, "50%", "50%"],
    margin: "0 auto",
  },
};

export default SAContent;
