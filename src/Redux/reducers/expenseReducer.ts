import { GET_ALL_EXPENSES } from '../types/expenses';

import { ExpenseType } from '../../Types/expenses';

type ExpenseReducerStateType = {
    expenses: ExpenseType[] | null;
    expensesCount: number | null;
};

const initialState: ExpenseReducerStateType = {
    expenses: null,
    expensesCount: null,
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

    return state;
};

export default reducer;
