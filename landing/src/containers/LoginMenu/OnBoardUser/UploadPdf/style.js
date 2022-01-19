import styled from "styled-components";

const UploadPdfWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center !important;
  justify-content: center !important;
  . label {
    text-align: left;
    display: block;
    color: #767676;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 5px;
    -webkit-transition: 0.2s ease all;
    transition: 0.2s ease all;
  }
  .btn {
    margin-top: 40px;
    margin-bottom: 20px;
    width: 60%;
    border-radius: 5px;
    background-color: #dd285d;
    font-weight: bold;
  }
  .pass {
    display: block;
    margin-top: 10px;
    width: 80%;
    align-items: center !important;
    justify-content: center !important;
  }
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .row-80 {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: 10px 0 10px 0;
    align-items: center !important;
    justify-content: center !important;
  }

  .col90 {
    width: 95%;
    display: block;
    text-align: -webkit-justify;
    font-size: 16px;
    color: grey;
  }
`;

export default UploadPdfWrapper;
