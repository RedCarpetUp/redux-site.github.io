// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import bg from '../assets/img/bg/12.jpg'



const Header = ({ header }) => (
  <header className="header pb-9 pt-10" style={{backgroundImage: `url(${bg})`}}>
    <div className="container">
      <div className="row">
        <div className="col-md-9" style={{margin:'auto',paddingLeft:'20px'}}>
            <h1>{header}</h1>
        </div>
      </div>
        
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
