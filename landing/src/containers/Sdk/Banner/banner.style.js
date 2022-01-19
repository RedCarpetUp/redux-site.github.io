import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const BannerWrapper = styled.div`
  padding-top: 100px;
  padding-bottom:25px;
  min-height: 802px;
  overflow: hidden;
  background-color: ${themeGet("colors.light", "#FAFBFF")};
  @media only screen and (min-width: 1201px) and (max-width: 1440px) {
    min-height: 100vh;
  }
  @media only screen and (max-width: 480px) {
    padding-top: 120px;
  }
  > div.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: calc(802px - 100px);
    @media only screen and (min-width: 1201px) and (max-width: 1440px) {
      min-height: calc(100vh - 100px);
    }
    @media only screen and (max-width: 480px) {
      flex-wrap: wrap;
    }
  }
`;

export const BannerContent = styled.div`
  max-width: 550px;
  width: 100%;
  @media only screen and (max-width: 991px) {
    flex-shrink: 0;
    max-width: 360px;
  }

  h1 {
    font-size: 32px;
    line-height: 42px;
    font-weight: 700;
    color: ${themeGet("colors.menu", "#0D233E")};
    margin-bottom: 24px;
    @media only screen and (max-width: 1366px) {
      font-size: 32px;
      line-height: 42px;
      margin-bottom: 20px;
    }
  }

  p {
    color: #6d7279;
    font-size: 16px;
    line-height: 29px;
  }
`;

export const RatingInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  color: ${themeGet("colors.menu", "#0D233E")};

  .rating {
    margin-right: 10px;
    .star {
      color: ${themeGet("colors.yellow", "#FFA740")};
    }
    .star-o {
      color: #e8e8e8;
    }
  }

  img {
    margin-left: 9px;
  }
`;

export const BannerImage = styled.div`
  flex-shrink: 0;
  align-self: flex-end;
  @media only screen and (max-width: 480px) {
    margin-bottom: 40px;
    img {
      max-width: 70%;
    }
  }
`;

export const ButtonGroup = styled.div`
  margin-top: 35px;
  display: flex;
  align-items: center;
  border-radius:15px;

  .btn {
    @media (max-width: 767px) {
      padding-top: 10px !important;
      padding-left: 0.2rem !important;
    }
    padding-left: 1rem;
    cursor:pointer;
  }

  .imag {
    max-width:180px
  }
`;

export default BannerWrapper;
