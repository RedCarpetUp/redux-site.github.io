import React from "react"
// import { Link } from "gatsby"
import Layout from "../../components/layout"
// import Image from "../components/image"
import SEO from "../../components/seo"
import Navbar from '../../components/navbar'
import {graphql } from "gatsby"


export default function ContactPage({data}) {

  data = data.allContactYaml.edges[0].node
  const map = data.map[0]
  const meta = data.meta

  return(
    <Layout>
      <SEO title={meta.title} description={meta.description} keywords={[]} />
      <Navbar/>

      {/* <!-- Main Content --> */}
      <main className="main-content">
        {/* | Contact form */}
        <section className="section">
          <div className="container">

            <form className="row gap-y" action="../../../assets/php/sendmail.php" method="POST" data-form="mailer">
              <div className="col-lg-7">
                <h3>Contact Us</h3>
                <br/>

                <div className="alert alert-success d-on-success">We received your message and will contact you back soon.</div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input className="form-control form-control-lg" type="text" name="name" placeholder="Name"/>
                  </div>

                  <div className="form-group col-md-6">
                    <input className="form-control form-control-lg" type="email" name="email" placeholder="Email"/>
                  </div>
                </div>

                <div className="form-group">
                  <textarea className="form-control form-control-lg" rows="4" placeholder="Message" name="message"></textarea>
                </div>

                <button className="btn btn-lg btn-primary" type="submit">Send message</button>

              </div>


              <div className="col-lg-4 ml-auto text-center text-lg-left">
                <hr className="d-lg-none"/>
                <h3>Contact Us</h3>
                <br/>
                <p>
                  {data.phone.map((phone,key)=>(
                    <span key={key}>{phone.ph}<br/></span>
                  ))}
                  </p>
                <p>
                  {data.emails.map((email,key)=>(
                    <span key={key}><b>{email.heading}: </b><br/>{email.email}<br/></span>
                  ))}
                </p>
                <div className="fw-400">Follow Us</div>
                <div className="social social-sm social-inline">
                  <a target="_blank" className="social-twitter" href={data.social_media[0].twitter}><i className="fa fa-twitter"></i></a>
                  <a target="_blank" className="social-facebook" href={data.social_media[0].facebook}><i className="fa fa-facebook"></i></a>
                  <a target="_blank" className="social-instagram" href={data.social_media[0].instagram}><i className="fa fa-instagram"></i></a>
                  {/* <a className="social-dribbble" href="#"><i className="fa fa-dribbble"></i></a> */}
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      
    </Layout>
  )
}

export const query = graphql`
{
  allContactYaml{
   edges{
    node{
      meta{
        title
        description
      }
     address {
       line1
       line2
     }
      phone {
        ph
      }
      emails {
        email 
        heading
      }
      social_media {
        twitter
        facebook
        instagram
      }
      map{
        lat
        lang
        add
      }
    }
  }
  }
}
`