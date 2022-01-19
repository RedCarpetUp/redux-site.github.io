import styled from "styled-components";

const OTPVerificationWrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
    margin-bottom: 50px;
  }
  h3 {
    margin-top: 50px;
  }
  Input {
    margin-bottom: 30px;
  }
  Button {
    border-radius: 5px;
    margin-right: auto;
    margin-left: auto;
    width: 50%;
    background-color: #00d88d;
  }
  .btn-light {
    border-radius: 5px;
    margin-top: 10px;
    border: 1px solid #00d88d;
    background-color: white;
    color: #00d88d;
    font-weight: bold;
  }
  .info {
    font-style: italic;
    color: rgba(52, 61, 72, 0.8);
    text-align: center;
  }
  @media only screen and (min-width: 0px) and (max-width: 991px) {
    padding: 20px;
    Button {
      width: 80%;
    }
  }
  @media only screen and (min-width: 1000px) {
    align-items: center;
    justify-content: center;
    Button {
      width: 25%;
    }
  }
`;
export default OTPVerificationWrapper;
