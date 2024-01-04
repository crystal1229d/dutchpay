import { Button, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import OverlayWrapper from './shared/OverlayWrapper';

const CenteredOverlayForm = ({ children }) => {
    return (
        <CentralizedContainer>
            <StyledHeader>Dutch Pay</StyledHeader>
            <OverlayWrapper>
                {children}
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

const StyledHeader = styled.h1`
    font-wiehgt: 200;
    letter-spacing: 10px;
    color: #6610F2;
`;

export const StyledRow = styled(Row)`
    height: 60vh;
    align-items: center;
    justify-content: center;
`;

export const StyledH2 = styled.h2`
    text-align: right;
    font-weight: 700;
    line-height: 35px;
    overflow-wrap: break-word;
    word-break: keep-all;
`;

export const StyledSubmitButton = styled(Button).attrs({
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