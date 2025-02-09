import React from 'react';

import Form from '../../Custom/Form';
import FormTextInput from '../../Custom/Form/FormComponent/FormTextInput';
import FormDate from '../../Custom/Form/FormComponent/FormDateInput';
import FormCurrencyInput from '../../Custom/Form/FormComponent/FormCurrencyInput';
import FormTextArea from '../../Custom/Form/FormComponent/FormTextAreaInput';

import CardContainer from '../../CardContainer';
import ButtonSection from '../../Custom/CustomButton/ButtonSection';

import { CREATE_EXPENSE_INITIAL_VALUE, CREATE_EXPENSE_FORM_VALIDATOR } from './constants';
import { CreateExpenseFormValueType } from './interfaces';
import styles from './styles.module.css';

const CreateExpense = () => {
    return (
        <div style={{ display: 'grid', gap: '25px' }}>
            <CardContainer title="Add Expense" />
            <CardContainer>
                <Form
                    initialValue={CREATE_EXPENSE_INITIAL_VALUE}
                    validationObject={CREATE_EXPENSE_FORM_VALIDATOR}
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
                    <ButtonSection className={styles.buttonSection}>
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
