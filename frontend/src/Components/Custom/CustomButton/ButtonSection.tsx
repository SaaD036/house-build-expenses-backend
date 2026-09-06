import React from 'react';

import { ButtonSectionPropsType } from './interfaces';
import styles from './styles.module.css';

const ButtonSection = (props: ButtonSectionPropsType) => {
    const { children, className, ...rest } = props;

    return (
        <div className={`${styles.buttonSection} ${className || ''}`} {...rest}>
            {children}
        </div>
    );
};

export default ButtonSection;
