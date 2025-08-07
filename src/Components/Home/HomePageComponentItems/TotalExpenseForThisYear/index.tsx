import React from 'react';
import CardContainer from '../../../CardContainer';

import styles from './styles.module.css';

const TotalExpenseForThisYear = () => {
    const renderTitleForTotalExpense = () => {
        return <div className={styles.totalExpenseTitle}>Total Expense for this Year</div>;
    };

    return (
        <div style={{ height: '100%' }}>
            <CardContainer title={renderTitleForTotalExpense()}>
                <h2>
                    <b>20,00,000 BDT</b>
                </h2>
            </CardContainer>
        </div>
    );
};

export default TotalExpenseForThisYear;
