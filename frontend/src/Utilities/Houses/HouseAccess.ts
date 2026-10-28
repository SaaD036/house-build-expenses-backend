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
