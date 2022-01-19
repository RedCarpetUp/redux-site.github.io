import styled from "styled-components";

export const SectionWrapper = styled.section`
    padding: 150px 0;
    background-color: #ffba63;

    .flex-section {
        display: flex;
        align-items: center;
        .flex-content, .flex-image {
            flex: 1;
        }
        .flex-content {
            h2 {
                font-size: 40px;
                width: 85%;
            }
            .prize-text {
                width: 85%;
                font-size: 18px;
                color: #505050;
                margin-bottom: 0;
            }
            .prize-rate-text {
                color: #505050;
                width: 85%;
                font-size: 18px;
                a {
                    color: #dd285d;
                    font-size: 18px;
                }
            }
            .star-rating-wrapper {
                span {
                    font-size: 75px;
                    color: #6c63ff;
                }
            }
            .prize-button {
                border-radius: 0.4rem;
                background-color: #6c63ff;
            }
        }
        .flex-image {
            margin-left: 50px;
            img {
                width: 400px;
                height: 400px;
            }
        }
    }
    @media only screen and (max-width: 1000px) {
        padding: 50px 0;
        .flex-section {
            flex-direction: column-reverse;
            .flex-image {
                margin-left: 0;
            }
            .flex-content {
                h2 {
                    font-size: 30px;
                    width: 100%;
                    text-align: center;
                }
                .prize-text, .prize-rate-text {
                    font-size: 15px;
                    width: 100%;
                    text-align: center;
                    a {
                        font-size: 15px;
                    }
                }
                .star-rating-wrapper {
                    text-align: center;
                    span {
                        font-size: 50px;
                    }
                }
                button {
                    position: relative;
                    left: 50%;
                    transform: translate(-50%, 0);
                }
            }
        }
    }
`;
