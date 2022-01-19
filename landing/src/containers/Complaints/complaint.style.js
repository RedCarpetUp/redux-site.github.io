import styled from "styled-components";
import Container from "common/components/UI/Container";
import Text from "common/components/Text";
import Button from "common/components/Button";
import { themeGet } from '@styled-system/theme-get';

export const ComplaintContainer = styled(Container)`
    padding-top: 100px;
    padding-bottom: 50px;
    @media only screen and (max-width: 1000px) {
        padding-top: 0px;
    }
`;

export const Image = styled.img`
    width: 500px;
    height: 325px;
    @media only screen and (max-width: 1000px) {
        width: inherit;
        height: 275px;
    }
    @media only screen and (max-width: 380px) {
        height: 200px;
    }
`;

export const RedButton = styled(Button)`
    background-color: #dd285d;
    border-radius: 5px;
    font-size: 17px;
`;

export const Stage = styled.div`
    h1 {
        color: #dd285d;
        font-size: 27px;
        font-weight: 500;
        span {
            margin-left: 20px;
        }
    }

    li {
        margin-bottom: 10px;
    }

    p {
        font-size: 18px;
        span {
            font-weight: bold;
        }
    }
`;

export const FlexSection = styled.section`
    display: flex;
    width: 100%;
    margin: 50px 0;
    .flex-item {
        flex: 1;
        ul {
            li {
                margin-bottom: 1rem;
            }
        }
    }
    @media only screen and (max-width: 1000px) {
        flex-direction: column;
        
        .flex-item {
            margin-top: 25px;
            margin-bottom: 20px;
        }
    }
`;

export const ModalContainer = styled.section`
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    
    .modal-content {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 500px;
        max-height: calc(100% - 250px);
        transform: translate(-50%, -50%);
        overflow: scroll;
        
        .modal-close-button {
            position: relative;
            color: black;
            font-weight: bold;
            font-size: 25px;
            cursor: pointer;
            outline: none;
            user-select: none;
            float: right;
            margin-right: 20px;
            margin-top: 10px;
        }
        @media only screen and (max-width: 1000px) {
            width: 350px;
        }
        @media only screen and (max-width: 380px) {
            width: 100%;
        }
    }
    .modal-content::-webkit-scrollbar {
        display: none;
    }      
`;

export const ModalFormContainer = styled.div`
    background-color: white;
    padding: 20px;
    height: inherit;
    border-radius: 10px;
`;

export const SelectField = styled.div`
    position: relative;
    select {
        font-size: 16px;
        padding: 11px;
        display: block;
        width: 100%;
        color: ${themeGet('colors.textColor', '#484848')};
        box-shadow: none;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid ${themeGet('colors.inactiveIcon', '#ebebeb')};
        transition: border-color 0.2s ease;
        
        &:focus {
            outline: none;
            border-color: ${themeGet('colors.primary', '#028489')};
        }
    }
`;

export const Label = styled.label`
    display: block;
    color: ${themeGet('colors.labelColor', '#767676')};
    font-size: ${themeGet('fontSizes.4', '16')}px;
    font-weight: ${themeGet('fontWeights.4', '500')};
    margin-bottom: ${themeGet('space.3', '10')}px;
    transition: 0.2s ease all;
`;

export const FileUploadSection = styled.section`
    width: 100%;
    border: 1px dashed black;
    text-align: center;
    cursor: pointer;
`;

export const Paragraph = styled(Text)`
    font-size: 18px;
`;
