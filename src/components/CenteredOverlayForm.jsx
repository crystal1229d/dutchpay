import { Button, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import OverlayWrapper from './shared/OverlayWrapper';

const CenteredOverlayForm = ({ title, children, validated, handleSubmit }) => {
    return (
        <CentralizedContainer>
            <StyledLogo>Dutch Pay</StyledLogo>
            
            <OverlayWrapper>
                <Container>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <StyledCentralizedContent>
                            <Row className='align-itmes-start'>
                                <StyledTitle>{title}</StyledTitle>
                            </Row>
                            <Row className='align-items-center'>
                                {children}
                            </Row>
                            <Row className='align-items-end'>
                                <StyledSubmitButton>저장</StyledSubmitButton>
                            </Row>
                        </StyledCentralizedContent>
                    </Form>
                </Container>
            </OverlayWrapper>
        </CentralizedContainer>
    )
}

export default CenteredOverlayForm;

const CentralizedContainer = styled(Container)`
    width: 50vw;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;
`;

// StyledHeader -> StyledH1 -> StyledLogo (목적에 맞게 네이밍 + 가독성)
const StyledLogo = styled.h1`
    font-wiehgt: 200;
    letter-spacing: 10px;
    color: #6610F2;
`;

const StyledCentralizedContent = styled(Row)`
    height: 60vh;
    align-items: center;
    justify-content: center;
`;

// StyledH2 -> StyledTitle (목적에 맞게 네이밍 + 가독성)
const StyledTitle = styled.h2`
    text-align: right;
    font-weight: 700;
    line-height: 35px;
    overflow-wrap: break-word;
    word-break: keep-all;
`;

const StyledSubmitButton = styled(Button).attrs({
    type: 'submit', 
})`
    background-color: #6610F2;
    border: none;
    border-radius: 80x;

    &: hover {
        background-color: #6610F2;
        filter: brightness(80%);
    }
`;