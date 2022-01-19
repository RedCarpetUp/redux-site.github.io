import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const AboutUsStyleWrapper = styled.div`
  .largeDevsContainer {
    margin-top: 140px;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 1200px) {
      align-items: center;
    }
  }

  .bigPhotoContainer {
    width: 50%;
    @media (min-width: 1700px) {
      padding-right: 60px;
      padding-left: 60px;
    }
    @media (max-width: 1500px) {
      width: 50%;
    }
    @media (max-width: 1400px) {
      width: 52%;
    }
    @media (max-width: 1300px) {
      width: 55%;
    }
    @media (max-width: 1200px) {
      width: 58%;
    }
    @media (max-width: 1100px) {
      width: 100%;
    }
  }

  .newsReelContainer {
    width: 50%;
    @media (max-width: 1500px) {
      width: 50%;
    }
    @media (max-width: 1400px) {
      width: 48%;
    }
    @media (max-width: 1500px) {
      width: 45%;
    }
    @media (max-width: 1200px) {
      width: 42%;
    }
    @media (max-width: 1100px) {
      width: 100%;
    }
  }
`;

export default AboutUsStyleWrapper;
