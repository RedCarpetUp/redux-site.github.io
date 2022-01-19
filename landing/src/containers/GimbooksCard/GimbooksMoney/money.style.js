import styled from "styled-components";
import Card from "common/components/Card";

export const CardItem = styled(Card)`
    width: 350px;
    height: auto;
    min-height: 280px;
    padding: 1rem;
    border-radius: 1rem;
    margin: 20px;
    background-color: white;

    &:first-child { margin-left: 0; }
    &:last-child { margin-right: 0; }

    h2 {
        margin-bottom: 15px;
    }
    
    img {
        width: 7rem;
        height: 7rem;
        margin-bottom: 10px;
    }

    p {
        font-size: 20px;
        line-height: 24px;
    }

    @media only screen and (max-width: 1000px) {
        margin-left: 0;
        margin-right: 0;
        &:first-child { margin-top: 0; }
        &:last-child { margin-bottom: 0; }
    }

    @media only screen and (max-width: 400px) {
        width: 100%;
        h2 {
            font-size: 25px;
        }
    }

    @media only screen and (max-width: 300px) {
        width: 100%;
        h2 {
            font-size: 22px;
        }
        p {
            font-size: 17px;
        }
    }
`;

export const SectionWrapper = styled.section`
    background-color: #F5F5F5;
    padding: 100px 0;

    .flex-container {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .text-heading {
        font-size: 45px;
    }

    .text-content {
        font-size: 22px;
        margin: 15px 0 30px 0;
    }

    @media only screen and (max-width: 1000px) {
        .flex-container {
            flex-direction: column;
        }
        .text-heading {
            font-size: 30px;
        }
    }
`;