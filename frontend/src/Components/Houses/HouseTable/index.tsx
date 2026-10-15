import React, { useState } from 'react';

import CustomTable from '../../Custom/CustomTable';

import { getHouseTableRowData } from './utilities';

import { HouseTablePropsType } from '../interfaces';
import { CustomTableColumnSortDataType } from '../../Custom/CustomTable/interfaces';

import { HOUSE_TABLE_COLUMNS } from './constants';

const HouseTable = (props: HouseTablePropsType) => {
    const { houses } = props;

    const [houseSortData, setHouseSortData] = useState<CustomTableColumnSortDataType>();

    if (houses.length === 0) {
        return <div>No house found</div>;
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
