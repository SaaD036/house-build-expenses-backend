import { HouseAccessForLoggedInUserType } from '../../Types/Houses';

export const hasCreatorLevelAccessToHouse = (
    accessType: HouseAccessForLoggedInUserType,
    isVisitorAdminAllowed: boolean
): boolean => {
    if (accessType === 'admin') {
        return true;
    }

    if (accessType === 'creator') {
        return true;
    }

    if (isVisitorAdminAllowed && accessType === 'visitor') {
        return true;
    }

    return false;
};

export const hasContributorLevelAccessToHouse = (
    accessType: HouseAccessForLoggedInUserType,
    isVisitorAdminAllowed: boolean
): boolean => {
    if (hasCreatorLevelAccessToHouse(accessType, isVisitorAdminAllowed)) {
        return true;
    }

    if (accessType === 'contributor') {
        return true;
    }

    return false;
};

export const hasViewerLevelAccessToHouse = (
    accessType: HouseAccessForLoggedInUserType
): boolean => {
    if (hasContributorLevelAccessToHouse(accessType, true)) {
        return true;
    }

    if (accessType === 'viewer') {
        return true;
    }

    return false;
};

export const getHouseResourceOptionsByHouseAccess = (
    accessToHouse: HouseAccessForLoggedInUserType,
    options: (any & { role: HouseAccessForLoggedInUserType })[]
) => {
    return options.filter((o) => {
        if (accessToHouse === 'user') {
            return false;
        }

        if (o.role === 'viewer') {
            return hasViewerLevelAccessToHouse(accessToHouse);
        }

        if (o.role === 'contributor') {
            return hasContributorLevelAccessToHouse(accessToHouse, true);
        }

        if (o.role === 'creator') {
            return hasCreatorLevelAccessToHouse(accessToHouse, true);
        }

        return false;
    });
};
