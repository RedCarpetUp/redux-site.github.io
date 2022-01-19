import React from "react";
import { value } from "common/data/career";
import CareerSection from "../careers.style";
import DesignAndBuilt from "./DesignAndBuilt";

const CareerValues = ({ row, col }) => {
  return (
    <CareerSection>
      <div className="backimg">
        <DesignAndBuilt option={value} />
      </div>
    </CareerSection>
  );
};

export default CareerValues;
