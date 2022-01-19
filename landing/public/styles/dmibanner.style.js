import styled from 'styled-components';

const BannerWrap = styled.section`
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

export { BannerObject };

export default BannerWrap;
