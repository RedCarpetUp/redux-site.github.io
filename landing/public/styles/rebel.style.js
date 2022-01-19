import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const RebelCardWrapper = styled.div`
  .emi-reset-details {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .refresh-row {
    width: 25%;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
    }
  }
  .refresh-btn {
    text-align: right;
    cursor: pointer;
    padding-top: 20px;
    padding-bottom: 30px;
    padding-right: 20px;
    color: #dd285d;
    text-decoration: underline;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      text-align: center;
      padding: 0px;
    }
  }

  .col50-right {
    width: 15%;
    display: block;
    text-align: -webkit-center;
    font-weight: bold;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 15%;
    }
  }
  .col50-left {
    width: 85%;
    display: block;
    text-align: -webkit-left;
    padding-left: 15px;
    font-weight: bold;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 85%;
    }
  }
  .card {
    height: 15%;
    min-height: 8vh;
    text-align: center;
    border: 1px solid #dd285d;
    border-radius: 5px;
    width: 80%;
    z-index: 9;
    margin: 10px 0 10px 0;
  }
  .card-green {
    height: 15%;
    min-height: 8vh;
    text-align: center;
    border: 2.5px solid #33ff00;
    border-radius: 5px;
    width: 80%;
    z-index: 9;
    margin: 10px 0 10px 0;
  }
  .row-emi {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .reset-card-image {
    position: relative;
    color: white;
  }

  .available-limit {
    position: absolute;
    top: 15%;
    left: 36.5%;
    font-weight: bold;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      left: 18%;
    }
    @media only screen and (min-width: 0px) and (max-width: 750px) {
      left: 22%;
    }
    @media only screen and (min-width: 0px) and (max-width: 650px) {
      left: 19%;
    }
  }
  .cardholder-name {
    position: absolute;
    top: 140px;
    left: 36.5%;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      position: absolute;
      left: 18%;
    }
    @media only screen and (min-width: 0px) and (max-width: 750px) {
      left: 22%;
    }
    @media only screen and (min-width: 0px) and (max-width: 650px) {
      left: 19%;
    }
  }
  .card-number {
    position: absolute;
    top: 220px;
    left: 36.5%;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      position: absolute;
      left: 18%;
    }
    @media only screen and (min-width: 0px) and (max-width: 750px) {
      left: 22%;
    }
    @media only screen and (min-width: 0px) and (max-width: 650px) {
      left: 19%;
    }
  }
  .valid-till {
    position: absolute;
    top: 295px;
    left: 36.5%;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      position: absolute;
      left: 18%;
    }
    @media only screen and (min-width: 0px) and (max-width: 850px) {
      left: 20%;
    }
    @media only screen and (min-width: 0px) and (max-width: 750px) {
      left: 22%;
    }
    @media only screen and (min-width: 0px) and (max-width: 650px) {
      left: 19%;
    }
  }
  .cvv {
    position: absolute;
    top: 360px;
    left: 36.5%;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      position: absolute;
      left: 18%;
    }
    @media only screen and (min-width: 0px) and (max-width: 750px) {
      left: 22%;
    }
    @media only screen and (min-width: 0px) and (max-width: 650px) {
      left: 19%;
    }
  }

  .emi-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .emi-details-list {
    background-color: white;
    color: #dd285d;
    width: 100%;
  }

  .arrow {
    display: block;
    width: 10%;
  }

  .emi-box {
    display: block;
    width: 80%;
    border: 1px solid #dd285d;
    margin: 10px 0 10px 0;
  }
  .emi-data {
    display: block;
    width: 70%;
    text-align: left;
  }

  .details-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  .reset-box {
    border: 1px solid #dd285d;
    text-align: center;
    width: 40%;
    margin: 10px;
    @media (max-width: 768px) {
      margin-bottom: 10px;
      width: 80%;
    }
  }

  .col25 {
    width: 30%;
  }

  .form-control-tenure {
    padding: 10px;
    width: 50%;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding: 10px 10px 10px 10px;
      width: 100%;
    }
  }

  .reset-line {
    margin-top: -20px;
    width: 100%;
    border: 2px solid #dd285d;
  }
  .reset-col {
    margin-left: -50px;
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      visibility: hidden;
    }
  }

  .row-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
  }

  .line {
    border: 1px solid #dd285d;
    width: 90%;
    @media (max-width: 768px) {
      width: 70%;
    }
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
    font-weight: 300;
    text-align: -webkit-left;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 75%;
      font-size: 13px;
    }
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

  .text-center {
    text-align: -webkit-center;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  h1,
  h2 {
    font-weight: 500;
  }
  h3 {
    font-weight: 600;
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

  .reset-card-image {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .reset-button {
    display: flex;
    justify-content: space-around;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

  .btn {
    width: 45%;
    font-weight: bolder;
    margin: 20px 10px 20px 10px;
    border-radius: 5px;
    background-color: #dd285d;
    @media (max-width: 1125px) {
      width: 45%;
      margin: 10px 0 10px 0;
      font-size: 15px;
    }
    @media (max-width: 768px) {
      width: 80%;
      margin: 10px 0 10px 0;
      font-size: 15px;
    }
  }
  .paybtn {
    width: 30%;
    border-radius: 5px !important;
    background-color: #dd285d;
    font-weight: bold;
  }
  .paytbtn-disabled {
    width: 30%;
    border-radius: 5px !important;
    background-color: #dd285d;
    opacity: 0.4;
    pointer-events: none;
    cursor: not-allowed;
  }
  .btn-disabled {
    width: 45%;
    font-weight: bold;
    margin: 20px 10px 20px 10px;
    border-radius: 5px;
    background-color: #c9c3c3;
    color: black;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 80%;
      margin: 10px 0 10px 0;
      font-size: 15px;
    }
  }
`;

export default RebelCardWrapper;