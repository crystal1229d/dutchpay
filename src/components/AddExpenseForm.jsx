import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { groupMembersState } from '../state/groupMembers';
import { expensesState } from '../state/expenses';
import styled from 'styled-components';

export const AddExpenseForm = () => {
    const members = useRecoilValue(groupMembersState);

    const today = new Date();
    const formattedToday = [today.getFullYear(), today.getMonth() + 1, today.getDate()].join('-');
    
    const [date, setDate] = useState(formattedToday);
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState(0);
    const [payer, setPayer] = useState(null);
    const [validated, setValidated] = useState(false);

    const [isDescValid, setIsDescValid] = useState(false);
    const [isAmountValid, setIsAmountValid] = useState(false);
    const [isPayerValid, setIsPayerValid] = useState(false);

    const setExpense = useSetRecoilState(expensesState);

    const checkFormValidity = () => {
        const isDescValid = desc.length > 0;
        const isPayerValid = payer !== null;
        const isAmountValid = amount > 0;
        
        setIsDescValid(isDescValid);
        setIsAmountValid(isAmountValid);
        setIsPayerValid(isPayerValid);

        return isDescValid && isAmountValid && isPayerValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // const form = event.currentTarget;
        if (checkFormValidity()) {
            const newExpense = {
                date, 
                desc, 
                amount, 
                payer 
            };
            setExpense(expense => [
                ...expense, 
                newExpense 
            ]);

            // input 초기화 
            setDesc(formattedToday);
            setDesc('')
            setAmount(0)
            setPayer('')
        }
        setValidated(true);
    }

    return (
        <StyledWrapper>
            <Form noValidate onSubmit={handleSubmit}>
                <StyledTitle>1. 비용 추가하기 </StyledTitle>
                <Row>
                    <Col xs={12}>       
                        <StyledFormGroup>
                            <Form.Control
                                type='date'
                                placeholder='결제한 날짜를 선택해주세요'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                    <StyledFormGroup>
                        <Form.Control
                            type='text'
                            isValid={isDescValid}
                            isInvalid={!isDescValid && validated}
                            placeholder='비용에 대한 설명을 입력해주세요'
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <Form.Control.Feedback
                            type='invalid'
                            data-valid={isDescValid}
                        >
                            비용 내용을 입력해 주셔야 합니다.
                        </Form.Control.Feedback>
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6}>
                    <StyledFormGroup>
                        <Form.Control
                            type='number'
                            isValid={isAmountValid}
                            isInvalid={!isAmountValid && validated}
                            placeholder='비용은 얼마였나요?'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value || 0)}
                        />
                            <Form.Control.Feedback
                                type='invalid'
                                data-valid={isAmountValid}
                            >
                                1원 이상의 금액을 입력해 주셔야 합니다.
                            </Form.Control.Feedback>
                        </StyledFormGroup>
                    </Col>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>
                            <Form.Select
                                isValid={isPayerValid}
                                isInvalid={!isPayerValid && validated}
                                defaultValue=''
                                // className='form-control'
                                value={payer}
                                onChange={(e) => setPayer(e.target.value)}
                            >
                                <option disabled value=''>누가 결제 했나요?</option>
                                {
                                    members.map(member => <option key={member} value={member}>{member}</option>)
                                }
                            </Form.Select>
                            <Form.Control.Feedback
                                type='invalid'
                                data-valid={isPayerValid}
                            >
                                결제자를 선택해 주셔야 합니다.
                            </Form.Control.Feedback>
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className='d-grid gap-2'>
                        <StyledSubmitButton>추가하기</StyledSubmitButton>
                    </Col>
                </Row>
            </Form>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    padding: 50px;
    background-color: #683BA1;
    border-radius: 15px;
    box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
`;

const StyledFormGroup = styled(Form.Group)`
    margin-bottom: 15px;

    input, select {
        height: 45px;
        background-color: #59359A;
        color: #F8F9FA;
        border: 0;
        border-radius: 8px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

        &:focus {
            background-color: #59359A;
            filter: brightness(80%);
            color: #F8F9FA;
        }

        ::placeholder {
            color: #F8F9FA;
        }
    }
`;

export const StyledTitle = styled.h3`
    color: #FFFBFB;
    text-align: center;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: 0.25px;
    margin-bottom: 15px;
`;

const StyledSubmitButton = styled(Button).attrs({
    type: 'submit'
})`
    height: 60px;
    padding: 16px 32px;
    margin-top: 10px;
    border: 0;
    border-radius: 8px;
    background-color: #E2D9F3;
    color: #59359A;
    gap: 8px;

    &:hover, &:focus {
        background-color: #E2D9F3;
        filter: rgba(0, 0, 0, 0.2);
    }
`;