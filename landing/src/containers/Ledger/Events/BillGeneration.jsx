import React from "react";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Image from "common/components/Image";
import { angleDoubleRight } from "react-icons-kit/fa/angleDoubleRight";
import { SectionWrapper } from "./events.style";
import Icon from "react-icons-kit";
import { useState } from "react";
import { useEffect } from "react";

const BillGeneration = () => {
  const [isMobileView, setMobileView] = useState();
  useEffect(() => {
    setMobileView(
      window.innerWidth <= 1220 ? (window.innerWidth <= 1000 ? 25 : 30) : 45
    );
  }, []);
  return (
    <SectionWrapper>
      <Heading
        className="Heading-1"
        content="Generating the monthly statement"
      />
      <Text
        className="Content"
        content={`
            Just like how in credit cards, a monthly statement gets generated 
            showing debits and credits from the previous month, the same gets 
            done in this step. This happens on the 1st of every month. We list 
            all the transactions, charges, refunds, and payments from last month 
            and show them in a statement. The statement also contains details like 
            the minimum amount to pay, due date, and the maximum amount to pay to 
            avoid interest (before the due date).
        `}
      />
      <div
        style={{ marginTop: "50px", marginBottom: "80px" }}
        className="codeBox-Container"
      >
        <div className="code-items">
          <Image src="/images/ledger/bill_generation/code-1.png" />
          <Image src="/images/ledger/bill_generation/code-2.png" />
          <Image src="/images/ledger/bill_generation/code-3.png" />
        </div>
        <div>
          <Icon size={isMobileView} icon={angleDoubleRight} />
        </div>
        <div className="block-items">
          <Image src="/images/ledger/bill_generation/block.png" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BillGeneration;
