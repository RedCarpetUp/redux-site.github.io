import styled from "styled-components";

const ProductListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  .row-left {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
    width: 100%;
  }
  .line {
    border: 1px solid #00d88d;
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
  .card {
    height: 15%;
    min-height: 8vh;
    text-align: center;
    border: 1px solid #00d88d;
    border-radius: 5px;
    width: 60%;
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
  .btn-full {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 50%;
    border-radius: 5px;
    background-color: #00d88d;
    font-weight: bold;
  }
  .btn-full-disabled {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 50%;
    border-radius: 5px;
    background-color: #c9c3c3;
    font-weight: bold;
  }
  .card-disabled {
    height: 15%;
    min-height: 8vh;
    text-align: center;
    border: 1px solid #c9c3c3;
    border-radius: 5px;
    width: 60%;
    margin: 20px 0 10px 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 10px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 90%;
    }
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
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
  .note {
    font-size: 20px;
    color: black;
  }
  .col100 {
    width: 100%;
    display: block;
    text-align: -webkit-left;
    margin-left: 48px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      margin-left: 8px;
    }
  }
  .col50-left {
    width: 45%;
    display: block;
    text-align: -webkit-left;
    font-size: 20px;
    margin-left: 12px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
      text-align: -webkit-center;
    }
  }
  .product-header {
    width: 100%;
    display: block;
    color: #black;
    text-align: -webkit-center;
    margin-left: 48px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      margin-left: 8px;
    }
  }
  .creditCard {
    box-shadow: 0 0.5px 1px 0 rgba(0, 0, 0, 0.03),
      0 1px 9px 0 rgba(0, 0, 0, 0.03);
    table {
      width: 100%;
      text-align: center;
    }
    td {
      width: 50%;
    }
    h2 {
      color: #666666;
      font-weight: 500;
      font-size: 28px;
    }
    p {
      color: #77848f;
      font-weight: 500;
      font-size: 16px;
    }
  }
`;
export default ProductListWrapper;
