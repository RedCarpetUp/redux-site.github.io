import styled from 'styled-components';

const CardSection = styled.section`
  .contentHeadingDiv {
    text-align: center;
    width: 100%;
  }
  .cardsDiv {
    margin: 0 auto;
    padding: 3rem 0;
    text-align: center;
    img {
      margin: 0 auto;
    }
    h5,
    p {
      padding: 1rem 0;
    }
  }

  .contentDiv {
    width: 100%;
  }

  .section {
    color: rgba(255, 255, 255, 0.85);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 146px;
    padding-bottom: 90px;
  }
  .section::before {
    opacity: 0.7;
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #151515;
    border-radius: inherit;
  }
  .textDiv {
    margin: 0 auto;
    h1 {
      color: #fff;
    }
    p {
      font-size: 1.17rem;
      color: rgba(255, 255, 255, 0.85);
      opacity: 0.9;
      margin-top: 2rem;
    }
  }
  .mainDiv {
    margin: 0 auto;
  }
  .benefitImage {
    // height: 300px!important;
    max-height: 100%;
  }
  .textDivBenefit {
    p {
      font-size: 4.6875rem;
      font-weight: 900;
      line-height: 1;
      opacity: 0.1;
    }
  }
  .trackingText {
    color: #fff;
    font-weight: 300;
  }

  .input {
    input {import { themeGet } from 'styled-system';
      border-radius: 10rem !important;
    }
  }

  .flipCardImage {
    margin-right: 0px !important;
  }
  .flipCardText {
    margin-left: 0px !important;
  }
  @media screen and (max-width: 768px) {
    .flipCardImage {
      margin: 0 auto !important;
    }
  }

  .mobile_banner_image {
    @media (max-width: 767px) {
      position: relative !important;
      left: -40px !important;
      width: 135% !important;
      display: block !important;
    }
  }
`;

export default CardSection;
