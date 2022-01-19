import styled from "styled-components";

export const GoUp = styled.div`
  position: fixed;
  z-index: 9999;
  bottom: 5rem;
  right: 5rem;
  with: auto;
  height: auto;
  cursor: pointer;
  border-radius: 50%;
  background-color: #263c57;
  padding: 6px 7px 10px 7px;

  i {
    color: white;
  }

  @media only screen and (max-width: 1000px) {
    bottom: 3rem;
    right: 3rem;
  }  

  @media only screen and (max-width: 500px) {
    bottom: 2rem;
    right: 2rem;
  }

  @media only screen and (max-width: 400px) {
    bottom: 1rem;
    right: 1rem;
  }  
`;

export const SectionWrapper = styled.section`
  padding-top: 250px;
  margin: 0;
  background: linear-gradient(
    -45deg, 
    #707070, 
    #505050, 
    #303030, 
    #101010, 
    #000000
  );
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
      color: white;
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translate(-50%, -100%);
    }
  }
  
  .flex-section {
    display: flex;

    .flex-content {
      margin-right: 0px;

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
          }
          width: 175px;
          margin-right: 15px;
        }
        
        .apply-now-btn {
          border-radius: 5px;
          background-color: #ffff33;
          color: black;
          margin-right: 15px;
        }
        .learn-more-btn {
          border: 1px solid white;
          background: transparent;
          border-radius: 5px;

        }
      }
      h2 {
        color: white;
        font-weight: bold;
        margin-bottom: 1rem;
        font-size: 50px;
        text-align: left;
        width: 70%;
      }
      
      p {
        color: white;
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