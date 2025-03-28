import React from "react";
import { benefits } from "common/data/personal_loan";
import DesignAndBuilt from "../../DesignAndBuilt";
import PromotionBlock from "../../PromotionBlock";

const PersonalLoanContent = () => {
  return benefits.map((e, i) => {
    if (i % 2 != 0) {
      return <DesignAndBuilt option={e} />;
    } else {
      return <PromotionBlock option={e} />;
    }
  });
};

export default PersonalLoanContent;
