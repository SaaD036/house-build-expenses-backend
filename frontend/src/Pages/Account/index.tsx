import React, { useEffect, useState } from 'react';

import Header from '../../Components/Header';
import CustomNavTabs from '../../Components/Custom/CustomTab';
import UsersPageComponent from '../../Components/Users/UsersPageComponent';

import { useQuery } from '../../Redux/apiServices/buildURL';

import { ACCOUNT_PAGE_TABS, ACCOUNT_PAGE_TABS_VALUES } from './constants';

import styles from './styles.module.css';
import AccountPageComponent from '../../Components/Account/AccountPageComponent';

const USER_PAGE_TITLE = 'Account';

const AccountPage = () => {
    const query = useQuery();
    const tabName = query.get('tab') || ACCOUNT_PAGE_TABS_VALUES.PERSONAL_INFO;

    const [activeTab, setActiveTab] = useState(tabName);

    useEffect(() => {
        document.title = USER_PAGE_TITLE;
    }, []);

    return (
        <div className={`pageComponent center ${styles.accountPage}`}>
            <Header
                components={
                    <CustomNavTabs
                        tabItems={ACCOUNT_PAGE_TABS}
                        selectedTab={activeTab}
                        onTabSelect={(tab: string) => setActiveTab(tab)}
                    />
                }
            />
            <AccountPageComponent tabName={activeTab} />
        </div>
    );
};

export default AccountPage;
