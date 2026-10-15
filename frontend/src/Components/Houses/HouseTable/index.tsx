import React, { useState } from 'react';

import CustomTable from '../../Custom/CustomTable';

import { CustomTableColumnSortDataType } from '../../Custom/CustomTable/interfaces';

import { HOUSE_TABLE_COLUMNS } from './constants';

const HouseTable = () => {
    const [houseSortData, setHouseSortData] = useState<CustomTableColumnSortDataType>();

    return (
        <div>
            <CustomTable
                columns={HOUSE_TABLE_COLUMNS}
                rowData={[]}
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
