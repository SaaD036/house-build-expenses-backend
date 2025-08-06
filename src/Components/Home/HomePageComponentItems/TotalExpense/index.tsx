import React, { useEffect, useState } from 'react';
import { noop } from 'lodash';

import CardContainer from '../../../CardContainer';

import Form from '../../../Custom/Form';
import FormDate from '../../../Custom/Form/FormComponent/FormDateInput';

import { DISPLAY_TOTAL_EXPENSE_VALIDATOR } from './constants';
import styles from './styles.module.css';

type FormDataType = {
    formDate?: Date;
    toDate?: Date;
};

const FORM_DATA: FormDataType = {
    formDate: undefined,
    toDate: undefined,
};

const TotalExpense = () => {
    const [formValue, setFormValue] = useState<FormDataType>(FORM_DATA);

    const renderTitleForTotalExpense = () => {
        return <div className={styles.totalExpenseTitle}>Total Expense</div>;
    };

    const renderTotalExpenseBody = () => {
        return (
            <div className={styles.totalExpenseBody}>
                <div>
                    <Form
                        initialValue={FORM_DATA}
                        validationObject={DISPLAY_TOTAL_EXPENSE_VALIDATOR}
                        onFormValueChange={(formValue: FormDataType) => setFormValue(formValue)}
                        onSubmit={noop}
                    >
                        <FormDate id="formDate" name="formDate" label="From" />
                        <FormDate id="toDate" name="toDate" label="To" />
                    </Form>
                </div>
                <h2>
                    <b>25,00,000 BDT</b>
                </h2>
            </div>
        );
    };

    useEffect(() => {
        //
    }, [formValue]);

    return (
        <CardContainer title={renderTitleForTotalExpense()}>
            {renderTotalExpenseBody()}
        </CardContainer>
    );
};

export default TotalExpense;
