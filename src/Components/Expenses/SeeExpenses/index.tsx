import React from 'react';

import SeeExpensesTable from './SeeExpensesTable';
import CardContainer from '../../CardContainer';

import styles from './styles.module.css';

const SeeExpenses = () => {
    return (
        <div>
            <CardContainer title="Expenses" />
            <div className={styles.tableSectionContainer}>
                <SeeExpensesTable />
            </div>
        </div>
    );
};

export default SeeExpenses;
