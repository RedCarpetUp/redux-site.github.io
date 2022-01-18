import React from "react"
// import { Link } from "gatsby"
import {graphql } from "gatsby";
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Navbar from '../../components/navbar'
import BackgroundImage from 'gatsby-background-image'
import Img from 'gatsby-image'


export const query = graphql`
  query {
    allAboutYaml{
      edges{
        node{
          Meta{
            title
            description
          }
          Header{
            title
            description
          }
          founder {
            title
            image{
              childImageSharp{
                fluid{
                  ...GatsbyImageSharpFluid
                }
              }
            }
            quote
          }
        }
      }
    }

  }  
`
export default function AboutPage({data}){

  const Meta = data.allAboutYaml.edges[0].node.Meta
  const Header = data.allAboutYaml.edges[0].node.Header
  const ScrollImages = data.allAboutYaml.edges[0].node.ScrollImages
  const Testimonials = data.allAboutYaml.edges[0].node.Testimonials
  const Partners = data.allAboutYaml.edges[0].node.Partners
  const Team = data.allAboutYaml.edges[0].node.Team
  // const TeamMembers = data.allAboutYaml.edges[0].node.TeamMembers
  const Join = data.allAboutYaml.edges[0].node.Join
  const founder = data.allAboutYaml.edges[0].node.founder
  const backers = data.allAboutYaml.edges[0].node.Backers
  const advisors = data.allAboutYaml.edges[0].node.Advisors
  // console.log(data.allAboutYaml.edges[0].node[0])

  // const TeamMembers = data.allTeamYaml.edges
  // const teamMembers = data.gcmsdata.teamMembers

  return(
    <Layout>
      <SEO title={Meta.title} description={Meta.description}/>
      <Navbar/>

      {/* header */}
      <header className="header" style={{marginTop: '-4rem'}}>
        <section class="section shadow-8" style={{margin : '2%'}}>
          <div class="container">
            <div class="row">
              <div class="col-md-6 mr-md-auto">
                <h4>{Header[0].title}</h4>
                <p className="">{Header[0].description}</p>
              </div>

              <div class="col-md-6">
                <h4>{founder[0].title}</h4>
                <p className="">{founder[1].quote}</p>
                {founder.slice(2).map((f,key)=>(
                  <p className="" key={key}>{f.quote}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section class="section shadow-8" style={{ margin: '2%' }}>
          <div class="container">
            <div>
              <div>
                <h1 className="sourcing-partner">Our Sourcing Partners</h1>
              </div>
              <div style={{ marginTop: "50px", textAlign: "center" }}>
                <img src={`/assets/img/logo/redcarpet_logo.png`} alt={`RedCarpet Logo`} width={150} />
                <h4>RedCarpet Pvt Ltd</h4>
                <a href="https://www.redcarpetup.com/contact/" target="_blank">
                  <button className="btn btn-success">
                    Contact RedCarpet
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

      </header>

      {/* <!-- Main Content --> */}
      <main className="main-content">




        {/* | CTA */}

      </main>
    </Layout>
  )
}


