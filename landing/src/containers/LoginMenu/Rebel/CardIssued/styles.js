import styled from "styled-components";
const CardIssuedWrapper = styled.div`
  .row-left {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
    width: 100%;
  }
  .line {
    border: 1px solid #dd285d;
    width: 90%;
  }
  .black-line {
    border: 1px solid black;
    width: 90%;
  }
  .col30 {
    width: 30% !important;
    display: block;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 20% !important;
    }
  }
  .cong, .cong-reject {
    font-size: 30px;
    color: #dd285d;
  }
  .user-name-reject, .user-name {
    font-size: 30px;
  }
  .cong-reject {
    @media only screen and (max-width: 700px) {
      font-size: 25px;
    }
  }
  .user-name-reject {
    @media only screen and (max-width: 700px) {
      font-size: 25px;
    }
  }
  .reject-message {
    margin-bottom: 5%;
    font-style: italic;
    margin-top: 0;

    @media only screen and (max-width: 700px) {
      font-size: 17px;
    }
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
    color: #dd285d;
  }

  .btn {
    width: 30%;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 20px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #dd285d;
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
    border: 1px solid #dd285d;
    background-color: white;
    color: #dd285d;
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

export default CardIssuedWrapper;
