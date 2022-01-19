import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import mapImage from "common/assets/image/charity/map-alt.png";

const SectionWrapper = styled.div`
  width: 100%;
  padding: 130px 0 100px;
  margin: 0;
  min-height: 100vh;
  background-color: ${themeGet("colors.heading", "#060F1E")};
  background-image: url(${mapImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  .btn_text {
    color: ${themeGet("colors.secondary", "#D50032")};
    cursor: pointer;
  }
  .btn_text:hover {
    color: #00f;
  }
  .show_keyboard {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(109, 114, 121);
    font-size: 14px;
    font-weight: lighter;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 1440px) {
    margin: 0px 0;
    padding: 120px 0 100px;
  }
  @media only screen and (min-width: 992px) and (max-width: 1360px) {
    margin: 0;
    padding: 100px 0 110px;
    .row {
      > .col {
        &:first-child {
          width: 53%;
        }
        &:last-child {
          width: 47%;
        }
      }
    }
  }
  @media only screen and (max-width: 991px) {
    margin: 0;
    padding: 80px 0 100px;
  }
  @media only screen and (max-width: 667px) {
    .row {
      > .col {
        width: 100%;
      }
    }
  }
`;

export const ContentArea = styled.div`
  padding-right: 99px;
  @media only screen and (max-width: 1440px) {
    padding-right: 40px;
  }
  @media only screen and (max-width: 1360px) {
    padding-right: 0;
  }
  @media only screen and (max-width: 667px) {
    max-width: 465px;
  }

  > p {
    color: ${themeGet("colors.white", "#ffffff")};
    font-size: 18px;
    @media only screen and (max-width: 1440px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 1360px) {
      font-size: 15px;
    }
    @media only screen and (max-width: 991px) {
      line-height: 30px;
    }
  }
`;

export const Heading = styled.h2`
  font-size: 35px;
  line-height: 50px;
  font-weight: 300;
  margin: 0 0 20px;
  color: ${themeGet("colors.white", "#ffffff")};
  @media only screen and (max-width: 1440px) {
    font-size: 36px;
    line-height: 54px;
    margin: 0 0 27px;
  }
  @media only screen and (max-width: 1360px) {
    font-size: 34px;
    line-height: 52px;
    margin-bottom: 25px;
  }
  @media only screen and (max-width: 991px) {
    font-size: 30px;
    line-height: 46px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 767px) {
    font-size: 28px;
    line-height: 40px;
  }

  span {
    color: ${themeGet("color.primary", "#FCF22B")};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 56px;
  @media only screen and (max-width: 1360px) {
    margin-top: 50px;
  }
  @media only screen and (max-width: 991px) {
    margin-top: 40px;
    align-items: flex-start;
    flex-direction: column;
  }
  @media only screen and (min-width: 481px) and (max-width: 667px) {
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
  }
  @media only screen and (max-width: 480px) {
    margin-top: 30px;
  }

  .learn__more-btn {
    color: ${themeGet("color.primary", "#FCF22B")} !important;

    &::before {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }

    .hyphen {
      background-color: ${themeGet("color.primary", "#FCF22B")}!important;
    }

    &:hover {
      color: ${themeGet("colors.heading", "#060F1E")}!important;

      &::before {
        background-color: ${themeGet("color.primary", "#FCF22B")}!important;
      }

      .hyphen {
        background-color: ${themeGet("colors.heading", "#060F1E")}!important;
      }
    }

    &.alt {
      color: ${themeGet("colors.heading", "#060F1E")}!important;

      &::before {
        width: 100%;
        background-color: ${themeGet("color.primary", "#FCF22B")}!important;
      }

      .hyphen {
        background-color: ${themeGet("colors.heading", "#060F1E")}!important;
      }
    }
  }

  p {
    margin: 0;
    color: ${themeGet("colors.white", "#ffffff")};
    font-size: 14px;
    font-weight: 700;
    padding: 0 22px;
    @media only screen and (max-width: 991px) {
      padding: 7.5px 0;
      opacity: 0;
    }
    @media only screen and (min-width: 481px) and (max-width: 667px) {
      padding: 0 20px;
      opacity: 1;
    }
  }
`;

export const DonationForm = styled.form`
  padding: 50px;
  border-radius: 10px;
  background-color: ${themeGet("colors.white", "#ffffff")};
  @media only screen and (max-width: 1440px) {
    padding: 50px 45px;
  }
  @media only screen and (max-width: 1360px) {
    padding: 40px 35px;
  }
  @media only screen and (max-width: 991px) {
    padding: 30px 20px;
  }
  @media only screen and (max-width: 667px) {
    max-width: 448px;
  }
  @media only screen and (max-width: 480px) {
    margin-top: 20px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .input_group {
    input {
      @media only screen and (max-width: 1360px) {
        width: calc(100% - 140px);
        padding: 0 15px;
        font-size: 15px;
        height: 56px;
      }
      @media only screen and (max-width: 991px) {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      @media only screen and (max-width: 480px) {
        width: calc(100% - 110px);
        margin-bottom: 10px;
      }
    }
    .select_wrapper {
      @media only screen and (max-width: 1360px) {
        width: 140px;
      }
      @media only screen and (max-width: 480px) {
        width: 110px;
      }
      .current_option {
        @media only screen and (max-width: 1360px) {
          height: 56px;
        }
        @media only screen and (max-width: 991px) {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        .text {
          @media only screen and (max-width: 1360px) {
            font-size: 15px;
            margin-right: 10px;
          }
        }
        svg {
          @media only screen and (max-width: 1360px) {
            width: 12px;
            height: auto;
          }
        }
      }
      .dropdown {
        @media only screen and (max-width: 1360px) {
          top: 56px;
        }
        @media only screen and (max-width: 991px) {
          border-radius: 5px;
        }
      }
    }
  }

  .radio_group {
    margin-top: 50px;
    @media only screen and (max-width: 1440px) {
      margin-top: 45px;
    }
    @media only screen and (max-width: 1360px) {
      margin-top: 35px;
    }
    @media only screen and (max-width: 991px) {
      margin-top: 25px;
    }
    @media only screen and (max-width: 480px) {
      flex-direction: column;
      margin: 0;
    }

    label {
      @media only screen and (max-width: 1360px) {
        padding: 10px 15px;
      }
      @media only screen and (max-width: 480px) {
        width: 100%;
        margin: 10px 0;
      }
      &.active {
        border-color: ${themeGet("colors.primary", "#FCF22B")};
        background-color: ${themeGet("colors.primary", "#FCF22B")};
      }

      h4 {
        font-size: 20px;
        font-weight: 600;
        @media only screen and (max-width: 1440px) {
          font-size: 16px;
          margin-bottom: 5px;
        }
        @media only screen and (max-width: 1360px) {
          font-size: 15px;
        }
      }

      p {
        color: ${themeGet("colors.text", "#294859")};
        font-size: 14px;
        @media only screen and (max-width: 1360px) {
          font-size: 13px;
        }
      }
    }
  }
`;

export const DonateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 65px;
  border: 0;
  font-size: 20px;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  color: ${themeGet("colors.white", "#ffffff")};
  background-color: ${themeGet("colors.secondary", "#D50032")};
  position: relative;
  overflow: hidden;
  z-index: 1;
  margin-top: 50px;
  text-transform: uppercase;
  @media only screen and (max-width: 1440px) {
    font-size: 18px;
    height: 60px;
    margin-top: 45px;
  }
  @media only screen and (max-width: 1360px) {
    font-size: 16px;
    margin-top: 35px;
    height: 56px;
  }
  @media only screen and (max-width: 991px) {
    font-size: 14px;
    margin-top: 25px;
    height: 54px;
    border-radius: 5px;
  }
  @media only screen and (max-width: 480px) {
    margin-top: 20px;
    width: 100%;
  }

  img {
    margin-left: 13px;
  }

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: -100%;
    z-index: -1;
    opacity: 0;
    visibility: hidden;
    background: repeating-linear-gradient(
      -45deg,
      ${themeGet("colors.secondary", "#D50032")},
      ${themeGet("colors.secondary", "#D50032")} 10px,
      ${themeGet("colors.secondaryHover", "#FF282F")} 10px,
      ${themeGet("colors.secondaryHover", "#FF282F")} 20px
    );
    transition: all 0.45s ease;
    @media only screen and (max-width: 1440px) {
      background: repeating-linear-gradient(
        -45deg,
        ${themeGet("colors.secondary", "#D50032")},
        ${themeGet("colors.secondary", "#D50032")} 8px,
        ${themeGet("colors.secondaryHover", "#FF282F")} 8px,
        ${themeGet("colors.secondaryHover", "#FF282F")} 16px
      );
    }
  }

  &:hover {
    &::before {
      left: 0;
      opacity: 0.2;
      visibility: visible;
    }
  }
`;

export const AgreementContainer = styled.div`
  margin: 30px 0px 30px 0;
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .col60 {
    width: 75%;
    border-radius: 20px;
    display: block;
    text-align: -webkit-center;
    background-color: white;
    box-shadow: 0 0.2px 16px 0 rgba(0, 0, 0, 0.04),
      0 1px 9px 0 rgba(0, 0, 0, 0.04);
    transition: 0.3s;
    margin-top: 1rem;
    margin-bottom: 1rem;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
    }
  }
  .col30 {
    width: 40%;
    display: block;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 25%;
    }
  }
  .row-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
  }
  .line {
    border: 1px solid #dd285d;
    width: 90%;
  }
  .col80 {
    width: 80%;
    display: block;
    text-align: -webkit-center;
    background-color: white;
    margin-top: 1.5rem;
    box-shadow: 0 0.2px 16px 0 rgba(0, 0, 0, 0.04),
      0 1px 9px 0 rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    transition: 0.3s;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .inputPayCombo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px 60px 0px 60px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding: 10px 10px 0px 10px;
    }
  }
  .payinput {
    width: 70%;
    margin: 10px 10px 10px 0px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      font-size: 15px;
    }
  }
  .paybtn-down {
    width: 30%;
    border-radius: 5px !important;
    background-color: #dd285d;
    height: min-content;
    font-weight: bold;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 35%;
      font-size: 12px;
    }
  }
  .col100 {
    width: 100%;
    display: block;
    text-align: -webkit-center;
  }
  .col10 {
    width: 12%;
    text-align: -webkit-center;
  }
  .col90 {
    width: 85%;
    text-align: -webkit-justify;
  }
  .btn-full {
    margin-top: 40px;
    margin-bottom: 20px;
    width: 60%;
    border-radius: 5px;
    background-color: #dd285d;
    font-weight: bold;
  }
  h1 {
    font-weight: bold;
  }
  label {
    text-align: left;
    display: block;
    color: #767676;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 15px;
    -webkit-transition: 0.2s ease all;
    transition: 0.2s ease all;
  }
  input[type="checkbox"] {
    -ms-transform: scale(2); /* IE 9 */
    -webkit-transform: scale(2); /* Chrome, Safari, Opera */
    transform: scale(2);
  }
  @media only screen and (min-width: 0px) and (max-width: 991px) {
    margin: 20px;
  }
`;

export default SectionWrapper;
