import React from "react";
import { campusleaderTimeline } from "common/data/campus_leader";
import DesignAndBuilt from "../../DesignAndBuilt";
import PromotionBlock from "../../PromotionBlock";

const CampusLeaderTimeline = () => {
  return campusleaderTimeline.map((e, i) => {
    if (i % 2 != 0) {
      return <DesignAndBuilt option={e} />;
    } else {
      return <PromotionBlock option={e} />;
    }
  });
};

export default CampusLeaderTimeline;
