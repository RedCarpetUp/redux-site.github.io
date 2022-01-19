import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const LoginWrapper = styled.div`
  .wrapper {
    padding: 5rem 0;
    background: #fafbfb;
  }
  .form-control {
    padding: 10px;
  }
  .form-control-select {
    font-weight: 300;
    display: block;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    height: calc(2.53125rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 0.9375rem;
    font-weight: 300;
    line-height: 1.9;
    color: #000;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #eaeff4;
    border-radius: 2px;
    -webkit-transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .loader {
    border: 5px solid #f3f3f3;
    border-top-color: #3498db;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    animation: spin 0.5s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .text-center {
    text-align: -webkit-center !important;
  }
  .btn_text {
    color: ${themeGet("colors.secondary", "#D50032")};
    cursor: pointer;
  }
  .btn_text:hover {
    color: #00f;
  }
  .inputPayCombo-note {
    display: flex;
    width: 100%;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding: 0px 10px 10px 10px;
    }
  }
  .note-black {
    margin: 0px 0px 0px 0px;
    font-size: 14px;
    text-align: left;
  }
  .note-txt {
    display: inline-block;
    text-align: left;
    margin-left: 6px;
    font-size: 14px;
    color: red;
  }
  .btn-full {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    border-radius: 5px;
    background-color: #dd285d;
  }
  .btn {
    border-radius: 5px;
    background-color: #dd285d;
  }
  .btn-light {
    border: 1px solid #dd285d;
    border-radius: 5px;
    background-color: white;
    color: #dd285d;
  }

  .loanType {
    text-transform: capitalize;
  }

  .col80 {
    width: 80%;
    display: block;
    text-align: -webkit-center;
  }

  .col20 {
    width: 20%;
    display: block;
    text-align: -webkit-center;
  }
  .col16 {
    width: 16.25%;
    display: block;
    text-align: -webkit-center;
  }
  .col5 {
    width: 5%;
    display: block;
    text-align: -webkit-center;
  }
  .line {
    border: 1px solid #dd285d;
    width: 100%;
  }
  .col30 {
    width: 30%;
    display: block;
    text-align: -webkit-center;
  }

  .col25 {
    width: 25%;
    display: block;
    text-align: -webkit-center;
  }

  .col40 {
    width: 40%;
    display: block;
    text-align: -webkit-center;
  }

  .col50 {
    width: 50%;
    display: block;
    text-align: -webkit-center;
  }

  .col60 {
    width: 60%;
    display: block;
    text-align: -webkit-center;
  }

  .col100 {
    width: 100%;
    display: block;
    text-align: -webkit-center;
  }

  .col33 {
    width: 33.33%;
    justify-content: center;
    display: block;
    text-align: -webkit-center;
  }

  .margintTopDown {
    margin-top: 2em;
    margin-bottom: 2em;
  }

  .tar {
    text-align: right;
  }

  .dif {
    display: inline-flex;
  }

  .dif p {
    font-size: 0.9rem;
  }

  .dueWarning {
    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  .dueWarning span {
    border: 1px solid #fa8c16;
    color: #fa8c16;
    background: #fff7e6;
    padding: 0.1rem 1rem;
    border-radius: 10rem;
  }

  .dueWarning p {
    margin: 0;
    font-weight: 600;
    text-align: center;
  }

  .changeLink {
    color: blue;
  }

  .changeLink:hover {
    color: #0d0dab;
    cursor: pointer;
  }

  .remove {
    color: red;
  }

  .remove:hover {
    color: #d81646;
    cursor: pointer;
  }

  .container {
    padding: 0 2rem;
  }

  .formContainer {
    width: 50%;
    margin: 0 auto;
  }

  .pcardWrapper {
    width: 40%;
    margin: 2rem auto;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    background: #fff;
    border-radius: 10px;
  }

  .pcardWrapper .warningStrip {
    padding: 1rem;
    border-start-start-radius: inherit;
    border-start-end-radius: inherit;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  .pcardWrapper .cardHeader {
    border-bottom: 1px solid #eaeaea;
    padding: 0rem 1.2rem;
  }

  .pcardWrapper .cardHeader .type,
  .pcardWrapper .cardHeader .id {
    width: 50%;
  }

  .pcardWrapper .cardHeader .id {
    text-align: right;
  }

  .pcardWrapper .smartCardHeader {
    display: inline-flex;
    align-items: center;
  }

  .pcardWrapper .smartCardHeader h5 {
    padding: 0 0.5rem;
    margin: 0;
  }

  .pcardWrapper .cardBody {
    padding: 2rem;
    display: block;
    text-align: -webkit-center;
  }

  .pcardWrapper .cardBody h1,
  .pcardWrapper .cardBody h2,
  .pcardWrapper .cardBody h3,
  .pcardWrapper .cardBody h4,
  .pcardWrapper .cardBody h5,
  .pcardWrapper .cardBody h6 {
    margin: 0;
  }

  .pcardWrapper .cardBody .otpSuccessMsg {
    font-weight: 500;
    text-align: center;
    border-radius: 5px;
    color: #52c41a;
    background: #f6ffed;
    border-color: #b7eb8f;
  }

  .pcardWrapper .cardBody .payInfo {
    width: 100%;
  }

  .pcardWrapper .cardBody .payInfo .dueDate {
    width: 50%;
  }

  .pcardWrapper .cardBody .payInfo .dueDays {
    width: 50%;
    text-align: right;
  }

  .pcardWrapper .cardBody .payInfo .minAmt {
    width: 50%;
  }

  .pcardWrapper .cardBody .payInfo .maxAmt {
    width: 50%;
    text-align: right;
  }

  .pcardWrapper .cardBody .payDueBanner {
    width: 20%;
    background: rgba(255, 0, 0, 0.589);
    color: #fff;
  }

  .pcardWrapper .smartCardOptions {
    padding-bottom: 0rem;
  }

  .pcardWrapper .smartCardOptions .optionsWrapper {
    background: #f6f6f6;
    align-items: center;
    height: 4.5rem;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .pcardWrapper .smartCardOptions .col50 {
    padding: 1rem 0;
    cursor: pointer;
    height: 100%;
    align-items: center;
  }

  .smartCardWrapper {
    padding: 1rem 2rem;
  }
  .smartCardWrapperLoan {
    padding: 1rem 2rem 1rem 2rem;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding: 1rem 1rem 1rem 1rem;
    }
  }
  .smartCardWrapper button {
    font-weight: 400;
    letter-spacing: 1px;
  }

  .card {
    background: #fff;
    border-radius: 10px;
  }

  .card .inputPayCombo {
    display: flex;
    width: 100%;
  }

  .payinput {
    width: 70%;
    padding: 10px;
  }

  .paybtn {
    width: 30%;
    border-radius: 5px !important;
    background-color: #8b0000;
  }

  .card button {
    font-weight: 400;
    letter-spacing: 1px;
  }

  .card .changeLink {
    color: blue;
  }

  .card .changeLink:hover {
    color: #0d0dab;
    cursor: pointer;
  }

  .lateFineTimer {
    display: inline-flex;
  }

  .lateFineTimer h2 {
    color: #fff;
    width: 4rem;
    font-weight: 600;
  }

  .lateFineTimer h2 p {
    font-weight: 400;
  }

  @media screen and (max-width: 767px) {
    .container {
      padding: 0;
    }

    .formContainer {
      width: 100%;
      margin: 0 auto;
    }

    .card .inputPayComboHi {
      display: block;
    }

    .card .inputPayComboHi input {
      width: 100%;
    }

    .card .inputPayComboHi button {
      margin-top: 0.5rem;
      width: 100%;
    }

    .pcardWrapper {
      width: 90%;
      margin: 2rem auto;
    }
  }

  .strike del {
    color: rgba(255, 0, 0, 0.5);
    text-decoration: none;
    position: relative;
  }

  .strike del:before {
    content: " ";
    display: block;
    width: 100%;
    border-top: 2px solid rgba(255, 0, 0, 0.8);
    height: 12px;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: rotate(-7deg);
  }

  .strike ins {
    color: green;
    font-size: 32px;
    text-decoration: none;
    padding: 1em 1em 1em 0.5em;
  }

  .pointer {
    cursor: pointer;
  }

  @media only screen and (max-width: 600px) {
    .hide_content {
      display: none;
    }

    .smartCardHeader {
      width: 100% !important;
    }

    .small_col100 {
      width: 100% !important;
      display: block;
      text-align: -webkit-center;
    }
  }

  @media only screen and (max-width: 520px) {
    .lender-agreement {
      margin-left: 10px;
    }
  }
`;

export const BackgroundWrapper = styled.div`
  background-image: url("/images/login/combined_shape.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media only screen and (min-width: 0px) and (max-width: 991px) {
    background-image: url("/images/login/background.jpg");
    background-size: cover;
  }
`;

export const ButtonWrapper = styled.div`
  .btn {
    width: 25%;
    margin: 60px 20px 20px 20px;
    border-radius: 5px;
    background-color: #dd285d;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 90%;
      margin: 40px 0px 0px 0px;
    }
  }
  p {
    margin-block-start: 0em;
    @media (max-width: 768px) {
      margin-block-start: 1em;
    }
  }
`;

export default LoginWrapper;
