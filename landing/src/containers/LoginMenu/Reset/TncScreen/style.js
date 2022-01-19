import styled from "styled-components";

const TncWrapper = styled.div`
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
  .text-center {
    text-align: -webkit-center;
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .card {
    height: 15%;
    min-height: 8vh;
    text-align: left;
    border: 1px solid #dd285d;
    border-radius: 5px;
    width: 80%;
    margin: 40px 0 40px 0;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      margin: 20px 0 20px 0;
    }
  }
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  .col100 {
    width: 100%;
    text-align: --webkit-center;
  }
  .col50 {
    width: 50%;
    text-align: -webkit-center;
  }
  .col60 {
    width: 60%;
    display: block;
    background-color: white;
    text-align: -webkit-center;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
    }
  }
  .btn {
    width: 40%;
    margin: 20px 10px 20px 10px;
    border-radius: 5px;
    background-color: #dd285d;
    @media (max-width: 768px) {
      width: 90%;
      margin: 15px 0 15px 0;
    }
  }
  .btn-light {
    width: 40%;
    margin: 20px 10px 20px 10px;
    border-radius: 5px;
    border: 1px solid #dd285d;
    background-color: white;
    color: #dd285d;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 90%;
      margin: 15px 0 15px 0;
    }
  }
  table {
    border-collapse: collapse;
    font-size: 20px;
  }

  table,
  td,
  th {
    border-bottom: 1px solid grey;
    padding: 12px 0px 12px 0px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      font-size: 18px;
    }
  }
  .left {
    text-align: -webkit-left;
    padding-right: 90px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding-right: 5px;
    }
  }
  .right {
    text-align: -webkit-right;
    padding-left: 90px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      padding-left: 5px;
    }
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
      padding: 15px;
    }
  }
  i {
    color: green;
  }
  input[type="checkbox"] {
    -ms-transform: scale(1.5); /* IE 9 */
    -webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
    transform: scale(1.5);
  }
  .tnc {
    text-align: justify;
    font-size: 18px;
    display: flex;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      margin: 0 10px 0 10px;
    }
  }
`;

export default TncWrapper;
