import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Navbar from '../../components/navbar'
import {graphql} from 'gatsby'



export default function TermsOfUse({data}){
  
  var content = data.allMarkdownRemark.edges[0].node
  return(
    <Layout>
      <SEO title={content.frontmatter.title} description={content.frontmatter.description} keywords={[]} />
      <Navbar/>

      <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-10 mx-auto">
                <div dangerouslySetInnerHTML={{ __html: content.html }} />                        
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
 query termsOfUseQuery{
  allMarkdownRemark(
   filter: {fileAbsolutePath: {regex : "\/terms-of-use/"}}) {
     edges {
       node {
         html
         excerpt(pruneLength: 250)
         id
         frontmatter {
           title
           description	
           date(formatString: "MMMM DD, YYYY")
         }
       }
     }
   }
}`


