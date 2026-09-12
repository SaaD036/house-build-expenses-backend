import React from 'react';
import { get } from 'lodash';

import ExpenseEditHistory from '../ExpenseEditHistory';
import ExpenseModalDetails from './ExpenseModalDetails';
import MultiTabModal from '../../Custom/CustomModal/MultiTabModal';

import { getTabItems } from './utilities';
import { getUserFromToken } from '../../../Utilities/Users/UserToken';

import { ExpenseModalPropType, ExpenseModalTabKeyType } from './interfaces';

import { EXPENSE_MODAL_TAB } from '../../../Constants/Expenses';
import DoDetailsForExpense from '../../DOs/DoDetails/DoDetailsForExpense';

const ExpenseModal = ({ expenseId, expenseModalTabKey, onCloseModal }: ExpenseModalPropType) => {
    const user = getUserFromToken();
    const userRole = get(user, 'role', null);

    const getTabContent = (tabKey: ExpenseModalTabKeyType): React.ReactNode => {
        if (tabKey === EXPENSE_MODAL_TAB.DETAILS.key) {
            return <ExpenseModalDetails expenseId={expenseId} userRole={userRole} />;
        }

        if (tabKey === EXPENSE_MODAL_TAB.EDIT_HISTORY.key) {
            return <ExpenseEditHistory expenseId={expenseId} />;
        }

        if (tabKey === EXPENSE_MODAL_TAB.DO_DETAILS.key) {
            return <DoDetailsForExpense expenseId={expenseId} />;
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
