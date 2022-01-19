import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const DownloadWrapper = styled.div`
  .banner {
    padding: 10rem 0;
    text-align: center;
  }
  .banner h1 {
    font-weight: 200;
    margin-bottom: 6px;
  }

  .secondContainer {
    padding: 4rem 0;
  }
  .lead {
    padding-top: 5rem;
  }
  .head {
    padding-top: 2rem;
  }
  .contentMainSection {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  .btn-round {
    border-radius: 10rem;
  }
  .btn-outline-light {
    color: rgb(248, 249, 250);
    background-color: transparent;
    background-image: none;
    border-color: rgb(248, 249, 250);
  }

  .btn {
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 1.7px;
    font-weight: 600;
    color: rgb(117, 117, 117);
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: transparent;
    font-size: 0.9375rem;
    line-height: 1.9;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    padding: 0.375rem 0.75rem;u
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out 0s,
      background-color 0.15s ease-in-out 0s, border-color 0.15s ease-in-out 0s,
      box-shadow 0.15s ease-in-out 0s, -webkit-box-shadow 0.15s ease-in-out 0s;
  }
`;

export default DownloadWrapper;
