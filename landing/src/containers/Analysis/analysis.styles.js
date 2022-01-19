import styled from "styled-components";

import { themeGet } from "styled-system";

const AnalysisSection = styled.section`
  .breadcrumb {
    background: #fafbfb;
    border-bottom: 1px solid #f1f2f3;
    ol {
      margin: 0 6rem;
      padding: 1rem 0;
    }
    ol li {
      display: inline-block;
      padding: 0 0.5rem;
    }
  }
  .area {
    display:flex;
    flex-wrap:wrap;
    align-items:center'
  }

  .sectiondiv {
    text-align: center;
    padding: 1.5rem 0;
  }

  @media screen and (max-width: 780px) {
    .breadcrumb {
      ol {
        margin: 0;
      }
    }
  }

  .bannerText {
    text-align: center !important;
    color: white !important;
  }

  .p {
    font-size: 1.1em;
    padding-top: 100px;
    padding-bottom: 5px;
  }

  .img {
    padding-top: 25px;
    padding-bottom: 5px;
  }

  .label {
    font-size: 1.3em;
    font-weight: 400;
  }
`;

export default AnalysisSection;
