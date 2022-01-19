import styled from "styled-components";
import Card from "common/components/Card";

export const SectionWrapper = styled.section`
    background-color: #262e31;
    padding: 150px 0 100px 0;

    .review-heading {
        text-align: center;
        color: white;
        font-size: 40px;
    }

    .review-carousel-items {
        margin-bottom: 20px;
    }
`;

export const CardItem = styled(Card)`
    width: auto;
    height: auto;
    min-height: 350px;
    padding: 1.5rem;
    border-radius: 1rem;
    margin: 20px;
    background-color: #323b40;
    margin-top: 50px;
        
        .review-text-content {
            color: white;
            font-size: 16px;
            text-align: center;
            height: 110.7px;
            overflow-y: auto;
            margin-bottom: 0;
        
            ::-webkit-scrollbar {
                width: 8px;
            }
        
            ::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 20px;
            }
            
            ::-webkit-scrollbar-thumb {
                background: #888; 
                border-radius: 20px;
            }
        
            ::-webkit-scrollbar-thumb:hover {
                background: #555; 
            }
        }
        
        .center-it {
            position: relative;
            left: 50%;
            transform: translate(-50%, 0);
        }
    
        .review-profile-pic {
            border-radius: 50%;
            width: 75px;
            height: 75px;
            top: -50px;
        }

        .review-name {
            color: white;
            text-align: center;
        }

        hr {
            margin: 30px;
            margin-top: 20px;
        }

        .text-gap {
            padding: 37.5px 0;
        }

        .review-quote-icon {
            top: -25px;
            color: #576169;
            text-align: center;
        }
`;