import React, { Fragment } from "react";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "styled-components";
import Sticky from "react-stickynode";
import { Modal } from "@redq/reuse-modal";
import { useRouter } from "next/router";
import { NotificationProvider } from "common/hooks/useNotification";
import { CookiesProvider } from "react-cookie";

import { theme } from "common/theme/appclassic";
import { ResetCSS } from "common/assets/css/style";

import SEO from "../../../seo.config";

import Navbar from "containers/Navbar";
import Footer from "containers/Footer";

import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from "public/styles/appClassic.style";
import { NavBarProvider } from "common/hooks/useNavBar";

export default function MainLayout({ children }) {
  const { query, asPath } = useRouter();
  const showLayout = query.showLayout == "false" ? false : true;
  const isGimBookPage =
    asPath.includes("gimbooks") || asPath.includes("rating");

  return (
    <Fragment>
      <CookiesProvider>
        <DefaultSeo {...SEO} />
        <Modal />
        <ThemeProvider theme={theme}>
          <ResetCSS />
          <GlobalStyle style={{ fontFamily: "Flaticon" }} />
          {/* end of global and reset style */}

          {/* start app classic landing */}
          <AppWrapper>
            <NavBarProvider>
              {showLayout &&
                (!isGimBookPage ? (
                  <Sticky top={0} innerZ={9999} activeClass="sticky-active">
                    <Navbar />
                  </Sticky>
                ) : (
                  <Navbar />
                ))}
              <ContentWrapper>
                <Fragment>
                  <NotificationProvider>{children}</NotificationProvider>
                </Fragment>
              </ContentWrapper>
              {showLayout && <Footer />}
            </NavBarProvider>
          </AppWrapper>
          {/* end of app classic landing */}
        </ThemeProvider>
      </CookiesProvider>
    </Fragment>
  );
}
