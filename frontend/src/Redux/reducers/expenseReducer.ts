import {
    GET_ALL_EXPENSES,
    GET_EXPENSE_EDIT_HISTORY,
    GET_SINGLE_EXPENSE,
    GET_TOTAL_EXPENSE,
} from '../types/expenses';

import { ExpenseReducerStateType } from './reducerDataType';

const initialState: ExpenseReducerStateType = {
    expenses: null,
    expenseDetails: null,
    expenseEditHistory: null,
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

    if (action.type === GET_SINGLE_EXPENSE) {
        const { expenseDetails } = action.payload;

        return {
            ...state,
            expenseDetails: expenseDetails ?? null,
        };
    }

    if (action.type === GET_EXPENSE_EDIT_HISTORY) {
        const { expenseEditHistory } = action.payload;

        return {
            ...state,
            expenseEditHistory: expenseEditHistory ?? null,
        };
    }

    return state;
};

export default reducer;
