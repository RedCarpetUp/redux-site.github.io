
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import styled from "styled-components";

const ReduxMainBannerWrapper = styled.section`
    background-color: #b9a0c9;
    text-align: center; 
    padding: 150px 0;

    h1 {
        color: white;
    }
`;

const ReduxMainBanner = ({ title }) => {
    return (
        <ReduxMainBannerWrapper>
            <Container>
                <Heading content={title} />
            </Container>
        </ReduxMainBannerWrapper>
    );
}

export default ReduxMainBanner;