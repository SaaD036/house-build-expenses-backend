import React from 'react';
import { Typography, Box } from '@mui/material';

import { formatDate } from '../../../Utilities/Date';

import styles from './styles.module.css';
import { ExpenseEditHistoryCardPropTypes } from './interfaces';

const ExpenseEditHistoryCard = (props: ExpenseEditHistoryCardPropTypes) => {
    const { actionName, field, actionByName, actionAt, newValue, oldValue } = props;

    return (
        <Box className={styles.historyItemContainer}>
            <Typography variant="h5" component="h2" className={`text ${styles.historyItemTitle}`}>
                Action Taken: {actionName}
            </Typography>
            <Box className={styles.metaSection}>
                <Typography variant="body2" className={styles.metaRow}>
                    <span className={styles.label}>Action field:</span>
                    <span>{field}</span>
                </Typography>
                <Typography variant="body2" className={`text-normal ${styles.metaRow}`}>
                    <span className={styles.label}>Action By:</span>
                    <span>{actionByName}</span>
                </Typography>
                <Typography variant="body2" className={`text-normal ${styles.metaRow}`}>
                    <span className={styles.label}>Action At:</span>
                    <span>{formatDate(actionAt, 'm-full-dy-numeric')}</span>
                </Typography>
                <Typography variant="body2" className={`text-normal ${styles.metaRow}`}>
                    <span className={styles.label}>New Value:</span>
                    <span>{newValue}</span>
                </Typography>
                <Typography variant="body2" className={`text-normal ${styles.metaRow}`}>
                    <span className={styles.label}>Old Value:</span>
                    <span>{oldValue}</span>
                </Typography>
            </Box>
        </Box>
    );
};

export default ExpenseEditHistoryCard;
