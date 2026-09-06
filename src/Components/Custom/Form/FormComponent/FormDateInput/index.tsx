import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';

import { FormDateInputPropsType } from './interfaces';
import styles from './styles.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const FormDate = (props: FormDateInputPropsType) => {
    const { id, label, disabled, minDate, maxDate, ...fieldHookConfigProps } = props;

    const [field, meta] = useField(fieldHookConfigProps);
    const { setFieldValue, setFieldError } = useFormikContext();

    const hasError = () => {
        if (id !== field.name) {
            return false;
        }

        return !!(meta.touched && meta.error);
    };

    return (
        <div className={styles.formDateInput}>
            <div className={styles.label}>{label}</div>
            <DatePicker
                id={id}
                name={id}
                className={styles.datePicker}
                wrapperClassName={styles.datePickerWrapper}
                selected={field.value ? new Date(field.value) : null}
                minDate={minDate}
                maxDate={maxDate}
                disabled={disabled}
                onChange={(d) => {
                    if (!d) {
                        return;
                    }

                    setFieldValue(id, d);
                    setFieldError(id, undefined);
                }}
            />
            {hasError() ? <div className={styles.errorMessage}>{meta.error}</div> : null}
        </div>
    );
};

export default FormDate;
