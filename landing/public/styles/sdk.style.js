import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const Code = styled.div`
  .content {
    width: 50%;
    @media only screen and (max-width: 1440px) {
      width: 70%;
    }
    @media only screen and (max-width: 1360px) {
      width: 70p%;
    }
    @media only screen and (max-width: 667px) {
      width: 80%;
    }
    @media only screen and (max-width: 420px) {
      width: 90%;
    }
  }

  li {
    font-weight: 200;
    list-style-type: unset;
    margin-left: 30px;
  }

  a {
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    border: solid 1px #20538d;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4),
      0 1px 1px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4),
      0 1px 1px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4),
      0 1px 1px rgba(0, 0, 0, 0.2);
    background: #4479ba;
    color: #fff;
    padding: 8px 12px;
    text-decoration: none;
  }

  pre {
    display: block;
    width: 100%;
    max-width: 100%;
    font-family: "GT America Mono";
    color: rgb(0, 100, 214);
    font-size: 100%;
    line-height: 1.8;
    font-weight: 400;
    background-color: rgb(243, 247, 250);
    text-align: left;
    direction: ltr;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    letter-spacing: -0.5px;
    font-variant-ligatures: none;
    -webkit-font-smoothing: subpixel-antialiased;
    hyphens: none;
    tab-size: 4;
    padding: 16px 24px;
    overflow: auto;
    border-radius: 4px;
  }
  hr {
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

export const SdkWrapper = styled.div`
  .btn_text {
    color: ${themeGet("colors.secondary", "#D50032")};
    text-decoration: underline;
    cursor: pointer;
  }
  .btn_text:hover {
    color: #00f;
  }
`;

export default Code;
