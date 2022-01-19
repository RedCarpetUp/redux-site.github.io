import styled from 'styled-components';

const EcommerceSection = styled.section`
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
    .flipCardText {
    }
  }
`;

export default EcommerceSection;
