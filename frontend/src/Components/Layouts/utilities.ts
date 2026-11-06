import { replaceVariablesInString } from '../../Utilities/String';

import { UserRole } from '../../Constants/Users';
import { SIDEBAR_ITEMS, SIDEBAR_ITEMS_LAYER } from './Sidebar/constants';

import { UserRoleType } from '../../Types/Users';

export const getSidebarItemsToRender = (
    sidebarLayer: keyof typeof SIDEBAR_ITEMS_LAYER,
    loggedInUserRole: UserRoleType | null,
    variables: { houseSlug: string }
) => {
    const isLoggedInUserAdmin = [UserRole.ADMIN, UserRole.VISITOR].includes(loggedInUserRole || '');

    return SIDEBAR_ITEMS[sidebarLayer]
        .filter((sidebarItem) => {
            if (sidebarItem.access === 'admin' && !isLoggedInUserAdmin) {
                return false;
            }

            return true;
        })
        .map((sidebarItem) => {
            return {
                ...sidebarItem,
                key: replaceVariablesInString(sidebarItem.key, variables),
            };
        });
};
