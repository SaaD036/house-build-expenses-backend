import { getHouseResourceOptionsByHouseAccess } from '../../../Utilities/Houses/HouseAccess';

import { ExpenseModalTabKeyType } from './interfaces';
import { MultiTabModalTabItemType } from '../../Custom/CustomModal/MultiTabModal/interfaces';

import { EXPENSE_MODAL_TAB } from '../../../Constants/Expenses';
import { HouseType } from '../../../Types/Houses';

export const getTabItems = (
    house: HouseType | null,
    getTabContent: (tabKey: ExpenseModalTabKeyType) => React.ReactNode
) => {
    const tabItems: MultiTabModalTabItemType[] = [];
    const expenseModalTabsAsFlatArray = Object.values(EXPENSE_MODAL_TAB);
    const availableOptions = getHouseResourceOptionsByHouseAccess(
        house?.accessForLoggedInUser ?? 'creator',
        expenseModalTabsAsFlatArray
    );

    availableOptions.forEach((tabItem) =>
        tabItems.push({
            key: tabItem.key,
            label: tabItem.label,
            content: getTabContent(tabItem.key),
        })
    );

    return tabItems;
};
