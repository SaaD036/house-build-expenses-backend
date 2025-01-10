import React from 'react';

import { Button } from '@mui/material';

import { CustomButtonPropsType } from './interfaces';
import styles from './styles.module.css';

const CustomButton = (props: CustomButtonPropsType) => {
    const { children, className, disabled, ...rest } = props;

    return (
        <Button
            className={`${disabled ? 'button-disabled' : 'button'} ${className || ''}`}
            disabled={disabled}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
