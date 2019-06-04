import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Navbar from '../../components/navbar_light'
import {graphql} from 'gatsby'

export default function FaqPage({data}) {
  const meta = data.allFaqYaml.edges[0].node.meta
  const types = data.allFaqYaml.edges[0].node.types
  const questions = data.allFaqYaml.edges[0].node.questions
  const extrafaqs = data.allFaqYaml.edges[0].node.extrafaqs
  return(
    <Layout>
      <SEO title={meta.title} description={meta.description} keywords={[]} />
      <Navbar/>
      {/* <!-- Header --> */}
      <header className="header text-white bg-dark pt-9 pb-5" style={{backgroundImage: 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)'}}>
        <div className="container">
          <h3>Frequently Asked Questions</h3>
        </div>
      </header>

      {/* <!-- Main Content --> */}
      <main className="main-content">

        <nav className="bb-1 bg-gray" aria-label="breadcrumb">
          <div className="container">
            <ol className="breadcrumb px-0">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item">FAQ</li>
            </ol>
          </div>
        </nav>


        <div className="container">
          <div className="row">

            <div className="col-md-7 col-xl-8 mr-md-auto py-8">
              <article>
                {types.map((t,key)=>(
                  <div key={key}>
                    <h3 id={t.type}>{t.type} Questions</h3>
                    <br/>
                    {questions.map(function(q,key){
                      return (
                          <div key={key}>
                            <h6 id="update-to-2" data-provide="anchor">{q.question}</h6>
                            <p>{q.answer}</p>
                            <hr className="hr-dash"/>
                          </div>
                        )
                    })}
                    {extrafaqs.map(function(q,key){
                      return (
                          <div key={key}>
                            <h6 id="update-to-2" data-provide="anchor">{q.question}</h6>
                            <p>{q.answer}</p>
                            <hr className="hr-dash"/>
                          </div>
                        )
                    })}
                    <br className="m-8"/>
                  </div>
                ))}
                
              </article>
            </div>


            {/* | Sidebar */}
            <div className="col-md-4 col-xl-3 d-none d-md-block">
              <aside className="sidebar sidebar-sticky">
                <h6 className="sidebar-title">Questions</h6>
                <nav id="nav-scrollspy" className="nav flex-column">
                  {types.map((t,key)=>(
                    <a className="nav-link" href={`#${t.type}`} key={key}>{t.type}</a>
                  ))}
                </nav>
              </aside>
            </div>

          </div>
        </div>


      </main>

      
      
    </Layout>
  )
  
}



export const query = graphql`
{
  allFaqYaml{
    edges{
      node{
        meta{
          title
          description
        }
        types {
          type
        }
        questions {
          question
          answer
        }
        extrafaqs {
          question
          answer
        }
      }
    }
  }
}
`


