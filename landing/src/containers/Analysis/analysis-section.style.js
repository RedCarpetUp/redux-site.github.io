import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding-bottom: 160px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  position: relative;
  overflow: hidden;
  @media (max-width: 990px) {
    padding-bottom: 60px;
    min-height: auto;
  }
  @media (max-width: 767px) {
    padding-bottom: 20px;
    min-height: auto;
  }

  @media only screen and (max-width: 480px) {
    background: none;
  }

  .particle {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    @media (max-width: 767px) {
      display: none;
    }
    @media only screen and (max-width: 480px) {
      width: 100%;
    }
  }

  .row {
    position: relative;
    z-index: 1;
  }
`;

export default SectionWrapper;
