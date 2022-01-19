import styled from "styled-components";

const TakePhotoWrapper = styled.div`
  margin: 20px;
  video {
    width: 640px;
    height: 370px;
    @media (max-width: 500px) {
      height: 300px;
    }
  }
  img {
    border-radius: 30px;
    width: 70%;
    @media (max-width: 900px) {
      width: 80%;
    }
    @media (max-width: 700px) {
      width: 90%;
    }
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  @media (max-width: 700px) {
    margin: 20px 10px;
  }
  @media (max-width: 600px) {
    margin: 20px 5px;
  }
  .btn {
    width: 70%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #dd285d;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
`;
export const PermissionWrapper = styled.div`
  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .col90 {
    width: 90%;
    display: block;
    text-align: -webkit-left;
  }
`;

export default TakePhotoWrapper;
