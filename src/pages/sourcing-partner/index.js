import React from "react";
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Navbar from '../../components/navbar'

const SourcingPartner = () => {
    return (
        <Layout>
            <SEO title="Our Sourcing Partners" />
            <Navbar />
            <header className="header" style={{ marginTop: '-4rem' }}>
                <section class="section shadow-8" style={{ margin: '2%' }}>
                    <div class="container">
                        <div>
                            <div>
                                <h1 className="sourcing-partner">Our Sourcing Partners</h1>
                            </div>
                            <div style={{ marginTop: "50px", textAlign: "center" }}>
                                <img src={`/assets/img/logo/redcarpet_logo.png`} alt={`RedCarpet Logo`} width={150} />
                                <h4>RedCarpet Pvt Ltd</h4>
                                <a href="https://www.redcarpetup.com/contact/" target="_blank" rel="noreferrer">
                                    <button className="btn btn-success">
                                        Contact RedCarpet
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
        </Layout>
    );
};

export default SourcingPartner;