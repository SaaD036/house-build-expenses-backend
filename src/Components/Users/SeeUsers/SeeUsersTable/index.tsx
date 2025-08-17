import React, { useState } from 'react';

import {
    MoreVert as ActionColumnIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    AddToPhotos as AddToAlbumIcon,
    WorkHistory as EditHistoryIcon,
    Info as SeeDetailsIcon,
} from '@mui/icons-material';

import CustomTable from '../../../Custom/CustomTable';

import { getUsersTableRowData } from './utilities';

import { USERS_TABLE_COLUMNS } from './constants';

import { SeeUsersTableProps } from './interfaces';
import { UserType } from '../../../../Types/Users';
import { CustomTableColumnSortDataType } from '../../../Custom/CustomTable/interfaces';

import styles from '../styles.module.css';

const SeeUsersTable = (props: SeeUsersTableProps) => {
    const { users, loadTableData } = props;

    const [userSortData, setUserSortData] = useState<CustomTableColumnSortDataType>();

    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [actionColumMenuAnchorEl, setActionColumMenuAnchorEl] = useState<null | HTMLElement>(
        null
    );

    const getActionColumnItem = (user: UserType) => {
        return (
            <span
                onClick={(e) => {
                    setActionColumMenuAnchorEl(e.currentTarget);
                    setSelectedUser(user);
                }}
            >
                <ActionColumnIcon sx={{ color: '#158901' }} className={styles.actionColumnIcon} />
            </span>
        );
    };

    return (
        <CustomTable
            columns={USERS_TABLE_COLUMNS}
            rowData={getUsersTableRowData(users || [], getActionColumnItem)}
            loadTableData={loadTableData}
            showRefreshButton
            sort={{
                sortData: userSortData,
                setSortData: (sortData?: CustomTableColumnSortDataType) =>
                    setUserSortData(sortData),
            }}
        />
    );
};

export default SeeUsersTable;
