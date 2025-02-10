import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { MoreVert as ActionColumnIcon } from '@mui/icons-material';

import CustomTable from '../../Custom/CustomTable';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import CardContainer from '../../CardContainer';

import { getAllExpenses } from '../../../Redux/actions/expenseAction';

import { EXPENSE_TABLE_COLUMNS } from './constants';
import { SeeExpensesPropsType } from './interfaces';
import styles from './styles.module.css';

const SeeExpenses = (props: SeeExpensesPropsType) => {
    const { expenses, expensesCount, getAllExpenses } = props;

    const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(true);

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
                    <ActionColumnIcon
                        sx={{ color: '#158901' }}
                        className={styles.actionColumnIcon}
                    />
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
                    <CustomTable
                        columns={EXPENSE_TABLE_COLUMNS}
                        rowData={getExpenseTableRows()}
                        totalRowCount={expensesCount}
                        loadTableData={loadExpenseData}
                        showRefreshButton
                    />
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
