import React, { useEffect, useState } from "react";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Image from "common/components/Image";
import { SectionWrapper } from "./events.style";
import Icon from "react-icons-kit";
import { angleDoubleRight } from "react-icons-kit/fa/angleDoubleRight";

const AccrueInterest = () => {
  const [isMobileView, setMobileView] = useState();
  useEffect(() => {
    setMobileView(
      window.innerWidth <= 1220 ? (window.innerWidth <= 1000 ? 25 : 30) : 45
    );
  }, []);
  return (
    <SectionWrapper>
      <Heading className="Heading-1" content="Accrual of financial charges" />
      <Text
        className="Content"
        content="In accounting accrued interests are generally computed and recorded at the end of a specific accounting period as adjusting journal entries used in accrual-based accounting. Interest gets accrued the next day after the due date. The due date is set to the 15th of every month for all loans."
      />
      <div
        style={{ marginTop: "50px", marginBottom: "80px" }}
        className="codeBox-Container"
      >
        <div className="code-items">
          <Image src="/images/ledger/accrue_interest/code-1.png" />
          <Image src="/images/ledger/accrue_interest/code-2.png" />
        </div>
        <div>
          <Icon size={isMobileView} icon={angleDoubleRight} />
        </div>
        <div className="block-items">
          <Image src="/images/ledger/accrue_interest/block.png" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AccrueInterest;
