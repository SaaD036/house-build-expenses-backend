import { CustomTabItem } from '../../Components/Custom/CustomTab/interfaces';

export const ACCOUNT_PAGE_TABS_VALUES = {
    PERSONAL_INFO: 'personal_info',
    EXPENSES: 'expenses',
    ALBUMS: 'albums',
    SETTINGS: 'settings',
};

export const ACCOUNT_PAGE_TABS: CustomTabItem[] = [
    { label: 'Personal Info', value: ACCOUNT_PAGE_TABS_VALUES.PERSONAL_INFO },
    { label: 'Expenses', value: ACCOUNT_PAGE_TABS_VALUES.EXPENSES },
    { label: 'Albums', value: ACCOUNT_PAGE_TABS_VALUES.ALBUMS },
    { label: 'Settings', value: ACCOUNT_PAGE_TABS_VALUES.SETTINGS },
];
