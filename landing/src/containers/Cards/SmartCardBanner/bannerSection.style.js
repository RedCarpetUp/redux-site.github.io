import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const BannerWrapper = styled.section`
  .feature {
    margin-left: 250px;
    @media (max-width: 1277px) {
      margin-left: 100px;
    }
    @media (max-width: 990px) {
      margin-left: 0px;
    }
  }
  padding-top: 210px;
  padding-bottom: 160px;
  background-image: linear-gradient(
    135deg,
    rgb(249, 247, 255) 0%,
    rgb(255, 255, 255) 50%,
    rgb(246, 243, 255) 100%
  );
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  @media (max-width: 990px) {
    padding-top: 200px;
    padding-bottom: 60px;
    min-height: auto;
  }
  @media (max-width: 767px) {
    padding-top: 200px;
    padding-bottom: 0;
    min-height: auto;
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
    // display: none;
  }
  .objectWrapper {
    margin-left: 10%;
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