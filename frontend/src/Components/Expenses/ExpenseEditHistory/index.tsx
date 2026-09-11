import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';

import ExpenseEditHistoryCard from './ExpenseEditHistoryCard';

import { getExpenseEditHistory } from '../../../Redux/actions/expenseAction';

import { ReducerStateType } from '../../../Redux/reducers';
import { ExpenseEditHistoryPropTypes } from './interfaces';
import styles from './styles.module.css';
import ShimmerLoader, { ShimmerCardLoader } from '../../Custom/CustomLoadingItems/ShimmerLoader';
const ExpenseEditHistory = (props: ExpenseEditHistoryPropTypes) => {
    const { expenseId, expenseEditHistory, getExpenseEditHistory } = props;

    const [loading, setLoading] = useState(false);

    const renderHistoryCards = () => {
        if (!expenseEditHistory) {
            return;
        }

        const { history } = expenseEditHistory;

        return history.map((history) => (
            <ExpenseEditHistoryCard
                key={'sdmnvkn'}
                actionName={history.task_type}
                actionAt={history.task_at}
                actionByName={`${history.updater.firstName} ${history.updater.lastName}`}
                field={history.field}
                newValue={history.new_value}
                oldValue={history.old_value}
            />
        ));
    };

    useEffect(() => {
        const loadExpenseEditHistory = async () => {
            setLoading(true);
            await getExpenseEditHistory(expenseId);
            setLoading(false);
        };

        loadExpenseEditHistory();
    }, []);

    if (expenseEditHistory === null || expenseEditHistory.history.length === 0) {
        return <div>No history found</div>;
    }

    return (
        <Box>
            <ShimmerCardLoader loading={loading} line={2}>
                This expense has been updated {expenseEditHistory.history.length} time
                {expenseEditHistory.history.length > 1 ? 's' : ''}
            </ShimmerCardLoader>
            <div style={{ marginTop: loading ? '45px' : '30px' }}>
                <ShimmerLoader loading={loading} itemCount={3} hasTitle hasText>
                    <div className={styles.historyItemList}>{renderHistoryCards()}</div>
                </ShimmerLoader>
            </div>
        </Box>
    );
};

const mapStateToProps = (state: ReducerStateType) => ({
    expenseEditHistory: state.expense.expenseEditHistory,
});

const mapDispatchToProps = {
    getExpenseEditHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseEditHistory);
