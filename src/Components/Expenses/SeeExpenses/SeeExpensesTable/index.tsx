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

import CustomTable from '../../../Custom/CustomTable';
import CustomMenu from '../../../Custom/CustomMenu';
import ConfirmationPopover from '../../../Custom/CustomPopover/ConfirmationPopover';

import { getAllExpenses, deleteSingleExpense } from '../../../../Redux/actions/expenseAction';

import { createActionColumnMenuItem, getExpenseTableRows } from './utilities';

import { EXPENSE_TABLE_COLUMNS } from '../constants';
import { TABLE_ROW_COUNT_OPTIONS } from '../../../Custom/CustomTable/constants';

import { SeeExpensesTableProps } from './interfaces';
import {
    CustomTableColumnSortDataType,
    CustomTableLoadDataTypes,
} from '../../../Custom/CustomTable/interfaces';
import { ExpenseType } from '../../../../Types/expenses';

import styles from '../styles.module.css';

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

    const getActionColumnMenuItems = () => {
        return [
            createActionColumnMenuItem('edit', 'Edit', EditIcon, () => {}),
            createActionColumnMenuItem('delete', 'Delete', DeleteIcon, () =>
                setDdeleteExpensePopoverAnchorEl(actionColumMenuAnchorEl)
            ),
            createActionColumnMenuItem('add_to_album', 'Add to Album', AddToAlbumIcon, () => {}),
            createActionColumnMenuItem(
                'see_edit_history',
                'See Edit History',
                EditHistoryIcon,
                () => {}
            ),
            createActionColumnMenuItem('see_details', 'See Details', SeeDetailsIcon, () => {}),
        ];
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

        await deleteSingleExpense(selectedExpense.id);
        await getAllExpenses({
            page: currentPage,
            itemsPerPage: expensesPerPage,
        });

        onDeletePopoverClose();
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
    expenses: state.expense.expenses,
    expensesCount: state.expense.expensesCount,
});

const mapDispatchToProps = {
    getAllExpenses,
    deleteSingleExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeExpensesTable);
