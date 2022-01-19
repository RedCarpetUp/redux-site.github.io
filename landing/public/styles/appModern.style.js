import styled, { createGlobalStyle } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Heebo', sans-serif;
  }
  .reuseModalParentWrapper,
  .reuseModalOverlay {
    z-index: 99999;
    .reuseModalHolder{
      border: 0;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Heebo', sans-serif;
  }
  section {
    position: relative;
  }
  .reusecore__button {
    font-weight: 500;
  }
  @media only screen and (max-width: 667px) {
    .container {
      width: 100%;
    }
  }
  @media only screen and (max-width: 667px) {
    .container {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  @media only screen and (width: 320px) {
    .container {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;

export const AppWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .sticky-active {
    .navbar {
      padding: 20px 0 21px;
      background-color: ${themeGet("colors.white", "#ffffff")};
      box-shadow: 0px 3px 8px 0px rgba(43, 83, 135, 0.08);
      @media only screen and (max-width: 1366px) {
        padding: 15px 0 16px;
      }
      .main-logo {
        display: none;
      }
      .logo-alt {
        display: block;
      }
      .mobile-menu {
        top: 72px;
      }
      ul {
        li {
          a {
            color: ${themeGet("colors.secondary", "#000")};
            font-size: 16px;
            font-weight: 400;
            transition: all 0.3s ease;
            &:hover {
              color: ${themeGet("colors.primary", "#d1397c")};
            }
          }
          &.is-current {
            a {
              color: ${themeGet("colors.primary", "#d1397c")};
            }
          }
        }
      }
      .reusecore__button {
        &.menubar {
          color: ${themeGet("colors.secondary", "#000")};
        }
        &.text {
          color: ${themeGet("colors.secondary", "#000")};
          .btn-icon {
            svg {
              stroke: ${themeGet("colors.secondary", "#000")};
            }
          }
          @media only screen and (max-width: 991px) {
          }
        }
      }
    }
  }
`;

export const ContentWrapper = styled.div`
  flex: 1 0 auto;
  width: 100%;
  overflow: hidden;
`;

export const SectionHeader = styled.header`
  width: 100%;
  margin: 0 auto 58px;
  text-align: center;
  @media only screen and (max-width: 991px) {
    margin-bottom: 50px;
  }
  h5 {
    font-size: 24px;
    color: red;
    font-weight: 700;
    line-height: 33px;
    margin-bottom: 12px;
    color: ${themeGet("colors.primary", "#2563FF")};
    @media only screen and (max-width: 991px) {
      font-size: 1.4em;
      margin-bottom: 10px;
    }
  }
  h2 {
    font-size: 18px;
    line-height: 36px;
    font-weight: 700;
    color: ${themeGet("colors.headingColor", "#0F2137")};
    margin: 0;
    @media only screen and (max-width: 1366px) {
      font-size: 18px;
    }
    @media only screen and (max-width: 991px) {
      font-size: 26px;
      line-height: 38px;
    }
  }
`;

export default GlobalStyle;
