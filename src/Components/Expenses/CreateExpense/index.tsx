import React from 'react';
import * as Yup from 'yup';

import Form from '../../Custom/Form';
import FormTextInput from '../../Custom/Form/FormComponent/FormTextInput';
import FormDate from '../../Custom/Form/FormComponent/FormDateInput';
import FormCurrencyInput from '../../Custom/Form/FormComponent/FormCurrencyInput';
import FormTextArea from '../../Custom/Form/FormComponent/FormTextAreaInput';

import CardContainer from '../../CardContainer';
import ButtonSection from '../../Custom/CustomButton/ButtonSection';

import { CreateExpenseFormValueType } from './interfaces';

const initialValue: CreateExpenseFormValueType = {
    title: 'BSRM Rods',
    description: '',
    amount: undefined,
    expense_at: new Date(),
};

const CreateExpense = () => {
    return (
        <div style={{ display: 'grid', gap: '25px' }}>
            <CardContainer title="Add Expense" />
            <CardContainer>
                <Form
                    initialValue={initialValue}
                    validationObject={Yup.object({
                        title: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Firstname is required'),
                        description: Yup.string()
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                        amount: Yup.number()
                            .min(1, 'Amount must be positive number')
                            .required('Required'),
                    })}
                    onSubmit={(a: CreateExpenseFormValueType) => console.log('SaaD : ', a)}
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
                        <button className="button" type="submit">
                            SUBMIT
                        </button>
                    </ButtonSection>
                </Form>
            </CardContainer>
        </div>
    );
};

export default CreateExpense;
