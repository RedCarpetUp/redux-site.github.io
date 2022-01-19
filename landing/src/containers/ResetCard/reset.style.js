import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const CareerSection = styled.section`
  .section {
    color: rgba(255, 255, 255, 0.85);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 126px;
    padding-bottom: 0px;
  }
  .section::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
  }
  .textDiv {
    margin: 0 auto;
    h1 {
      font-weight: 500;
      color: black;
    }
    p {
      font-size: 1.17rem;
      opacity: 0.9;
      margin-top: 2rem;
    }
  }
  .careerImage {
    max-height: 100%;
  }
  .valuesTextDiv {
    color: #fff;
    h2 {
      color: #fff;
    }
    li {
      display: list-item;
    }
  }
  .cultureHeader {
    text-align: center;
    hr {
      width: 4rem;
    }
  }
  .cultureCardMain {
    width: 100%;
    display: inline-block;
    padding: 1.5rem !important;
  }
  .cultureCard {
    box-shadow: 0 0 26px rgba(0, 0, 0, 0.06);
    transition: 0.5s;
    border: 0;
    position: relative;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 0.25rem;
  }
  .cardBody {
    padding: 2rem;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    padding: 1.25rem;
    h6 {
      font-weight: 400;
    }
  }
  .benefitIcon {
    color: #bfc5ca;
    font-size: 2.34375rem;
  }
  .benefitsPerks {
    width: 80%;
    margin: 0 auto !important;
    text-align: center;
    padding: 5rem 0;
    .col {
      padding: 2rem;
    }
  }
  .careerAccordian {
    box-shadow: 0 0 26px rgba(0, 0, 0, 0.06);
  }
  .accordianTitle {
    margin-bottom: 0;
    border: 0 !important;
    border-bottom: 1px solid #f1f2f3 !important;
    padding: 1rem;
    h6 {
      small {
        i {
          padding: 0 0.3rem;
        }
      }
    }
  }
  .accordianBody {
    padding: 2rem;
  }
  @media screen and (max-width: 768px) {
  }
  .backimg {
    background-color: #f2f4f7;
  }
`;

export default CareerSection;
