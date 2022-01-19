import styled from "styled-components";

export const ContentWrapper = styled.div`
  .image-top {
    display: none;
  }
  .image-side {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .Heading {
    text-align: center;
    font-size: 32px;
    color: rgb(13, 35, 62);
  }
  .Heading-2 {
    font-size: 28px;
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
    .image-side {
      display: none;
    }
    .image-top {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      margin-bottom: 20px;
    }
  }
`;

export default ContentWrapper;
