import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Typography, Box } from '@mui/material';

import { getSingleExpense } from '../../../Redux/actions/expenseAction';

import styles from './styles.module.css';
import { ReducerStateType } from '../../../Redux/reducers';
import { ExpenseModalDetailsPropType } from './interfaces';

const ExpenseModalDetails = (props: ExpenseModalDetailsPropType) => {
    const { expenseId, expense, userRole, getSingleExpense } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadExpenseData = async () => {
        setIsLoading(true);
        getSingleExpense(expenseId);
        setIsLoading(false);
    };

    const renderInfoSection = () => {
        if (expense === null) {
            return <></>;
        }

        const editCount = (expense.expenseEditHistory ?? [])?.length;
        const creatorName =
            `${expense.creator.firstName || ''} ${expense.creator.lastName || ''}`.trim();
        const formattedExpenseAt = new Date(expense.expenseAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        return (
            <Box className={styles.metaSection} sx={{ marginTop: '30px' }}>
                <Typography variant="body2">
                    <span className={`text-normal ${styles.label}`}>Expense time:</span>{' '}
                    {formattedExpenseAt}
                </Typography>
                <Typography variant="body2">
                    <span className={`text-normal ${styles.label}`}>Created By:</span> {creatorName}
                </Typography>
                <Typography variant="body2">
                    <span className={`text-normal ${styles.label}`}>DO info:</span>{' '}
                    {expense.do?.shopName ? expense.do.shopName : 'No DO attached'}
                </Typography>
                {userRole !== 'user' && (
                    <Typography variant="body2">
                        <span className={`text-normal ${styles.label}`}>Edit history Info: </span>
                        edited {editCount} time{editCount > 1 ? 's' : ''}
                    </Typography>
                )}
                <Typography variant="body2" className={`text-normal ${styles.label}`}>
                    {expense.attachmentURL ? 'One attachment' : 'No attachment'}
                </Typography>
            </Box>
        );
    };

    useEffect(() => {
        loadExpenseData();
    }, []);

    if (isLoading) {
        return <Typography>Loading data</Typography>;
    }

    if (expense === null) {
        return <Typography>No expense found</Typography>;
    }

    return (
        <Box className={styles.container}>
            <Typography variant="h5" component="h2" className={`text ${styles.title}`}>
                {expense.title || 'Untitled Expense'}
            </Typography>
            <Typography variant="body1" className={`text-normal ${styles.detailsDescription}`}>
                • {expense.description || 'No description provided.'}
            </Typography>
            {renderInfoSection()}
        </Box>
    );
};

const mapStateToProps = (state: ReducerStateType) => ({
    expense: state.expense.expenseDetails,
});

const mapDispatchToProps = {
    getSingleExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseModalDetails);
