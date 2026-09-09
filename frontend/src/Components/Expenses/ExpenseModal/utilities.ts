import { hasUserAccessToThisResource } from '../../../Utilities/Users/UserAccess';

import { UserRoleType } from '../../../Types/Users';
import { ExpenseModalTabKeyType } from './interfaces';
import { MultiTabModalTabItemType } from '../../Custom/CustomModal/MultiTabModal/interfaces';

import { EXPENSE_MODAL_TAB } from '../../../Constants/Expenses';

export const getTabItems = (
    userRole: UserRoleType | null,
    getTabContent: (tabKey: ExpenseModalTabKeyType) => React.ReactNode
) => {
    const tabItems: MultiTabModalTabItemType[] = [];

    Object.values(EXPENSE_MODAL_TAB).forEach((tabItem) => {
        if (!userRole || !hasUserAccessToThisResource(tabItem.role, userRole)) {
            return;
        }

        tabItems.push({
            key: tabItem.key,
            label: tabItem.label,
            content: getTabContent(tabItem.key),
        });
    });

    return tabItems;
};
