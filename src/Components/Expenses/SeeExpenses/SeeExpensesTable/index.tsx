import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
    MoreVert as ActionColumnIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    AddToPhotos as AddToAlbumIcon,
    WorkHistory as EditHistoryIcon,
    Info as SeeDetailsIcon,
} from '@mui/icons-material';

import EditExepense from '../../EditExepense';

import CustomTable from '../../../Custom/CustomTable';
import CustomMenu from '../../../Custom/CustomMenu';
import ConfirmationPopover from '../../../Custom/CustomPopover/ConfirmationPopover';
import CustomModal from '../../../Custom/CustomModal';

import { getAllExpenses, deleteSingleExpense } from '../../../../Redux/actions/expenseAction';

import { getExpenseTableRows } from './utilities';
import { createActionColumnMenuItem } from '../../../Custom/CustomTable/utilities';
import { getUserFromToken } from '../../../../Utilities/Users/UserToken';

import { EXPENSE_TABLE_COLUMNS } from '../constants';
import { TABLE_ROW_COUNT_OPTIONS } from '../../../Custom/CustomTable/constants';

import { SeeExpensesTableProps } from './interfaces';
import {
    CustomTableColumnSortDataType,
    CustomTableLoadDataTypes,
} from '../../../Custom/CustomTable/interfaces';
import { ExpenseType } from '../../../../Types/expenses';

import styles from '../styles.module.css';
import { get } from 'lodash';
import { UserRole } from '../../../../Constants/Users';

const SeeExpensesTable = (props: SeeExpensesTableProps) => {
    const { expenses, expensesCount, showLoader, hideLoader, getAllExpenses, deleteSingleExpense } =
        props;

    const [selectedExpense, setSelectedExpense] = useState<ExpenseType | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [expensesPerPage, setExpensesPerPage] = useState(TABLE_ROW_COUNT_OPTIONS[0]);
    const [expenseSortData, setExpenseSortData] = useState<CustomTableColumnSortDataType>();

    const [actionColumMenuAnchorEl, setActionColumMenuAnchorEl] = useState<null | HTMLElement>(
        null
    );
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
                ...actionColumnMenuItems,
            ];
        }

        return actionColumnMenuItems;
    };

    const getActionColumnItem = (expense: ExpenseType) => {
        return (
            <span
                onClick={(e) => {
                    setActionColumMenuAnchorEl(e.currentTarget);
                    setSelectedExpense(expense);
                }}
            >
                <ActionColumnIcon sx={{ color: '#158901' }} className={styles.actionColumnIcon} />
            </span>
        );
    };

    const onActionColumnMenuClose = () => {
        setActionColumMenuAnchorEl(null);
    };

    const onDeletePopoverClose = () => {
        setDdeleteExpensePopoverAnchorEl(null);
        setSelectedExpense(null);
    };

    const onDeleteExpense = async () => {
        if (!selectedExpense) {
            return;
        }

        showLoader();

        await deleteSingleExpense(selectedExpense.id);
        await getAllExpenses({ page: currentPage, itemsPerPage: expensesPerPage });

        onDeletePopoverClose();
        hideLoader();
    };

    const onEditModalClose = () => {
        loadExpenseData({
            page: currentPage,
            itemsPerPage: expensesPerPage,
        });

        setEditExpenseModal(false);
        setSelectedExpense(null);
    };

    const loadExpenseData = async (filterAndParams?: CustomTableLoadDataTypes) => {
        showLoader();
        await getAllExpenses(
            filterAndParams || {
                page: currentPage,
                itemsPerPage: expensesPerPage,
            }
        );
        hideLoader();
    };

    useEffect(() => {
        loadExpenseData({
            page: currentPage,
            itemsPerPage: expensesPerPage,
        });
    }, [currentPage, expensesPerPage]);

    return (
        <>
            {selectedExpense && (
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
                        onYes={onDeleteExpense}
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
            )}
            <CustomTable
                columns={EXPENSE_TABLE_COLUMNS}
                rowData={getExpenseTableRows(expenses || [], getActionColumnItem)}
                loadTableData={loadExpenseData}
                showRefreshButton
                pagination={{
                    page: currentPage,
                    setPage: (page: number) => setCurrentPage(page),
                    totalPage: Math.ceil(expensesCount / expensesPerPage),
                    sizePerPageData: {
                        sizePerPage: expensesPerPage,
                        setSizePerPage: (sizePerPage) => setExpensesPerPage(sizePerPage),
                    },
                }}
                sort={{
                    sortData: expenseSortData,
                    setSortData: (sortData?: CustomTableColumnSortDataType) =>
                        setExpenseSortData(sortData),
                }}
            />
        </>
    );
};

const mapStateToProps = (state: any) => ({
    loggedInUser: state.auth.loggedInUser,
    expenses: state.expense.expenses,
    expensesCount: state.expense.expensesCount,
});

const mapDispatchToProps = {
    getAllExpenses,
    deleteSingleExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeExpensesTable);
