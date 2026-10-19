import { get } from 'lodash';
import { HouseType } from '../../Types/Houses';

export const prepareHouseDataFromApiResponse = (house: any): HouseType => ({
    id: house.id,
    createdAt: new Date(house.createdAt),
    updatedAt: new Date(house.updatedAt),
    name: house.name,
    slug: house.slug,
    address: {
        area: house.address.area,
        upazilla: house.address.upazilla,
        district: house.address.district,
        addressLine: house.address.address_line,
    },
    floorCount: house.floorCount,
    isApproved: house.isApproved,
    owner: house.owner,
    accessForLoggedInUser: get(house, 'accessType', undefined),
});
