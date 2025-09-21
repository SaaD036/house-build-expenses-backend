import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { MoreVert as ActionColumnIcon } from '@mui/icons-material';

import CustomTable from '../../../Custom/CustomTable';
import SeeExpensesTablePopers from './SeeExpensesTablePopers';

import { getAllExpenses, deleteSingleExpense } from '../../../../Redux/actions/expenseAction';

import { getExpenseTableRows } from './utilities';

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

    const onDeleteExpense = async () => {
        if (!selectedExpense) {
            return;
        }

        showLoader();

        await deleteSingleExpense(selectedExpense.id);
        await getAllExpenses({ page: currentPage, itemsPerPage: expensesPerPage });

        hideLoader();
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
                <SeeExpensesTablePopers
                    selectedExpense={selectedExpense}
                    setSelectedExpense={(expense: ExpenseType | null) =>
                        setSelectedExpense(expense)
                    }
                    actionColumMenuAnchorEl={actionColumMenuAnchorEl}
                    setActionColumMenuAnchorEl={(el: HTMLElement | null) =>
                        setActionColumMenuAnchorEl(el)
                    }
                    showLoader={showLoader}
                    onDeleteExpense={onDeleteExpense}
                    loadExpenseData={loadExpenseData}
                />
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
