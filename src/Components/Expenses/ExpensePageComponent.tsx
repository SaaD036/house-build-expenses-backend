import React from 'react';

import SeeExpenses from './SeeExpenses';

import { tabValueItem } from '../../Pages/Expenses/constants';
import { ExpensePagePropType } from './interfaces';

const ExpensePageComponent = (props: ExpensePagePropType) => {
    const { tabName } = props;

    const renderTabComponents = () => {
        if (tabName === tabValueItem.SEE_EXPENSES) {
            return <SeeExpenses />;
        }

        if (tabName === tabValueItem.CREATE_EXPENSE) {
            return <div>Create expenses here</div>;
        }

        return <div>Page not found</div>;
    };

    return <div style={{ width: '98%' }}>{renderTabComponents()}</div>;
};

export default ExpensePageComponent;
