import { SidebarItemsTypes } from '../interfaces';

import {
    Home as HomeIcon,
    Receipt as TransactionIcon,
    Person as UserIcon,
    ManageAccounts as AccountIcon,
    CollectionsBookmark as AlbumIcon,
} from '@mui/icons-material';

export const SIDEBAR_ITEMS: SidebarItemsTypes[] = [
    {
        key: '',
        label: 'Home',
        access: 'all',
        Icon: HomeIcon,
    },
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
        access: 'all',
        Icon: AccountIcon,
    },
    {
        key: 'albums',
        label: 'Albums',
        access: 'all',
        Icon: AlbumIcon,
    },
];
