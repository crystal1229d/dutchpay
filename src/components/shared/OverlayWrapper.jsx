import styled from 'styled-components';

const OverlayWrapper = ({ children }) => {
    return (
        <StyledContainer>{children}</StyledContainer>
    )
}

export default OverlayWrapper;

const StyledContainer = styled.div`
    min-height: ${(props) => props.minHeight || '0'};
    padding: ${(props) => props.padding || '5vw'};
    border-radius: 15px;
    background-color: white;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;