import * as Yup from 'yup';

import { CreateExpenseFormValueType } from './interfaces';

export const CREATE_EXPENSE_INITIAL_VALUE: CreateExpenseFormValueType = {
    title: '',
    description: '',
    amount: undefined,
    expense_at: new Date(),
};

export const CREATE_EXPENSE_FORM_VALIDATOR = Yup.object({
    title: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Firstname is required'),
    description: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    amount: Yup.number()
        .min(1, 'Amount must be positive number')
        .required('Required'),
});