import styled from "styled-components";
const CardIssuedWrapper = styled.div`
  .loan-agreement-description {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    li {
      margin: 40px 20px;
    }
    @media only screen and (max-width: 900px) {
      width: 60%;
    }
    @media only screen and (max-width: 700px) {
      width: 80%;
    }
    @media only screen and (max-width: 500px) {
      width: 100%;
    }
  }
  .check-flex-section {
    display: flex;
    margin-top: 5%;
    margin-bottom: 5%;
    align-items: center;
    .flex-checkbox {
      flex: 1;
    }
    .flex-content {
      flex: 11;
    }
    @media only screen and (max-width: 520px) {
      .flex-content {
        margin-left: 10px;
      }
    }
  }
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
  .col30 {
    width: 30% !important;
    display: block;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 20% !important;
    }
  }
  .cong, .cong-reject {
    font-size: 30px;
    color: #00d88d;
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

  .confirmation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 100px;
    .confirmation-buttons {
      display: flex;
      flex-direction: row;
      width: 40%;
      margin-top: 20px;
      @media (max-width: 800px) {
        width: 60%;
      }
      @media (max-width: 600px) {
        width: 80%;
      }
    }
    Button {
      background-color: #dd285d;
      border-radius: 0.4rem;
      margin-bottom: 5%;
      margin-right: 5%;
      width: 100%;
    }
  }
`;

export default CardIssuedWrapper;
