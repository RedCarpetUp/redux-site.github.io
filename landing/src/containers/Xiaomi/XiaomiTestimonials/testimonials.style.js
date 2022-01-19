import styled from "styled-components";
import Card from "common/components/Card";

export const SectionWrapper = styled.div`
    background-color: #F5F5F5;
    padding: 100px 0;

    .review-title {
        font-size: 50px;
        text-align: center;
        margin-bottom: 30px;
    }

    @media only screen and (max-width: 450px) {
        .review-title {
            text-align: left;
        }
    }
    @media only screen and (max-width: 1000px) {
        .review-title {
            font-size: 38px;
        }
    }
`;

export const CardItem = styled(Card)`
    width: auto;
    height: auto;
    min-height: 350px;
    padding: 1.5rem;
    border-radius: 1rem;
    margin: 20px;
    border: 1px solid ${props => props.odd ? "white" : "#6e7379"};
    background-color: ${props => props.odd ? "#005ce6" : "white"};

    .review-quote-icon {
        color: ${props => props.odd ? "black" : "#005ce6"};
        position: relative;
        top: -42px;
    }

    .review-heading {
        font-size: 18px;
        color: ${props => props.odd ? "white" : "black"};
        margin-bottom: 15px;
    }

    .review-rating {
        font-size: 20px;
        color: #ffc24c;
    }

    .review-content {
        line-height: 24px;
        font-size: 15px;
        color: ${props => props.odd ? "white" : "#6e7379"};

        .extend-content {
            cursor: pointer;
        }
    }

    &:nth-child(even) {
        background-color: white;
    }

    @media only screen and (max-width: 1000px) {
        
        // margin-left: 0;
        // margin-right: 0;
        // &:first-child { margin-top: 50px; }
        // &:last-child { margin-bottom: 0; }
    }
`;