import React, { useState } from 'react';

import SeeExpensesTable from './SeeExpensesTable';
import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import TotalExpense from '../../Home/HomePageComponentItems/TotalExpense';

import styles from './styles.module.css';
import { Grid2 } from '@mui/material';

const SeeExpenses = () => {
    const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(false);

    return (
        <div>
            {isLoadingExpenseData && <TabComponentLoader />}
            <CardContainer title="Expenses" />
            <Grid2 container spacing={4} marginTop={4}>
                <Grid2 size={{ sm: 12, md: 4 }}>
                    <TotalExpense hideDateFilters />
                </Grid2>
            </Grid2>
            <div className={styles.tableSectionContainer}>
                <SeeExpensesTable
                    showLoader={() => setIsLoadingExpenseData(true)}
                    hideLoader={() => setIsLoadingExpenseData(false)}
                />
            </div>
        </div>
    );
};

export default SeeExpenses;
