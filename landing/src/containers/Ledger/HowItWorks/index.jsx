import ContentWrapper from "./howItWorks.style";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import { useRef } from "react";

const HowItWorks = () => {
  const bookSection = useRef();
  const gotoBookAccount = (e) => {
    e.preventDefault();
    bookSection.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <ContentWrapper>
      <Heading className="Heading" content="How does it work?" />
      <div>
        <Heading className="Heading-1" content="Events" />
        <Text
          className="Content"
          content={
            <>
              Everything is associated with an event in the Ledger. Primarily,
              an event contains the metadata related to the event, time of the
              event and the time at which it got processed.
            </>
          }
        />
        <table className="compress">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Meta Data</th>
              <th>Post Date</th>
              <th>Amount</th>
              <th>Processed at</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Event Name">Card Transaction</td>
              <td data-label="Meta Data">
                <code>{"{“swipe_id”: 321}"}</code>
              </td>
              <td data-label="Post Date">2021-11-20 11:43:23</td>
              <td data-label="Amount">100</td>
              <td data-label="Processed At">2021-11-20 11:43:23</td>
            </tr>
          </tbody>
        </table>
        <Text
          className="Content"
          content={
            <>
              The above event signifies a card transaction worth rupees 100.
              Metadata can be anything which can help you identify a particular
              event. In this case it’s an id of a table where the raw
              transaction data is stored.
            </>
          }
        />
      </div>
      <div>
        <Heading className="Heading-1" content={`Ledger entry`} />
        <Text
          className="Content"
          content={
            <>
              Each event can have multiple ledger entries linked to it. A ledger
              entry signifies the actual movement of money between accounts.
            </>
          }
        />
        <Text
          className="Content"
          content={
            <>
              Let’s take a look at the corresponding ledger entry for the
              aforementioned event.
            </>
          }
        />
        <table className="compress">
          <thead>
            <tr>
              <th>Credit account</th>
              <th>Debit account</th>
              <th>Amount</th>
              <th>Credit account balance</th>
              <th>Debit account balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Credit account">26346/loan/card_balance/a</td>
              <td data-label="Debit account">56345/bill/unbilled/a</td>
              <td data-label="Amount">100</td>
              <td data-label="Credit account balance">9900</td>
              <td data-label="Debit account balance">100</td>
            </tr>
          </tbody>
        </table>
        <Text
          className="Content"
          content={
            <>
              To understand what the account strings mean go to the{" "}
              <a href="" onClick={gotoBookAccount}>
                Book account
              </a>{" "}
              section.
            </>
          }
        />
        <Text
          className="Content"
          content={
            <>
              The account balance of both the accounts is calculated and stored
              within the entry. In the above example, the balance of the{" "}
              <span className="Highlight">card balance</span> account which got
              credit became ₹9900 after a transaction of ₹100. This calculation
              works on the actual bookkeeping principle. Here’s a table to show
              whether there will be an increase or decrease depending on what
              type of account it is.
            </>
          }
        />
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Debit</th>
              <th>Credit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Asset</td>
              <td>Increase</td>
              <td>Decrease</td>
            </tr>
            <tr>
              <td>Liability</td>
              <td>Decrease</td>
              <td>Increase</td>
            </tr>
            <tr>
              <td>Revenue</td>
              <td>Decrease</td>
              <td>Increase</td>
            </tr>
            <tr>
              <td>Expense</td>
              <td>Increase</td>
              <td>Decrease</td>
            </tr>
          </tbody>
        </table>
        <Text
          className="Content"
          content={
            <>
              For the accounts to remain in balance, a change in one account
              must be matched with a change in another account. To make sure
              this constraint always holds true we have designed the process in
              a way so it’s mandatory to have a debit and a credit account
              against the same amount.
            </>
          }
        />
      </div>
      <div ref={bookSection}>
        <Heading className="Heading-1" content={`Book Account`} />
        <Text
          className="Content"
          content={
            <>
              A book account consists of 4 variables. These accounts are used in
              the ledger entry as debit or credit. The book accounts are
              represented at different hierarchy levels. There can be a loan
              level account, a bill level account or a card level account etc.
              For example, a user can have a card level limit and a user level
              limit. User level limit will signify the total limit a user is
              allowed whereas the same user can have multiple cards with their
              own individual limits.
            </>
          }
        />
        <Text
          className="Content"
          content={
            <>
              Let’s dissect a book account we saw above to understand how it’s
              represented.
            </>
          }
        />
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Description</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identifier</td>
              <td>
                Is a unique identifier of a particular level. Based on the value
                of the identifier type column. Ex: loan_id, bill_id
              </td>
              <td>56345</td>
            </tr>
            <tr>
              <td>Identifier type</td>
              <td>
                Is the level that we talked about above. The values can be loan,
                bill, card, user, lender etc
              </td>
              <td>bill</td>
            </tr>
            <tr>
              <td>Account Name</td>
              <td>Name of the account</td>
              <td>unbilled</td>
            </tr>
            <tr>
              <td>Account Type</td>
              <td>Type of the account. Asset, liability, revenue or expense</td>
              <td>a</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ContentWrapper>
  );
};

export default HowItWorks;
