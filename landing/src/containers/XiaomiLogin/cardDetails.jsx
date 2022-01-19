import React from "react";

import XiaomiCardDetails from "./XiaomiCardDetails";

const CardDetails = ({ phone, accessToken, hasXiaomiCard }) =>
  hasXiaomiCard ? (
    <XiaomiCardDetails phone={phone} accessToken={accessToken} />
  ) : null;

export default CardDetails;
