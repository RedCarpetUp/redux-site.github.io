import styled from "styled-components";

import { themeGet } from "styled-system";

const AboutUsSection = styled.section`
  .aboutHeader {
    padding: 10rem 0;

    .headerContainer {
      box-shadow: 0 0 60px rgba(0, 0, 0, 0.06);

      padding: 5rem;
    }
  }

  .sliderDiv {
    .sliderTrack {
    }

    .sliderImageDiv {
      max-height: 30rem;

      max-width: 30rem;
    }
  }

  .header {
    text-align: center;

    hr {
      width: 4rem;
    }
  }

  .teamDiv {
    display: flex;

    align-content: flex-start;

    justify-content: center;

    flex-wrap: wrap;

    .teamImgDiv {
      h6 {
        text-align: center;

        margin-top: -2rem;

        color: #fff;

        font-weight: 400;
      }

      img {
        height: 9rem;

        width: 8rem;

        border-radius: 6px;
      }
    }
  }

  .advisors {
    margin: 0 auto;

    h6 {
      letter-spacing: 1px;

      font-weight: 500;

      margin-top: 1.5rem;
    }
  }

  .h125w125 {
    height: 125px;

    width: 125px;
  }

  .partnersDiv {
    text-align: center;
    margintop: 20px;
  }

  .partnersBigDiv {
    text-align: center;
    margintop: 20px;
    color: #383838;
  }

  .partner {
    margin: 20px;
  }

  .backersDivRow {
    margin: 4rem 0;
  }

  .backcolorgrey: {
    background-color: rgba(0, 0, 0, 0.22);
  }

  .aboutPressHeader {
    padding: 3rem 0;

    .headerContainer {
      box-shadow: 0 0 60px rgba(0, 0, 0, 0.26);

      padding: 2rem;
    }
  }

  .backersDiv {
    margin: 1rem;

    img {
      height: 128px;

      width: 128px;

      border-radius: 0.25rem;
    }

    h6 {
      letter-spacing: 0.75px;

      font-weight: 500;
    }

    small {
      text-transform: uppercase;

      letter-spacing: 1px;

      margin-bottom: 1rem;

      margin-top: -10%;
    }
  }

  .openingsDiv {
    color: rgba(255, 255, 255, 0.85);

    background-position: center;

    background-size: cover;

    background-repeat: no-repeat;

    padding-top: 15rem;

    padding-bottom: 15rem;

    text-align: center;

    .openingsText {
      opacity: 0.9;

      h2 {
        color: #fff;
      }

      a {
        color: #fff;
      }
    }
  }

  .openingsDiv::before {
    opacity: 0.7;

    position: absolute;

    content: "";

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    background: #151515;

    border-radius: inherit;
  }

  @media screen and (max-width: 768px) {
    .aboutHeader {
      margin: 0.9rem;

      .headerContainer {
        padding: 2rem;
      }
    }

    .sliderDiv {
      .sliderTrack {
      }

      .sliderImageDiv {
        max-height: 10rem;
      }
    }
  }
`;

export default AboutUsSection;
