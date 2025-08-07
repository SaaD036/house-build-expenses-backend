import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { noop } from 'lodash';

import CardContainer from '../../../CardContainer';

import Form from '../../../Custom/Form';
import FormDate from '../../../Custom/Form/FormComponent/FormDateInput';

import { getTotalExpense } from '../../../../Redux/actions/expenseAction';

import { TotalExpensePropsType, TotalExpenseFormDataType } from './interfaces';

import { DISPLAY_TOTAL_EXPENSE_VALIDATOR } from './constants';
import styles from './styles.module.css';
import TabComponentLoader from '../../../Custom/CustomLoadingItems/TabComponentLoader';

const FORM_DATA: TotalExpenseFormDataType = {
    formDate: undefined,
    toDate: undefined,
};

const TotalExpense = (props: TotalExpensePropsType) => {
    const { totalExpense, getTotalExpense } = props;

    const [formValue, setFormValue] = useState<TotalExpenseFormDataType>(FORM_DATA);
    const [loading, setLoading] = useState(false);

    const loadTotalExpense = async () => {
        setLoading(true);

        try {
            await getTotalExpense(formValue);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

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
                        onFormValueChange={(formValue: TotalExpenseFormDataType) =>
                            setFormValue(formValue)
                        }
                        onSubmit={noop}
                    >
                        <FormDate id="formDate" name="formDate" label="From" />
                        <FormDate id="toDate" name="toDate" label="To" />
                    </Form>
                </div>
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <h2>
                        <b className="text">{totalExpense ? `${totalExpense} BDT` : 'N/A'}</b>
                    </h2>
                )}
            </div>
        );
    };

    useEffect(() => {
        loadTotalExpense();
    }, [formValue]);

    return (
        <CardContainer title={renderTitleForTotalExpense()}>
            {renderTotalExpenseBody()}
        </CardContainer>
    );
};

const mapStateToProps = (state: any) => ({
    totalExpense: state.expense.totalExpenses,
});

const mapDispatchToProps = {
    getTotalExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(TotalExpense);
