import React from 'react';
import { useField, useFormikContext } from 'formik';

import { FormCurrencyInputPropsType } from './interfaces';
import styles from './styles.module.css';

const FormCurrencyInput = (props: FormCurrencyInputPropsType) => {
    const { id, label, min, max, ...fieldHookConfigProps } = props;

    const [field, meta] = useField(fieldHookConfigProps);
    const { setFieldValue, setFieldError } = useFormikContext();

    const hasError = () => {
        if (id !== field.name) {
            return false;
        }

        return !!(meta.touched && meta.error);
    };

    return (
        <div className={styles.formCurrencyInputContainer}>
            <div>{label}</div>
            <div className={styles.currencyWithSymbolWrapper}>
                {/* <div className={`center ${styles.currencyTKsymbol}`}>
                    <span>৳</span>
                </div> */}
                <input
                    {...field}
                    id={id}
                    className={hasError() ? styles.inputError : styles.formCurrencyInputBox}
                    type="number"
                    min={min}
                    max={max}
                    step={'0.01'}
                    onChange={(e) => {
                        setFieldValue(id, e.target.value);
                        setFieldError(id, undefined);
                    }}
                />
                <div className={`center ${styles.currencyBDTsymbol}`}>
                    <span>BDT</span>
                </div>
            </div>
            {hasError() ? <div className={styles.errorMessage}>{meta.error}</div> : null}
        </div>
    );
};

export default FormCurrencyInput;
