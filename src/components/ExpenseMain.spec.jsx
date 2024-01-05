import { render, screen } from '@testing-library/react'
import { RecoilRoot, Snapshot } from 'recoil'
import { ExpenseMain } from './ExpenseMain'
import userEvent from '@testing-library/user-event'
import { groupMembersState } from '../state/groupMembers'

const renderComponent = () => {
    render(
        <RecoilRoot initializeState={(snapshot) => {
            snapshot.set(groupMembersState, ['영수', '영희'])
        }}>
            <ExpenseMain />
        </RecoilRoot>
    )

    const dateInput = screen.getByPlaceholderText(/결제한 날짜/i); // ExpenseMain 렌더링됐을 때, 날짜입력input 은 dynamic rendering 되지 않고 이미 존재하기 때문 
    const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
    const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
    const payerInput = screen.getByDisplayValue(/누가 결제/i);
    const addButton = screen.getByText('추가하기');

    return {
        dateInput, 
        descInput,
        amountInput, 
        payerInput, 
        addButton 
    }
}

describe('비용정산 메인페이지', () => {
    describe('비용추가 컴포넌트', () => {
         test('비용추가 컴포넌트 렌더링', () => {
             const { dateInput, descInput, amountInput, payerInput, addButton } = renderComponent();
             
             expect(dateInput).toBeInTheDocument() 
             expect(descInput).toBeInTheDocument()
             expect(amountInput).toBeInTheDocument()
             expect(payerInput).toBeInTheDocument()
             expect(addButton).toBeInTheDocument()
        })

        test('비용추가에 필수적인 값을 입력하지 않고 "추가" 버튼 클릭시, 에러 메시지 노출', async () => {
            const { addButton } = renderComponent()

            expect(addButton).toBeInTheDocument()
            await userEvent.click(addButton)

            const descErrorMessage = screen.getByText('비용 내용을 입력해 주셔야 합니다.')
            expect(descErrorMessage).toBeInTheDocument()

            const payerErrorMessage = screen.getByText('결제자를 선택해 주셔야 합니다.')
            expect(payerErrorMessage).toBeInTheDocument()

            const amountErrorMessage = screen.getByText('금액을 입력해 주셔야 합니다.')
            expect(amountErrorMessage).toBeInTheDocument()
        })

        test('비용 추가에 필수적인 값들을 입력한 후 "추가" 버튼 클릭시, 저장 성공', async () => {
            const { descInput, amountInput, payerInput, addButton } = renderComponent();

            await userEvent.type(descInput, '장보기') 
            await userEvent.type(amountInput, '30000') // string type 
            await userEvent.selectOptions(payerInput, '영수') // 테스트 돌리기 전에 payerList (멤버들 이름)이 셋업되어야 한다 
            await userEvent.click(addButton)

            // const descErrorMessage = screen.getByText('비용 내용을 입력해 주셔야 합니다.')
            // 해당 에러메시지가 있기를 기대하는 것이 아니므로 getBy -> queryBy 
            const descErrorMessage = screen.queryByText('비용 내용을 입력해 주셔야 합니다.')
            expect(descErrorMessage).toHaveAttribute('data-valid', 'true');
            // expect(descErrorMessage).not.toBeInTheDocument()
            
            const payerErrorMessage = screen.queryByText('결제자를 선택해 주셔야 합니다.')
            expect(payerErrorMessage).toHaveAttribute('data-valid', 'true');
            // expect(payerErrorMessage).not.toBeInTheDocument()
            
            const amountErrorMessage = screen.queryByText('금액을 입력해 주셔야 합니다.')
            expect(amountErrorMessage).toHaveAttribute('data-valid', 'true');
            // expect(amountErrorMessage).not.toBeInTheDocument()
        })  
    })
})