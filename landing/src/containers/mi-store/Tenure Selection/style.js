import styled from "styled-components";

const TenureSelectionWrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
    margin-bottom: 50px;
  }
  h3 {
    margin-top: 50px;
  }
  Input {
    margin-bottom: 30px;
  }
  Button {
    border-radius: 5px;
    margin-right: auto;
    margin-left: auto;
    width: 50%;
    background-color: #00d88d;
  }
  .selected {
    background-color: #00d88d;
  }
  .select {
    border: 1px solid #00d88d;
    color: #00d88d;
    background-color: white;
  }
  .tenure-card {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #00d88d;
    border-radius: 10px;
    padding: 20px;
  }
  .confirm {
    margin-top: 30px;
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      margin-top: 10px;
    }
  }
  .tenure-price {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 20px 0 20px 0;
    h3 {
      font-size: 1.1rem;
      margin: 0 0 5px 0;
    }
    @media only screen and (min-width: 0px) and (max-width: 991px) {
      h3 {
        font-size: 1rem;
      }
    }
  }
  .tenure-emi {
    font-style: italic;
    margin: 20px 0 0 0;
    color: rgb(109, 114, 121);
    font-size: 1.1rem;
  }
  @media only screen and (min-width: 0px) and (max-width: 991px) {
    padding: 20px;
    Button {
      width: 80%;
    }
    .tenure-card {
      padding: 10px;
      margin: 0 0 20px 0;
    }
    .tenure-price {
      h3 {
        font-size: 0.9rem;
        margin-bottom: 0 0 2px 0;
      }
    }
  }
  .btn-light {
    border-radius: 5px;
    margin-top: 10px;
    border: 1px solid #00d88d;
    background-color: white;
    color: #00d88d;
    font-weight: bold;
  }
  .form-control-select {
    font-weight: 300;
    display: block;
    width: 100%;
    margin-bottom: 10px;
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
export default TenureSelectionWrapper;
