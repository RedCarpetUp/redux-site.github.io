// import { Link } from "gatsby"
// import PropTypes from "prop-types"
import React from "react"

import logo_dark from '../images/logo-dark.png'
import logo_light from '../images/logo-light.png'
import logo from '../images/rclogo.png'

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-stick-dark" data-navbar="sticky">
      <div className="container">

        <div className="navbar-left mr-4">
          <button className="navbar-toggler" type="button">&#9776;</button>
          <a className="navbar-brand" href="/">
            <img className="logo-dark" src={logo} alt="logo"/>
            <img className="logo-light" src={logo} alt="logo"/>
          </a>
        </div>

        <section className="navbar-mobile">
          <nav className="nav nav-navbar nav-text-normal ml-auto" style={{marginRight: '50px'}}>
          {/* <a className="nav-link" href="/">HOME</a> */}

          </nav>

        </section>

      </div>
    </nav>
)

export default Navbar
