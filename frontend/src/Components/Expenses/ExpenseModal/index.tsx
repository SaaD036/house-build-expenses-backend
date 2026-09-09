import React from 'react';
import { get } from 'lodash';

import ExpenseModalDetails from './ExpenseModalDetails';
import MultiTabModal from '../../Custom/CustomModal/MultiTabModal';

import { getTabItems } from './utilities';
import { getUserFromToken } from '../../../Utilities/Users/UserToken';

import { ExpenseModalPropType, ExpenseModalTabKeyType } from './interfaces';

import { EXPENSE_MODAL_TAB } from '../../../Constants/Expenses';

const ExpenseModal = ({ expenseId, expenseModalTabKey, onCloseModal }: ExpenseModalPropType) => {
    const user = getUserFromToken();
    const userRole = get(user, 'role', null);

    const getTabContent = (tabKey: ExpenseModalTabKeyType): React.ReactNode => {
        if (tabKey === EXPENSE_MODAL_TAB.DETAILS.key) {
            return <ExpenseModalDetails expenseId={expenseId} userRole={userRole} />;
        }

        if (tabKey === EXPENSE_MODAL_TAB.EDIT_HISTORY.key) {
            return <>Expense Edit History here</>;
        }

        return <div>Content not found</div>;
    };

    if (expenseModalTabKey === undefined) {
        return <></>;
    }

    return (
        <MultiTabModal
            open
            title="Expense Details"
            onClose={onCloseModal}
            tabs={getTabItems(userRole, getTabContent)}
            defaultTabId={expenseModalTabKey || ''}
        />
    );
};

export default ExpenseModal;
