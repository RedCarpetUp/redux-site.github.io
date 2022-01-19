import styled from "styled-components";

const ProductSelectionWrapper = styled.div`
  .loader {
    height: 100%;
    min-height: 450px;
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
    content: "Please Wait";
    display: block;
    width: 164px;
    height: 164px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #dd285d;
    border-color: #dd285d transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }
  .row-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
  }
  .line {
    border: 1px solid #dd285d;
    width: 90%;
  }
  .col30 {
    width: 40%;
    display: block;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 25%;
    }
  }
  .col70 {
    width: 60%;
    display: block;
    text-align: -webkit-left;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 75%;
      font-size: 13px;
    }
  }
  h1 {
    font-weight: bold;
  }

  .card {
    height: 15%;
    min-height: 8vh;
    text-align: center;
    border: 1px solid #dd285d;
    border-radius: 5px;
    width: 40%;
    margin: 20px 12px 10px 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    background-color: white;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 90%;
      margin: 20px 0 10px 0;
    }
  }
  .card-options {
    height: 15%;
    min-height: 8vh;
    text-align: center;
    border-radius: 5px;
    width: 90%;
    margin: 10px 10px 10px 10px;
    background-color: #e52e64;
    font-weight: bold;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 90%;
      margin: 20px 0 10px 0;
    }
  }
  .black-line {
    border: 1px solid black;
    width: 85%;
  }
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 0px;
  }
  .col50 {
    width: 50%;
    display: block;
    text-align: -webkit-right;
  }
  .col100 {
    width: 100%;
    display: block;
    text-align: -webkit-center;
  }
  .col100-left {
    width: 100%;
    display: block;
    text-align: -webkit-left;
    margin-left: 38px;
    color: white;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      margin-left: 8px;
    }
  }
  .col100-right {
    width: 100%;
    display: block;
    text-align: -webkit-right;
    margin-right: 38px;
    color: white;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      margin-right: 8px;
      color: white;
    }
  }
  .col50-left {
    width: 40%;
    display: block;
    text-align: -webkit-left;
    font-size: 30px;
    margin-left: 12px;
  }
  ul {
    list-style-type: none;

    margin: 0 0 10px 0;
    width: 100%;
  }

  ul li {
    border: 0px solid rgb(221, 40, 93, 0.5);
    margin-top: -1px; /* Prevent double borders */
    background-color: white;
    padding: 20px 22px 22px 50px;
    width: 100%;
    text-align: left;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding: 8px;
    }
  }
  i {
    color: green;
  }
  .tenure {
    margin-block-start: 0em;
    color: white;
  }
  .emi {
    margin-block-end: 0em;
    font-size: 18px;
    color: white;
  }
  .scroll-btn {
    width: 50%;
    display: flex;
    text-align: -webkit-center;
    flex-wrap: wrap;
    justify-content: center;
  }
  .btn {
    width: 50%;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 20px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #dd285d;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-right: 0px;
    }
  }
  .btn-f {
    width: 50%;
    margin-top: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #dd285d;
    @media (max-width: 768px) {
      width: 90%;
    }
  }
  .btn-light {
    width: 50%;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #dd285d;
    background-color: white;
    color: #dd285d;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .btn-take {
    width: 50%;
    margin-top: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    color: #dd285d;
    border: 1px solid #dd285d;
    background-color: white;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 90%;
    }
  }
`;
export default ProductSelectionWrapper;
