import styled from "styled-components";

import { themeGet } from "styled-system";

const RocksSection = styled.section`
  .row {
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  .head {
    font-size: 2rem;
  }
  .bannerWrapper {
    padding: 10rem 3rem;
  }

  .block1Container {
    padding: 7rem 4rem;
    color: rgba(255, 255, 255, 0.85);
    h2 {
      color: rgba(255, 255, 255, 0.85);
    }
  }
  .benefitsDiv {
    p {
      font-weight: 600;
      text-transform: uppercase;
    }
    li {
      display: list-item;
      list-style-type: disc;
    }
  }
  .blockFeatures {
    padding: 1.5rem;
    li {
      display: list-item;
      list-style-type: disc;
      margin-left: 1.5rem;
    }
  }
  .order1 {
    order: 1;
  }
  .order2 {
    order: 2;
  }

  @media screen and (max-width: 750px) {
    .order1 {
      order: 2;
    }
    .order2 {
      order: 1;
    }
  }

  .centerImage {
    padding: 2rem 0;
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export default RocksSection;
