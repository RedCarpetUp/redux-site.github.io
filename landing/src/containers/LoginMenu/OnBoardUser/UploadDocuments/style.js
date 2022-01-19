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
    background-color: #dd285d;
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
    background-color: #dd285d;
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
  @media only screen and (max-width: 360px) {
    margin-bottom: 50px;
  }
  @media only screen and (max-width: 360px) {
      border: 2px solid #dd285d;
      p {
        margin: 10px;
      }
    }
  .progress {
    border-radius: 50%;
    border: 5px solid #dd285d;
    background: white;
    p {
      margin: 15px;
      color: black;
    }
    @media only screen and (max-width: 500px) {
      border: 2px solid #dd285d;
      p {
        margin: 10px;
      }
    }
    
  }
  .progressed {
    border-radius: 50%;
    border: 5px solid #dd285d;
    background: #dd285d;
    p {
      margin: 15px;
      color: white;
    }
    @media only screen and (max-width: 500px) {
      border: 2px solid #dd285d;
      p {
        margin: 10px;
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
