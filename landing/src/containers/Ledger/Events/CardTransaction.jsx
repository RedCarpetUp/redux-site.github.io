import React, { useEffect, useState } from "react";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Image from "common/components/Image";
import { SectionWrapper } from "./events.style";
import Icon from "react-icons-kit";
import { angleDoubleRight } from "react-icons-kit/fa/angleDoubleRight";

const CardTransaction = () => {
  const [isMobileView, setMobileView] = useState();
  useEffect(() => {
    setMobileView(
      window.innerWidth <= 1220 ? (window.innerWidth <= 1000 ? 25 : 30) : 45
    );
  }, []);
  return (
    <SectionWrapper>
      <Heading className="Heading-1" content="Doing a card transaction." />
      <Text
        className="Content-1"
        content={
          <>
            A card transaction process involves a couple of events which get
            triggered before the actual transaction event. Let’s take a look at
            them.
          </>
        }
      />
      <div style={{ marginTop: "50px", marginBottom: "80px" }}>
        <Heading
          className="Heading-2"
          content={"Funds received from the Lender"}
        />
        <Text
          className="Content-1"
          content={
            <>
              Lender transfers the funds to a Nodal account. This account is
              usually managed by the bank’s issuer processor. We use these funds
              to load money into cards for the transaction to happen.
            </>
          }
        />
        <div style={{ margin: "50px 0" }} className="codeBox-Container">
          <div className="card-code-items">
            <Image src="/images/ledger/card_transaction/code-1.png" />
          </div>
          <div>
            <Icon size={isMobileView} icon={angleDoubleRight} />
          </div>
          <div className="card-block-items">
            <Image src="/images/ledger/card_transaction/block-1.png" />
          </div>
        </div>
        <Heading
          className="Heading-2"
          content={"Loading the customer’s card"}
        />
        <Text
          className="Content-1"
          content={
            <>
              Before a transaction can be processed the card needs to have some
              balance in it. Depending on what process of money load you follow,
              this step can either be JIT (Just in time) load at the time of
              transaction happening or beforehand. Here we are showing the
              beforehand load.
            </>
          }
        />
        <Text
          className="Content-1"
          content={
            <>
              This event loads up the balance account in Ledger and reduces the
              money from the Nodal account. At this point we will also call the
              APIs of the bank’s issuer processor to actually move the money to
              the card.
            </>
          }
        />
        <div
          style={{ marginTop: "50px", marginBottom: "25px" }}
          className="codeBox-Container"
        >
          <div className="card-code-items">
            <Image src="/images/ledger/card_transaction/code-2.png" />
          </div>
          <div>
            <Icon size={isMobileView} icon={angleDoubleRight} />
          </div>
          <div className="card-block-items">
            <Image src="/images/ledger/card_transaction/block-2.png" />
          </div>
        </div>
        <Text
          className="Content"
          style={{ marginBottom: "50px" }}
          content={
            <>
              As can be seen, the prepaid card’s balance became 10,000 and the
              Nodal account’s balance got reduced by the same.
            </>
          }
        />
        <Heading className="Heading-2" content={"Card transaction"} />
        <Text
          className="Content-1"
          content={
            <>
              Now that we have money in the card, it can be used to do
              transactions on e-commerce websites, POS machines or ATMs.
              <br />
              In this entry, we have debited the user’s loan account and reduced
              the card balance by the same amount.
            </>
          }
        />
        <div
          style={{ marginTop: "50px", marginBottom: "25px" }}
          className="codeBox-Container"
        >
          <div className="card-code-items">
            <Image src="/images/ledger/card_transaction/code-3.png" />
          </div>
          <div>
            <Icon size={isMobileView} icon={angleDoubleRight} />
          </div>
          <div className="card-block-items">
            <Image src="/images/ledger/card_transaction/block-3.png" />
          </div>
        </div>
        <Text
          className="Content"
          content="At redcarpet whenever the transaction is made by the user through his/her card a disbursement takes place in the user's CF (Card Facility) account. i.e  A disbursement happens on the CF account by debiting it every time the customer uses their card to do a transaction. These transactions can happen on websites, POS machines, and ATMs."
        />
      </div>
    </SectionWrapper>
  );
};

export default CardTransaction;
