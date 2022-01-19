import styled from "styled-components";

export const SectionWrapper = styled.section`
  padding-top: 250px;
  margin: 0;
  min-height: 100vh;
  height: auto;

  .center-it {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);  
  }
  
  .go-down {
    width: 100%;
    display: none;
    
    i {
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translate(-50%, -100%);
    }
  }
  
  .flex-section {
    display: flex;

    .flex-image {
      flex: 1;
      img {
        width: 326.98px;
        height: 206.01px;
      }
    }
    .flex-content {
      margin-right: 0px;
      flex: 1;
      
      .phone-number-container {
        margin-top: 30px;
        margin-bottom: 30px;
        display: flex;
        @media only screen and (max-width: 1000px) {
          justify-content: center;
        }


        .phone-input {
          input {
            padding: 15px;
            border-radius: 5px;
            border: 1px solid black;
          }
          width: 175px;
          margin-right: 15px;
        }
        
        .apply-now-btn {
          border-radius: 5px;
          background-color: #00d88d;
          color: white;
          margin-right: 15px;
        }
        .learn-more-btn {
          border: 1px solid black;
          background: transparent;
          border-radius: 5px;
          color: black;
        }
      }
      h2 {
        font-weight: bold;
        margin-bottom: 1rem;
        font-size: 50px;
        text-align: left;
        width: 70%;
      }
      
      p {
        margin-bottom: 1rem;
        font-size: 20px;
        text-align: left;
      }
    }

    @media only screen and (max-width: 400px) {
      .flex-content {
        .apply-now-btn {
          font-size: 12px;
          padding: 5px !important;
        }
        .phone-input {
          input {
            font-size: 15px;
            padding: 15px !important;
          }
        }
      }
    }

    @media only screen and (max-width: 700px) {
      .flex-content {
        h2 {
          font-size: 25px !important;
        }
      }
    }

    @media only screen and (max-width: 1000px) {
      flex-direction: column-reverse;
      margin-top: 10px;
      text-align: center;
      .flex-content {
        margin-right: 0;
        margin-bottom: 50px;
        margin-top: 50px; 
        h2 {
          font-size: 30px;
          text-align: center;
          width: 100%; 
        }
        p { 
          font-size: 15px;
          text-align: center;
        }
        .learn-more-btn { display: none; }
        .apply-now-btn { margin-right: 0 !important; }
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    padding-top: 120px;
    .go-down {
      display: block;
    }
  }
`;