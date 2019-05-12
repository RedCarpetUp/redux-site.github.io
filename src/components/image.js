import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"



// const Image = () => (
//   <StaticQuery
//     query={graphql`
//       query {
//         placeholderImage: file(relativePath: { eq: "blogs/24-02-2019-fourth-post/images/thumb5.jpg" }) {
//           childImageSharp {
//             fluid(maxWidth: 300) {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     `}
//     render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />}
//   />
// )
// export default Image


function renderImage(file,className) {
  // console.log(file);
  return <Img className={className} fluid={file.node.childImageSharp.fluid} />
}

const MyImg = function (props) {

  return <StaticQuery
    query={graphql`
      query {
      images: allFile(filter:{ extension: { regex: "/jpeg|jpg|png|gif/"}}) {
      edges {
        node {
          extension
          relativePath
          childImageSharp {
            fluid{
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    }
    `}
    render={({ images }) => renderImage(images.edges.find(image => image.node.relativePath === props.src),props.className)}
  />
}

export default MyImg;