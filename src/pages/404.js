import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navbar from '../components/navbar'
const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Navbar/>
    
    <main className="main-content text-center pb-lg-8">
      <div className="section">
        <div className="container">
          <h1 className="display-1 text-muted mb-7">Page Not Found</h1>
          <p className="lead">Seems you're looking for something that doesn't exist.</p>
          <br/>
          <button className="btn btn-secondary w-150 mr-2" type="button" onclick="window.history.back();">Go back</button>
          <a className="btn btn-secondary m-2" href="/">Return Home</a>

        </div>
      </div>
    </main>
  </Layout>
)

export default NotFoundPage
