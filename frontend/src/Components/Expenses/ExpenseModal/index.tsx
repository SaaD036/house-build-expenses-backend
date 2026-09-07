import React from 'react';
import { get } from 'lodash';

import MultiTabModal from '../../Custom/CustomModal/MultiTabModal';

import { getUserFromToken } from '../../../Utilities/Users/UserToken';
import { hasUserAccessToThisResource } from '../../../Utilities/Users/UserAccess';

import { ExpenseModalPropType } from './interfaces';
import { MultiTabModalTabItemType } from '../../Custom/CustomModal/MultiTabModal/interfaces';

import { EXPENSE_MODAL_TAB } from '../../../Constants/Expenses';

const ExpenseModal = ({ expenseModalTabKey, onCloseModal }: ExpenseModalPropType) => {
    const user = getUserFromToken();
    const userRole = get(user, 'role', null);

    const getTabItems = () => {
        const tabItems: MultiTabModalTabItemType[] = [];

        Object.values(EXPENSE_MODAL_TAB).forEach((tabItem) => {
            if (!userRole || !hasUserAccessToThisResource(tabItem.role, userRole)) {
                return;
            }

            tabItems.push({
                key: tabItem.key,
                label: tabItem.label,
                content: '',
            });
        });

        return tabItems;
    };

    if (expenseModalTabKey === undefined) {
        return <></>;
    }

    return (
        <MultiTabModal
            open
            title="Expense Details"
            onClose={onCloseModal}
            tabs={getTabItems()}
            defaultTabId={expenseModalTabKey || ''}
        />
    );
};

export default ExpenseModal;
