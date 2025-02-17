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

import CustomTable from '../../Custom/CustomTable';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import CardContainer from '../../CardContainer';
import CustomMenu from '../../Custom/CustomMenu';

import { getAllExpenses } from '../../../Redux/actions/expenseAction';

import { EXPENSE_TABLE_COLUMNS } from './constants';
import { TABLE_ROW_COUNT_OPTIONS } from '../../Custom/CustomTable/constants';

import {
    CustomTableColumnSortDataType,
    CustomTableLoadDataTypes,
} from '../../Custom/CustomTable/interfaces';
import { SeeExpensesPropsType } from './interfaces';

import styles from './styles.module.css';

const SeeExpenses = (props: SeeExpensesPropsType) => {
    const { expenses, expensesCount, getAllExpenses } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [expensesPerPage, setExpensesPerPage] = useState(TABLE_ROW_COUNT_OPTIONS[0]);
    const [expenseSortData, setExpenseSortData] = useState<CustomTableColumnSortDataType>();

    const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
                onClick: () => {},
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

    const loadExpenseData = async (filterAndParams?: CustomTableLoadDataTypes) => {
        setIsLoadingExpenseData(true);
        await getAllExpenses(filterAndParams);
        setIsLoadingExpenseData(false);
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
                    <span onClick={(e) => setAnchorEl(e.currentTarget)}>
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

    useEffect(() => {
        loadExpenseData({
            page: currentPage,
            itemsPerPage: expensesPerPage,
        });
    }, [currentPage, expensesPerPage]);

    return (
        <>
            <div>
                <CardContainer title="Expenses" />
                {isLoadingExpenseData ? (
                    <TabComponentLoader />
                ) : (
                    <div className={styles.tableSectionContainer}>
                        <CustomMenu
                            items={getActionColumnMenuItems()}
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            setAnchorEl={setAnchorEl}
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
                                    setSizePerPage: (sizePerPage) =>
                                        setExpensesPerPage(sizePerPage),
                                },
                            }}
                            sort={{
                                sortData: expenseSortData,
                                setSortData: (sortData?: CustomTableColumnSortDataType) =>
                                    setExpenseSortData(sortData),
                            }}
                        />
                    </div>
                )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SeeExpenses);
