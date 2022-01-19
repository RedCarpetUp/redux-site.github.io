import styled from "styled-components";

const PreviewWrapper = styled.div`
  margin: 20px;
  .demo-image-preview {
    position: relative;
    text-align: center;
  }
  img {
    border-radius: 30px;
  }

  .lds-dual-ring {
    display: inline-block;
    width: 180px;
    height: 180px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 160px;
    height: 160px;
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
  .text-center {
    text-align: -webkit-center;
  }
  .demo-image-preview > img {
    width: 768px;
  }

  @media (max-width: 768px) {
    .demo-image-preview > img {
      width: 100%;
    }
  }

  /* fullscreen enable by props */
  .demo-image-preview-fullscreen > img {
    width: 100vw;
    height: 100vh;
  }
  .row-below {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .col100 {
    width: 100%;
    text-align: --webkit-center;
  }
  .col50-below {
    display: block;
    width: 50%;
    text-align: -webkit-center;
  }
  .btn-below {
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
  .btn-take {
    width: 70%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #dd285d;
    background-color: white;
    color: #dd285d;
    font-weight: bold;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
`;

export default PreviewWrapper;
