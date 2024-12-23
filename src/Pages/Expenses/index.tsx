import React, { useState } from 'react';

import ExpensePageComponent from '../../Components/Expenses/ExpensePageComponent';
import Header from '../../Components/Header';
import CustomNavTabs from '../../Components/Custom/CustomTab';

import { useQuery } from '../../Redux/apiServices/buildURL';

import { EXPENSE_PAGE_TAB_ITEMS, tabValueItem } from './constants';
import styles from './styles.module.css';

const ExpensesPage = () => {
    const query = useQuery();
    const tabName = query.get('tab') || tabValueItem.SEE_EXPENSES;

    const [activeTab, setActiveTab] = useState(tabName);

    return (
        <div className={`pageComponent center ${styles.expensePageComponent}`}>
            <Header
                components={
                    <CustomNavTabs
                        tabItems={EXPENSE_PAGE_TAB_ITEMS}
                        selectedTab={activeTab}
                        onTabSelect={(tab: string) => setActiveTab(tab)}
                    />
                }
            />
            <ExpensePageComponent tabName={activeTab} />
        </div>
    );
};

export default ExpensesPage;
