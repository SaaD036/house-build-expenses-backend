/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Typography, Box } from '@mui/material';

import { getSingleExpense } from '../../../Redux/actions/expenseAction';

import styles from './styles.module.css';
import { ReducerStateType } from '../../../Redux/reducers';
import { ExpenseModalDetailsPropType } from './interfaces';
import { ShimmerCardLoader } from '../../Custom/CustomLoadingItems/ShimmerLoader';

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
            <Box className={styles.metaSection} sx={{ marginTop: isLoading ? '60px' : '40px' }}>
                <ShimmerCardLoader loading={isLoading} line={5}>
                    <div>
                        <Typography variant="body2" className={styles.metaRow}>
                            <span className={`text-normal ${styles.label}`}>Expense time:</span>
                            <span>{formattedExpenseAt}</span>
                        </Typography>
                        <Typography variant="body2" className={styles.metaRow}>
                            <span className={`text-normal ${styles.label}`}>Created By:</span>
                            <span>{creatorName}</span>
                        </Typography>
                        <Typography variant="body2" className={styles.metaRow}>
                            <span className={`text-normal ${styles.label}`}>DO info:</span>
                            <span>
                                {expense.do?.shopName ? expense.do.shopName : 'No DO attached'}
                            </span>
                        </Typography>
                        {userRole !== 'user' && (
                            <Typography variant="body2" className={styles.metaRow}>
                                <span className={`text-normal ${styles.label}`}>
                                    Edit history Info:
                                </span>
                                <span>
                                    edited {editCount} time{editCount !== 1 ? 's' : ''}
                                </span>
                            </Typography>
                        )}
                        <Typography variant="body2" className={styles.metaRow}>
                            <span className={`text-normal ${styles.label}`}>
                                {expense.attachmentURL ? 'One attachment' : 'No attachment'}
                            </span>
                        </Typography>
                    </div>
                </ShimmerCardLoader>
            </Box>
        );
    };

    useEffect(() => {
        loadExpenseData();
    }, []);

    if (expense === null) {
        return <Typography>No expense found</Typography>;
    }

    return (
        <Box className={styles.container}>
            <ShimmerCardLoader loading={isLoading} line={2} hasTitle>
                <div>
                    <Typography variant="h5" component="h2" className={`text ${styles.title}`}>
                        {expense.title || 'Untitled Expense'}
                    </Typography>
                    <Typography
                        variant="body1"
                        className={`text-normal ${styles.detailsDescription}`}
                    >
                        • {expense.description || 'No description provided.'}
                    </Typography>
                </div>
            </ShimmerCardLoader>
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
