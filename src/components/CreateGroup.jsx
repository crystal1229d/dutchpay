import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Form } from 'react-bootstrap';
import { groupNameState } from '../state/groupName';
import { CenteredOverlayForm } from './CenteredOverlayForm';

export const CreateGroup = () => {
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
        <CenteredOverlayForm
            title='먼저, 더치페이할 그룹의 이름을 정해볼까요?'
            validated={validated}
            handleSubmit={handleSubmit}
        >
            <Form.Group>
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
        </CenteredOverlayForm>
    );
}