import "@redq/reuse-modal/es/index.css";
import "rc-tabs/assets/index.css";
import React, { Fragment } from "react";
import MainLayout from "containers/Layouts/main";

export default ({ Component, pageProps }) => {
  return (
    <Fragment>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Fragment>
  );
};
