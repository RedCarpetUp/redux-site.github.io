import styled from "styled-components";

export const SectionWrapper = styled.section`
    background-color: #fd5858;
    padding: 150px 0;
    .heading {
        text-align: center;
        font-size: 40px;
        color: white;
    } 
    .center-it {
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
    }
    .flex-section {
        margin-top: 100px;
        display: flex;
        align-items: center;

        .flex-items {
            flex: 1;

            h2 {
                text-align: center;
                color: white;
            }
            img {
                width: 250px;
                height: 250px;
                border-radius: 50%;
                margin-bottom: 20px;
            }
        }
    }
    @media only screen and (max-width: 1000px) {
        padding: 50px 0;
        .heading { font-size: 30px; }
        .flex-section {
            margin-top: 50px;
            flex-direction: column;

            .flex-items {
                margin: 30px 0;
                &:first-child { margin-top: 0; }
                &:last-child { margin-bottom: 0; }

                img {
                    width: 100px;
                    height: 100px;
                }
            }
        }
    }
`;