import styled from "styled-components";

const ReciptUploadWrapper = styled.div`
  margin-top: 20px;
  .file-upload {
    display: block;
    margin: 0 auto;
  }
  .btn, .btn-disable {
    width: 30%;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 20px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #00d88d;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-right: 0px;
    }
  }

  .btn-disable {
    background-color: grey;
  }

  .btn-light {
    width: 30%;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 5px;
    border-radius: 5px;
    border: 1px solid #00d88d;
    background-color: white;
    color: #00d88d;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    border: 1px solid #00d88d;
    border-radius: 10px;
    padding: 20px;
    margin-top: 30px;
  }
  .row-left {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
    width: 100%;
  }
  .col30 {
    width: 30% !important;
    display: block;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 20% !important;
    }
  }
  .line {
    border: 1px solid #00d88d;
    width: 90%;
  }
  .details {
    margin-bottom: 10px;
  }
  .col70 {
    width: 70%;
    display: block;
    text-align: -webkit-left;
    font-size: 35px;
    font-weight: bold;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 80% !important;
      font-size: 26px !important;
    }
  }
  .loader {
    height: 100%;
    min-height: 850px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lds-dual-ring {
    display: inline-block;
    width: 180px;
    height: 180px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 164px;
    height: 164px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #00d88d;
    border-color: #00d88d transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
`;
export default ReciptUploadWrapper;
