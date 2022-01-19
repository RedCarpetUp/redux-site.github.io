import styled from "styled-components";

export const SectionWrapper = styled.section`
  padding: 140px 0px 140px 0px;
  background-color: #363636;
  background-image: linear-gradient(315deg, #d2ccc4 0%, #363636 70%);
  color: white;
  .Heading {
    font-size: 40px;
    margin-bottom: 30px;
  }
  .content {
    line-height: 1.5;
  }
  .div-1 {
    width: 50%;
  }
  .div-2 {
    width: 40%;
    display: flex;
    justify-content: center;
  }
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .btn {
    background-color: #e6f542;
    color: #0d233e;
    font-weight: bold;
  }
  @media screen and (max-width: 991px) {
    padding: 100px 0px 100px 0px;
    .container {
      flex-direction: column;
      align-items: flex-start;
    }
    .div-1 {
      width: 100%;
    }
    .div-2 {
      margin-top: 30px;
      width: 100%;
      justify-content: flex-start;
    }
  }
`;
