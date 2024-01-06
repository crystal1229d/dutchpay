import styled from 'styled-components';

export const ServiceLogo = () => {
    return (
        <StyledLogo>Dutch Pay</StyledLogo>
    )
}

// StyledHeader -> StyledH1 -> StyledLogo (목적에 맞게 네이밍 + 가독성)
const StyledLogo = styled.h1`
    font-weight: 200;
    letter-spacing: 10px;
    color: slateBlue;
    text-align: center;
    margin-bottom: 0.8em;
`;