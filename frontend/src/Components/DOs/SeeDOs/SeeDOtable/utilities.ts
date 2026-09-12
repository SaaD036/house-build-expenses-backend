import { DO } from '../../../../Types/DOs';
import { formatDate } from '../../../../Utilities/Date';

export const getDOtableRows = (DOs: DO[]) => {
    const DOtableRows = DOs.map((DO) => ({
        shopName: {
            value: DO.shopName,
        },
        shopAddress: {
            value: `
                ${DO.shopAddress.area},
                ${DO.shopAddress.upazilla},
                ${DO.shopAddress.district}
            `,
        },
        doItem: {
            value: DO.doItem,
        },
        amount: {
            value: DO.amount,
        },
        description: {
            value: DO.description,
        },
        doDate: {
            value: formatDate(DO.doDate, 'D,M,Y'),
        },
        creator: {
            value: `${DO.creator?.firstName} ${DO.creator?.lastName}`.trim(),
        },
        action: {
            value: 'N/A',
        },
    }));

    return DOtableRows;
};
