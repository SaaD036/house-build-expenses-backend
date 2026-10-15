import React, { useMemo, useState } from 'react';

import CustomTable from '../../Custom/CustomTable';

import { getHouseTableRowData } from './utilities';

import { HouseTablePropsType } from '../interfaces';
import { CustomTableColumnSortDataType } from '../../Custom/CustomTable/interfaces';

import { HOUSE_TABLE_COLUMNS } from './constants';
import HouseNotFound from '../HouseNotFound';

const HouseTable = (props: HouseTablePropsType) => {
    const { houses, houseTypes } = props;

    const [houseSortData, setHouseSortData] = useState<CustomTableColumnSortDataType>();

    const noHouseMessage = useMemo(() => {
        if (houseTypes === 'your_created') {
            return 'Your have not created any house';
        }

        if (houseTypes === 'shared') {
            return 'No hause is shared with you';
        }

        if (houseTypes === 'requested') {
            return 'You have no unapproved Houses';
        }
    }, [houseTypes]);

    if (houses.length === 0) {
        return <HouseNotFound title={noHouseMessage} />;
    }

    return (
        <div>
            <CustomTable
                columns={HOUSE_TABLE_COLUMNS}
                rowData={getHouseTableRowData(houses)}
                loadTableData={async () => {}}
                showRefreshButton
                sort={{
                    sortData: houseSortData,
                    setSortData: (sortData?: CustomTableColumnSortDataType) =>
                        setHouseSortData(sortData),
                }}
            />
        </div>
    );
};

export default HouseTable;
