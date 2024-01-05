import { AddExpenseForm } from './AddExpenseForm';

export const ExpenseMain = () => {
    return (
        <div>
            ExpenseMain
            <div> 
                <AddExpenseForm />
                {/* TODO: 비용추가폼 렌더링 */}
                {/* TODO: 정산결과 컴포넌트 렌더링 */}
            </div>
            <div>
                {/* TODO: 그룹명헤더 렌더링 */}
                {/* TODO: 비용리스트 컴포넌트 렌더링 */}
            </div>
        </div>
    );
}