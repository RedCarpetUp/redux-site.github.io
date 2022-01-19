import styled from "styled-components";

export const SectionWrapper = styled.section`
    padding: 150px 0;

    .flex-section {
        display: flex;
        align-items: center;
        .flex-content, .flex-image {
            flex: 1;
        }
        .flex-content {
            h2 {
                font-size: 25px;
            }
            p {
                color: grey;
            }
            button {
                background-color: #6c63ff;
                border-radius: 0.4rem;
            }
            margin-left: 50px;
        }
        
        .flex-image {
            img {
                width: 400px;
                height: 400px;
            }
        }
    }
    @media only screen and (max-width: 1000px) {
        padding: 50px 0;
        .flex-section {
            flex-direction: column;
            .flex-content {
                margin-left: 0;
                h2 {
                    font-size: 25px;
                }
                p {
                    font-size: 15px;
                }
            }
        }
    }
`;