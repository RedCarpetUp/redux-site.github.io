import styled from "styled-components";

export const ContentWrapper = styled.div`
  .Heading {
    text-align: center;
    font-size: 32px;
    margin-top: 130px;
    margin-bottom: 80px;
  }
  .Heading-2 {
    font-size: 28px;
    color: rgb(13, 35, 62);
  }
  .image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    margin-bottom: 20px;
  }
  .row {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .col-50 {
    width: 50%;
  }
  @media screen and (max-width: 991px) {
    .row {
      display: inline;
    }
    .col-50 {
      width: 100%;
    }
    .image {
      width: 100%;
    }
  }
`;

export default ContentWrapper;
