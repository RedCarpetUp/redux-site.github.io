import React from "react";
import Heading from "common/components/Heading";
import ContentWrapper from "./events.style";

import CardTransaction from "./CardTransaction";
import AccrueInterest from "./AccrueInterest";
import BillGeneration from "./BillGeneration";

const Events = () => {
  return (
    <ContentWrapper>
      <Heading className="Heading" content="Processes" />
      <CardTransaction />
      <BillGeneration />
      <AccrueInterest />
    </ContentWrapper>
  );
};

export default Events;
