import Head from "next/head";
import ErrorSec from "../containers/Error";
import { ResetCSS } from "common/assets/css/style";
import * as Sentry from "@sentry/nextjs";

import NextErrorComponent from "next/error";

const MyError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (
    !hasGetInitialPropsRun &&
    err &&
    (window.location.href.includes("redcarpetup.com") ||
      window.location.href.includes("redcarpetup-cherry-v4.vercel.app"))
  ) {
    Sentry.captureException(err);
  }

  return (
    <>
      <Head>
        <title>404: Not found</title>
        {/* Load google fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700|Poppins:400,500,600,700|Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ResetCSS />
      <div>
        {statusCode ? (
          `An error ${statusCode} occurred on server`
        ) : (
          <ErrorSec></ErrorSec>
        )}
      </div>
    </>
  );
};

MyError.getInitialProps = async (context) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps(context);

  const { req, res, err, asPath } = context;
  if (
    req &&
    req.headers &&
    req.headers.host &&
    (req.headers.host.includes("redcarpetup.com") ||
      req.headers.host.includes("redcarpetup-cherry-v4.vercel.app"))
  ) {
    errorInitialProps.hasGetInitialPropsRun = true;

    if (res?.statusCode === 404) {
      return errorInitialProps;
    }

    if (err) {
      Sentry.captureException(err);
      await Sentry.flush(2000);
      return errorInitialProps;
    }
    Sentry.captureException(
      new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
    );
    await Sentry.flush(2000);
  }
  return errorInitialProps;
};

export default MyError;
