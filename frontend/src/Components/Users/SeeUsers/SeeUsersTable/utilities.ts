import { UserType } from '../../../../Types/Users';

export const getUsersTableRowData = (
    users: UserType[],
    getActionColumnItem: (user: UserType) => JSX.Element
) => {
    return users.map((user: UserType) => ({
        name: {
            value: `${user.firstName} ${user.lastName}`.trim(),
        },
        email: {
            value: user.email,
        },
        role: {
            value: user.role,
        },
        account_status: {
            value: user.accountStatus,
        },
        total_expense: {
            value: user.totalExpenseCount || 0,
        },
        action: {
            value: getActionColumnItem(user),
        },
    }));
};
