import styled from "styled-components";

const PayProcessingFeeWrapper = styled.div`
  .row-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
  }
  .line {
    border: 1px solid #dd285d;
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
  }
  .col80 {
    width: 80%;
    display: block;
    text-align: -webkit-center;
    background-color: #fafbfb;
    margin-bottom: 2.5rem;
    margin-top: 2.5rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .inputPayCombo {
    display: flex;
    width: 100%;
    padding: 10px 60px 0px 60px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding: 10px 10px 0px 10px;
    }
  }
  .payinput {
    width: 70%;
    margin: 10px 10px 10px 0px;
    text-align: left;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      font-size: 12px;
    }
  }
  .payinput-right {
    width: 40%;
    margin: 10px 0px 10px 10px;
    text-align: right;
    font-size: 22px;
    font-weight: bold;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      font-size: 18px;
    }
  }
  .loader {
    height: 100%;
    min-height: 450px;
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
    border: 6px solid #dd285d;
    border-color: #dd285d transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .text-center {
    text-align: -webkit-center;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .size {
    font-size: 20px;
  }
  .col50 {
    width: 50%;
    text-align: -webkit-center;
  }
  .col60 {
    width: 75%;
    display: block;
    text-align: -webkit-center;
    background-color: white;
    margin-top: 0rem;
    padding: 10px 0 10px 0;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
    }
  }
  .btn {
    width: 35%;
    font-weight: bold;
    margin: 20px 10px 20px 10px;
    border-radius: 5px;
    background-color: #dd285d;
    @media (max-width: 768px) {
      width: 90%;
      margin: 15px 0 15px 0;
    }
  }
  .btn-light {
    width: 35%;
    border-radius: 5px;
    border: 1px solid #dd285d;
    background-color: white;
    color: #dd285d;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 90%;
      margin: 15px 0 15px 0;
    }
  }
  p {
    font-size: 20px;
    margin: 0 10px 0 10px;
    color: grey;
  }
  .remove {
    color: red;
  }

  .remove:hover {
    color: #d81646;
    cursor: pointer;
  }
  .inputPayCombo-coupon {
    display: flex;
    width: 80%;
    @media (max-width: 768px) {
      width: 90%;
    }
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }

  .payinput-coupon {
    width: 70%;
    padding: 0px 10px 0px 10px;
  }

  .paybtn-coupon {
    width: 30%;
    margin-right: 10px;
    border-radius: 5px !important;
    background-color: #dd285d;
  }
  input[type="checkbox"] {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
    transform: scale(1.5);
  }
  .tnc {
    text-align: justify;
    font-size: 18px;
    display: flex;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      margin: 0 10px 0 10px;
    }
  }
  .couponError {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #d93025;
    font-size: 14px;
    font-weight: lighter;
  }
`;

export const ModalSection = styled.section`
  padding: 90px 0;
  @media screen and (max-width: 1440px) {
    padding: 60px 0 30px;
  }
  @media screen and (max-width: 768px) {
    padding: 30px 0;
  }
  @media screen and (max-width: 480px) {
    padding: 0px 0 10px;
  }

  .loader {
    border: 10px solid #f3f3f3;
    border-top-color: #dd285d;
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    animation: spin 0.5s linear infinite;
    @media (max-width: 400px) {
      border: 5px solid #f3f3f3;
      border-top-color: #dd285d;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
    }
    @media (max-height: 700px) {
      border: 5px solid #f3f3f3;
      border-top-color: #dd285d;
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .paybtn {
    width: 40%;
    border-radius: 5px !important;
    background-color: #dd285d;
  }
`;

export default PayProcessingFeeWrapper;
