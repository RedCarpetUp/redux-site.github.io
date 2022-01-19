import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { download, downloads } from "common/data/download";
import DownloadWrapper from "../download.style";

const DownloadBanner = ({ row, col }) => {
  return (
    <DownloadWrapper>
      <Box className={"banner"} style={{ backgroundColor: "#fafbfb" }}>
        <Container>
          <h2 className="text-center">{download.title}</h2>
          <br />
          <br />
          <br />

          <Box className="row" {...row}>
            {downloads.map((d, key) => (
              <Box className="col" {...col} key={key}>
                <Box className="">
                  <h1 className="">{d.title}</h1>
                  <br />
                  <a
                    style={{ color: "#c3c3c3", border: "1px solid #c3c3c3" }}
                    className="btn btn-round btn-outline-light w-200"
                    href={d.link}
                    download
                  >
                    {d.link_text}
                  </a>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </DownloadWrapper>
  );
};

DownloadBanner.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

DownloadBanner.defaultProps = {
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
    width: [1, 1, "50%", "50%"],
  },
};

export default DownloadBanner;
