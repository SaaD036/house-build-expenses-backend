import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Header from '../../Components/Header';
import CustomNavTabs from '../../Components/Custom/CustomTab';
import CustomErrorBoundary from '../../Components/Custom/CustomErrorBoundary';
import ExpensePageComponent from '../../Components/Expenses/ExpensePageComponent';

import { getExpensePageTabs } from './utilities';
import { useQuery } from '../../Redux/apiServices/buildURL';
import { hasContributorLevelAccessToHouse } from '../../Utilities/Houses/HouseAccess';

import { tabValueItem } from './constants';
import { UserRole } from '../../Constants/Users';

import styles from './styles.module.css';
import { ReducerStateType } from '../../Redux/reducers';
import { HouseType } from '../../Types/Houses';

const EXPENSE_PAGE_TITLE = 'Expenses';

const ExpensesPage = ({ house }: { house?: HouseType | null }) => {
    const query = useQuery();
    const tabName = query.get('tab') || tabValueItem.SEE_EXPENSES;

    const [activeTab, setActiveTab] = useState(tabName);

    useEffect(() => {
        const hasNoAccessToCreateTab = !hasContributorLevelAccessToHouse(
            house?.accessForLoggedInUser ?? UserRole.USER,
            true
        );

        if (hasNoAccessToCreateTab && activeTab === tabValueItem.CREATE_EXPENSE) {
            setActiveTab(tabValueItem.SEE_EXPENSES);
        }
    }, [activeTab, house?.accessForLoggedInUser]);

    useEffect(() => {
        document.title = EXPENSE_PAGE_TITLE;
    }, []);

    return (
        <div className={`pageComponent center ${styles.expensePageComponent}`}>
            <Header
                components={
                    <CustomNavTabs
                        tabItems={getExpensePageTabs(house ?? null)}
                        selectedTab={activeTab}
                        onTabSelect={(tab: string) => setActiveTab(tab)}
                    />
                }
            />
            <CustomErrorBoundary key={activeTab}>
                <ExpensePageComponent
                    isCreateExpenseFormDisabled={
                        !house ||
                        !hasContributorLevelAccessToHouse(
                            house.accessForLoggedInUser ?? UserRole.USER,
                            false
                        )
                    }
                    tabName={activeTab}
                />
            </CustomErrorBoundary>
        </div>
    );
};

const mapStateToProps = (state: ReducerStateType) => ({
    house: state.house.house,
});

export default connect(mapStateToProps, null)(ExpensesPage);
