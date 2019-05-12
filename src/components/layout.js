import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Footer from "./footer"

// import '../assets/scss/page.scss'
// import '../assets/css/page.css'
// require('../assets/js/src/page')

class Layout extends React.Component{

  componentDidMount () {
    const script = document.createElement("script");

    script.src = "../assets/js/page.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render(){
    return(
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            } 
          }
        `}
        render={data => (
          <>
            {this.props.children}
            <Footer/>
          </>
        )}
      />
    )
  }
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout



