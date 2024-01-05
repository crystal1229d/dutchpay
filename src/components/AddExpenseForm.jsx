import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { groupMembersState } from '../state/groupMembers';
import { expensesState } from '../state/expenses';

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
        }
        setValidated(true);
    }

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <h3>1. 비용 추가하기 </h3>
            <Form.Group>
                <Form.Control
                    type='date'
                    placeholder='결제한 날짜를 선택해주세요'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Form.Group>
            <Form.Group>
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
            </Form.Group>
            <Form.Group>
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
                    금액을 입력해 주셔야 합니다.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Select
                    isValid={isPayerValid}
                    isInvalid={!isPayerValid && validated}
                    defaultValue=''
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
            </Form.Group>
            <Button type="submit">추가하기</Button>
        </Form>
    )
}