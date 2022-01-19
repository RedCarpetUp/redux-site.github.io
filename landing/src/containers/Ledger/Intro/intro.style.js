import styled from "styled-components";

export const ContentWrapper = styled.div`
  .Heading {
    color: #18171e;
    font-size: 60px;
    font-style: normal;
    font-weight: 500;
    line-height: 80px;
    letter-spacing: 0px;
  }
  .Content-1 {
    color: #8d8d8d;
    font-size: 23px;
    font-weight: 500;
    line-height: 35px;
  }
  .Heading,
  .Content-1 {
    width: 70%;
    margin-right: auto;
    margin-left: auto;
  }
  .Heading-2 {
    width: 50%;
    margin-right: auto;
    margin-left: auto;
    color: #18171e;
    font-size: 30px;
    font-weight: 600;
    line-height: 35px;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 5px;
  }
  .Content-2 {
    color: #8d8d8d;
    font-size: 17px;
    text-align: center;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    margin-top: 140px;
  }
  .container {
    width: 30%;
    margin: 10px;
  }
  .description {
    color: #8d8d8d;
    font-size: 14px;
  }
  .ImageContainer {
    width: 50px;
    height: 50px;
    padding: 10px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 16px;
  }

  @media only screen and (max-width: 1000px) {
    .row {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 70px;
      .container {
        width: 100%;
      }
    }
    .Heading,
    .Content-1,
    .Heading-2 {
      width: 100%;
      margin-right: 0;
      margin-left: 0;
    }
    .Heading {
      font-size: 40px;
      line-height: 45px;
    }
    .Heading-2 {
      font-size: 20px;
      line-height: 30px;
      text-align: left;
      width: 70%;
      margin-top: 30px;
    }
    .Content-1 {
      font-size: 20px;
    }
    .Content-2 {
      text-align: left;
      margin-top: 20px;
    }
  }

  @media only screen and (max-width: 500px) {
    .Heading {
      font-size: 30px;
    }
    .Heading-2 {
      font-size: 20px;
    }
    .Content-1 {
      font-size: 17px;
      line-height: 24px;
    }
    .Content-2 {
      font-size: 15px;
      line-height: 20px;
    }
  }
`;

export default ContentWrapper;
