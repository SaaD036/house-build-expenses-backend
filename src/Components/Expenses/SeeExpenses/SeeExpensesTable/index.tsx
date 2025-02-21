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

import { createActionColumnMenuItem, getExpenseTableRows } from './utilities';

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

    const getActionColumnItem = () => {
        return (
            <span onClick={(e) => setActionColumMenuAnchorEl(e.currentTarget)}>
                <ActionColumnIcon sx={{ color: '#158901' }} className={styles.actionColumnIcon} />
            </span>
        );
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
                rowData={getExpenseTableRows(expenses || [], getActionColumnItem())}
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
