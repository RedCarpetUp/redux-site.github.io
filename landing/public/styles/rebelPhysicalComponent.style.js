import styled from "styled-components";

const RebelPhysical = styled.div`
  .col60 {
    width: 75%;
    display: block;
    text-align: -webkit-center;
    background-color: white;
    margin-top: 0rem;
    padding: 10px 0 10px 0;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
    }
  }
  .col60-sub h3 {
    @media only screen and (min-width: 0px) and (max-width: 700px) {
      text-align: center;
    }
  }
  .tracking-container {
    width: 100%;
    border-radius: 10px;
    display: flex;
    align-item: center;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .tracking-number {
    width: 30%;
    padding: 20px;
    font-weight: bolder;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    background: #fff;
    display: inline-block;
    margin: 0px;
    margin-bottom: 35px;
    @media only screen and (min-width: 0px) and (max-width: 447px) {
      width: 60%;
    }
  }
  .container {
    width: 100%;
    text-align: center;
  }
  .row-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
  }

  .col30 {
    width: 40%;
    display: block;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 25%;
    }
  }

  .line {
    border: 1px solid #dd285d;
    width: 90%;
    @media (max-width: 768px) {
      width: 70%;
    }
  }

  .col50 {
    width: 50%;
    text-align: -webkit-center;
  }

  .addressMain {
    width: 100%;
    text-align: center;
    background-color: white;
    margin-top: 0rem;
    padding: 10px 0 10px 0;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      width: 100%;
    }
  }
  .btn {
    background-color: #dd285d;
    width: 30%;
    border-radius: 5px !important;
    font-weight: bold;
  }

  .address-btn {
    text-align: center;
  }
  .address-form {
    margin: 15px;
  }
  .input-style {
    width: 80%;
    margin: auto;
    display: block;
    padding: 10px;
  }
  .lable-input {
    width: 80%;
    text-align: center;
    margin-left: 100px;
    font-weight: bold;
    color: grey;
    text-decoration: underline;
    margin-top: 0px;
  }
  .form-control-select {
    font-weight: 300;
    display: block;
    width: 90%;
    border-radius: 5px;
    height: calc(2.53125rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 0.9375rem;
    font-weight: 300;
    line-height: 1.9;
    color: #000;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #eaeff4;
    border-radius: 2px;
    -webkit-transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
`;

export default RebelPhysical;
