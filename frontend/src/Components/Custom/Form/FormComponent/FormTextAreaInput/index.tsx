import React from 'react';
import { useField, useFormikContext } from 'formik';

import { FormTextInputPropsType } from './interfaces';
import styles from './styles.module.css';

const FormTextArea = (props: FormTextInputPropsType) => {
    const { id, label, ...fieldHookConfigProps } = props;

    const [field, meta] = useField(fieldHookConfigProps);
    const { setFieldValue, setFieldError } = useFormikContext();

    const hasError = () => {
        if (id !== field.name) {
            return false;
        }

        return !!(meta.touched && meta.error);
    };

    return (
        <div className={styles.formTextAreaContainer}>
            <div>{label}</div>
            <textarea
                {...field}
                id={id}
                className={hasError() ? styles.inputError : styles.formTextArea}
                onChange={(e) => {
                    setFieldValue(id, e.target.value);
                    setFieldError(id, undefined);
                }}
            />
            {hasError() ? <div className={styles.errorMessage}>{meta.error}</div> : null}
        </div>
    );
};

export default FormTextArea;
