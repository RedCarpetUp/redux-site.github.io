import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const SocBox = styled.div`
  table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #000;
    width: 100%;
  }

  th {
    border: 1px solid #000;
    padding: 10px;
  }

  td {
    border: 1px solid #000;
    padding: 10px;
  }
  .mainDiv {
    padding: 7rem 0;
  }
  .containerDiv {
    width: 80%;
    margin: 0 auto;
  }
  @media screen and (max-width: 768px) {
    .containerDiv {
      width: 95%;
      margin: 0 auto;
    }
    .forApp {
      nav {
        display: none !important;
      }
      footer {
        display: none;
      }
      .mainDiv {
        padding: 3rem 0;
      }
    }
  }
`;

export default SocBox;
