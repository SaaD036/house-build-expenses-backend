import React from 'react';

import CustomTable from '../../../Custom/CustomTable';

import { getDOtableRows } from './utilities';

import { DO_TABLE_COLUMNS } from './constants';

import { SeeDOtablePropsType } from './interfaces';

const SeeDOtable = (props: SeeDOtablePropsType) => {
    const { DOs } = props;

    if (!DOs || DOs.length === 0) {
        return <div>No DO found</div>;
    }

    return <CustomTable columns={DO_TABLE_COLUMNS} rowData={getDOtableRows(DOs)} />;
};

export default SeeDOtable;
