import { useRecoilValue } from 'recoil'
import { expensesState } from '../state/expenses'
import { groupMembersState } from '../state/groupMembers'
import styled from 'styled-components'
import { StyledTitle } from './AddExpenseForm'

export const calculateMinimumTransaction = (expenses, members, amountPerPerson) => {
    const minTransactions = []

    if (amountPerPerson === 0) return minTransactions

    // 1. 사람별로 냈어야 할 금액 
    const membersToPay = {}
    members.forEach(member => {
        membersToPay[member] = amountPerPerson 
    })

    // 2. 사람별로 냈어야 할 금액 업데이트 (기준: expenses)
    expenses.forEach(({ payer, amount }) => {
        membersToPay[payer] -= amount
    })

    // 3. 금액을 기준으로 오름차순 정렬 
    const sortedMembersToPay = Object.keys(membersToPay)
        .map(member => ( { member: member, amount: membersToPay[member] } ))
        .sort((a, b) => a.amount - b.amount)

    // 4. 최종 계산
    let left = 0
    let right = sortedMembersToPay.length - 1 
    while (left < right) {
        // 의미없는 transaction (0원 보내기) 방지하기 위해 0원 만나면 skip 
        while (left < right && sortedMembersToPay[left].amount === 0) { left++ }
        while (left < right && sortedMembersToPay[right].amount === 0) { right-- }

        const toReceive = sortedMembersToPay[left]
        const toSend = sortedMembersToPay[right]
        const amountToReceive = Math.abs(toReceive.amount)
        const amountToSend = Math.abs(toSend.amount)

        if (amountToSend > amountToReceive) {
            minTransactions.push({
                receiver: toReceive.member, 
                payer: toSend.member, 
                amount: amountToReceive 
            })
            toReceive.amount = 0 
            toSend.amount -= amountToReceive
            left++ 
        } else {
            minTransactions.push({
                receiver: toReceive.member, 
                sender: toSend.member, 
                amount: amountToSend
            })
            toSend.amount = 0
            toReceive.amount += amountToSend 
            right-- 
        }
    }
    
    return minTransactions
}

export const SettlementSummary = () => {
    const expenses = useRecoilValue(expensesState)
    const members = useRecoilValue(groupMembersState)

    const totalExpenseAmount = parseInt(expenses.reduce((acc, expense) => acc + expense.amount*1, 0))
    const groupMembersCount = members.length 
    const splitAmount = totalExpenseAmount / groupMembersCount

    // TODO: 핵심 로직 구성 
    const minimumTransaction = calculateMinimumTransaction(expenses, members, splitAmount)

    return (
        <StyledWrapper>
            <StyledTitle>2. 정산은 이렇게!</StyledTitle>
            {
                totalExpenseAmount > 0 && groupMembersCount > 0 && (
                    <>
                        <StyledSummary>
                            <span>{groupMembersCount} 명이서 총 {totalExpenseAmount} 원 지출</span>
                            <br />
                            <span>한 사람 당 {splitAmount} 원</span>
                        </StyledSummary>

                        <StyledUl>
                            {
                                minimumTransaction.map(({ sender, receiver, amount }, idx) => (
                                    <li key={`transaction-${idx}`}>
                                        <span>{sender}가 {receiver}에게 {amount} 원 보내기</span>
                                    </li>
                                ))
                            }
                        </StyledUl>
                    </>
                )
            }
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    padding: 50px;
    background-color: #683BA1;
    color: #FFFBFB;
    border-radius: 15px;
    box-shadow: 3px 8px 4px rgba(0, 0, 0, 0.25);
    text-align: center; 
    font-size: 22px;
`;

const StyledSummary = styled.div`
    margin-top: 31px;
`;

const StyledUl = styled.ul`
    margin-top: 31px;
    font-weight: 600;
    line-height: 200%;

    list-style-type: disclosure-closed;
    li::marker {
        animation: blinker 1.5s linear infinite;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
`;