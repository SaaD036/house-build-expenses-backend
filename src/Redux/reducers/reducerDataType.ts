import { ExpenseType } from '../../Types/expenses';
import { CurrentViewType } from '../../Types';
import { UserType } from '../../Types/Users';

export type ReducerStateType = {
    auth: AuthReducerStateType;
    general: GeneralReducerStateType;
    expense: ExpenseReducerStateType;
    user: UserReducerStateType;
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

export type UserReducerStateType = {
    users: UserType[] | null;
    totalUsers: number | null;
};
