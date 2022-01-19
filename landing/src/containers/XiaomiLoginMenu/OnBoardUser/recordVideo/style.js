import styled from "styled-components";

const TakeVideoWrapper = styled.div`
  margin: 0 20px 0 20px;
  .video-container {
    display: flex;
    flex-direction: column;
  }
  .video {
    border-radius: 30px;
    width: 50%;
    margin: 0 auto;
    @media (max-width: 1000px) {
      width: 70%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .video-player {
    @media only screen and (max-width: 2000px) {
      width: 100%;
    }
  }
  .child-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .btn {
    width: 30%;
    border-radius: 5px;
    background-color: #00d88d;
    font-weight: bold;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 3px;
    margin-right: 3px;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .counter {
    background-color: #00d88d;
    width: 60px;
    color: white;
    margin: 0 auto;
    margin-top: 5px;
    padding: 10px;
    border-radius: 50%;
    font-weight: 900;
    box-shadow: 0 0 50px grey;
  }
  .loader {
    height: 100%;
    min-height: 850px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lds-dual-ring {
    display: inline-block;
    width: 180px;
    height: 180px;
  }
`;

export default TakeVideoWrapper;
