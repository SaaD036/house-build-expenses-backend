import { ExpenseModalTabType } from '../Types/expenses';

export const EXPENSE_MODAL_TAB = {
    DETAILS: {
        key: 'details',
        label: 'Details',
        content: '',
        role: 'all',
    },
    EDIT_HISTORY: {
        key: 'edit_history',
        label: 'Edit History',
        content: '',
        role: 'admin',
    },
    DO_DETAILS: {
        key: 'do_details',
        label: 'DO Details',
        content: '',
        role: 'all',
    },
} as const satisfies ExpenseModalTabType;
