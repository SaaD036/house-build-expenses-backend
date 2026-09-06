import React from 'react';

import { TextField } from '@mui/material';

import { CustomInputPropType } from './interfaces';
import styles from './styles.module.css';

const CustomInput = (props: CustomInputPropType & any) => {
    const { label, value, className, type, onChange, ...rest } = props;

    return (
        <TextField
            label={label}
            value={value}
            variant="outlined"
            size="small"
            type={type || 'text'}
            fullWidth
            InputLabelProps={{
                classes: {
                    root: styles.cssLabel,
                    focused: styles.cssLabel,
                },
            }}
            InputProps={{
                classes: {
                    root: styles.notchedOutline,
                    focused: styles.notchedOutline,
                    notchedOutline: styles.notchedOutline,
                },
                className,
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
            {...rest}
        />
    );
};

export default CustomInput;
