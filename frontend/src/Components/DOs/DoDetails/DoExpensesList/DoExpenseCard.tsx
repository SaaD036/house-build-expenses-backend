import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { formatDate } from '../../../../Utilities/Date';

import { DoExpenseCardPropTypes } from '../interfaces';

import styles from './styles.module.css';

const DoExpenseCard = (props: DoExpenseCardPropTypes) => {
    const { expense } = props;
    const { amount, title, description, expenseAt } = expense;

    return (
        <Box key={expense.id} className="list-card-item">
            <Typography variant="h6" className={styles.expenseTitle}>
                {title}
            </Typography>
            {(description ?? '').trim().length > 0 && (
                <Typography variant="body2" className={styles.expenseDescription}>
                    • {description}
                </Typography>
            )}
            <Box className={'key-value-layout'} sx={{ marginTop: '10px' }}>
                <Typography variant="body2" className={`key-value-row ${styles.metaRow}`}>
                    <span className="key-value-label">Expense At:</span>
                    <span>{formatDate(expenseAt, 'm-full-dy-numeric')}</span>
                </Typography>
                <Typography variant="body2" className={`key-value-row ${styles.metaRow}`}>
                    <span className="key-value-label">Amount:</span>
                    <span>{amount} BDT</span>
                </Typography>
            </Box>
        </Box>
    );
};

export default DoExpenseCard;
