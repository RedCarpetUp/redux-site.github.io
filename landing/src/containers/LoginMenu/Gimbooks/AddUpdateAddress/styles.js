import styled from "styled-components";

const AddUpdateAddressWrapper = styled.div`
  .row {
    display: flex;
    justify-content: space-around;
    margin: 20px;
    height: 230px;
  }

  .pan-verification {
    display: flex;
    justify-content: space-around;
  }

  .pan-verify {
    margin-top: 31px;
  }

  .pan-info {
    margin: 20px;
  }
  .scroll-btn {
    width: 50%;
    display: flex;
    text-align: -webkit-center;
    flex-wrap: wrap;
    justify-content: center;
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
      width: 90%;
    }
  }

  .address-heading {
    @media (max-width: 768px) {
      font-size: 20px;
      text-align: center;
      width: 80%;
    }
  }

  .address-response {
    @media (max-width: 768px) {
      font-size: 20px;
      width: 70%;
      text-align: center;
    }
  }
`;

export default AddUpdateAddressWrapper;
