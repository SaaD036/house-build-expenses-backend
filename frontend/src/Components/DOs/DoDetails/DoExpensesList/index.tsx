import React from 'react';

import Box from '@mui/material/Box';

import DoExpenseCard from './DoExpenseCard';

import styles from './styles.module.css';
import { DoExpensesListPropTypes } from '../interfaces';
import CustomSectionDivider from '../../../Custom/CustomSectionDivider';

const DoExpensesList = (props: DoExpensesListPropTypes) => {
    const { sectionTitle, expenses } = props;

    const renderExpensesList = () => {
        if (expenses.length <= 0) {
            return <div>No other expenses found for this DO</div>;
        }

        return expenses.map((e) => <DoExpenseCard key={`do-expense-car-${e.id}`} expense={e} />);
    };

    return (
        <Box>
            <CustomSectionDivider title={sectionTitle} />
            <Box className={styles.expensesList}>{renderExpensesList()}</Box>
        </Box>
    );
};

export default DoExpensesList;
