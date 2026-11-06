import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import OpenLinkInNewTabIcon from '@mui/icons-material/OpenInNew';

import CustomTable from '../../Custom/CustomTable';

import { getHouseTableRowData } from './utilities';

import { HouseTablePropsType } from '../interfaces';
import { CustomTableColumnSortDataType } from '../../Custom/CustomTable/interfaces';

import { HOUSE_TABLE_COLUMNS } from './constants';

const HouseTable = (props: HouseTablePropsType) => {
    const { houses } = props;

    const [houseSortData, setHouseSortData] = useState<CustomTableColumnSortDataType>();

    const renderOpenColumnItems = (slug: string) => {
        return (
            <Link to={`/house/${slug}`} target="_blank" rel="noopener noreferrer">
                <OpenLinkInNewTabIcon className="icon" fontSize="small" />
            </Link>
        );
    };

    return (
        <div>
            <CustomTable
                columns={HOUSE_TABLE_COLUMNS}
                rowData={getHouseTableRowData(houses, renderOpenColumnItems)}
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
