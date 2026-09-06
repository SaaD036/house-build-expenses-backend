import * as Yup from 'yup';

import { CreateExpenseFormValueType } from './interfaces';

export const CREATE_EXPENSE_INITIAL_VALUE: CreateExpenseFormValueType = {
    title: '',
    description: '',
    amount: undefined,
    expense_at: new Date(),
};

export const CREATE_EXPENSE_FORM_VALIDATOR = Yup.object({
    title: Yup.string().required('Firstname is required'),
    description: Yup.string().required('Description is required'),
    amount: Yup.number().min(1, 'Amount must be positive number').required('Amount is required'),
});
