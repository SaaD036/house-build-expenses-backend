import { CustomTabItem } from '../../Components/Custom/CustomTab/interfaces';

export const HOUSES_PAGE_TABS_VALUES = {
    YOUR_HOUSES: 'your_houses',
    SHARED_HOUSES: 'shared_houses',
    CREATE_HOUSE: 'create_user',
};

export const HOUSE_PAGE_TABS: CustomTabItem[] = [
    { label: 'Your Houses', value: HOUSES_PAGE_TABS_VALUES.YOUR_HOUSES },
    { label: 'Shared Houses', value: HOUSES_PAGE_TABS_VALUES.SHARED_HOUSES },
    { label: 'Create Houses', value: HOUSES_PAGE_TABS_VALUES.CREATE_HOUSE },
];
