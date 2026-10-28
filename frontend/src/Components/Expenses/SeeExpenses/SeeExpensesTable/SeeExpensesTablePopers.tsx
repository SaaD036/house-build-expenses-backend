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
import ExpenseModal from '../../ExpenseModal';

import {
    hasContributorLevelAccessToHouse,
    hasCreatorLevelAccessToHouse,
} from '../../../../Utilities/Houses/HouseAccess';
import { getUserFromToken } from '../../../../Utilities/Users/UserToken';
import { createActionColumnMenuItem } from '../../../Custom/CustomTable/utilities';

import { UserRole } from '../../../../Constants/Users';
import { EXPENSE_MODAL_TAB } from '../../../../Constants/Expenses';

import { SeeExpensesTablePopersProps } from './interfaces';
import { ExpenseModalTabKeyType } from '../../ExpenseModal/interfaces';

const SeeExpensesTablePopers = (props: SeeExpensesTablePopersProps) => {
    const {
        house,
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
    const [expenseModalTabKey, setExpenseModalTabKey] = useState<ExpenseModalTabKeyType>();

    const user = getUserFromToken();
    const userRole = get(user, 'role', null);

    const getActionColumnMenuItems = () => {
        let actionColumnMenuItems: any[] = [];
        const accessType = house?.accessForLoggedInUser ?? UserRole.USER;

        const isCreatorLevelUser = hasCreatorLevelAccessToHouse(accessType, true);
        const isContributorLevelUser = hasContributorLevelAccessToHouse(accessType, true);

        if (!house || house.accessForLoggedInUser === UserRole.USER || !userRole) {
            return actionColumnMenuItems;
        }

        actionColumnMenuItems = [
            createActionColumnMenuItem('see_details', 'See Details', SeeDetailsIcon, () =>
                setExpenseModalTabKey(EXPENSE_MODAL_TAB.DETAILS.key)
            ),
            createActionColumnMenuItem('see_do_details', 'See Do Details', SeeDetailsIcon, () =>
                setExpenseModalTabKey(EXPENSE_MODAL_TAB.DO_DETAILS.key)
            ),
        ];

        if (isContributorLevelUser) {
            actionColumnMenuItems = [
                ...actionColumnMenuItems,
                createActionColumnMenuItem('edit', 'Edit', EditIcon, () =>
                    setEditExpenseModal(true)
                ),
                createActionColumnMenuItem(
                    'see_edit_history',
                    'See Edit History',
                    EditHistoryIcon,
                    () => setExpenseModalTabKey(EXPENSE_MODAL_TAB.EDIT_HISTORY.key)
                ),
            ];
        }

        if (isCreatorLevelUser) {
            actionColumnMenuItems = [
                ...actionColumnMenuItems,
                createActionColumnMenuItem(
                    'add_to_album',
                    'Add to Album',
                    AddToAlbumIcon,
                    () => {}
                ),
                createActionColumnMenuItem(
                    'delete',
                    'Delete',
                    DeleteIcon,
                    () => setDdeleteExpensePopoverAnchorEl(actionColumMenuAnchorEl),
                    userRole === UserRole.VISITOR
                ),
                createActionColumnMenuItem('add_do', 'Add to DO', DoIcon, () => {}),
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
                placement="left"
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
            <ExpenseModal
                expenseId={selectedExpense.id}
                expenseModalTabKey={expenseModalTabKey}
                onCloseModal={() => setExpenseModalTabKey(undefined)}
            />
        </>
    );
};

export default SeeExpensesTablePopers;
