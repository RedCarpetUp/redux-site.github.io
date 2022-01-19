import React from "react";
import Heading from "common/components/Heading";
import Image from "common/components/Image";
import Text from "common/components/Text";
import ContentWrapper from "./creditReport.style";

import icon from "public/images/credit/Credit-Report.jpg";

const CreditReport = () => {
  return (
    <ContentWrapper>
      <Heading
        style={{ color: "#dd285d" }}
        className="Heading"
        content="What is a credit report?"
      />

      <Image className="image-top" src={icon} alt="Built Logo" />

      <div className="row">
        <div className="col-50">
          <Heading className="Heading-2" content="Credit Information Report" />
          <Text content="A credit report(CIR) is a detailed breakdown of an individual's credit history prepared by a credit bureau." />
          <Text
            style={{ marginBottom: "0" }}
            content="Major information that you will get on your CIR report provided by credit bureau companies are:"
          />
          <p style={{ color: "rgb(79, 83, 98)", fontWeight: "600" }}>
            1. Credit Score <br />
            2. Employment Imformation <br />
            3. Account Information
          </p>
          <Text
            content=" It will have the necessary details of your credit types which
            include the loan amount, credit facilities, ownership details, date of last payment, account numbers, current balance, 
            date opened, month-by-month record of all the payments made up to a period of three years, as well as the name of lenders."
          />
        </div>
        <div className="col-50">
          <Image className="image-side" src={icon} alt="Built Logo" />
        </div>
      </div>

      <Text
        className="highlight"
        style={{ marginTop: "30px" }}
        content="Important terms in your credit report:"
      />

      <p style={{ margin: "0" }}>
        <span className="highlight">AMOUNT OVERDUE -</span> Indicates the total
        amount that has not been paid to the lender in a timely fashion
      </p>
      <p style={{ margin: "0" }}>
        <span className="highlight">CASH LIMIT -</span> Applies to credit cards
        specifically. It is the amount of cash you are permitted to withdraw
        from your credit card.
      </p>
      <p style={{ margin: "0" }}>
        <span className="highlight">CREDIT LIMIT -</span> It reflects the total
        amount of credit you have access to with regard to your credit card.
      </p>
      <p style={{ margin: "0" }}>
        <span className="highlight">SANCTIONED AMOUNT -</span> Sanctioned amount
        is that amount which has been approved by our lender for a particular
        user. It is not the user's credit limit. After lender sanctions a
        particular amount we provide a credit limit which can be less than or
        equal to the sanctioned amount. Normally we provide a lesser credit
        limit. Users can get the full sanctioned amount in a period of time
        based on their repayment behaviour.
      </p>
      <p style={{ margin: "0" }}>
        <span className="highlight">DPD(DAYS PAST DUE) -</span> It indicates how
        many days a payment on that account is late that month.
      </p>

      <p style={{ marginTop: "50px" }} className="highlight">
        Frequently Asked Questions
      </p>
      <p style={{ marginBottom: "0" }} className="highlight">
        1. What is Sanctioned amount?
      </p>
      <p style={{ marginTop: "0" }}>
        Answer: Sanctioned amount is that amount which has been approved by our
        lender. This can be lesser than or equal to your credit limit. The
        sanctioned amount can be approved as credit limit in a period of time.
      </p>
      <p style={{ marginBottom: "0" }} className="highlight">
        2. Is high sanction limit a good thing? Why?
      </p>
      <p style={{ marginTop: "0" }}>
        Answer: Yes, ofcourse it's a good thing. It proves that you are
        credit-worthy and will repay on time. A high sanction limit insures that
        you will be getting a high credit limit after proving your worth with
        good payment behaviour.
      </p>
      <p style={{ marginBottom: "0" }} className="highlight">
        3. Is it okay to set higher sanction limit to CIBIL but be given lower
        credit limit?
      </p>
      <p style={{ marginTop: "0" }}>
        Answer: It's okay to set higher sanction limit which will prove that you
        are credit-worthy. A high sanction limit doesn't prove that you have
        taken up a loan. It proves that you can avail a loan of upto that
        amount. Your credit limit will gradually increase with good payment
        behaviour. It's a way of risk evaulaton for the internal team and a
        trust gaining process after a point of which you will get a credit limit
        equal to your sanction amount.
      </p>
      <p style={{ marginBottom: "0" }} className="highlight">
        4. Is this not fraud?
      </p>
      <p style={{ marginTop: "0" }}>
        Answer: Absolutely not as it is a way of banking sectors to evaulate
        risk for a customer. For the initial months your repayment behaviour is
        tracked and monitored. If your repayment behaviour reaches a good
        benchmark then your sanction limit as well as your credit limit will
        increase.
      </p>
      <p style={{ marginBottom: "0" }} className="highlight">
        5. Is a low sanction limit good for you?
      </p>
      <p style={{ marginTop: "0" }}>
        Answer: A low sanction limit doesn't mean the end of the world. After
        proving your credit worthiness with timely payments your sanction limit
        will increase gradually. You may also get a credit limit equal to your
        sanction limit in future with good payment behaviour.
      </p>
      <p style={{ marginBottom: "0" }} className="highlight">
        6. Does a sanction limit showing up in your CIBIL Score means that you
        have taken up a loan?
      </p>
      <p style={{ marginTop: "0" }}>
        Answer: No it doesn't mean you have a outstanding loan. It means that
        you have been approved for a loan/credit card by a financial
        institution.
      </p>

      <p
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "40px",
          fontSize: "18px",
        }}
      >
        <span className="highlight">Get your credit report on </span>
        <a href="https://www.equifax.com/personal/" target="_blank">
          https://www.equifax.co.in/
        </a>
        <span className="highlight"> or </span>
        <a href="https://www.cibil.com/freecibilscore" target="_blank">
          https://www.cibil.com/freecibilscore
        </a>
      </p>
    </ContentWrapper>
  );
};

export default CreditReport;
