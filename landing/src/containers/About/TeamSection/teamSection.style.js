import styled from "styled-components";

const TeamSectionWrapper = styled.section`
  padding: 80px 0;
  overflow: hidden;
  @media (max-width: 990px) {
    padding: 60px 0;
  }

  .team__member {
    .icon__wrapper {
      /* display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; */
    }
  }

  .member__photo {
    border-radius: 20px;
    margin-right: auto;
    margin-left: auto;
    max-height: 350px;
    @media only screen and (max-width: 1203px) {
      max-height: 283px;
    }
    @media only screen and (max-width: 975px) {
      max-height: 213px;
    }
    @media only screen and (max-width: 751px) {
      max-height: 100%;
    }
  }
`;

const SocialLinks = styled.div`
  margin-top: 12px;
  > button,
  a {
    margin: 3px;
    cursor: pointer;
    width: 30px;
    height: 24px;
    line-height: 20px;
    background-color: transparent;
    border-radius: 3px;
    border: 1px solid rgba(15, 33, 55, 0.26);
    color: #0f2137;
    padding: 1px 6px;
    font-size: 13px;
    display: inline-block;
    transition: all 0.2s ease;
    &:hover,
    &:focus {
      outline: none;
      &.flaticon-facebook-logo {
        color: #ffffff;
        border-color: #3c5a99;
        background-color: #3c5a99;
      }
      &.flaticon-twitter-logo-silhouette {
        color: #ffffff;
        border-color: #1da1f2;
        background-color: #1da1f2;
      }
      &.flaticon-instagram {
        color: #ffffff;
        border-color: #fb3958;
        background-color: #fb3958;
      }
      &.flaticon-dribble-logo {
        color: #ffffff;
        border-color: #ea4c89;
        background-color: #ea4c89;
      }
    }
  }
`;

export { SocialLinks };
export default TeamSectionWrapper;
