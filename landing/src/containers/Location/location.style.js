import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const LocationContainer = styled.footer`
  .mainContaine {
    padding: 7rem 0;
    width: 80%;
    margin: 0 auto;
  }
  @media screen and (max-width: 768px) {
    .mainContaine {
      width: 85%;
      padding: 7rem 0;
      margin: 0 auto;
    }
  }
`;

export default LocationContainer;
