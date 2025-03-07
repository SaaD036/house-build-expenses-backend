import React, { useState } from 'react';
import { FormikHelpers } from 'formik';

import Form from '../../Custom/Form';
import FormTextInput from '../../Custom/Form/FormComponent/FormTextInput';
import FormTextArea from '../../Custom/Form/FormComponent/FormTextAreaInput';
import FormCurrencyInput from '../../Custom/Form/FormComponent/FormCurrencyInput';
import FormDate from '../../Custom/Form/FormComponent/FormDateInput';
import ButtonSection from '../../Custom/CustomButton/ButtonSection';

import { getInitialValueForEditExpenseForm } from './utilities';

import { CREATE_EXPENSE_FORM_VALIDATOR } from '../CreateExpense/constants';
import { EditExpensePropTypes } from './interfaces';
import { CreateExpenseFormValueType } from '../CreateExpense/interfaces';

import styles from './styles.module.css';

function EditExepense(props: EditExpensePropTypes) {
    const { expense } = props;

    const [loading, setLoading] = useState(false);

    const onSubmitEditExpenseForm = async (
        createExpenseFormData: CreateExpenseFormValueType,
        formikHelpers: FormikHelpers<object>
    ) => {
        setLoading(true);

        // await createExpense({
        //     title: createExpenseFormData.title || '',
        //     description: createExpenseFormData.description || '',
        //     amount: createExpenseFormData.amount || 1,
        //     expenseAt: createExpenseFormData.expense_at.toISOString().split('T')[0],
        // });

        setLoading(false);
    };
    return (
        <div style={{ display: 'grid', gap: '25px' }}>
            <Form
                initialValue={getInitialValueForEditExpenseForm(expense)}
                validationObject={CREATE_EXPENSE_FORM_VALIDATOR}
                onSubmit={onSubmitEditExpenseForm}
            >
                <FormTextInput id="title" name="title" label="Title" />
                <FormTextArea id="description" name="description" label="Description" />
                <FormCurrencyInput id="amount" name="amount" label="Amount" min={1} />
                <FormDate
                    id="expense_at"
                    name="expense_at"
                    label="Expense Time"
                    maxDate={new Date()}
                />
                <ButtonSection className={styles.buttonSection}>
                    <button className="button" type="submit">
                        SUBMIT
                    </button>
                </ButtonSection>
            </Form>
        </div>
    );
}

export default EditExepense;
