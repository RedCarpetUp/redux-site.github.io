import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const SlugBox = styled.div`
  .Slug {
    align-items: center;
    img {
      width: 60%;
      height: 60%;
      display: flex;
      text-align: -webkit-center;
      margin-left: 120px;
      margin-top: 30px;
      margin-bottom: 30px;
      @media only screen and (max-width: 1440px) {
        margin-left: 80px;
      }
      @media only screen and (max-width: 1360px) {
        margin-left: 150px;
      }
      @media only screen and (max-width: 667px) {
        margin-left: 60px;
      }
    }
  }
`;
export default SlugBox;
