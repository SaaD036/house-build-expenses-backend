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
import TabComponentLoader from '../../../Custom/CustomLoadingItems/TabComponentLoader';

import { getAllExpenses } from '../../../../Redux/actions/expenseAction';

import { EXPENSE_TABLE_COLUMNS } from '../constants';
import { TABLE_ROW_COUNT_OPTIONS } from '../../../Custom/CustomTable/constants';

import { SeeExpensesTableProps } from './interfaces';
import {
    CustomTableColumnSortDataType,
    CustomTableLoadDataTypes,
} from '../../../Custom/CustomTable/interfaces';

import styles from '../styles.module.css';

const SeeExpensesTable = (props: SeeExpensesTableProps) => {
    const { expenses, expensesCount, getAllExpenses } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [expensesPerPage, setExpensesPerPage] = useState(TABLE_ROW_COUNT_OPTIONS[0]);
    const [expenseSortData, setExpenseSortData] = useState<CustomTableColumnSortDataType>();

    const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(false);
    const [actionColumMenuAnchorEl, setActionColumMenuAnchorEl] = useState<null | HTMLElement>(
        null
    );
    const [deleteExpensePopoverAnchorEl, setDdeleteExpensePopoverAnchorEl] =
        useState<null | HTMLElement>(null);

    const getActionColumnMenuItems = () => {
        return [
            {
                key: 'edit',
                label: 'Edit',
                Icon: EditIcon,
                onClick: () => {},
            },
            {
                key: 'delete',
                label: 'Delete',
                Icon: DeleteIcon,
                onClick: () => setDdeleteExpensePopoverAnchorEl(actionColumMenuAnchorEl),
            },
            {
                key: 'add_to_album',
                label: 'Add to Album',
                Icon: AddToAlbumIcon,
                onClick: () => {},
            },
            {
                key: 'see_edit_history',
                label: 'See Edit History',
                Icon: EditHistoryIcon,
                onClick: () => {},
            },
            {
                key: 'see_details',
                label: 'See Details',
                Icon: SeeDetailsIcon,
                onClick: () => {},
            },
        ];
    };

    const getExpenseTableRows = () => {
        const expenseTableRows = (expenses || []).map((expense) => ({
            title: {
                value: expense.title,
            },
            amount: {
                value: expense.amount,
            },
            description: {
                value: expense.description,
            },
            expense_time: {
                value: expense.expenseAt,
            },
            creator: {
                value: `${expense.creator.firstName} ${expense.creator.lastName}`,
            },
            action: {
                value: (
                    <span onClick={(e) => setActionColumMenuAnchorEl(e.currentTarget)}>
                        <ActionColumnIcon
                            sx={{ color: '#158901' }}
                            className={styles.actionColumnIcon}
                        />
                    </span>
                ),
            },
        }));

        return expenseTableRows;
    };

    const loadExpenseData = async (filterAndParams?: CustomTableLoadDataTypes) => {
        setIsLoadingExpenseData(true);
        await getAllExpenses(
            filterAndParams || {
                page: currentPage,
                itemsPerPage: expensesPerPage,
            }
        );
        setIsLoadingExpenseData(false);
    };

    useEffect(() => {
        loadExpenseData({
            page: currentPage,
            itemsPerPage: expensesPerPage,
        });
    }, [currentPage, expensesPerPage]);

    if (isLoadingExpenseData) {
        return <TabComponentLoader />;
    }

    return (
        <>
            <CustomMenu
                items={getActionColumnMenuItems()}
                open={Boolean(actionColumMenuAnchorEl)}
                anchorEl={actionColumMenuAnchorEl}
                setAnchorEl={setActionColumMenuAnchorEl}
            />
            <ConfirmationPopover
                isDeletion
                confirmationMessage="Are you sure to delete this expense?"
                anchorEl={deleteExpensePopoverAnchorEl}
                onClose={() => setDdeleteExpensePopoverAnchorEl(null)}
                onYes={() => setDdeleteExpensePopoverAnchorEl(null)}
            />
            <CustomTable
                columns={EXPENSE_TABLE_COLUMNS}
                rowData={getExpenseTableRows()}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeExpensesTable);
