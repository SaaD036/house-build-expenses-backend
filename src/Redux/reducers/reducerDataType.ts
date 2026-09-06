import { ExpenseType } from '../../Types/expenses';
import { CurrentViewType } from '../../Types';
import { AccountUserType, UserType } from '../../Types/Users';
import { DO } from '../../Types/DOs';

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
    accountUser: AccountUserType | null;
};

export type DOreducerType = {
    dos: DO[] | null;
    doCount: number | null;
};
