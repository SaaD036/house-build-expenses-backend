import { CustomTabItem } from '../../Components/Custom/CustomTab/interfaces';

export const USERS_PAGE_TABS_VALUES = {
    SEE_USERS: 'see_users',
    CREATE_USER: 'create_user',
};

export const USERS_PAGE_TABS: CustomTabItem[] = [
    { label: 'See Users', value: USERS_PAGE_TABS_VALUES.SEE_USERS },
    { label: 'Create User', value: USERS_PAGE_TABS_VALUES.CREATE_USER },
];
