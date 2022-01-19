import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const SectionWrapper = styled.section`
  overflow: hidden;
  color: black;
  background: rgb(255, 123, 162);
  background: linear-gradient(
    180deg,
    rgba(255, 123, 162, 1) 0%,
    rgba(221, 40, 93, 1) 100%
  );
  @media only screen and (max-width: 1366px) {
    padding: 60px 0;
  }
  @media only screen and (max-width: 667px) {
    padding: 45px 0;
  }
  .box-1,
  .box-2,
  .box-3 {
    margin: 10px;
  }
  .box-1,
  .box-2 {
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    height: 150px;
    width: 200px;
    padding: 30px;
  }
  .box-3 {
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    height: 150px;
    width: 420px;
    padding: 30px;
  }
`;

export const FeatureWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  color: white !important;
  @media only screen and (max-width: 1366px) {
    max-width: 100%;
  }
  @media only screen and (max-width: 497px) {
    margin: 0;
    .box-1,
    .box-2,
    .box-3 {
      padding: 10px;
      height: 120px;
    }
    .box-1,
    .box-2 {
      width: 152px;
    }
    .box-3 {
      width: 320px;
    }
  }
  @media only screen and (max-width: 401px) {
    margin: 0;
    .box-1,
    .box-2,
    .box-3 {
      padding: 10px;
      height: 95px;
      line-height: 0;
    }
    .box-1,
    .box-2 {
      width: 125px;
    }
    .box-3 {
      width: 270px;
    }
  }
  @media only screen and (max-width: 347px) {
    .box-1,
    .box-2 {
      width: 100px;
    }
    .box-3 {
      width: 220px;
    }
  }

  > div {
    width: calc(100% / 3 - 27px);
    margin: 15px 0 30px;
    @media only screen and (max-width: 991px) {
      width: calc(100% / 2);
    }
  }

  .feature__block {
    text-align: left;
    .icon__wrapper {
      max-width: 115px;
      margin: 0 auto 27px;
      position: relative;
      @media only screen and (max-width: 1366px) {
        margin-bottom: 25px;
      }
      img {
        display: inline-block;
        @media only screen and (max-width: 1366px) {
          height: 90px;
        }
        @media only screen and (max-width: 769px) {
          height: 80px;
        }
      }
      i {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        transition: all 0.5s cubic-bezier(0.75, -0.5, 0, 1.75);
        &.plus {
          top: 0;
          left: 0;
          transform: translate(20px, 20px) scale(0.1) rotate(-180deg);
        }
        &.circle {
          top: 0;
          right: 0;
          transform: translate(-20px, 20px) scale(0.1) rotate(-180deg);
        }
        &.star {
          bottom: -5px;
          left: calc(50% - 8px);
          transform: translate(0, -20px) scale(0.1) rotate(-180deg);
        }
      }
    }
    .content__wrapper {
      max-width: 375px;
      margin: 0 auto;
      h3 {
        font-size: 1.4em;
        line-height: 28px;
        font-weight: 500;
        margin-bottom: 15px;
        font-weight: bold;
        color: #666666;
      }
      p {
        font-size: 0.9em;
        line-height: 26px;
        padding: 0 10px;
        margin: 0;
        color: #666666;
      }
      @media only screen and (max-width: 400px) {
        p {
          line-height: 15px;
          font-size: 0.7em;
        }
        h3 {
          font-size: 1.2em;
          line-height: 15px;
        }
      }
    }
    &:hover {
      .icon__wrapper {
        i {
          opacity: 1;
          visibility: visible;
          &.plus {
            transform: translate(-4px, -4px) scale(1) rotate(180deg);
          }
          &.circle {
            transform: translate(4px, -4px) scale(1) rotate(180deg);
          }
          &.star {
            transform: translate(0, 13px) scale(1) rotate(180deg);
          }
        }
      }
    }
  }
`;

export default SectionWrapper;
