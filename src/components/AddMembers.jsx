import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputTags } from 'react-bootstrap-tagsinput';
import { groupMembersState } from '../state/groupMembers';
import { groupNameState } from '../state/groupName';
import styled from 'styled-components';
import { CenteredOverlayForm } from './CenteredOverlayForm';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';

export const AddMembers = () => {
    const [validated, setValidated] = useState(false);
    const [grouopMembers, setGroupMembers] = useRecoilState(groupMembersState);
    const groupName = useRecoilValue(groupNameState); // value 만 가져오기

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidated(true);

        if (grouopMembers.length > 0) {
            navigate(ROUTES.EXPENSES_MAIN)
        }
    }

    return (
        <CenteredOverlayForm
            title={`${groupName} 그룹에 속한 사람들의 이름을 모두 적어주세요.`}
            validated={validated}
            handleSubmit={handleSubmit}
        >
            <InputTags
                placeholder='이름 간 띄어 쓰기'
                onTags={(value) => setGroupMembers(value.values)}
            /> 
            {
                validated && grouopMembers.length === 0
                && (<StyledErrorMessage>그룹 멤버들의 이름을 입력해주세요.</StyledErrorMessage>)
            }       
        </CenteredOverlayForm>
    );
}

const StyledErrorMessage = styled.span`
    color: red;
`;