import styled from "styled-components";

const PopUpModal = styled.div`
  .child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .masterPiece {
    display: block;
    margin: 0 auto;
  }
  .btn {
    margin-top: 40px;
    margin-bottom: 20px;
    width: 20%;
    border-radius: 5px;
    background-color: #00d88d;
    font-weight: bold;
    @media only screen and (max-width: 600px) {
      width: 100%;
      margin-right: 40px;
      margin-left: 40px;
    }
  }
  .btn-light {
    width: 20%;
    margin: 5px 5px 5px 5px;
    border-radius: 5px;
    border: 1px solid #00d88d;
    background-color: white;
    color: #00d88d;
    font-weight: bold;
    @media only screen and (max-width: 600px) {
      width: 100%;
      margin-right: 40px;
      margin-left: 40px;
    }
  }
  .btn-container {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    @media only screen and (max-width: 600px) {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

export default PopUpModal;
