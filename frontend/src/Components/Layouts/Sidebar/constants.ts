import { SidebarItemsTypes } from '../interfaces';

import {
    Home as HomeIcon,
    Receipt as TransactionIcon,
    ReceiptLong as DOicon,
    Person as UserIcon,
    ManageAccounts as AccountIcon,
    CollectionsBookmark as AlbumIcon,
} from '@mui/icons-material';

export const HOME_ITEMS: SidebarItemsTypes[] = [
    {
        key: '',
        label: 'Home',
        access: 'all',
        Icon: HomeIcon,
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
];

export const HOUSE_SIDEBAR_ITEMS: SidebarItemsTypes[] = [
    {
        key: 'house/{houseId}',
        label: 'Home',
        access: 'all',
        Icon: HomeIcon,
    },
    {
        key: 'house/{houseId}/transaction',
        label: 'Transaction',
        access: 'all',
        Icon: TransactionIcon,
    },
    {
        key: 'house/{houseId}/do',
        label: 'DO',
        access: 'all',
        Icon: DOicon,
    },
    {
        key: 'house/{houseId}/albums',
        label: 'Albums',
        access: 'all',
        Icon: AlbumIcon,
    },
];

export const SIDEBAR_ITEMS_LAYER = {
    HOME: 'HOME',
    HOUSE: 'HOUSE',
} as const;

export const SIDEBAR_ITEMS: Record<keyof typeof SIDEBAR_ITEMS_LAYER, SidebarItemsTypes[]> = {
    HOME: HOME_ITEMS,
    HOUSE: HOUSE_SIDEBAR_ITEMS,
};
