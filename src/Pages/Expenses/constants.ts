import { CustomTabItem } from '../../Components/Custom/CustomTab/interfaces';

export const tabValueItem = {
    SEE_EXPENSES: 'see_expenses',
    CREATE_EXPENSE: 'create_expense',
};

export const EXPENSE_PAGE_TAB_ITEMS: CustomTabItem[] = [
    { label: 'See expenses', value: tabValueItem.SEE_EXPENSES },
    { label: 'Create expenses', value: tabValueItem.CREATE_EXPENSE },
];
