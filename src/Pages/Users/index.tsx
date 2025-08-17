import React, { useState } from 'react';

import Header from '../../Components/Header';
import CustomNavTabs from '../../Components/Custom/CustomTab';
import UsersPageComponent from '../../Components/Users/UsersPageComponent';

import { useQuery } from '../../Redux/apiServices/buildURL';

import { USERS_PAGE_TABS, USERS_PAGE_TABS_VALUES } from './constants';

import styles from './styles.module.css';

const UsersPage = () => {
    const query = useQuery();
    const tabName = query.get('tab') || USERS_PAGE_TABS_VALUES.SEE_USERS;

    const [activeTab, setActiveTab] = useState(tabName);

    return (
        <div className={`pageComponent center ${styles.usersPage}`}>
            <Header
                components={
                    <CustomNavTabs
                        tabItems={USERS_PAGE_TABS}
                        selectedTab={activeTab}
                        onTabSelect={(tab: string) => setActiveTab(tab)}
                    />
                }
            />
            <UsersPageComponent tabName={activeTab} />
        </div>
    );
};

export default UsersPage;
