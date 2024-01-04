import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Container, Form, Row } from 'react-bootstrap';
import CenteredOverlayForm, { StyledH2, StyledRow, StyledSubmitButton } from './CenteredOverlayForm';
import { InputTags } from 'react-bootstrap-tagsinput';
import { groupMembersState } from '../state/groupMembers';
import { groupNameState } from '../state/groupName';

const AddMembers = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [grouopMembers, setGroupMembers] = useRecoilState(groupMembersState);
    const groupName = useRecoilValue(groupNameState); // value 만 가져오기

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
    }

    return (
        <CenteredOverlayForm>
            <Container>
                <Form noValidate onSubmit={handleSubmit}>
                    <StyledRow>
                        <Row className='align-itmes-start'>
                            <StyledH2>{groupName} 그룹에 속한 사람들의 이름을 모두 적어주세요.</StyledH2>
                        </Row>
                        <Row className='align-items-center'>
                            <InputTags
                                placeholder='이름 간 띄어 쓰기'
                                onTags={(value) => setGroupMembers(value.values)}
                            /> 
                            {
                                grouopMembers.length === 0
                                && formSubmitted
                                && (<span>그룹 멤버들의 이름을 입력해주세요.</span>)
                            }
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

export default AddMembers;