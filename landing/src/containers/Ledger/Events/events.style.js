import styled from "styled-components";

export const ContentWrapper = styled.div`
  .Heading {
    color: #ff4a4c;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
    margin-top: 100px;
    margin-bottom: 25px;
  }
`;

export const SectionWrapper = styled.div`
  .Heading-1 {
    color: #5c5c5c;
    font-size: 30px;
    font-weight: normal;
  }
  .Heading-2 {
    color: #5c5c5c;
    font-size: 25px;
    font-weight: normal;
  }
  .Content-1 {
    font-size: 20px;
    line-height: 40px;
  }
  p.Content {
    font-size: 20px;
    line-height: 40px;
    margin-bottom: 70px;
  }
  .codeBox-Container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    .arrow-right {
      margin-left: 10px;
      margin-right: 10px;
    }

    .code-items img:not(:last-child) {
      margin-bottom: 25px;
    }

    .block-items {
      
    }
  }
`;

export default ContentWrapper;
