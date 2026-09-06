import React, { useEffect, useState } from 'react';

import Header from '../../Components/Header';
import CustomNavTabs from '../../Components/Custom/CustomTab';
import DOpageComponent from '../../Components/DOs/DOpageComponent';

import { useQuery } from '../../Redux/apiServices/buildURL';

import { DO_PAGE_TABS, DO_PAGE_TABS_VALUES } from './constants';

import styles from './styles.module.css';

const DO_PAGE_TITLE = 'DOs';

const DOpage = () => {
    const query = useQuery();
    const tabName = query.get('tab') || DO_PAGE_TABS_VALUES.SEE_DO;

    const [activeTab, setActiveTab] = useState(tabName);

    useEffect(() => {
        document.title = DO_PAGE_TITLE;
    }, []);

    return (
        <div className={`pageComponent center ${styles.usersPage}`}>
            <Header
                components={
                    <CustomNavTabs
                        tabItems={DO_PAGE_TABS}
                        selectedTab={activeTab}
                        onTabSelect={(tab: string) => setActiveTab(tab)}
                    />
                }
            />
            <DOpageComponent tabName={activeTab} />
        </div>
    );
};

export default DOpage;
