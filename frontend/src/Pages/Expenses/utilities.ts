import { HouseType } from '../../Types/Houses';
import { HOUSE_ACCESS_TYPE } from '../../Constants/Houses';
import { EXPENSE_PAGE_TAB_ITEMS, tabValueItem } from './constants';

export const getExpensePageTabs = (house: HouseType | null) => {
    if (!house || house.accessForLoggedInUser === 'user') {
        return [];
    }

    if (house.accessForLoggedInUser === HOUSE_ACCESS_TYPE.VIEWER) {
        return EXPENSE_PAGE_TAB_ITEMS.filter(
            (tabItem) => tabItem.value !== tabValueItem.CREATE_EXPENSE
        );
    }

    return EXPENSE_PAGE_TAB_ITEMS;
};
