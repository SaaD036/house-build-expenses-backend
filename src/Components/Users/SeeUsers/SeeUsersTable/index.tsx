import React, { useState } from 'react';

import {
    MoreVert as ActionColumnIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    WorkHistory as EditHistoryIcon,
    Info as SeeDetailsIcon,
} from '@mui/icons-material';

import CustomTable from '../../../Custom/CustomTable';

import { getUsersTableRowData } from './utilities';
import { createActionColumnMenuItem } from '../../../Custom/CustomTable/utilities';
import { getUserFromToken } from '../../../../Utilities/Users/UserToken';

import { USERS_TABLE_COLUMNS } from './constants';

import { SeeUsersTableProps } from './interfaces';
import { UserType } from '../../../../Types/Users';
import { CustomTableColumnSortDataType } from '../../../Custom/CustomTable/interfaces';

import styles from '../styles.module.css';
import CustomMenu from '../../../Custom/CustomMenu';

const SeeUsersTable = (props: SeeUsersTableProps) => {
    const { users, loadTableData } = props;

    const [userSortData, setUserSortData] = useState<CustomTableColumnSortDataType>();

    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [actionColumMenuAnchorEl, setActionColumMenuAnchorEl] = useState<null | HTMLElement>(
        null
    );

    const user = getUserFromToken();

    const getActionColumnMenuItems = () => {
        let actionColumnMenuItems: any[] = [];

        if (!user || !user.role) {
            return actionColumnMenuItems;
        }

        actionColumnMenuItems = [
            createActionColumnMenuItem('see_details', 'See Details', SeeDetailsIcon, () => {}),
            createActionColumnMenuItem('edit', 'Edit', EditIcon, () => {}),
            createActionColumnMenuItem(
                'see_edit_history',
                'See Edit History',
                EditHistoryIcon,
                () => {}
            ),
            createActionColumnMenuItem('update_role', 'Update Role', DeleteIcon, () => {}),
            createActionColumnMenuItem(
                'update_status',
                'Update Account Status',
                DeleteIcon,
                () => {}
            ),
        ];

        return actionColumnMenuItems;
    };

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
        <div>
            {selectedUser && (
                <>
                    <CustomMenu
                        id={`see-user-table-menu-${selectedUser.id}`}
                        items={getActionColumnMenuItems()}
                        open={Boolean(actionColumMenuAnchorEl)}
                        anchorEl={actionColumMenuAnchorEl}
                        onClose={() => setActionColumMenuAnchorEl(null)}
                    />
                </>
            )}
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
        </div>
    );
};

export default SeeUsersTable;
