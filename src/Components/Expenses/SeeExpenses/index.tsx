import React, { useState } from 'react';

import SeeExpensesTable from './SeeExpensesTable';
import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import TotalExpense from '../../Home/HomePageComponentItems/TotalExpense';

import styles from './styles.module.css';

const SeeExpenses = () => {
    const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(false);

    return (
        <div>
            {isLoadingExpenseData && <TabComponentLoader />}
            <CardContainer title="Expenses" />
            <div className={styles.tableSectionContainer}>
                <TotalExpense hideDateFilters />
            </div>
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
