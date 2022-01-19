import styled from "styled-components";

const DocumentsWrapper = styled.div`
  .row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .col50 {
    width: 10%;
    display: block;
    text-align: -webkit-center;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 15%;
    }
  }
  .col50-left {
    width: 90%;
    display: block;
    text-align: -webkit-center;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 85%;
    }
  }
  .doc-card {
    height: 15%;
    min-height: 8vh;
    text-align: center;
    border: 1px solid #00d88d;
    border-radius: 5px;
    width: 80%;
    z-index: 9;
    margin: 10px 0 10px 0;
  }
  .row-80 {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 10px 0 20px 0;
  }
  .col90 {
    width: 95%;
    display: block;
    text-align: -webkit-justify;
    font-size: 16px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 70%;
    }
  }
  .col10 {
    width: 5%;
    display: block;
    text-align: -webkit-center;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 15%;
    }
  }
  .card-description {
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      font-size: 18px;
    }
  }
  .mand-doc {
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      font-size: 15px;
    }
  }
`;

export default DocumentsWrapper;
