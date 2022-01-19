import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const BannerWrapper = styled.section`
  padding-top: 210px;
  padding-bottom: 160px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  position: relative;
  overflow: hidden;
  @media (max-width: 990px) {
    padding-top: 180px;
    padding-bottom: 60px;
    min-height: auto;
  }
  @media (max-width: 767px) {
    padding-top: 130px;
    padding-bottom: 20px;
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

  .update-screen-tab {
    border: 0;
    overflow: initial;
    .rc-tabs-ink-bar {
      display: none !important;
    }
    .rc-tabs-bar {
      border: 0;
    }
    .rc-tabs-nav-container {
      margin-bottom: 40px;
      &:not(.rc-tabs-nav-container-scrolling) {
        .rc-tabs-nav-scroll {
          width: 100%;
          text-align: center;
          .rc-tabs-nav {
            float: none;
            display: block;
            .rc-tabs-tab {
              display: inline-block;
              float: none;
            }
          }
        }
      }
      .rc-tabs-tab {
        font-size: 18px;
        color: #323d47;
        font-weight: 400;
        min-width: 230px;
        padding: 0 0 27px 0;
        text-align: center;
        margin-right: 20px;
        transition: 0.25s ease-in-out;
        &:hover {
          color: #b9a0c9;
        }
        &:last-child {
          margin-right: 0;
        }
        &:before,
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          display: block;
          @media (max-width: 767px) {
            display: none;
          }
        }
        &:before {
          background: rgba(0, 0, 0, 0.08);
        }
        &:after {
          background: #b9a0c9;
          transform: scaleX(0);
          transform-origin: right center 0;
          transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
        }
        &.rc-tabs-tab-active {
          color: #b9a0c9;
          &:after {
            transform: scaleX(1);
            transform-origin: left center 0;
            transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
          }
        }
        > div {
          margin-right: 8px;
        }
        @media (max-width: 1199px) {
          font-size: 16px;
          padding: 0 0 20px 0;
          min-width: 170px;
        }
        @media (max-width: 990px) {
          min-width: auto;
          padding: 0 10px 15px 10px;
        }
        @media (max-width: 767px) {
          font-size: 14px;
          padding: 0;
          svg {
            width: 20px;
          }
        }
      }
    }
    .rc-tabs-content {
      .rc-tabs-tabpane {
        overflow: hidden;
        &.rc-tabs-tabpane-active {
          animation: 0.7s ScaleInUp;
        }
        > img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      }
    }
  }

  .rc-tabs-tab-prev-icon,
  .rc-tabs-tab-next-icon {
    font-size: 20px;
    color: #fff;
    line-height: 1;
    display: block;
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
  border: 1px solid ${themeGet('colors.lightBorder', '#f1f4f6')};
  padding: 7px 25px;
  box-shadow: 0px 7px 25px 0px rgba(22, 53, 76, 0.05);
  margin-bottom: 30px;
  background-color: ${themeGet('colors.white', '#ffffff')};
  @media (max-width: 767px) {
    padding: 7px 15px;
  }
`;

export { DiscountLabel, BannerObject };

export default BannerWrapper;
