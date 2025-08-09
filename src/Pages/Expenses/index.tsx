import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { jwtDecode } from 'jwt-decode';

import ExpensePageComponent from '../../Components/Expenses/ExpensePageComponent';
import Header from '../../Components/Header';
import CustomNavTabs from '../../Components/Custom/CustomTab';

import { useQuery } from '../../Redux/apiServices/buildURL';
import { getExpensePageTabs } from './utilities';
import { cookieName, getCookie } from '../../Utilities/Cookies';

import { tabValueItem } from './constants';
import styles from './styles.module.css';
import { UserRole } from '../../Constants/Users';

const ExpensesPage = () => {
    const query = useQuery();
    const tabName = query.get('tab') || tabValueItem.SEE_EXPENSES;
    const userToken = getCookie(cookieName.USER_TOKEN);
    const user = jwtDecode(userToken || '');

    const [activeTab, setActiveTab] = useState(tabName);

    useEffect(() => {
        const isLoggedInUserAsUser = get(user, 'role', UserRole.USER) === UserRole.USER;

        if (isLoggedInUserAsUser && activeTab === tabValueItem.CREATE_EXPENSE) {
            setActiveTab(tabValueItem.SEE_EXPENSES);
        }
    }, []);

    return (
        <div className={`pageComponent center ${styles.expensePageComponent}`}>
            <Header
                components={
                    <CustomNavTabs
                        tabItems={getExpensePageTabs()}
                        selectedTab={activeTab}
                        onTabSelect={(tab: string) => setActiveTab(tab)}
                    />
                }
            />
            <ExpensePageComponent
                isCreateExpenseFormDisabled={get(user, 'role', UserRole.USER) !== UserRole.ADMIN}
                tabName={activeTab}
            />
        </div>
    );
};

export default ExpensesPage;
