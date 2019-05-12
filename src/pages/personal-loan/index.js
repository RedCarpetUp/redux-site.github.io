import React from "react"
// import { Link } from "gatsby"
import Layout from "../../components/layout"
// import Image from "../components/image"
import SEO from "../../components/seo"
import Navbar from '../../components/navbar'
import { graphql } from "gatsby"

export default function ConnectPage({data}) {

  data= data.allPersonalLoanYaml.edges[0].node
  const header= data.header
  const blogs = data.blogs
  const cta = data.cta[0]
  const meta = data.meta

  return(
    <Layout>
      <SEO title={meta.title} description={meta.description} keywords={[]} />
      <Navbar/>

      {/* Header */}
      <header className="header overflow-hidden pb-0 pt-11" style={{backgroundImage: 'linear-gradient(85deg, #e6e9f0 0%, #eef1f5 100%)'}}>
        <div className="container">
          <div className="row h-100">

            <div className="col-lg-5 align-self-center pb-8 pb-lg-10">
              <h1>{header[0].title}</h1>
              <p className="lead mt-5 mb-8">{header[0].description}</p>
              <p className="gap-xy">
                <a className="btn btn-round btn-primary mw-150" href={`#${header[1].link}`}>{header[1].link_text}</a>
              </p>
            </div>

            <div className="col-lg-6 ml-auto align-self-end">
              <img src={header[0].image.childImageSharp.fluid.src} alt="img"/>
            </div>

          </div>
        </div>
      </header>

      {/* <!-- Main Content --> */}
      <main className="main-content">

      

      {/* | Blog */}
      <section className="section bt-1 bb-1 p-0" id="learn-more">
        <div className="container-fluid px-0">

          {blogs.map((blog,key)=>{
            if(key%2===0){
              return(
                <div className="row no-gutters" key={key}>
                  <div className="col-md-6 bg-img mh-300 text-center" >
                    <img style={{marginTop: '8%'}} src={blog.image.childImageSharp.fluid.src} alt=""/>
                  </div>
                  <div className="col-10 col-md-4 mx-auto py-8 text-center text-md-left">
                    <h4>{blog.title}</h4>
                    <p>{blog.description}</p>
                    <br/>
                  </div>
                </div>
              )
            }else{
              return(
                <div className="row no-gutters" key={key}>
                  <div className="col-md-6 bg-img mh-300 order-md-2 text-center">
                    <img style={{marginTop: '8%'}} src={blog.image.childImageSharp.fluid.src} alt=""/>
                  </div>
                  <div className="col-10 col-md-4 mx-auto py-8 text-center text-md-left">
                    <h4>{blog.title}</h4>
                    <p>{blog.description}</p>
                    <br/>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </section>

    </main>
    </Layout>
  )
}

export const query = graphql`
{
  allPersonalLoanYaml{
    edges{
      node{
        meta{
          title
          description
        }
        header {
          title
          description
          image{
            childImageSharp{
              fluid{
                ...GatsbyImageSharpFluid
              }
            }
          }
          link
          link_text
        }
        blogs {
          type
          title
          description
          image{
            childImageSharp{
              fluid{
                ...GatsbyImageSharpFluid
              }
            }
          }
          link
        }
        cta {
          title
          description
          link
          link_text
        }
      }
    }
  }
}
`