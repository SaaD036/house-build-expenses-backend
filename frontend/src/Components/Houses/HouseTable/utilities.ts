import { HouseType } from '../../../Types/Houses';
import { formatDate } from '../../../Utilities/Date';

export const getHouseTableRowData = (houses: HouseType[]) => {
    return houses.map((house: HouseType) => ({
        name: {
            value: house.name,
        },
        address: {
            value: `${house.address.area}, ${house.address.upazilla}, ${house.address.upazilla}`,
        },
        floor_count: {
            value: house.floorCount,
        },
        owner: {
            value: `${house.owner.firstName} ${house.owner.lastName}`.trim(),
        },
        created_at: {
            value: formatDate(house.createdAt, 'm-short-dy-numeric'),
        },
        total_expenses: {
            value: 'N/A',
        },
    }));
};
