import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const HowtoContainer = styled.section`
  .bannerDiv {
    padding: 2rem;
  }
  .contentVideosDiv {
    justify-content: center;
    padding: 5rem 0;
    margin: 0 auto;
  }
  .videoDiv {
    text-align: center !important;
    a {
      color: #323d47;
    }
    a:hover {
      color: #50a1ff;
    }
    img {
      border-radius: 0.25rem;
      max-width: 100%;
    }
  }
  .howToTellDiv {
    text-align: center;
    .howToTellDivRow {
      justify-content: center;
    }
  }

  .timelineContainer {
    text-align: center;
    padding: 7rem 0;

    .timelineCol {
      margin: 0 auto;
      img {
        max-height: 30rem;
      }
    }
  }
`;
export default HowtoContainer;
