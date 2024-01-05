import React from 'react';
import { useRecoilValue } from 'recoil'
import { groupNameState } from '../state/groupName';
import { Col, Container, Row } from 'react-bootstrap';
import { AddExpenseForm } from './AddExpenseForm';
import { ExpenseTable } from './ExpenseTable';
import styled from 'styled-components';

export const ExpenseMain = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} s={5} md={4}>
                    <LeftPane />
                </Col>
                <Col>
                    <RightPane />
                </Col>
            </Row>
        </Container>
    );
}

const LeftPane = () => (
    <Container>
        <AddExpenseForm />
        {/* TODO: 정산결과 컴포넌트 렌더링 */}
    </Container>
)

const RightPane = () => {
    const groupName = useRecoilValue(groupNameState);

    return (
        <StyledContainer>
            <Row>
                <StyledGroupName>{groupName || '그룹 이름'}</StyledGroupName>
            </Row>
            <Row>
                <ExpenseTable />
            </Row>
        </StyledContainer>
    )
}

const StyledContainer = styled(Container)`
    padding: 100px 31px;
`;

const StyledGroupName = styled.h2`
    margin-bottom: 80px;
    font-weight: 700;
    font-size: 40px;
    line-height: 40px;
    text-align: center;
`;