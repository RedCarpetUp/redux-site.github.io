import fs from "fs";
import matter from "gray-matter";
import { NextSeo } from "next-seo";
import path from "path";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";

import Container from "common/components/UI/Container";

import { terms } from "common/data/seo";
import { whitelisted } from "common/utils/format";

import { withRouter } from "next/router";
import {
  imageExperian,
  imageEquifax,
  redCarpet,
} from "../../common/data/terms_and_conditions";
import ImageWrapper, { ContentWrapper } from "./style";

export const withPageRouter = (Component) => {
  return withRouter(({ router, ...props }) => {
    let showLayout = true;
    let blog = props.allBlogs[5];
    let logo = imageExperian;
    const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
    for (const [key, value] of searchParams) {
      if (key == "showLayout" && value == "false") showLayout = false;
      if (key == "agreementType" && value == "equifax") {
        blog = props.allBlogs[6];
        logo = imageEquifax;
      }
    }
    return (
      <Component {...props} showLayout={showLayout} blog={blog} logo={logo} />
    );
  });
};

const Privacy = (props) => {
  const { blog, logo } = props;

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
            <ReactMarkdown source={blog.document.content} />
          </Container>
        </ContentWrapper>
      </Fragment>
    </Fragment>
  );
};

export async function getServerSideProps() {
  const blogDirectory = path.join(process.cwd(), "src/common/data/legal");
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

export default withPageRouter(Privacy);
