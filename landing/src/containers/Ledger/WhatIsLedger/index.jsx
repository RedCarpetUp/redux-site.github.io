import React from "react";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import ContentWrapper from "./whatIsLedger.style";

const WhatIsLedger = () => {
  return (
    <ContentWrapper>
      <Heading className="Heading" content="What is a ledger?" />
      <Text
        className="Content"
        content={
          <>
            Ledger is a fully managed loan system to get your started with your
            next big (or small) FinTech idea. It includes an immutable double
            entry ledger that takes care of all your accounting variables,
            payments, settlements, charges etc. Along with the support for
            managing multiple instruments (card, UPI, tokenization) and lenders.
          </>
        }
      />
      <Text
        className="Content"
        content={
          <>
            Loan systems can get complex. Gateway webhooks can fail. Resulting
            in customer’s payments getting delayed. Resulting in wrongful late
            fee applications. Resulting in people outside your office willing to
            low-key beat you up. And even if you somehow make it through, the
            trouble isn’t all over. Your lender, who still functions on medieval
            technology, expects you to support its data APIs in an absurdly
            peculiar format. By API we mean an Excel sheet.
          </>
        }
      />
      <Text
        className="Content"
        content={
          <>
            Ledger handles all of that for you. It was made after several
            iterations and learnings of 5 years at RedCarpet and now we are
            sharing it with the world.
          </>
        }
      />
      {/* <Text
        className="Content"
        content="A ledger is an append-only database that implements a specific set of tables, relations, validation rules, and indexes to make it useful for tracking money."
      />
      <Text
        className="Content"
        content={
          <>
            Logically, a ledger is a hierarchy of accounts (called
            <span className="Highlight"> ledger accounts </span>
            to distinguish them from bank accounts), which contain{" "}
            <span className="Highlight"> ledger lines </span>
            that record movements in and out of the account. The hierarchy of
            accounts (called a Chart of Accounts by accountants) is split into
            two layers (wealth and momentum), each of which splits into two
            categories:
          </>
        }
      />
      <Text
        className="Content"
        content="In a double-entry ledger the net amount of money across both layers is always 0, so every change to a ledger must either:"
      />
      <Text
        className="Content"
        content={
          <ul>
            <li>
              contain ledger lines that add up to no net change to wealth
              accounts
            </li>
            <li>
              or if there is a net change to wealth accounts, then it must
              include ledger lines that change momentum accounts the same amount
            </li>
          </ul>
        }
      />
      <Text className="Content" content={``} />
      <Text
        className="Content"
        content={
          <>
            Since ledgers are append-only, you can think of every change to a
            ledger made up of ledger lines like a database transaction that
            touches multiple tables - that database transaction is called a{" "}
            <span className="Highlight"> ledger entry </span>.
          </>
        }
      /> */}
    </ContentWrapper>
  );
};

export default WhatIsLedger;
