import React from "react";
import { smartCard } from "common/data/cards";
import DesignAndBuilt from "../../DesignAndBuilt";
import PromotionBlock from "../../PromotionBlock";

const Content = () => {
  return smartCard.map((e, i) => {
    if (i % 2 != 0) {
      return <PromotionBlock option={e} />;
    } else {
      return <DesignAndBuilt option={e} />;
    }
  });
};

export default Content;
