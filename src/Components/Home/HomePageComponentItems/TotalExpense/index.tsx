import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { Circles } from 'react-loader-spinner';

import CardContainer from '../../../CardContainer';

import Form from '../../../Custom/Form';
import FormDate from '../../../Custom/Form/FormComponent/FormDateInput';

import { getTotalExpense } from '../../../../Redux/actions/expenseAction';

import { TotalExpensePropsType, TotalExpenseFormDataType } from './interfaces';

import { DISPLAY_TOTAL_EXPENSE_VALIDATOR } from './constants';
import styles from './styles.module.css';

const FORM_DATA: TotalExpenseFormDataType = {
    formDate: undefined,
    toDate: undefined,
};

const TotalExpense = (props: TotalExpensePropsType) => {
    const { hideDateFilters, totalExpense, getTotalExpense } = props;

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
                {!hideDateFilters && (
                    <div style={{ flexGrow: '1' }}>
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
                )}
                <div className={`center ${styles.totalExpenseText}`}>
                    {loading ? (
                        <Circles height={50} width={50} color="#158901" visible />
                    ) : (
                        <h2>
                            <b className="text">{totalExpense ? `${totalExpense} BDT` : 'N/A'}</b>
                        </h2>
                    )}
                </div>
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
