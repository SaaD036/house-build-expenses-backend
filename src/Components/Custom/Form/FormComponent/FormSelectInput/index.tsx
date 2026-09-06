import React from 'react';
import { useField, useFormikContext } from 'formik';

import { Select, MenuItem } from '@mui/material';

import { FormSelectInputPropsType } from './interfaces';
import styles from './styles.module.css';

const FormSelectInput = (props: FormSelectInputPropsType) => {
    const { id, label, options, ...fieldHookConfigProps } = props;

    const [field, meta] = useField(fieldHookConfigProps);
    const { setFieldValue, setFieldError } = useFormikContext();

    const hasError = () => {
        if (id !== field.name) {
            return false;
        }

        return !!(meta.touched && meta.error);
    };

    return (
        <div className={styles.formSelectInputContainer}>
            <div>{label}</div>
            <Select
                {...field}
                id={id}
                className={styles.formSelectInput}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#878787',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #158901',
                        borderColor: '#158901',
                    },
                    '& .MuiSelect-icon': {
                        color: '#878787',
                    },
                }}
                onChange={(e) => {
                    setFieldValue(id, e.target.value);
                    setFieldError(id, undefined);
                }}
            >
                {options.map((optionValue) => (
                    <MenuItem
                        key={optionValue.value}
                        className={styles.formSelectInputOptions}
                        value={optionValue.value}
                    >
                        {optionValue.label}
                    </MenuItem>
                ))}
            </Select>
            {hasError() ? <div className={styles.errorMessage}>{meta.error}</div> : null}
        </div>
    );
};

export default FormSelectInput;
