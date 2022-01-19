import moment from "moment";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import ImageWrapper from "./blogpost.style";

const BlogPost = ({ className, thumbUrl, title, excerpt, refer }) => {
  let day = moment(excerpt).format("Do MMM YY");
  // Add all classes to an array
  const addAllClasses = ["blog_post"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <Link href={refer}>
      <div className={addAllClasses.join(" ")} style={{ cursor: "pointer" }}>
        <div className="thumbnail">
          <ImageWrapper>
            <img src={thumbUrl} alt={title} className="imag" />
          </ImageWrapper>
        </div>
        <div className="content">
          <center>
            <p className="excerpt">{day}</p>

            <h3 className="title">{title}</h3>
          </center>
        </div>
      </div>
    </Link>
  );
};

BlogPost.propTypes = {
  className: PropTypes.string,
  thumbUrl: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  link: PropTypes.element,
  refer: PropTypes.string,
};

export default BlogPost;
