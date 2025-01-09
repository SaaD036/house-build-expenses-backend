import React from 'react';
import { useField } from 'formik';

import { FormTextInputPropsType } from './interfaces';
import styles from './styles.module.css';

const FormTextInput = (props: FormTextInputPropsType) => {
    const { id, label, ...fieldHookConfigProps } = props;
    const [field, meta] = useField(fieldHookConfigProps);

    const hasError = () => {
        if (id !== field.name) {
            return false;
        }

        return !!(meta.touched && meta.error);
    };

    return (
        <div className={styles.formTextInputContainer}>
            <div>{label}</div>
            <input
                id={id}
                className={hasError() ? styles.inputError : styles.formTextInputBox}
                {...field}
            />
            {hasError() ? <div className={styles.errorMessage}>{meta.error}</div> : null}
        </div>
    );
};

export default FormTextInput;
