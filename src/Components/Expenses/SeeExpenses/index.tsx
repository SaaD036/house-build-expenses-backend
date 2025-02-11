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
import { SeeExpensesPropsType } from './interfaces';
import styles from './styles.module.css';

const SeeExpenses = (props: SeeExpensesPropsType) => {
    const { expenses, expensesCount, getAllExpenses } = props;

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

    const loadExpenseData = async (filterAndParams?: any) => {
        setIsLoadingExpenseData(true);
        await getAllExpenses(null);
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
        loadExpenseData();
    }, []);

    return (
        <>
            <div style={{ display: 'grid', gap: '25px' }}>
                <CardContainer title="Expenses" />
                {isLoadingExpenseData ? (
                    <TabComponentLoader />
                ) : (
                    <>
                        <CustomMenu
                            items={getActionColumnMenuItems()}
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            setAnchorEl={setAnchorEl}
                        />
                        <CustomTable
                            columns={EXPENSE_TABLE_COLUMNS}
                            rowData={getExpenseTableRows()}
                            totalRowCount={expensesCount}
                            loadTableData={loadExpenseData}
                            showRefreshButton
                        />
                    </>
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
