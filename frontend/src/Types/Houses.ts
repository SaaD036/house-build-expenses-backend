import { UserRoleType, UserType } from './Users';
import { HOUSE_ACCESS_TYPE } from '../Constants/Houses';

export type HouseAccessForLoggedInUserType =
    | Extract<UserRoleType, 'admin' | 'visitor'>
    | (typeof HOUSE_ACCESS_TYPE)[keyof typeof HOUSE_ACCESS_TYPE];

export type HouseAddressType = {
    area: string;
    district: string;
    upazilla: string;
    addressLine: string;
};

export type HouseUserType = Pick<UserType, 'id' | 'firstName' | 'lastName'>;

export type HouseType = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    address: HouseAddressType;
    floorCount: number;
    isApproved: boolean;
    owner: HouseUserType;
    accessForLoggedInUser?: HouseAccessForLoggedInUserType;
};
