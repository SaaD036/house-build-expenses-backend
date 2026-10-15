import { UserType } from './Users';

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
};
