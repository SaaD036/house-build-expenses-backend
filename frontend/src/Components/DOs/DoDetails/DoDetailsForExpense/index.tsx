import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Typography, Box } from '@mui/material';

import DoExpensesList from '../DoExpensesList';
import ShimmerLoader, { ShimmerCardLoader } from '../../../Custom/CustomLoadingItems/ShimmerLoader';

import { formatDate } from '../../../../Utilities/Date';
import { getUserFromToken } from '../../../../Utilities/Users/UserToken';
import { getDoDetailsForExpense } from '../../../../Redux/actions/expenseAction';

import { DoDetailsForExpensePropTypes } from '../interfaces';
import { ReducerStateType } from '../../../../Redux/reducers';

import styles from './styles.module.css';
import { UserRole } from '../../../../Constants/Users';

const DoDetailsForExpense = (props: DoDetailsForExpensePropTypes) => {
    const { expenseId, doDetailsData, getDoDetailsForExpense } = props;

    const loggedInUser = getUserFromToken();

    const [loading, setLoading] = useState(false);

    const renderDoMetaDataSection = () => {
        if (doDetailsData === null) {
            return <></>;
        }

        const { amount, shopName, shopAddress, doDate, doEditHistoryCount, otherExpenseCount } =
            doDetailsData;

        return (
            <Box className="key-value-layout">
                <Typography variant="body2" className="key-value-row">
                    <span className={'text-normal key-value-label'}>Shop Name:</span>
                    <span>{shopName}</span>
                </Typography>
                <Typography variant="body2" className="key-value-row">
                    <span className={'text-normal key-value-label'}>Shop Address:</span>
                    <span>{shopAddress.area}</span>
                </Typography>
                <Typography variant="body2" className="key-value-row">
                    <span className={'text-normal key-value-label'}>DO amount:</span>
                    <span>{amount}</span>
                </Typography>
                <Typography variant="body2" className="key-value-row">
                    <span className={'text-normal key-value-label'}>DO at:</span>
                    <span>{formatDate(doDate, 'm-full-dy-numeric')}</span>
                </Typography>
                <Typography variant="body2" className="key-value-row">
                    <span className={'text-normal key-value-label'}>DO update count:</span>
                    <span>
                        {doEditHistoryCount ?? 0} time{(doEditHistoryCount ?? 0 > 1) ? 's' : ''}
                    </span>
                </Typography>
                {(loggedInUser?.role ?? UserRole.USER) === UserRole.USER && (
                    <Typography variant="body2" className="key-value-row">
                        <span className={'text-normal key-value-label'}>Other expense count:</span>
                        <span>{otherExpenseCount}</span>
                    </Typography>
                )}
            </Box>
        );
    };

    useEffect(() => {
        const loadExpenseDoDetails = async () => {
            setLoading(true);
            await getDoDetailsForExpense(expenseId);
            setLoading(false);
        };

        loadExpenseDoDetails();
    }, []);

    if (doDetailsData === null) {
        return <div>No DO found</div>;
    }

    return (
        <Box className={styles.outerContainer}>
            <ShimmerCardLoader loading={loading} hasTitle line={2}>
                <Typography variant="h5" component="h2" className={`text ${styles.mainTitle}`}>
                    DO Item: {doDetailsData.doItem}
                </Typography>
                <Typography variant="body1" className={`text-normal ${styles.mainDescription}`}>
                    • {doDetailsData.description}
                </Typography>
            </ShimmerCardLoader>
            <div style={{ marginTop: '30px' }}>
                <ShimmerCardLoader loading={loading} line={5}>
                    {renderDoMetaDataSection()}
                </ShimmerCardLoader>
            </div>
            {(loggedInUser?.role ?? UserRole.USER) !== UserRole.USER && (
                <div style={{ marginTop: '30px' }}>
                    <ShimmerLoader loading={loading} hasText itemCount={3}>
                        <DoExpensesList
                            sectionTitle="Other Expenses"
                            expenses={doDetailsData.expenses}
                        />
                    </ShimmerLoader>
                </div>
            )}
        </Box>
    );
};

const mapStateToProps = (state: ReducerStateType) => ({
    doDetailsData: state.expense.expenseDoDetails,
});

const mapDispatchToProps = {
    getDoDetailsForExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(DoDetailsForExpense);
