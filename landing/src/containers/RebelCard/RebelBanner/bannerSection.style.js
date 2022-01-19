import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const BannerWrapper = styled.section`
  padding-bottom: 0px;
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .contain {
    display: none;
    @media (max-width: 768px) {
      display: block;
      max-height: 40vh;
    }
  }
  .back {
    background-image: url("/images/rebel/RedCarpet Rebel Card.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .lfm__typing_effect_text {
    color: #50a1ff;
  }
  .input-row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
  .input {
    width: 80%;
    display: block;
    @media (max-width: 990px) {
      width: 100%;
    }
  }
  input {
    border-color: black;
  }
  .btn {
    width: 45%;
    font-weight: bold;
    margin: 20px 10px 20px 10px;
    border-radius: 5px;
    background-color: #dd285d;
    @media (max-width: 990px) {
      width: 55%;
    }
    @media (max-width: 768px) {
      width: 100%;
      margin: 15px 0 15px 0;
    }
  }
  .pad {
    padding-top: 0px;
    @media (max-width: 990px) {
      padding-top: 0px;
    }
    @media (max-width: 767px) {
      padding-top: 0px;
    }
  }

  position: relative;
  overflow: hidden;
  @media (max-width: 990px) {
    max-height: 80vh;
  }
  @media (max-width: 767px) {
    max-height: 150vh;
  }

  @media only screen and (max-width: 480px) {
    background: none;
  }

  .particle {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    @media (max-width: 767px) {
      display: none;
    }
    @media only screen and (max-width: 480px) {
      width: 100%;
    }
  }

  .row {
    position: relative;
    z-index: 1;
  }

  .button__wrapper {
    margin-top: 40px;
    @media (max-width: 767px) {
      margin-bottom: 30px;
    }
    .reusecore__button {
      &.outlined {
        border-color: rgba(82, 104, 219, 0.2);
      }
    }
  }
  h1 {
    font-size: 2.5em;
    @media (max-width: 768px) {
      font-size: 1.75em;
    }
  }
`;

const BannerObject = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    display: none;
  }
  .objectWrapper {
    margin-left: auto;
    position: relative;
    .dashboardWrapper {
      position: absolute;
      top: 0;
      right: 0;
      .chatObject {
        position: absolute;
        top: 20px;
        left: 120px;
      }
    }
  }
`;

const DiscountLabel = styled.div`
  display: inline-block;
  border-radius: 4em;
  border: 1px solid ${themeGet("colors.lightBorder", "#f1f4f6")};
  padding: 7px 25px;
  box-shadow: 0px 7px 25px 0px rgba(22, 53, 76, 0.05);
  margin-bottom: 30px;
  background-color: ${themeGet("colors.white", "#ffffff")};
  @media (max-width: 767px) {
    padding: 7px 15px;
  }
`;

export { DiscountLabel, BannerObject };

export default BannerWrapper;
