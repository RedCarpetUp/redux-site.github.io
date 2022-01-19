import styled from "styled-components";

const AddUpdateAddressWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  .row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .grey-btn {
    color: white;
    background-color: grey;
    font-weight: 10px;
    font-size: 25px;
    width: 80%;
    cursor: auto;
    border-radius: 5px;
    @media (max-width: 768px) {
      font-size: 20px;
      text-align: center;
      width: 90%;
    }
  }
  .card {
    height: 20%;
    min-height: 12vh;
    text-align: center;
    border: 1px solid #dd285d;
    border-radius: 5px;
    width: 90%;
    overflow: hidden;
    margin: 20px 0 10px 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 10px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 90%;
    }
  }
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  .green {
    color: green;
  }
  .green-border {
    input {
      border: 1px solid green !important;
      border-radius: 5px !important;
    }
  }
  i {
    color: green;
  }
  .scroll-btn {
    width: 50%;
    display: flex;
    text-align: -webkit-center;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
    @media (max-width: 768px) {
      font-size: 20px;
      text-align: center;
      width: 100%;
    }
  }
  .btn {
    color: white;
    background-color: #dd285d;
    font-weight: 10px;
    font-size: 25px;
    width: 80%;
    border-radius: 5px;
    @media (max-width: 768px) {
      font-size: 20px;
      text-align: center;
      width: 90%;
    }
  }
  .btn-light {
    color: #dd285d;
    background-color: white;
    font-weight: 10px;
    font-size: 25px;
    width: 40%;
    border: 1px solid #dd285d;
    border-radius: 5px;
    @media (max-width: 768px) {
      font-size: 20px;
      text-align: center;
      width: 80%;
    }
  }

  .col50 {
    width: 50%;
    display: block;
    text-align: -webkit-center;
    margin-top: 8px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
      text-align: -webkit-center;
    }
  }
  .col50-left {
    width: 40%;
    display: block;
    text-align: -webkit-left;
    font-size: 20px;
    margin-left: 12px 0 12px 0;
    p {
      margin-block-start: 0.2em;
      margin-block-end: 0.2em;
    }
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
      text-align: -webkit-center;
    }
  }
  .row-left {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
    width: 100%;
  }
  .line {
    border: 1px solid #dd285d;
    width: 90%;
  }
  .black-line {
    border: 1px solid black;
    width: 90%;
  }
  .note-black {
    cursor: pointer;
    font-size: 14px;
    text-align: left;
    width: 100%;
  }
  .btn-1 {
    display: block;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 50%;
    }
    @media only screen and (min-width: 992px) {
      margin-top: 5%;
      width: 35%;
      margin-left: 2%;
    }
  }
  .btn-2 {
    display: block;
    text-align: -webkit-left;
    font-size: 20px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
      font-size: 13px;
    }
    @media only screen and (min-width: 992px) {
      width: 60%;
      font-size: 18px;
    }
  }
  .col30 {
    width: 25%;
    display: block;
  }
  .col70 {
    display: block;
    text-align: -webkit-left;
    font-size: 20px;
    width: 75%;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      font-size: 13px;
    }
    @media only screen and (min-width: 992px) {
      font-size: 18px;
    }
  }
  h1 {
    font-weight: bold;
  }
`;
export default AddUpdateAddressWrapper;
