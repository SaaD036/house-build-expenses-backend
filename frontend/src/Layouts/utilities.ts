import { UserRole } from '../Constants/Users';
import { SIDEBAR_ITEMS } from './Sidebar/constants';

import { LoggedinUserType } from '../Types/Users';

export const getSidebarItemsToRender = (loggedInUser: LoggedinUserType | null) => {
    const isLoggedInUserAdmin = [UserRole.ADMIN, UserRole.VISITOR].includes(
        loggedInUser?.role || ''
    );

    if (!loggedInUser) {
        return [];
    }

    return SIDEBAR_ITEMS.filter((sidebarItem) => {
        if (sidebarItem.access === 'admin' && !isLoggedInUserAdmin) {
            return false;
        }

        return true;
    });
};
