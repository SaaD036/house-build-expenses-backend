import React from 'react';
import { useField } from 'formik';

import { FormNumberInputPropsType } from './interfaces';
import styles from './styles.module.css';

const FormNumberInput = (props: FormNumberInputPropsType) => {
    const { id, label, min, max, ...fieldHookConfigProps } = props;
    const [field, meta] = useField(fieldHookConfigProps);

    const hasError = () => {
        if (id !== field.name) {
            return false;
        }

        return !!(meta.touched && meta.error);
    };

    return (
        <div className={styles.formNumberInputContainer}>
            <div>{label}</div>
            <input
                id={id}
                className={hasError() ? styles.inputError : styles.formNumberInputBox}
                type="number"
                min={min}
                max={max}
                {...field}
            />
            {hasError() ? <div className={styles.errorMessage}>{meta.error}</div> : null}
        </div>
    );
};

export default FormNumberInput;
