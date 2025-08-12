import { ExpenseType } from '../../Types/expenses';
import { CurrentViewType } from '../../Types';

export type ReducerStateType = {
    auth: AuthReducerStateType;
    expense: ExpenseReducerStateType;
};

export type GeneralReducerStateType = {
    currentView: CurrentViewType | null;
};

export type ExpenseReducerStateType = {
    expenses: ExpenseType[] | null;
    expensesCount: number | null;
    totalExpenses: number | null;
    totalExpensesForThisYear: number | null;
};

export type AuthReducerStateType = {
    loggedInUser: string | null;
};
