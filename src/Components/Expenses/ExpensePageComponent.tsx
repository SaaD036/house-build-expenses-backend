import React from 'react';

import SeeExpenses from './SeeExpenses';
import CreateExpense from './CreateExpense';

import { tabValueItem } from '../../Pages/Expenses/constants';
import { ExpensePagePropType } from './interfaces';
import styles from './styles.module.css';

const ExpensePageComponent = (props: ExpensePagePropType) => {
    const { tabName, isCreateExpenseFormDisabled } = props;

    const renderTabComponents = () => {
        if (tabName === tabValueItem.SEE_EXPENSES) {
            return <SeeExpenses />;
        }

        if (tabName === tabValueItem.CREATE_EXPENSE) {
            return <CreateExpense disabledForm={isCreateExpenseFormDisabled} />;
        }

        return <div>Page not found</div>;
    };

    return <div className={styles.expenseTabComponentWrapper}>{renderTabComponents()}</div>;
};

export default ExpensePageComponent;
