import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
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
  .progress-bar {
    padding: 30px;
  }
  .btn-loading {
    width: 30%;
    margin-top: 10px;
    background-color: #00d88d;
    opacity: 0.65;
    margin-bottom: 20px;
    margin-right: 20px;
    font-weight: bold;
    border-radius: 5px;
    cursor: not-allowed;
    pointer-events: none;
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
  .cong {
    font-size: 30px;
    color: #dd285d;
  }
  .btn-light-loading {
    width: 30%;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #dd285d;
    background-color: white;
    color: #dd285d;
    font-weight: bold;
    opacity: 0.65;
    cursor: not-allowed;
    pointer-events: none;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
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
    font-size: 20px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 75%;
      font-size: 13px;
    }
  }
  h1 {
    font-weight: bold;
  }
  p {
    margin-block-start: 0em;
  }
`;

export const ProgressBarWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 75px;
  .progress {
    border-radius: 50%;
    border: 5px solid #00d88d;
    background: white;
    width: 45px;
    height: 45px;
    p {
      padding-top: 8px;
      padding-left: 11.5px;
      font-size: 20px;
      color: black;
      margin: 0px;
    }
    @media only screen and (max-width: 500px) {
      border: 2px solid #00d88d;
      p {
        padding-top: 9px;
        padding-left: 14px;
      }
    }
  }
  .progressed {
    border-radius: 50%;
    border: 5px solid #00d88d;
    background: #00d88d;
    width: 45px;
    height: 45px;
    p {
      padding-top: 8px;
      padding-left: 11.5px;
      font-size: 20px;
      color: white;
      margin: 0px;
    }
    @media only screen and (max-width: 500px) {
      border: 2px solid #00d88d;
      p {
        padding-top: 9px;
        padding-left: 14px;
      }
    }
  }
  @media only screen and (max-width: 850px) {
    margin-bottom: 50px;
  }
  @media only screen and (max-width: 500px) {
    margin-bottom: 40px;
  }
`;

export default Wrapper;
