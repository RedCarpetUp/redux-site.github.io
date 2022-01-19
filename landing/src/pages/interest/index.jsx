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
            <Text content={<></>} />
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

export async function getServerSideProps() {
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
