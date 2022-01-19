import React, { Fragment } from "react";
import WaitListWrapper from "./styles";
import Celebrate from "public/images/mi-store/celebrate.svg";
import { reload } from "react-icons-kit/iconic/reload";
import Button from "common/components/Button";
import AnchorLink from "react-anchor-link-smooth-scroll";

const WaitList = ({ getUserStatus }) => {
  return (
    <Fragment>
      <WaitListWrapper>
        <div className="row-left">
          <div className="col30">
            <hr className="line" />
          </div>
          <div className="col70">Application Submitted</div>
        </div>
        <center>
          <img src={Celebrate} style={{ marginTop: "5%" }} />
        </center>
        <div class="row">
          <h4>
            <span className="cong">Congratulations</span>{" "}
          </h4>
          <p style={{ marginBottom: "5%", marginTop: 0 }}>
            You have unlocked the priority access to your merchant status. Thank
            you for joining us on this journey. We assure you, this is going to
            be the most rewarding experience. We will update you soon on your
            status.
          </p>
          <AnchorLink href="#scroll-up">
            <Button
              title="Refresh"
              isMaterial="true"
              className="btn btn-full"
              onClick={getUserStatus}
            />
          </AnchorLink>
        </div>
        <br />
      </WaitListWrapper>
    </Fragment>
  );
};

export default WaitList;
