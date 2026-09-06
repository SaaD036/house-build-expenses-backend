import { CustomTabItem } from '../../Components/Custom/CustomTab/interfaces';

export const DO_PAGE_TABS_VALUES = {
    SEE_DO: 'see_dos',
    CREATE_DO: 'create_do',
};

export const DO_PAGE_TABS: CustomTabItem[] = [
    { label: 'See DOs', value: DO_PAGE_TABS_VALUES.SEE_DO },
    { label: 'Create DO', value: DO_PAGE_TABS_VALUES.CREATE_DO },
];
