import fs from "fs";
import matter from "gray-matter";
import { NextSeo } from "next-seo";
import path from "path";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";

import Container from "common/components/UI/Container";
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import { terms } from "common/data/seo";
import { whitelisted } from "common/utils/format";

import { withRouter } from "next/router";
import {
  imageExperian,
  imageEquifax,
  redCarpet,
} from "../../common/data/terms_and_conditions";
import ImageWrapper, { ContentWrapper } from "./style";

// export const withPageRouter = (Component) => {
//   return withRouter(({ router, ...props }) => {
//     let showLayout = true;
//     let blog = props.allBlogs[5];
//     let logo = imageExperian;
//     const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
//     for (const [key, value] of searchParams) {
//       if (key == "showLayout" && value == "false") showLayout = false;
//       if (key == "agreementType" && value == "equifax") {
//         blog = props.allBlogs[6];
//         logo = imageEquifax;
//       }
//     }
//     return (
//       <Component {...props} showLayout={showLayout} blog={blog} logo={logo} />
//     );
//   });
// };

const Interest = (props) => {
  const { allBlogs, logo } = props;

  return (
    <Fragment>
      <NextSeo
        title={terms.title}
        description={terms.description}
        canonical={terms.canonical}
        additionalMetaTags={[
          { name: "twitter:description", content: `${terms.description}` },
          { name: "twitter:title", content: `${terms.title}` },
          { name: "keywords", content: `${terms.keywords}` },
          { name: "theme-color", content: "#2563FF" },
          { name: "author", content: `${terms.author}` },
        ]}
        openGraph={{
          url: `${terms.canonical}`,
          title: `${terms.title}`,
          description: `${terms.description}`,
          images: [
            {
              url: `${terms.image}`,
              alt: `${terms.title}`,
            },
          ],
        }}
      />
      <Fragment>
        <ContentWrapper>
          <Container>
            <ImageWrapper>
              {/* <div className="logo-container">
                <div>
                  <img className="logo-left" src={logo.image} alt={logo.name} />
                </div>
                <div>
                  <img
                    className="logo-right"
                    src={`/images/rclogo.png`}
                    alt={redCarpet.name}
                  />
                </div>
              </div> */}
            </ImageWrapper>
            {/* <Heading content={<>Interest Rate Policy</>} />
            <Heading content={<>1. Introduction</>} />
            <Text
              content={
                <>
                  The Reserve Bank of India vide its Master Direction DNBR. PD.
                  07/03.10.119/2016-17 dated September 1, 2016 and subsequent
                  amendments) has directed that the Board of each NBFC shall lay
                  down appropriate principles to determine the interest rates,
                  processing and other charges. In compliance with the said RBI
                  directions, Redux Credit Finance Private Limited (‘Redux’ or
                  ‘Company’) has formulated the interest rate policy taking into
                  account relevant factors such as cost of funds, margin and
                  risk premium, etc.
                </>
              }
            />
            <Heading
              content={<>2. Interest rate methodology and principles</>}
            />
            <Text
              content={
                <>
                  In compliance with the RBI directions, the interest rate
                  policy of the Company is as follows:
                </>
              }
            />
            <ul>
              <li>
                Redux has its own model of arriving at interest rates taking
                into consideration, inter alia the Company’s cost of funds, risk
                premium and other administrative costs.
              </li>
              <li>
                The interest rate for different types of loans is computed based
                on loan tenor and risk calculations.
              </li>
              <li>
                Other factors that will be taken into account to arrive at the
                final lending rate will be interest, loan risk, default risk,
                liquidity risk and market risk in the related business segment,
                historical performance of similar clients, profile of the
                borrower, tenure of relationship with the borrower, repayment
                track record of the borrower in case of existing customer, etc.
                Such information is gathered based on information provided by
                the borrower, the Company’s records, etc.
              </li>
              <li>
                The rate of interest for the same product and tenor availed
                during same period by different customers could vary depending
                upon any of / combination of the above factors, borrower’s
                individual loan profile.
              </li>
              <li>
                The interest rates could be offered on fixed or variable basis,
                of varying terms and repayment timeline, depending upon the
                default risk of the borrowers.
              </li>
              <li>
                For the above interest, the range could vary between eighteen
                and thirty-six per cent annually.
              </li>
              <li>
                The interest could be charged on monthly, quarterly or
                half-yearly rests for different products.
              </li>
              <li>
                The interest rate will be communicated to the customers prior to
                submission of the loan application and EMI apportionment towards
                interest and principal dues will also be made available to the
                customer.
              </li>
              <li>
                Interest payments will be included in the overall payment
                schedule and the interest will be deemed payable immediately on
                the due date as communicated and no grace period for payment of
                interest will be allowed.
              </li>
              <li>
                In addition to the interest charged on the loan, the company may
                levy additional / penal interest for delay or default in making
                payment of any dues. These additional or penal charges will be
                communicated to the customer prior to submission of loan
                application.{" "}
              </li>
              <li>
                The Company will also levy other charges such as processing
                fees, origination fees, late payment charges, re-scheduling
                charges, pre-payment / foreclosure charges, part disbursement
                charges, etc., wherever considered necessary.
              </li>
              <li>
                Claims for refund or waiver of charges / penal interest /
                additional interest will normally not be entertained by the
                Company and it is at the sole discretion of the company to deal
                with such requests.
              </li>
              <li>
                Any changes to the interest rate will be reviewed by the Asset
                Liability Committee (ALCO) and will be periodically published on
                the Company website and communicated to the borrowers as deemed
                fit by the Company.
              </li>
              <li>
                Such revisions in the interest rates and other charges will be
                prospective in effect
              </li>
            </ul>
            <Heading content={<>3. Key responsibilities of the Company</>} />
            <Text content={<></>} />
            <Heading content={<>4. Review of the policy</>} />
            <Text content={<></>} /> */}
            <ReactMarkdown source={allBlogs[0].document.content} />
          </Container>
        </ContentWrapper>
      </Fragment>
    </Fragment>
  );
};

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), "src/common/data/interest");
  const filenames = fs.readdirSync(blogDirectory);
  const total = filenames.length;
  const pagesArray = 0;
  const allBlogs = filenames.reverse().map((filename, index) => {
    const filePath = path.join(blogDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const parsedMarkdown = matter(fileContents);
    const permittedValues = ["data", "content"];
    const document = whitelisted(parsedMarkdown, permittedValues);
    return {
      document,
      content: document.content,
    };
  });

  return {
    props: {
      allBlogs,
      pagesArray,
    },
  };
}

export default Interest;
