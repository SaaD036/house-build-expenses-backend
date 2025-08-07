import { GET_ALL_EXPENSES, GET_TOTAL_EXPENSE } from '../types/expenses';

import { ExpenseType } from '../../Types/expenses';

export type ExpenseReducerStateType = {
    expenses: ExpenseType[] | null;
    expensesCount: number | null;
    totalExpenses: number | null;
    totalExpensesForThisYear: number | null;
};

const initialState: ExpenseReducerStateType = {
    expenses: null,
    expensesCount: null,
    totalExpenses: null,
    totalExpensesForThisYear: null,
};

const reducer = (
    state = initialState,
    action: { type: string; payload: Partial<ExpenseReducerStateType> }
) => {
    if (action.type === GET_ALL_EXPENSES) {
        const { expenses = null, expensesCount = null } = action.payload;
        return {
            ...state,
            expenses,
            expensesCount,
        };
    }

    if (action.type === GET_TOTAL_EXPENSE) {
        const { totalExpenses = null } = action.payload;
        return {
            ...state,
            totalExpenses,
        };
    }

    return state;
};

export default reducer;
