import styled from "styled-components";

const DocumentListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  font-size: 30px;

  .card {
    height: 15%;
    min-height: 8vh;
    text-align: center;
    border: 1px solid #dd285d;
    border-radius: 5px;
    width: 70%;
    z-index: 9;
  }
  .review {
    font-size: 14px;
  }
  .info-disabled {
    display: none;
  }
  .info {
    font-size: 20px;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .row-80 {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 10px 0 20px 0;
  }
  .col50 {
    width: 5%;
    display: block;
    text-align: -webkit-left;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 15%;
    }
  }
  .col50-left {
    width: 95%;
    display: block;
    text-align: -webkit-center;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 85%;
    }
  }
  .col90 {
    width: 95%;
    display: block;
    text-align: -webkit-justify;
    font-size: 16px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 85%;
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

  p {
    margin-block-start: 0em;
    margin-block-end: 0.2em;
  }
  .doc-name {
    text-align: center;
    width: 90%;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      font-size: 20px;
    }
  }
  .red {
    color: red;
    margin-block-start: 0.3em;
    margin-block-end: 0.3em;
  }
  .green {
    color: green;
    margin-block-start: 0.3em;
    margin-block-end: 0.3em;
  }
  .yellow {
    color: orange;
    margin-block-start: 0.3em;
    margin-block-end: 0.3em;
  }
  .pink {
    color: #dd285d;
    margin-block-start: 0.3em;
    margin-block-end: 0.3em;
  }
`;
export default DocumentListWrapper;
