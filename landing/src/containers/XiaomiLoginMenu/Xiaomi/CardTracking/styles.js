import styled from "styled-components";

const CardTrackingWrapper = styled.div`
  .row {
    flex-direction: column;
    text-align: center;
  }
  .heading {
    font-size: 22px;
    font-weight: 600;
  }

  .line-first {
    margin: 40px 0px 40px 0;
  }

  .line-second {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .latest-info {
    display: flex;
    text-align: center;
    justify-content: space-around;
    margin-bottom: 80px;
    margin-top: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .submit-cvv {
    text-align: center;
  }

  .btn {
    width: 30%;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 20px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #dd285d;
    @media (max-width: 768px) {
      width: 90%;
      margin-top: 10px;
      margin-bottom: 10px;
      margin-right: 0px;
    }
  }
  .btn-light {
    width: 30%;
    margin-top: 10px;
    margin-bottom: 20px;
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
  .btn-full {
    width: 61%;
    margin-right: 14px;
    @media (max-width: 768px) {
      width: 90%;
    }
  }
  .history-tracking {
    text-align: center;
    margin-top: -50px;
  }

  .btn-section {
    text-align: center;
  }
  .mail-info {
    font-family: Nunito, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 16px 36px;
    border-radius: 8px;
    background: white;
    letter-spacing: 0.3px;
    box-shadow: 0px 12px 17px rgba(0, 0, 0, 0.26);
    font-weight: 600;
  }

  img {
    height: 36px;
    margin-right: 16px;
  }

  .mail-text {
    font-size: 20px;
  }

  [tooltip] {
    position: relative;
  }

  [tooltip]::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px 6px 0 6px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
    z-index: 100;
    opacity: 0;
    transition: all 250ms ease;
  }

  [tooltip]::after {
    content: attr(tooltip);
    position: absolute;
    left: 50%;
    top: -6px;
    transform: translateX(-50%) translateY(-100%);
    background: #fff;
    text-align: center;
    color: #00afda;
    padding: 4px 8px;
    font-size: 14px;
    min-width: 80px;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    transition: all 250ms ease;
  }

  [tooltip-position="bottom"]::before {
    top: 100%;
    margin-top: 36px;
    transform: translateX(-50%) translatey(-100%) rotate(-180deg);
  }

  [tooltip-position="bottom"]::after {
    top: 100%;
    margin-top: 36px;
    transform: translateX(-50%) translateY(0);
  }

  [tooltip]:hover::after,
  [tooltip]:hover::before {
    opacity: 1;
  }
`;

export default CardTrackingWrapper;
