import Heading from "common/components/Heading";
import Text from "common/components/Text";
import Container from "common/components/UI/Container";
import React from "react";
import BlogPost from "./BlogPost";
import SectionWrapper, {
  PostArea,
  SectionHeader,
  TitleArea,
} from "./blogSection.style";
import { blog } from "../../common/data/blog";

const BlogSection = ({ blogs }) => {
  return (
    <SectionWrapper id="blog">
      <Container width="1260px">
        <SectionHeader>
          <TitleArea style={{ textAlign: "center" }}>
            <Heading content={blog.title} />
            <Text content={blog.description} />
          </TitleArea>
        </SectionHeader>
        <PostArea>
          {blogs.map((blog) => (
            <BlogPost
              key={`blog__post-key${blog.slug}`}
              thumbUrl={require(`common/data/blog/posts/${blog.slug}/${blog.image}`)}
              title={blog.document.data.title}
              excerpt={blog.document.data.date}
              refer={blog.document.data.path}
            />
          ))}
        </PostArea>
      </Container>
    </SectionWrapper>
  );
};

export default BlogSection;
