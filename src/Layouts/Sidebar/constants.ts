import { SidebarItemsTypes } from '../interfaces';

import {
    Receipt as TransactionIcon,
    Person as UserIcon,
    ManageAccounts as AccountIcon,
} from '@mui/icons-material';

export const SIDEBAR_ITEMS: SidebarItemsTypes[] = [
    {
        key: 'transaction',
        label: 'Transaction',
        access: 'all',
        Icon: TransactionIcon,
    },
    {
        key: 'users',
        label: 'Users',
        access: 'admin',
        Icon: UserIcon,
    },
    {
        key: 'account',
        label: 'Account',
        access: 'self',
        Icon: AccountIcon,
    },
];
