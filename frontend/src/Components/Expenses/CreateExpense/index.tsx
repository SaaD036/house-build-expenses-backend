import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormikHelpers } from 'formik';
import { Container } from '@mui/material';

import Form from '../../Custom/Form';
import FormTextInput from '../../Custom/Form/FormComponent/FormTextInput';
import FormDate from '../../Custom/Form/FormComponent/FormDateInput';
import FormCurrencyInput from '../../Custom/Form/FormComponent/FormCurrencyInput';

import CardContainer from '../../CardContainer';
import ButtonSection from '../../Custom/CustomButton/ButtonSection';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import FormRichTextEditor from '../../Custom/Form/FormComponent/FormRichTextEditor';

import { createExpense } from '../../../Redux/actions/expenseAction';

import { ReducerStateType } from '../../../Redux/reducers';
import { CreateExpensePagePropsType, CreateExpenseFormValueType } from './interfaces';

import { CREATE_EXPENSE_INITIAL_VALUE, CREATE_EXPENSE_FORM_VALIDATOR } from './constants';
import styles from './styles.module.css';

const CreateExpense = (props: CreateExpensePagePropsType) => {
    const { house, disabledForm, createExpense } = props;

    const [loading, setLoading] = useState<boolean>();

    const onSubmitCreateExpenseForm = async (
        createExpenseFormData: CreateExpenseFormValueType,
        formikHelpers: FormikHelpers<object>
    ) => {
        setLoading(true);

        await createExpense(house?.id, {
            title: createExpenseFormData.title || '',
            description: createExpenseFormData.description || '',
            amount: createExpenseFormData.amount || 1,
            expenseAt: createExpenseFormData.expense_at.toISOString().split('T')[0],
        });

        setLoading(false);
    };

    return (
        <div style={{ display: 'grid', gap: '25px' }}>
            <CardContainer title="Add Expense" />
            {loading && <TabComponentLoader />}
            {disabledForm && (
                <Container className="center">
                    <div className={styles.formDisabledMessage}>This form is disabled</div>
                </Container>
            )}
            <CardContainer>
                <div style={disabledForm ? { pointerEvents: 'none' } : undefined}>
                    <Form
                        initialValue={CREATE_EXPENSE_INITIAL_VALUE}
                        validationObject={CREATE_EXPENSE_FORM_VALIDATOR}
                        onSubmit={onSubmitCreateExpenseForm}
                    >
                        <FormTextInput id="title" name="title" label="Title" />
                        <FormCurrencyInput id="amount" name="amount" label="Amount" min={1} />
                        <FormDate
                            id="expense_at"
                            name="expense_at"
                            label="Expense Time"
                            maxDate={new Date()}
                        />
                        <FormRichTextEditor
                            id="description"
                            name="description"
                            label="Description"
                        />
                        <ButtonSection className={styles.buttonSection}>
                            <button className="button" type="submit">
                                SUBMIT
                            </button>
                        </ButtonSection>
                    </Form>
                </div>
            </CardContainer>
        </div>
    );
};

const mapStateToProps = (state: ReducerStateType) => ({
    house: state.house.house,
});

const mapDispatchToProps = {
    createExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateExpense);
