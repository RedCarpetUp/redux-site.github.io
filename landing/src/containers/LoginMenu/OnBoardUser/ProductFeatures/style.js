import styled from "styled-components";

const ProductFeaturesWrapper = styled.div`
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
  .card {
    height: 20%;
    min-height: 12vh;
    text-align: center;
    border: 1px solid #dd285d;
    border-radius: 5px;
    width: 60%;
    overflow: hidden;
    margin: 20px 0 10px 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    max-height: fit-content !important;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 90%;
    }
  }
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
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
  .scroll-btn {
    width: 50%;
    display: flex;
    text-align: -webkit-center;
    flex-wrap: wrap;
    justify-content: center;
  }
  .btn {
    width: 50%;
    margin: 20px 20px 20px 20px;
    border-radius: 5px;
    background-color: #dd285d;
    @media (max-width: 768px) {
      width: 90%;
      margin: 10px 0px 10px 0px;
    }
  }
  .btn-light {
    width: 50%;
    margin: 20px 20px 20px 20px;
    border-radius: 5px;
    border: 1px solid #dd285d;
    background-color: white;
    color: #dd285d;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 90%;
      margin: 10px 0px 10px 0px;
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
      p {
        margin-left: 4%;
        margin-right: 4%;
      }
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
    font-size: 20px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 75%;
      font-size: 13px;
    }
  }
  h1 {
    font-weight: bold;
  }
`;
export default ProductFeaturesWrapper;
