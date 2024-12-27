import { GET_ALL_EXPENSES } from '../types/expenses';

const initialState = {
    expenses: [],
    expensesCount: null,
};

const reducer = (state = initialState, action: { type: string; payload: any }) => {
    if (action.type === GET_ALL_EXPENSES) {
        const { expenses, expensesCount } = action.payload;
        return {
            ...state,
            expenses,
            expensesCount,
        };
    }

    return state;
};

export default reducer;
