import { Button, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import OverlayWrapper from './shared/OverlayWrapper';
import { ServiceLogo } from './ServiceLogo';

export const CenteredOverlayForm = ({ title, children, validated, handleSubmit }) => {
    return (
        <CentralizedContainer>
            <ServiceLogo />
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

const CentralizedContainer = styled(Container)`
    width: 50vw;
    @media { max-width: 500px } {
        width: 80vw;
    }
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;
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