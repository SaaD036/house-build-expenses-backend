import { AdminRoleArray } from '../../Constants/Users';

import { UserAccessRoleType } from '../../Types';
import { UserRoleType } from '../../Types/Users';

export const hasUserAccessToThisResource = (
    accessType: UserAccessRoleType,
    userRole: UserRoleType
) => {
    if (accessType === 'all') {
        return true;
    }

    if (accessType === 'admin') {
        return AdminRoleArray.includes(userRole);
    }

    if (accessType === 'user') {
        return userRole === 'user';
    }

    return false;
};
