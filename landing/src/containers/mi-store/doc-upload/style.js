import styled from "styled-components";

const DocUploadWrapper = styled.div`
  input[type="file"] {
    display: none;
  }
  .upload {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    cursor: pointer;
    border: 1px solid #00d88d;
    border-radius: 10px;
  }
  .upload-btn {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: #00d88d;
    border-radius: 10px;
    color: white;
    margin: 20px auto;
    text-align: center;
    .upload-icon {
      margin: 0 10px;
    }
    .file {
      text-align: center;
      margin: 0;
    }
    @media only screen and (max-width: 500px) and (min-width: 400px) {
      padding: 10px 30px;
      margin: 20px 10px;
    }
    @media only screen and (max-width: 400px) {
      margin: 20px 5px;
    }
  }
  .file-name {
    margin: 20px auto;
    width: 100%;
    text-align: center;
  }
`;
export default DocUploadWrapper;
