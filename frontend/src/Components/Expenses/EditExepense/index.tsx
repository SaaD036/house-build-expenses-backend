import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import { connect } from 'react-redux';
import { noop } from 'lodash';

import Form from '../../Custom/Form';
import FormTextInput from '../../Custom/Form/FormComponent/FormTextInput';
import FormTextArea from '../../Custom/Form/FormComponent/FormTextAreaInput';
import FormCurrencyInput from '../../Custom/Form/FormComponent/FormCurrencyInput';
import FormDate from '../../Custom/Form/FormComponent/FormDateInput';
import ButtonSection from '../../Custom/CustomButton/ButtonSection';

import { editExpense } from '../../../Redux/actions/expenseAction';

import { getInitialValueForEditExpenseForm } from './utilities';

import { CREATE_EXPENSE_FORM_VALIDATOR } from '../CreateExpense/constants';
import { EditExpensePropTypes } from './interfaces';
import { CreateExpenseFormValueType } from '../CreateExpense/interfaces';

import styles from './styles.module.css';
import { Container } from '@mui/material';

function EditExepense(props: EditExpensePropTypes) {
    const { disableForm, expense, onEditSuccess, onEditUnsuccess, editExpense } = props;

    const [loading, setLoading] = useState(false);

    const onSubmitEditExpenseForm = async (
        createExpenseFormData: CreateExpenseFormValueType,
        formikHelpers: FormikHelpers<object>
    ) => {
        setLoading(true);

        try {
            await editExpense(expense.id, {
                title: createExpenseFormData.title || '',
                description: createExpenseFormData.description || '',
                amount: createExpenseFormData.amount || 1,
                expenseAt: createExpenseFormData.expense_at.toISOString().split('T')[0],
            });

            setLoading(false);
            if (onEditSuccess) {
                onEditSuccess();
            }
        } catch (error) {
            setLoading(false);
            if (onEditUnsuccess) {
                onEditUnsuccess();
            }
        }
    };

    return (
        <div
            className={`${styles.editExpenseFormWrapper} ${
                disableForm ? styles.editExpenseFormWrapperDisabled : ''
            }`}
        >
            {disableForm && (
                <Container className="center">
                    <div className={styles.formDisabledMessage}>This form is disabled</div>
                </Container>
            )}
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
                <ButtonSection>
                    <button
                        className="button button-cancel"
                        type="button"
                        onClick={onEditUnsuccess || noop}
                    >
                        CANCEL
                    </button>
                    <button className={`button ${styles.submitButton}`} type="submit">
                        {loading ? 'UPDATING' : 'UPDATE'}
                    </button>
                </ButtonSection>
            </Form>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    expenses: state.expense.expenses,
    expensesCount: state.expense.expensesCount,
});

const mapDispatchToProps = {
    editExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExepense);
