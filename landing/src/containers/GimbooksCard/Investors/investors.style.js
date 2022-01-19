import styled from "styled-components";

export const ContentWrapper = styled.div`
  margin: 100px 100px 100px 100px;
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
    width: 70%;
    margin-right: auto;
    margin-left: auto;
  }
  .btn {
    background-color: #e6f542;
    color: #0d233e;
    font-weight: bold;
  }
  @media screen and (max-width: 1250px) {
    .content {
      width: 90%;
    }
  }
  @media screen and (max-width: 991px) {
    margin: 80px 70px 80px 70px;
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
  }
  @media screen and (max-width: 700px) {
    margin-left: 15px;
    margin-right: 15px;
  }
`;

export const SectionWrapper = styled.div`
  overflow: hidden;
  line-height: 29px;
  font-size: 16px;
  color: #0d233e;
  background: #eeeeee;
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
