import React, { useEffect, useState } from 'react';

import { useQuery } from '../../Redux/apiServices/buildURL';

import Header from '../../Components/Header';
import CustomNavTabs from '../../Components/Custom/CustomTab';

import { HOUSES_PAGE_TABS_VALUES, HOUSE_PAGE_TABS } from './constants';
import CustomErrorBoundary from '../../Components/Custom/CustomErrorBoundary';
import HousePageComponent from '../../Components/Houses/HousePageComponent';
const HOME_PAGE_TITLE = 'HBE';

const HousePage = () => {
    const query = useQuery();
    const tabName = query.get('tab') || HOUSES_PAGE_TABS_VALUES.YOUR_HOUSES;

    const [activeTab, setActiveTab] = useState(tabName);

    useEffect(() => {
        document.title = HOME_PAGE_TITLE;
    }, []);

    return (
        <div className={'pageComponent center'}>
            <Header
                components={
                    <CustomNavTabs
                        tabItems={HOUSE_PAGE_TABS}
                        selectedTab={activeTab}
                        onTabSelect={(tab: string) => setActiveTab(tab)}
                    />
                }
            />
            <CustomErrorBoundary key={activeTab}>
                <HousePageComponent tabName={activeTab} />
            </CustomErrorBoundary>
        </div>
    );
};

export default HousePage;
