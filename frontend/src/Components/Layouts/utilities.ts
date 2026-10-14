import { UserRole } from '../../Constants/Users';
import { SIDEBAR_ITEMS, SIDEBAR_ITEMS_LAYER } from './Sidebar/constants';

import { LoggedinUserType } from '../../Types/Users';

export const getSidebarItemsToRender = (
    sidebarLayer: keyof typeof SIDEBAR_ITEMS_LAYER,
    loggedInUser: LoggedinUserType | null
) => {
    const isLoggedInUserAdmin = [UserRole.ADMIN, UserRole.VISITOR].includes(
        loggedInUser?.role || ''
    );

    if (!loggedInUser) {
        return [];
    }

    return SIDEBAR_ITEMS[sidebarLayer].filter((sidebarItem) => {
        if (sidebarItem.access === 'admin' && !isLoggedInUserAdmin) {
            return false;
        }

        return true;
    });
};
