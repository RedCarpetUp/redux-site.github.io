import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Navbar from '../../components/navbar_light'
import {graphql} from 'gatsby'



export default function TermsPage({data}){
  
  var tnc = data.allMarkdownRemark.edges[0].node
  return(
    <Layout>
    <SEO title={tnc.frontmatter.title} description={tnc.frontmatter.description} keywords={[]} />
    <Navbar/>

    {/* header */}
    <header className="header text-white" style={{backgroundColor: '#b9a0c9'}}>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h1>Terms of use</h1>
            <p className="lead-2 opacity-90 mt-6">Last update: {tnc.frontmatter.date}</p>
          </div>
        </div>
      </div>
    </header>
    {/* Main Content */}
    <main className="main-content">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <div dangerouslySetInnerHTML={{ __html: tnc.html }} />                        
            </div>
          </div>
        </div>
      </section>

    </main>
  </Layout>
  )
}

export const query = graphql`
 query tncQuery{
  allMarkdownRemark(
   filter: {fileAbsolutePath: {regex : "\/privacy\/terms/"}}) {
     edges {
       node {
         html
         excerpt(pruneLength: 250)
         id
         frontmatter {
           title
           date(formatString: "MMMM DD, YYYY")
         }
       }
     }
   }
}`


