// import { Link } from "gatsby"
// import PropTypes from "prop-types"
import React from "react"

import logo from '../images/rclogo.png'


const Footer = () => (
  <footer className="footer bg-gray py-7">
    <div className="container">
      <div className="row gap-y">

        <div className="col-md-6 col-xl-2">
          <p><a href="/"><img src={logo} alt="logo"/></a></p>
          <p>We lend to those that banks cannot see</p>
        </div>

        <div className="col-6 col-md-3 col-xl-2">
          <h6 className="mb-4 mt-1"><strong>Company</strong></h6>
          <div className="nav flex-column">
            <a className="nav-link" href="/about">About</a>
            <a className="nav-link" href="/sourcing-partner">Sourcing Partner</a>
            <a className="nav-link" href="/privacy">Terms &amp; Conditions</a>
            <a className="nav-link" href="/faq">FAQ</a>

          </div>
        </div>

        <div className="col-6 col-md-3 col-xl-2">
          <h6 className="mb-4 mt-1"><strong>Services</strong></h6>
          <div className="nav flex-column">

          <a className="nav-link" href="/personal-loan">Personal Loan</a>

          </div>
        </div>

        <div className="col-6 col-md-3 col-xl-2">
          <h6 className="mb-4 mt-1"><strong>Legal</strong></h6>
          <div className="nav flex-column">
            <a className="nav-link" target="_blank" href="/assets/pdf/Grievance_Redressal_Policy%20(1).pdf">Grievance Redressal Policy</a>
            <a className="nav-link" target="_blank" href="/assets/pdf/Fair_Practice_Code.docx%20(1).pdf">Fair Practice Code</a>
            <a className="nav-link" target="_blank" href="/assets/pdf/KYC_Policy.pdf">KYC Policy</a>
            <a className="nav-link" target="_blank" href="/assets/pdf/Moratorium_Policy.pdf">Moratorium Policy</a>
            <a className="nav-link" href="/advisory">Fraud Advisory</a>
            <a className="nav-link" href="/interest">Interest Rates</a>
            {/* <a className="nav-link" href="/request">Request</a> */}
          {/* <a className="nav-link" href="/legal/dmi-agent-service-agreement">DMI agreement</a> */}
          </div>
        </div>

        <div className="col-6 col-md-6 col-xl-2">
          <h6 className="mb-4 mt-1"><strong>Support</strong></h6>
          <div className="nav flex-column">
            <a className="nav-link" href="/contact">Contact</a>

          </div>
        </div>

        <div className="col-6 col-md-6 col-xl-2">
          <p><a target="_blank" className="btn btn-block btn-round btn-secondary" href="https://play.google.com/store/apps/details?id=com.redcarpetup.rewardpay">Download</a></p>
          <br/>
          <div className="social social-bordered">
            <a target="_blank" className="social-facebook" href="https://www.facebook.com/redcarpetup/"><i className="fa fa-facebook"></i></a>
            <a target="_blank" className="social-twitter" href="https://twitter.com/RedCarpetUp"><i className="fa fa-twitter"></i></a>
            <a target="_blank" className="social-youtube" href="https://www.youtube.com/channel/UCnQDafd2nL0ziwJjO5O3Hsw"><i className="fa fa-youtube"></i></a>
            <a target="_blank" className="social-instagram" href="https://www.instagram.com/redcarpetup/"><i className="fa fa-instagram"></i></a>
          </div>
        </div>

      </div>
    </div>
  </footer>
)

export default Footer
