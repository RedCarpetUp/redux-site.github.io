import styled from "styled-components";
const WaitListWrapper = styled.div`
  .row-left {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
    width: 100%;
  }
  .line {
    border: 1px solid #00d88d;
    width: 90%;
  }
  .black-line {
    border: 1px solid black;
    width: 90%;
  }
  .waiting-img {
    display: block;
    margin: 0 auto;
  }
  .col30 {
    width: 30% !important;
    display: block;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 20% !important;
    }
  }
  .cong {
    font-size: 30px;
    color: #00d88d;
  }
  .user-name {
    font-size: 30px;
  }
  .col70 {
    width: 70%;
    display: block;
    text-align: -webkit-left;
    font-size: 35px;
    font-weight: bold;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 80% !important;
      font-size: 26px !important;
    }
  }
  .row {
    flex-direction: column;
    text-align: center;
    font-size: 20px;
    margin: 30px 30px 0px 30px;
  }
  .refresh {
    text-align: right;
    padding-right: 20px;
    padding-top: 20px;
    cursor: pointer;
    color: #00d88d;
  }

  .btn {
    width: 30%;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 20px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #00d88d;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-right: 0px;
    }
  }
  .btn-light {
    width: 30%;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #00d88d;
    background-color: white;
    color: #00d88d;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .btn-full {
    width: 61%;
    margin-right: 14px;
    @media (max-width: 768px) {
      width: 90%;
    }
  }
  .history-tracking {
    text-align: center;
    margin-top: -50px;
  }

  .btn-section {
    text-align: center;
  }
`;

export const Loader = styled.div`
  .loader {
    border: 5px solid #f3f3f3;
    border-top-color: #00d88d;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    width: 3rem;
    height: 3rem;
    animation: spin 0.5s linear infinite;
    @media (max-width: 400px) {
      border: 5px solid #f3f3f3;
      border-top-color: #00d88d;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
    }
    @media (max-height: 700px) {
      border: 5px solid #f3f3f3;
      border-top-color: #00d88d;
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
  .lds-dual-ring {
    display: inline-block;
    width: 180px;
    height: 180px;
  }
`;

export default WaitListWrapper;
