import React, { useState } from 'react';
import { get } from 'lodash';

import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    AddToPhotos as AddToAlbumIcon,
    WorkHistory as EditHistoryIcon,
    Info as SeeDetailsIcon,
    AssignmentReturn as DoIcon,
} from '@mui/icons-material';

import CustomMenu from '../../../Custom/CustomMenu';
import ConfirmationPopover from '../../../Custom/CustomPopover/ConfirmationPopover';
import CustomModal from '../../../Custom/CustomModal';
import EditExepense from '../../EditExepense';

import { getUserFromToken } from '../../../../Utilities/Users/UserToken';
import { createActionColumnMenuItem } from '../../../Custom/CustomTable/utilities';

import { UserRole } from '../../../../Constants/Users';
import { SeeExpensesTablePopersProps } from './interfaces';

const SeeExpensesTablePopers = (props: SeeExpensesTablePopersProps) => {
    const {
        selectedExpense,
        setSelectedExpense,
        actionColumMenuAnchorEl,
        setActionColumMenuAnchorEl,
        onDeleteExpense,
        loadExpenseData,
    } = props;

    const [deleteExpensePopoverAnchorEl, setDdeleteExpensePopoverAnchorEl] =
        useState<null | HTMLElement>(null);
    const [editExpenseModal, setEditExpenseModal] = useState(false);

    const user = getUserFromToken();
    const userRole = get(user, 'role', null);

    const getActionColumnMenuItems = () => {
        let actionColumnMenuItems: any[] = [];

        if (!userRole) {
            return actionColumnMenuItems;
        }

        actionColumnMenuItems = [
            createActionColumnMenuItem('add_to_album', 'Add to Album', AddToAlbumIcon, () => {}),
            createActionColumnMenuItem('see_details', 'See Details', SeeDetailsIcon, () => {}),
        ];

        if (userRole !== UserRole.USER) {
            actionColumnMenuItems = [
                createActionColumnMenuItem('edit', 'Edit', EditIcon, () =>
                    setEditExpenseModal(true)
                ),
                createActionColumnMenuItem(
                    'see_edit_history',
                    'See Edit History',
                    EditHistoryIcon,
                    () => {}
                ),
                createActionColumnMenuItem('delete', 'Delete', DeleteIcon, () =>
                    setDdeleteExpensePopoverAnchorEl(actionColumMenuAnchorEl)
                ),
                createActionColumnMenuItem('add_do', 'Add to DO', DoIcon, () => {}),
                ...actionColumnMenuItems,
            ];
        }

        return actionColumnMenuItems;
    };

    const onActionColumnMenuClose = () => {
        setActionColumMenuAnchorEl(null);
    };

    const onDeletePopoverClose = () => {
        setDdeleteExpensePopoverAnchorEl(null);
        setSelectedExpense(null);
    };

    const onEditModalClose = async () => {
        await loadExpenseData();

        setEditExpenseModal(false);
        setSelectedExpense(null);
    };

    return (
        <>
            <CustomMenu
                id={`see-expense-table-menu-${selectedExpense.id}`}
                items={getActionColumnMenuItems()}
                open={Boolean(actionColumMenuAnchorEl)}
                anchorEl={actionColumMenuAnchorEl}
                onClose={onActionColumnMenuClose}
            />
            <ConfirmationPopover
                id={`see-expense-table-delete-confirm-${selectedExpense.id}`}
                isDeletion
                confirmationMessage="Are you sure to delete this expense?"
                anchorEl={deleteExpensePopoverAnchorEl}
                onClose={onDeletePopoverClose}
                onYes={async () => {
                    await onDeleteExpense();
                    onDeletePopoverClose();
                }}
            />
            <CustomModal
                open={editExpenseModal}
                onClose={() => setEditExpenseModal(false)}
                title="Edit expense"
            >
                <EditExepense
                    disableForm={userRole !== UserRole.ADMIN}
                    expense={selectedExpense}
                    onEditSuccess={onEditModalClose}
                    onEditUnsuccess={() => {
                        setEditExpenseModal(false);
                        setSelectedExpense(null);
                    }}
                />
            </CustomModal>
        </>
    );
};

export default SeeExpensesTablePopers;
