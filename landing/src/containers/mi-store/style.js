import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const OnBoardWrapper = styled.div`
  .titles {
    width: 100%;
    text-align: left;
    margin-left: 10px;
    color: #4d4644;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .row-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
  }
  .line {
    border: 1px solid #00d88d;
    width: 90%;
  }
  .col30 {
    width: 40%;
    display: block;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 25%;
    }
  }
  .col70 {
    width: 60%;
    display: block;
    text-align: -webkit-left;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 75%;
      font-size: 13px;
    }
  }
  h1 {
    font-weight: bold;
    color: #1a1f35;
  }
  .text-center {
    text-align: -webkit-center;
  }
  .btn_text {
    color: ${themeGet("colors.secondary", "#D50032")};
    cursor: pointer;
  }
  .btn_text:hover {
    color: #00f;
  }

  .btn-full {
    margin-top: 20px;
    margin-bottom: 50px;
    width: 60%;
    border-radius: 5px;
    background-color: #00d88d;
    font-weight: bold;
  }
  .btn-full-disabled {
    margin-top: 20px;
    margin-bottom: 50px;
    width: 60%;
    opacity: 0.5;
    pointer-events: none;
    cursor: none;
    border-radius: 5px;
    background-color: #00d88d;
    font-weight: bold;
  }
  .btn-full-kyc {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 30%;
    border-radius: 5px;
    background-color: #00d88d;
    font-weight: bold;
    margin-right: 10px;
  }
  .head {
    margin: 30px 15px 20px 15px;
    font-size: 1.7rem;
    color: white;
  }
  .content {
    margin: 0px 15px 0px 15px;
    color: white;
    text-align: justify;
  }
  .green {
    color: green;
  }
  .red {
    color: red;
  }
  .red-border {
    input {
      border: 1px solid red !important;
      border-radius: 5px !important;
    }
  }
  .green-border {
    input {
      border: 1px solid green !important;
      border-radius: 5px !important;
    }
  }
  .green-border-select {
    border: 1px solid green !important;
    border-radius: 5px !important;
  }
  .col100 {
    width: 100%;
    display: block;
    text-align: -webkit-center;
  }

  .col60 {
    width: 75%;
    display: block;
    text-align: -webkit-center;
    background-color: #fafbfb;
    margin-top: 1rem;
    margin-bottom: 1rem;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
    }
  }
  .col80 {
    width: 80%;
    display: block;
    text-align: -webkit-center;
    background-color: white;
    margin-top: 1.5rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .col10 {
    width: 12%;
    text-align: -webkit-center;
  }
  .col90 {
    width: 85%;
    text-align: -webkit-justify;
  }
  .col50 {
    width: 50%;
    text-align: -webkit-center;
  }
  .col40 {
    width: 40%;
    display: block;
    background-color: #00d88d;
    text-align: -webkit-center;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
    }
  }
  .form-control {
    padding: 10px 60px 10px 60px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding: 10px 10px 10px 10px;
    }
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
  .inputPayCombo {
    display: flex;
    width: 100%;
    padding: 10px 60px 0px 60px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding: 10px 10px 0px 10px;
    }
  }
  .inputPayCombo-note {
    display: flex;
    width: 100%;
    padding: 5px 60px 10px 60px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding: 0px 10px 10px 10px;
    }
  }
  .btngroup {
    display: flex;
    width: 100%;
    padding: 10px 60px 10px 60px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding: 10px 10px 10px 10px;
    }
  }
  .payinput {
    width: 70%;
    margin: 10px 10px 10px 0px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      font-size: 15px;
    }
  }
  label {
    text-align: left;
    display: block;
    color: #1a1f35;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 15px;
    -webkit-transition: 0.2s ease all;
    transition: 0.2s ease all;
  }
  .note-txt {
    display: inline-block;
    text-align: left;
    margin-left: 6px;
    font-size: 14px;
  }
  .note {
    margin: 5px 15px 0px 15px;
    color: white;
    font-size: 12px;
  }
  .note-black {
    margin: 0px 0px 0px 0px;
    font-size: 14px;
    text-align: left;
  }
  .note-red {
    margin: 0px 0px 0px 0px;
    font-size: 14px;
    color: red;
    width: 100%;
  }
  .paybtn {
    width: 30%;
    border-radius: 5px !important;
    background-color: #00d88d;
    height: min-content;
    margin-top: 40px;
    font-weight: bold;
  }
  .btn-2 {
    width: 30%;
    border-radius: 5px !important;
    background-color: grey;
    height: min-content;
    margin-top: 20px;
    font-weight: bold;
  }
  .btn-1 {
    width: 30%;
    border-radius: 5px !important;
    background-color: #00d88d;
    height: min-content;
    margin-top: 20px;
    font-weight: bold;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      float: left;
      margin-bottom: 8px;
    }
  }
  .btn-1-grey {
    width: 30%;
    border-radius: 5px !important;
    background-color: grey;
    cursor: not-allowed;
    height: min-content;
    margin-top: 40px;
    font-weight: bold;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      float: left;
      margin-bottom: 8px;
    }
  }
  input[type="checkbox"] {
    -ms-transform: scale(2); /* IE 9 */
    -webkit-transform: scale(2); /* Chrome, Safari, Opera */
    transform: scale(2);
  }
  .paybtn-down {
    width: 30%;
    border-radius: 5px !important;
    background-color: #00d88d;
    height: min-content;
    font-weight: bold;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      margin-top: 30px;
      width: 35%;
      font-size: 12px;
    }
  }
  .paybtn-grey {
    width: 30%;
    border-radius: 5px !important;
    background-color: grey;
    cursor: not-allowed;
    height: min-content;
    margin-top: 40px;
    font-weight: bold;
  }
  .otpbtn {
    width: 90%;
    border-radius: 5px !important;
    background-color: #00d88d;
    font-weight: bold;
  }
  .loader {
    height: 100%;
    min-height: 850px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lds-dual-ring {
    display: inline-block;
    width: 180px;
    height: 180px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 164px;
    height: 164px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #00d88d;
    border-color: #00d88d transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  .agreement {
    text-align: justify;
    font-size: 15px;
    font-weight: normal;
    margin: 50px 10px 0 10px;
    display: flex;

    a {
      color: #0000ee;
    }
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const ListGroup = styled.div`
  column-count: 1;
  color: white;
  font-size: 1.2rem;
  margin: 60px 10px 0 10px;
  text-align: justify;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    margin-top: 25px;
  }

  @media only screen and (max-width: 411px) {
    column-count: 1;
  }
  .list-item {
    display: flex;
    margin-bottom: 20px;
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 12px;
    }
    &:not(:last-child) {
      margin-bottom: 45px;
    }
    i {
      margin-right: 8px;
    }
  }
`;
export default OnBoardWrapper;
