import { get } from 'lodash';
import { jwtDecode } from 'jwt-decode';

import { cookieName, getCookie } from '../../Utilities/Cookies';

import { EXPENSE_PAGE_TAB_ITEMS, tabValueItem } from './constants';
import { UserRole } from '../../Constants/Users';

export const getExpensePageTabs = () => {
    const userToken = getCookie(cookieName.USER_TOKEN);
    const user = jwtDecode(userToken || '');

    if (!user || !get(user, 'role', null)) {
        return [];
    }

    if (get(user, 'role') === UserRole.USER) {
        return EXPENSE_PAGE_TAB_ITEMS.filter(
            (tabItem) => tabItem.value !== tabValueItem.CREATE_EXPENSE
        );
    }

    return EXPENSE_PAGE_TAB_ITEMS;
};
