import Box from "common/components/Box";
import Container from "common/components/UI/Container";
import PropTypes from "prop-types";
import React from "react";
import { Icon } from "react-icons-kit";
import { facebook } from "react-icons-kit/fa/facebook";
import { instagram } from "react-icons-kit/fa/instagram";
import { twitter } from "react-icons-kit/fa/twitter";
import { data, map } from "common/data/location";
import LocationContainer from "../location.style";

export default function LoctionPage({ row, col }) {
  return (
    <LocationContainer>
      <Box style={{ paddingTop: "50px" }}>
        <Container className="mainContaine">
          <Box className="row" {...row}>
            <div className="col" {...col}>
              <p>{data.topLine}</p>
              <h4>{data.headers.header1}</h4>
              {data.block1.map((line, key) => (
                <p key={key}>{line}</p>
              ))}
              <h4>{data.headers.header2}</h4>
              {data.block2.map((line, key) => (
                <p key={key}>{line}</p>
              ))}
            </div>

            <div className="col" {...col}>
              <hr className="d-lg-none" />
              <h3>Find Us</h3>
              <br />
              <p>
                {data.address.line1}
                <br />
                {data.address.line2}
                <br />
                {data.gst.label}
                {data.gst.gst_number}
                <br />
                <br />
                {data.mailing_office.label}
                <br />
                {data.mailing_office.address.line1}
                <br />
                {data.mailing_office.address.line2}
              </p>

              <div className="fw-400">Follow Us</div>
              <div className="social-links">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-twitter"
                  href={data.social_media.twitter}
                >
                  <Icon icon={twitter} />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-facebook"
                  href={data.social_media.facebook}
                >
                  <Icon icon={facebook} />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-instagram"
                  href={data.social_media.instagram}
                >
                  <Icon icon={instagram} />
                </a>
              </div>
            </div>
          </Box>
        </Container>
      </Box>
      <header>
        <div className="google-map">
          <iframe
            src={`https://maps.google.com/maps?q=${map.lat},${map.lang}&ie=UTF8&t=&z=16&iwloc=A&output=embed`}
            width="100%"
            height="500px"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
        {/* <div className="h-500" data-provide="map" data-lat={map.lat} data-lng={map.lang} data-marker-lat={map.lat} data-marker-lng={map.lang} data-info={"<h6>Our office</h6><p>" +map.add+"</p>"} data-style="light" data-remove-controls="true"></div> */}
      </header>
    </LocationContainer>
  );
}

LoctionPage.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

LoctionPage.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: "wrap",
    ml: "-15px",
    mr: "-15px",
    alignItems: "center",
    width: [1, 1, 1, 1],
    margin: "0 auto",
    textAlign: "center",
  },
  col: {
    pr: "15px",
    pl: "15px",
    width: [1, "70%", "50%", "60%"],
  },
};
