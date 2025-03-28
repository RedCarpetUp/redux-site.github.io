import styled from 'styled-components';

const SmartCardContentWrapper = styled.section`
  min-height: 300px;
  display: flex;
  align-items: center;
  margin-bottom: 10rem;
  margin-top: 10rem;

  position: relative;
  @media only screen and (max-width: 1200px) {
    min-height: 500px;
    margin-bottom: 45px;
  }
  @media only screen and (max-width: 991px) {
    min-height: 370px;
    margin-bottom: 2rem;
  }
  @media (max-width: 767px) {
    min-height: auto;
    display: block;
    margin-bottom: 2rem;
  }
`;

const SectionObject = styled.div`
  position: absolute;
  width: 55%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 767px) {
    width: 100%;
    position: relative;
    height: auto;
    top: auto;
    left: auto;
  }
  img {
    max-width: 93%;
    height: auto;
  }
  .objectWrapper {
    margin-right: auto;
    position: relative;
    .dashboardWrapper {
      position: absolute;
      top: 4vw;
      left: 0;
    }
  }
`;

export { SectionObject };

export default SmartCardContentWrapper;
