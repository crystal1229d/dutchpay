import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Container, Form, Row } from 'react-bootstrap';
import CenteredOverlayForm, { StyledH2, StyledRow, StyledSubmitButton } from './CenteredOverlayForm';
import { groupNameState } from '../state/groupName';

const CreateGroup = () => {
    const [validated, setValidated] = useState(false); // form 이 validity 검증과정을 거쳤는지 여부 
    const [validGroupName, setValidateGroupName] = useState(false); // 입력된 groupName 의 valid 여부 
    // const [groupName, setGroupName] = useRecoilState(groupNameState); // groupName 사용하지않으므로 useRecoilState -> useSetRecoilState 로 hook 변경 
    const setGroupName = useSetRecoilState(groupNameState);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setValidateGroupName(true);
        } else {
            event.stopPropagation();
            setValidateGroupName(false);
        }
        setValidated(true);
    }

    return (
        <CenteredOverlayForm>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <StyledRow>
                        <Row className='align-itmes-start'>
                            <StyledH2>먼저, 더치페이할 그룹 이름을 정해볼까요?</StyledH2>
                        </Row>
                        <Row className='align-items-center'>
                            <Form.Group controlId="validationGroupName">
                                <Form.Control
                                    type="text"
                                    required 
                                    placeholder="2024 일본 여행"
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                                <Form.Control.Feedback
                                    type="invalid"
                                    data-valid={validGroupName}
                                >
                                    그룹 이름을 입력해주세요. 
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className='align-items-end'>
                            <StyledSubmitButton>저장</StyledSubmitButton>
                        </Row>
                    </StyledRow>
                </Form>
             </Container>
        </CenteredOverlayForm>
    );
}

export default CreateGroup;