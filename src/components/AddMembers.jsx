import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputTags } from 'react-bootstrap-tagsinput';
import { groupMembersState } from '../state/groupMembers';
import { groupNameState } from '../state/groupName';
import styled from 'styled-components';
import { CenteredOverlayForm } from './CenteredOverlayForm';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { Form } from 'react-bootstrap';

export const AddMembers = () => {
    const [validated, setValidated] = useState(false);
    const [grouopMembers, setGroupMembers] = useRecoilState(groupMembersState);
    const groupName = useRecoilValue(groupNameState); // value 만 가져오기
    const [groupMembersString, setGroupMembersString] = useState('')

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidated(true);

        if (grouopMembers.length > 0) {
            navigate(ROUTES.EXPENSES_MAIN)
        } else {
            if (groupMembersString.length > 0) {
                // 1. 태그가 동작하지 않았을 때
                setGroupMembers(groupMembersString.split(','))
            }
            // 2. 사용자가 아무런 멤버도 입력하지 않았을 때
        }
    }

    // TODO: Performance Optimization 
    // IIFE (즉시실행함수) => 일반함수로 선언 후 return 문 내에서 실행 시, 4번 호출됨 
    // 4번이나 호출할 필요가 없으므로 return 문 전에 즉시실행하여 한 번만 실행하고 그 값을 저장하여 return 문 내에서 이용 
    const isSamsungInternet = (() => {
        return window.navigator.userAgent.includes('SAMSUNG')
    })()

    return (
        <CenteredOverlayForm
            title={`${groupName} 그룹에 속한 사람들의 이름을 모두 적어주세요.`}
            validated={validated}
            handleSubmit={handleSubmit}
        >

            {/* TODO: InputTags가 동작하지 않는 환경에서, 이름 값을 ,를 구분자로 해서 받는다 */}    
            {
                isSamsungInternet
                    ? (<Form.Control 
                            placeholder='이름 간 컴마(,)로 구분'
                            onChange={({target}) => setGroupMembersString(target.value)}
                        />)
                    : (<InputTags
                            data-testid='input-member-names'
                            placeholder='이름 간 띄어 쓰기'
                            onTags={(value) => setGroupMembers(value.values)}
                        />)
            }
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