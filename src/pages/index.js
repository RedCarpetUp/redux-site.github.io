import React from "react"
// import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Navbar from '../components/navbar'
import { graphql } from "gatsby";
// import MyImg from '../components/image';
// import Img from 'gatsby-image'

import EmiCalculator from '../components/emiCalculator'


export default function IndexPage({ data }) {
  const questions = ""
  data = data.allIndexYaml.edges[0].node
  const header = data.header
  const timeline = data.timeline[0]
  const timeline_steps = data.timeline_steps
  const video = data.video[0]
  const download = data.download[0]
  const faq = data.faq[0]
  const comm = data.team_communication
  const emi = data.emi
  const docs = data.docs
  const meta = data.meta

  return (
    <Layout>
      <SEO title={meta.title} description={meta.description} keywords={[]} />
      <Navbar />

      <header className="header h-fullscreen" style={{ backgroundImage: 'linear-gradient(135deg, #f9f7ff 0%, #fff 50%, #f6f3ff 100%)' }}>
        <div className="container">
          <div className="row align-items-center h-100">
            <div className="col-lg-6">
              <h1 className="fw-600"><span style={{ color: '#e80000' }}>{header[0].title_red} </span>{header[0].title}</h1>
              <p className="lead">{header[0].description}</p>
              <p className="lead" style={{ marginBottom: '3rem' }}>{header[0].more}</p>
              <p className="gap-xy">
                <a className="btn btn-round btn-secondary mw-200" href='#know_more'>{header[2].link_text}</a>
                {/* <a target="_blank" href={download.link_playstore}><img className="rounded" src={download.image_playstore.childImageSharp.fluid.src} alt="download on google play" /></a> */}
              </p>
            </div>

            <div className="col-lg-5 ml-auto d-none d-lg-block">
              <img style={{ height: '600px' }} src={header[0].image.childImageSharp.fluid.src} data-aos="slide-left" alt="" />
            </div>

          </div>
        </div>
      </header>


      {/* <!-- Main Content --> */}
      <main className="main-content">
        <section className="section bg-gray" id="know_more">
          <div className="container">
            <header className="section-header">
              <h2>{comm.methods_header}</h2>
              <hr />
            </header>
            <div className="row gap-y">
              {comm.methods.map((method, key) => (
                <div className="col-lg-4" key={key}>
                  <div className="card card-body border text-center">
                    <p className="my-5"><i className={`${method.icon} lead-8 text-lighter`} ></i></p>
                    <h5>{method.title}</h5>
                    <p>{method.description}</p>
                    {/* <p><a className="small-3 fw-600" href={method.link}>{method.anchorText} <i className={method.iconClassname}></i></a></p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* video */}
        <section className="section p-0" style={{ backgroundColor: '#4f8cf2' }}>
          <div className="container-wide">
            <div className="row no-gutters">

              <div className="col-md-6 bg-img video-btn-wrapper order-md-2" style={{ backgroundImage: `url(${video.image.childImageSharp.fluid.src})`, minHeight: '300px' }} data-overlay="4">
                <a className="btn btn-lg btn-circle btn-danger" href={video.video_url} data-provide="lightbox"><i className="fa fa-play"></i></a>
              </div>
              <div className="col-10 col-md-4 mx-auto py-7 py-md-9 text-white">
                <h5>{video.title}</h5>
                <p className="mb-0">{video.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* timeline */}
        <section id="timeline" className="section" >
          <div className="container">
            <div className="divider mb-7">{timeline.title}</div>
            <ol className="timeline timeline-horizontal">
              {timeline_steps.map((step, key) => (
                <li className="timeline-item" key={key}>
                  <h6><strong>{step.title}</strong></h6>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>


        {/* team communication data */}


        <section className="section" style={{marginTop: '-10%', textAlign: 'center'}}>
          <div className="container">
            <header className="section-header">
              <h2>{docs.heading}</h2>
              <hr />
            </header>
            <div className="row gap-y">
              {docs.body.map((doc,key) => (
                <div className="col-12 col-md-6 col-xl-4 feature-1" key={key}>
                  <p className="feature-icon"><img src={doc.image.childImageSharp.fluid.src} alt="Be The First" /></p>
                  <h5>{doc.doc}</h5>
                  <p className="text-muted">{doc.line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>




      </main>



    </Layout>
  )
}



export const query = graphql`
{
  allIndexYaml{
    edges{
      node{
        meta{
          title
          description
        }
        header {
          title_red
          title
          description
          more
          image{
            childImageSharp{
              fluid{
                src
              }
            }
          }
          link
          link_text
        }
        features {
          header
          description
          more
          image{
            childImageSharp{
              fluid{
                ...GatsbyImageSharpFluid
              }
            }
          }
          icon
        }
        section3 {
          header
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
        timeline {
          title
        }
        timeline_steps {
          title
          description
        }
        video {
          title
          description
          image{
            childImageSharp{
              fluid{
                ...GatsbyImageSharpFluid
              }
            }
          }
          video_url
        }
        team_communication{
          header{
            title
          }
          body{
            title
            description
            image{
              childImageSharp{
                fluid{
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          methods_header
          methods{
            title
            icon
            description
            link
            anchorText
            iconClassname
          }
        }
        download {
          title
          description
          image {
            childImageSharp{
              fluid{
                ...GatsbyImageSharpFluid
              }
            }
          }
          link_playstore
          image_playstore{
            childImageSharp{
              fluid{
                ...GatsbyImageSharpFluid
              }
            }
          }
          link_appstore
        }
        faq {
          title
          description
        }
        emi{
          minAmount
          maxAmount
          rateOfInterest1
          rateOfInterest2
        }
        docs {
          heading
          body {
            doc
            line
            image{
              childImageSharp{
                fluid{
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  },
}
`