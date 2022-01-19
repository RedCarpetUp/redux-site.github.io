import styled from "styled-components";

const ImageWrapper = styled.div`
  .logo-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  img {
    width: 250px;
    height: 115px;
    vertical-align: middle;
    @media (max-width: 650px) {
      width: 150px;
      height: 60px;
    }
    @media (max-width: 410px) {
      width: 110px;
      height: 40px;
    }
  }

  .logo-left {
    align-self: left;
  }

  .logo-right {
    align-self: right;
  }
`;

const ContentWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 160px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  position: relative;
  overflow: hidden;
  @media (max-width: 990px) {
    padding-bottom: 60px;
    min-height: auto;
  }
  @media (max-width: 767px) {
    padding-bottom: 20px;
    min-height: auto;
  }
  @media (max-width: 650px) {
    padding-top: 85px;
  }

  @media only screen and (max-width: 480px) {
    background: none;
  }
`;

export { ContentWrapper };

export default ImageWrapper;
