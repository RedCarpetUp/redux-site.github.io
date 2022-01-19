import styled from "styled-components";

const Section = styled.section`
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

export const ContentWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    /* flex-direction: column-reverse; */
  }
  .fw-400 {
    padding-top: 20px;
  }
  .social-links {
    padding: 10px;
    .social {
      padding: 10px;
    }
  }
  .cont {
    margin-left: 120px;
    @media screen and (max-width: 1440px) {
      margin-left: 60px;
    }
    @media screen and (max-width: 768px) {
      margin-left: 30px;
    }
    @media screen and (max-width: 480px) {
      margin-left: 0px;
    }
  }
`;

export const Content = styled.div`
  width: 38%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  h2 {
    font-family: Arvo;
    font-weight: bold;
    font-size: 36px;
    line-height: 55px;
    letter-spacing: -0.5px;
    color: #0f2137;
    @media screen and (max-width: 768px) {
      font-size: 24px;
      line-height: 35px;
      text-align: center;
    }
    @media screen and (max-width: 480px) {
      font-size: 20px;
      line-height: 35px;
    }
  }
  p {
    font-size: 16px;
    line-height: 36px;
    color: #02073e;
    @media screen and (max-width: 768px) {
      text-align: center;
    }
  }
`;

export const Illustration = styled.figure`
  margin: 0;
  width: 62%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const HelpBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  .icon {
    margin-right: 20px;
    min-width: 60px;
  }
  h4 {
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    color: #0f2137;
    margin: 0;
    @media screen and (max-width: 480px) {
      text-align: left;
    }
  }
  p {
    font-size: 16px;
    line-height: 26px;
    color: #343d48;
    margin: 0;
    @media screen and (max-width: 480px) {
      text-align: left;
    }
  }
`;

export default Section;
