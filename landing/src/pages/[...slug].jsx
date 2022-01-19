import fs from "fs";
import matter from "gray-matter";
import moment from "moment";
import { NextSeo } from "next-seo";
import path from "path";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown/with-html";

import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";

import MilestoneBlock from "containers/MilestoneBlock";

import { whitelisted } from "common/utils/format";
import { REDC_URL } from "common/constants";

import { ContentWrapper } from "public/styles/appClassic.style";
import SlugBox from "public/styles/slug.style";

const PAGE_TOTAL = 8;

export default function Post({ blog, moreBlogs, preview }) {
  let day = moment(blog.date).format("Do MMM YY");
  const img = require(`common/data/blog/posts/${blog.slug}/${blog.image}`);
  const titleKey = blog.title
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .join(",");
  return (
    <Fragment>
      <NextSeo
        title={blog.title}
        description={blog.description}
        canonical={REDC_URL + blog.path}
        additionalMetaTags={[
          { name: "twitter:description", content: `${blog.description}` },
          { name: "twitter:title", content: `${blog.title}` },
          { name: "twitter:image:src", content: `${REDC_URL + img}` },
          {
            name: "keywords",
            content: `redcarpet,redcarpetup,blogs,blog,${titleKey}`,
          },
          { name: "theme-color", content: "#2563FF" },
          { name: "twitter:label1", content: "Reading Time" },
          { name: "twitter:data1", content: "8 minutes" },
        ]}
        openGraph={{
          url: `${REDC_URL + blog.path}`,
          type: "article",
          title: `${blog.title}`,
          description: `${blog.description}`,
          article: {
            publishedTime: `${blog.date}`,
            authors: [`${blog.author}`],
          },
          images: [
            {
              url: `${REDC_URL + img}`,
              alt: `${blog.title}`,
            },
          ],
        }}
      />
      <Fragment>
        <ContentWrapper style={{ paddingTop: "25px", paddingBottom: "50px" }}>
          <center>
            <Heading
              as="h1"
              content={blog.title}
              style={{ paddingTop: "100px" }}
            />
            <Text content={day} />
          </center>
          <MilestoneBlock image={img} />
          <Container width="40%">
            <div style={{ fontWeight: "20px" }}>
              <SlugBox>
                <ReactMarkdown
                  source={blog.blog_content}
                  escapeHtml={false}
                  className="Slug"
                />
              </SlugBox>
            </div>
          </Container>
        </ContentWrapper>
      </Fragment>
    </Fragment>
  );
}

export async function getStaticProps({ params }) {
  const realSlug = params.slug.join("-");
  const blogDirectory = path.join(process.cwd(), "src/common/data/blog/posts");
  const fullPath = path.join(blogDirectory, `${realSlug}/blog.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const blog = {};

  // Ensure only the minimal needed data is exposed
  const fields = [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "image",
    "path",
    "description",
  ];
  fields.forEach((field) => {
    if (field === "slug") {
      blog[field] = realSlug;
    }
    if (field === "content") {
      blog[field] = content;
    }
    // if (field === 'image') {
    //   blog[field] = data.image.split('/').slice(-1).pop()
    // }

    if (data[field]) {
      blog[field] = data[field];
    }
  });

  blog["image"] = blog["image"].split("/").slice(-1).pop();

  const blog_content = blog.content; //await markdownToHtml(blog.content || "");

  return {
    props: {
      blog: {
        ...blog,
        blog_content,
      },
    },
  };
}

export async function getStaticPaths() {
  const blogDirectory = path.join(process.cwd(), "src/common/data/blog/posts");
  const filenames = fs.readdirSync(blogDirectory);
  const total = filenames.length;
  const pagesArray = new Array(Number(Math.ceil(total / PAGE_TOTAL)));
  const allBlogs = filenames.reverse().map((filename, index) => {
    const filePath = path.join(blogDirectory, `${filename}/blog.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const slug = `${filename}`;
    const parsedMarkdown = matter(fileContents);
    const permittedValues = ["data", "content"];
    const document = whitelisted(parsedMarkdown, permittedValues);
    return {
      document,
      content: document.content,
      slug,
      image: document.data.image.split("/").slice(-1).pop(),
      path: document.data.path,
      description: document.data.description,
    };
  });

  // create paths with `slug` param
  const paths = allBlogs.map((blog) => `${blog.document.data.path}`);

  return {
    paths,
    fallback: false,
  };
}
