import styled from "styled-components";
const CardPrintingWrapper = styled.div`
  .row {
    flex-direction: column;
    margin: 30px;
    text-align: center;
    font-size: 20px;
  }
  .refresh {
    text-align: right;
    padding-right: 20px;
    padding-top: 20px;
    cursor: pointer;
    color: #dd285d;
  }
  .cong {
    color: #dd285d;
    font-weight: bold;
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

export default CardPrintingWrapper;
