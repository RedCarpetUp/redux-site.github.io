import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const BlockWrapper = styled.div`
  width: 100%;
  padding: 81px 0 51px;
  @media only screen and (max-width: 1440px) {
    padding: 70px 0 40px;
  }
  @media only screen and (max-width: 1360px) {
    padding: 50px 0 20px;
  }
  @media only screen and (max-width: 991px) {
    padding: 40px 0 10px;
  }

  .row {
    align-items: center;
    .col {
      @media only screen and (max-width: 480px) {
        &:first-child {
          order: 2;
          margin-top: 15px;
        }
      }
    }
  }
`;

export const ContentWrapper = styled.div`
  margin: 100px;
  .offers {
    width: 400px;
  }
  .image-top {
    display: none;
    max-width: 400px;
    max-height: 400px;
  }
  .image-side {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .extra-space {
    margin-top: 150px;
  }
  .Heading {
    font-size: 38px;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex: 1;
  }
  .col-40 {
    width: 40%;
  }
  .content {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
  }
  .btn {
    background-color: #e6f542;
    color: #0d233e;
    font-weight: bold;
  }
  .points {
    margin-top: 25px;
    display: flex;
    color: #0d233e;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
  }
  .icon {
    color: #0d233e;
    margin-right: 5px;
  }
  .icon-text {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 20px;
  }
  @media screen and (max-width: 1300px) {
    .points {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  @media screen and (max-width: 1290px) {
    .content {
      width: 100%;
    }
  }
  @media screen and (max-width: 991px) {
    margin: 100px 70px 100px 70px;
    .row {
      display: inline;
    }
    .col-40 {
      width: 100%;
    }
    .content {
      width: 100%;
    }
    .image-side {
      display: none;
    }
    .image-top {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      margin-bottom: 50px;
    }
    .extra-space {
      margin-top: 100px;
    }
  }
  @media screen and (max-width: 700px) {
    margin: 100px 15px 100px 15px;
    .offers {
      width: 300px;
    }
  }
`;

export const SectionWrapper = styled.div`
  overflow: hidden;
  line-height: 29px;
  font-size: 16px;
  color: #0d233e;
  .highlight {
    color: rgb(79, 83, 98);
    font-weight: 600;
  }
  .Heading {
    line-height: 45px;
  }
  @media only screen and (max-width: 1360px) {
    font-size: 17px;
  }
  @media only screen and (max-width: 991px) {
    font-size: 16px;
  }
`;

export const List = styled.ul`
  margin-bottom: 50px;
  margin-left: 22px;
  padding-top: 5px;
  @media only screen and (max-width: 1440px) {
    padding-top: 0;
    margin-bottom: 45px;
  }
  @media only screen and (max-width: 1360px) {
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 991px) {
    margin-bottom: 30px;
  }
`;

export const Item = styled.li`
  line-height: 40px;
  list-style-type: circle;
  padding: 10px 0;
  font-size: 20px;
  @media only screen and (max-width: 1440px) {
    line-height: 30px;
  }
  @media only screen and (max-width: 1360px) {
    font-size: 18px;
    line-height: 28px;
  }
  @media only screen and (max-width: 991px) {
    font-size: 17px;
    line-height: 24px;
  }
`;

export const ImageWrapper = styled.div`
  padding-left: 37px;
  @media only screen and (max-width: 1360px) {
    padding-left: 30px;
  }
  @media only screen and (max-width: 991px) {
    padding-left: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default BlockWrapper;
